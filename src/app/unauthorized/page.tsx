import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#080d18] flex items-center justify-center text-center px-4">
      <div className="space-y-4">
        <div className="text-5xl font-bold text-white">403</div>
        <h1 className="text-xl font-semibold text-white">Access Denied</h1>
        <p className="text-slate-400 max-w-sm">
          You don&apos;t have permission to access this page. Admin access only.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
