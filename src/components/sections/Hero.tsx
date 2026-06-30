import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";
import { fadeDown, fadeUp } from "@/lib/motion";
import type { HeroContent } from "@/types/cms";

const DEFAULT: HeroContent = {
  headline: "Four Pillars.",
  headlineAccent: "One Unified ERP.",
  subtitle:
    "FineLyze connects Corporate Accounting, Taxes, Supply Chain, and FP&A into one intelligent system — every transaction traceable from origin to final report.",
  primaryButtonText: "Start Free Trial",
  primaryButtonHref: "#cta",
  secondaryButtonText: "See the Platform",
  secondaryButtonHref: "#pillars",
};

const PILLARS = ["Corporate Accounting", "Taxes", "Supply Chain", "FP&A"];

export default function Hero({ content }: { content?: HeroContent }) {
  const c = content ?? DEFAULT;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1020] via-[#080d18] to-[#080d18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-5%,rgba(37,99,235,0.14),transparent)]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <StaggerGroup className="container-max section-padding text-center relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <AnimateIn variants={fadeDown}>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-medium text-blue-300 tracking-wide uppercase">
              Enterprise ERP Platform
            </span>
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn variants={fadeDown}>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white text-balance mb-4">
            {c.headline}
            <br />
            <span className="text-blue-400">{c.headlineAccent}</span>
          </h1>
        </AnimateIn>

        {/* Subtitle */}
        <AnimateIn>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 text-balance mb-10 leading-relaxed">
            {c.subtitle}
          </p>
        </AnimateIn>

        {/* CTAs */}
        <AnimateIn variants={fadeUp}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              href={c.primaryButtonHref}
              className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
            >
              {c.primaryButtonText}
            </Link>
            <Link
              href={c.secondaryButtonHref}
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              {c.secondaryButtonText} →
            </Link>
          </div>
        </AnimateIn>

        {/* Pillar pills */}
        <AnimateIn variants={fadeUp}>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {PILLARS.map((pillar, i) => (
              <span key={pillar} className="flex items-center gap-2">
                <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-400">
                  {pillar}
                </span>
                {i < PILLARS.length - 1 && (
                  <span className="text-blue-600/60 text-xs font-bold">+</span>
                )}
              </span>
            ))}
          </div>
        </AnimateIn>
      </StaggerGroup>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
