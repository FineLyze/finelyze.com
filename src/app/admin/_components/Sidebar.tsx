"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

const NAV = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5V19a1 1 0 001 1h5v-5h6v5h5a1 1 0 001-1v-5.5M3 13.5L12 5l9 8.5" />
      </svg>
    ),
  },
  {
    label: "CMS",
    href: "/admin/cms",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 113 3L7.5 18.854l-4 1 1-4L16.862 3.487z" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-5.33-3.77M9 11a4 4 0 100-8 4 4 0 000 8zm-7 9v-1a4 4 0 015.33-3.77" />
      </svg>
    ),
  },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10H9m3-5h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  userName: string;
  userEmail: string;
}

export default function Sidebar({ userName, userEmail }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-[#080d18] border-r border-white/[0.08] h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.08]">
        <span className="text-base font-bold text-white">FineLyze</span>
        <span className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600/15 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Sign out */}
      <div className="px-3 py-4 border-t border-white/[0.08] space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-white truncate">{userName}</p>
          <p className="text-xs text-slate-500 truncate">{userEmail}</p>
        </div>
        <SignOutButton redirectUrl="/">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Sign out
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
