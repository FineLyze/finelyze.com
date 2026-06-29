import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";
import { fadeDown, fadeUp } from "@/lib/motion";
import type { HeroContent } from "@/types/cms";

const DEFAULT: HeroContent = {
  headline: "Automated Financial Close.",
  headlineAccent: "Audit-Grade Accuracy.",
  subtitle:
    "FineLyze eliminates manual reconciliation and spreadsheet risk — giving your finance team automated close workflows, real-time variance analysis, and reports built to withstand any audit.",
  primaryButtonText: "Start for free",
  primaryButtonHref: "#cta",
  secondaryButtonText: "See how it works",
  secondaryButtonHref: "#features",
};

export default function Hero({ content }: { content?: HeroContent }) {
  const c = content ?? DEFAULT;
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1829] via-[#080d18] to-[#080d18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.18),transparent)]" />

      <StaggerGroup className="container-max section-padding text-center relative z-10">
        <AnimateIn variants={fadeDown}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white text-balance mb-6">
            {c.headline}{" "}
            <span className="text-blue-400">{c.headlineAccent}</span>
          </h1>
        </AnimateIn>

        <AnimateIn>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 text-balance mb-10">
            {c.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn variants={fadeUp}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={c.primaryButtonHref}
              className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              {c.primaryButtonText}
            </Link>
            <Link
              href={c.secondaryButtonHref}
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              {c.secondaryButtonText}
            </Link>
          </div>
        </AnimateIn>
      </StaggerGroup>
    </section>
  );
}
