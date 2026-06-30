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
      <div className="container-max section-padding py-4">
        <nav className="flex items-center justify-between gap-8">
          <Link href="/" className="text-xl font-bold text-white shrink-0 tracking-tight">
            FineLyze
          </Link>

          <ul className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={ctaHref}
            className="shrink-0 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
          >
            {ctaText}
          </Link>
        </nav>
      </div>
    </header>
  );
}
