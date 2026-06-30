import React from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";
import { fadeUp, scaleIn } from "@/lib/motion";
import { PILLARS } from "@/data/pillars";
import type { PillarIconKey } from "@/data/pillars";

const COLOR = {
  blue: {
    icon: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    accent: "text-blue-400",
    badge: "border-blue-500/20 text-blue-400/80",
    glow: "hover:border-blue-500/30 hover:shadow-blue-900/20",
    dot: "bg-blue-500/50",
    heading: "text-blue-400/60",
    diff: "border-blue-500/20 bg-blue-500/[0.06]",
  },
  violet: {
    icon: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    accent: "text-violet-400",
    badge: "border-violet-500/20 text-violet-400/80",
    glow: "hover:border-violet-500/30 hover:shadow-violet-900/20",
    dot: "bg-violet-500/50",
    heading: "text-violet-400/60",
    diff: "border-violet-500/20 bg-violet-500/[0.06]",
  },
  cyan: {
    icon: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    accent: "text-cyan-400",
    badge: "border-cyan-500/20 text-cyan-400/80",
    glow: "hover:border-cyan-500/30 hover:shadow-cyan-900/20",
    dot: "bg-cyan-500/50",
    heading: "text-cyan-400/60",
    diff: "border-cyan-500/20 bg-cyan-500/[0.06]",
  },
  emerald: {
    icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    accent: "text-emerald-400",
    badge: "border-emerald-500/20 text-emerald-400/80",
    glow: "hover:border-emerald-500/30 hover:shadow-emerald-900/20",
    dot: "bg-emerald-500/50",
    heading: "text-emerald-400/60",
    diff: "border-emerald-500/20 bg-emerald-500/[0.06]",
  },
} as const;

const ICONS: Record<PillarIconKey, React.ReactNode> = {
  accounting: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  taxes: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75a2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
  ),
  scm: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  fpa: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

export default function FourPillars() {
  return (
    <section id="pillars" className="bg-[#080d18]">
      <div className="container-max section-padding">
        {/* Header */}
        <AnimateIn className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            The Platform
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            Every function.{" "}
            <span className="italic text-slate-300">Fully connected.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Each pillar is a complete solution on its own. Together, they eliminate
            the data silos that cost enterprises millions in reconciliation time.
          </p>
        </AnimateIn>

        {/* Pillar cards — 2-column grid to accommodate full module lists */}
        <StaggerGroup className="grid gap-5 lg:grid-cols-2 mb-14">
          {PILLARS.map(({ id, name, tagline, color, icon, moduleGroups, differentiator }) => {
            const c = COLOR[color];
            const isGrouped = moduleGroups.length > 1;

            return (
              <AnimateIn key={id} variants={scaleIn}>
                <div
                  className={`relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 flex flex-col gap-4 transition-all duration-300 hover:bg-white/[0.05] hover:shadow-xl ${c.glow}`}
                >
                  {/* Icon + name */}
                  <div className="flex items-start gap-3">
                    <span className={`p-2 rounded-lg border ${c.icon} shrink-0`}>
                      {ICONS[icon]}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-base leading-tight">{name}</h3>
                      <p className={`text-xs mt-0.5 ${c.accent}`}>{tagline}</p>
                    </div>
                  </div>

                  {/* Differentiator callout (Taxes) */}
                  {differentiator && (
                    <div className={`rounded-lg border ${c.diff} px-3 py-2.5`}>
                      <p className={`text-[11px] font-semibold ${c.accent} mb-0.5`}>
                        Key differentiator
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug">{differentiator}</p>
                    </div>
                  )}

                  {/* Module list */}
                  <div className="flex-1">
                    {isGrouped ? (
                      // Grouped layout (Taxes)
                      <div className="space-y-3">
                        {moduleGroups.map((group) => (
                          <div key={group.heading}>
                            {group.heading && (
                              <p className={`text-[10px] font-semibold uppercase tracking-wider ${c.heading} mb-1.5`}>
                                {group.heading}
                              </p>
                            )}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                              {group.items.map((item) => (
                                <div key={item} className="flex items-center gap-1.5">
                                  <span className={`w-1 h-1 rounded-full shrink-0 ${c.dot}`} />
                                  <span className="text-[11px] text-slate-400 leading-tight">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Flat 2-column grid
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {moduleGroups[0].items.map((item) => (
                          <div key={item} className="flex items-center gap-1.5">
                            <span className={`w-1 h-1 rounded-full shrink-0 ${c.dot}`} />
                            <span className="text-[11px] text-slate-400 leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </AnimateIn>
            );
          })}
        </StaggerGroup>

        {/* Unification banner */}
        <AnimateIn variants={fadeUp}>
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-blue-900/10 via-white/[0.02] to-blue-900/10 p-6 sm:p-8 text-center">
            <p className="text-slate-300 text-sm sm:text-base font-medium mb-1">
              Each pillar feeds the next.{" "}
              <span className="text-white font-semibold">
                One source of truth across your entire enterprise.
              </span>
            </p>
            <p className="text-slate-500 text-xs sm:text-sm">
              No spreadsheet exports. No manual reconciliation. No data lag.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
