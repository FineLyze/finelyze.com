import { clerkClient } from "@clerk/nextjs/server";
import { requireAdmin } from "@/lib/admin-auth";
import { banUserAction, unbanUserAction, deleteUserAction } from "./actions";

// Wrappers discard the ActionResult return value to satisfy form action types
async function ban(fd: FormData) { await banUserAction(fd); }
async function unban(fd: FormData) { await unbanUserAction(fd); }
async function del(fd: FormData) { await deleteUserAction(fd); }

export default async function UsersPage() {
  await requireAdmin();

  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({ limit: 500, orderBy: "-created_at" });

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-white mb-1">Users</h1>
      <p className="text-slate-400 text-sm mb-8">{users.length} total accounts</p>

      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">User</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Joined</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Role</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const email = user.emailAddresses[0]?.emailAddress ?? "—";
              const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email;
              const role = (user.publicMetadata as { role?: string })?.role ?? "user";
              const joined = new Date(user.createdAt).toLocaleDateString();

              return (
                <tr key={user.id} className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{name}</p>
                    <p className="text-slate-500 text-xs">{email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{joined}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                        role === "admin"
                          ? "bg-blue-600/20 text-blue-400"
                          : "bg-white/[0.06] text-slate-400"
                      }`}
                    >
                      {role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.banned ? (
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium">
                        Deactivated
                      </span>
                    ) : (
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      {user.banned ? (
                        <form action={unban}>
                          <input type="hidden" name="userId" value={user.id} />
                          <button
                            type="submit"
                            className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.1] text-slate-300 hover:border-green-500/40 hover:text-green-400 transition-colors"
                          >
                            Activate
                          </button>
                        </form>
                      ) : (
                        <form action={ban}>
                          <input type="hidden" name="userId" value={user.id} />
                          <button
                            type="submit"
                            className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.1] text-slate-300 hover:border-yellow-500/40 hover:text-yellow-400 transition-colors"
                          >
                            Deactivate
                          </button>
                        </form>
                      )}
                      <form
                        action={del}
                        onSubmit={(e) => {
                          if (!confirm(`Delete ${name}? This cannot be undone.`)) e.preventDefault();
                        }}
                      >
                        <input type="hidden" name="userId" value={user.id} />
                        <button
                          type="submit"
                          className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.1] text-slate-300 hover:border-red-500/40 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-12">No users yet.</p>
        )}
      </div>
    </div>
  );
}
