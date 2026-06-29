import { clerkClient } from "@clerk/nextjs/server";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  await requireAdmin();

  const client = await clerkClient();
  const [{ data: users }, subscriptions, cmsRecords] = await Promise.all([
    client.users.getUserList({ limit: 500 }),
    db ? db.subscription.findMany() : Promise.resolve([]),
    db ? db.siteContent.findMany({ select: { section: true, updatedAt: true } }) : Promise.resolve([]),
  ]);

  const tierCounts = { FREE: 0, BASIC: 0, PRO: 0, ENTERPRISE: 0 };
  for (const s of subscriptions) tierCounts[s.tier]++;
  tierCounts.FREE += users.length - subscriptions.length; // users with no subscription record

  const activeTrials = subscriptions.filter((s) => s.trialActive).length;
  const bannedCount = users.filter((u) => u.banned).length;
  const lastCmsUpdate = cmsRecords
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]?.updatedAt;

  const stats = [
    { label: "Total Users", value: users.length, sub: `${bannedCount} deactivated`, href: "/admin/users" },
    { label: "Active Trials", value: activeTrials, sub: "14-day ERP trials", href: "/admin/subscriptions" },
    { label: "Pro Subscribers", value: tierCounts.PRO + tierCounts.ENTERPRISE, sub: `${tierCounts.BASIC} on Basic`, href: "/admin/subscriptions" },
    {
      label: "CMS Last Updated",
      value: lastCmsUpdate ? new Date(lastCmsUpdate).toLocaleDateString() : "Never",
      sub: `${cmsRecords.length} sections stored`,
      href: "/admin/cms",
    },
  ];

  const quickLinks = [
    { label: "Edit Hero & Pricing", href: "/admin/cms", desc: "Update public-facing content" },
    { label: "Manage Users", href: "/admin/users", desc: "Activate, deactivate, or delete accounts" },
    { label: "Assign Tiers", href: "/admin/subscriptions", desc: "Change subscription tier or trial status" },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-slate-400 text-sm mb-8">FineLyze admin overview</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 hover:border-white/[0.15] transition-colors group">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">{s.label}</p>
            <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
          </Link>
        ))}
      </div>

      {/* Tier breakdown */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-4">Subscription Breakdown</h2>
        <div className="grid grid-cols-4 gap-3">
          {(["FREE", "BASIC", "PRO", "ENTERPRISE"] as const).map((tier) => (
            <div key={tier} className="text-center">
              <p className="text-xl font-bold text-white">{tierCounts[tier]}</p>
              <p className="text-xs text-slate-500 mt-0.5">{tier}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickLinks.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 hover:border-blue-500/40 hover:bg-blue-600/[0.05] transition-all group">
            <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">{l.label} →</p>
            <p className="text-xs text-slate-500 mt-1">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
