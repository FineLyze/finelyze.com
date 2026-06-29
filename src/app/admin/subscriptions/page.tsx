import { clerkClient } from "@clerk/nextjs/server";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import type { Tier } from "@prisma/client";
import { updateTierAction, toggleTrialAction, updateNotesAction } from "./actions";

async function setTier(fd: FormData) { await updateTierAction(fd); }
async function toggleTrial(fd: FormData) { await toggleTrialAction(fd); }
async function saveNotes(fd: FormData) { await updateNotesAction(fd); }

const TIERS: Tier[] = ["FREE", "BASIC", "PRO", "ENTERPRISE"];

export default async function SubscriptionsPage() {
  await requireAdmin();

  const client = await clerkClient();
  const [{ data: users }, subscriptions] = await Promise.all([
    client.users.getUserList({ limit: 500, orderBy: "-created_at" }),
    db ? db.subscription.findMany() : Promise.resolve([]),
  ]);

  const subMap = new Map(subscriptions.map((s) => [s.clerkUserId, s]));

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-white mb-1">Subscriptions</h1>
      <p className="text-slate-400 text-sm mb-8">Manage tiers and trial access for all users.</p>

      <div className="space-y-3">
        {users.map((user) => {
          const email = user.emailAddresses[0]?.emailAddress ?? "—";
          const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email;
          const sub = subMap.get(user.id);
          const tier = sub?.tier ?? "FREE";
          const trialActive = sub?.trialActive ?? false;
          const trialEnd = sub?.trialEnd ? new Date(sub.trialEnd).toLocaleDateString() : null;
          const notes = sub?.notes ?? "";

          return (
            <div
              key={user.id}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-white text-sm">{name}</p>
                  <p className="text-slate-500 text-xs">{email}</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Tier selector */}
                  <form action={setTier} className="flex items-center gap-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <select
                      name="tier"
                      defaultValue={tier}
                      className="rounded-lg bg-[#0d1629] border border-white/[0.1] text-white text-xs px-3 py-1.5 focus:outline-none focus:border-blue-500"
                    >
                      {TIERS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                      Set Tier
                    </button>
                  </form>

                  {/* Trial toggle */}
                  <form action={toggleTrial} className="flex items-center gap-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="active" value={String(!trialActive)} />
                    <button
                      type="submit"
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        trialActive
                          ? "border-yellow-500/40 text-yellow-400 hover:border-yellow-500/60"
                          : "border-white/[0.1] text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {trialActive ? `Trial active (ends ${trialEnd})` : "Start Trial"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Notes */}
              <form action={saveNotes} className="mt-4 flex gap-2">
                <input type="hidden" name="userId" value={user.id} />
                <input
                  type="text"
                  name="notes"
                  defaultValue={notes}
                  placeholder="Internal notes…"
                  className="flex-1 rounded-lg bg-[#0d1629] border border-white/[0.08] text-white text-xs px-3 py-1.5 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50"
                />
                <button
                  type="submit"
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  Save Note
                </button>
              </form>
            </div>
          );
        })}
        {users.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-12">No users yet.</p>
        )}
      </div>
    </div>
  );
}
