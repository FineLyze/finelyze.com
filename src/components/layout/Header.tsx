"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeaderContent } from "@/types/cms";

const DEFAULT_LINKS = [
  { label: "Platform", href: "#pillars" },
  { label: "How It Works", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({ content }: { content?: HeaderContent }) {
  const navLinks = content?.navLinks ?? DEFAULT_LINKS;
  const ctaText = content?.ctaText ?? "Start Free Trial";
  const ctaHref = content?.ctaHref ?? "#cta";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080d18]/95 backdrop-blur-md border-b border-white/[0.08] shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      {/*
        grid-cols-3 gives each third equal width so the logo never crowds
        the nav and the CTA never floats — perfect balance at all viewport
        widths without any manual gap tuning.
      */}
      <div className="container-max px-6 sm:px-8 lg:px-10">
        <nav className="grid grid-cols-3 items-center h-16">

          {/* Logo — left third */}
          <Link
            href="/"
            className="text-[11px] font-bold text-white uppercase tracking-[0.22em]"
          >
            FineLyze
          </Link>

          {/*
            Nav — center third, desktop only.
            "How It Works" at small uppercase + tracking overflows the
            center third below lg, so we gate here rather than squish.
          */}
          <ul className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[10px] uppercase tracking-[0.12em] font-medium text-slate-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA — right third */}
          <div className="flex justify-end">
            <Link
              href={ctaHref}
              className="rounded-full bg-blue-600 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
            >
              {ctaText}
            </Link>
          </div>

        </nav>
      </div>
    </header>
  );
}
