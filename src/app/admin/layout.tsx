import { currentUser } from "@clerk/nextjs/server";
import { requireAdmin } from "@/lib/admin-auth";
import Sidebar from "./_components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const user = await currentUser();

  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";
  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";

  return (
    <div className="flex h-screen bg-[#050812] text-slate-100 overflow-hidden">
      <Sidebar userName={userName} userEmail={userEmail} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
