"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

// Lazy-load Three.js canvas — never blocks initial render
const WorkflowCanvas = dynamic(() => import("@/components/3d/WorkflowCanvas"), {
  ssr: false,
  loading: () => <WorkflowFallback />,
});

const STEPS = [
  { label: "Purchase Order", pillar: "Supply Chain", color: "cyan" },
  { label: "Journal Entry", pillar: "Accounting", color: "blue" },
  { label: "Tax Applied", pillar: "Taxes", color: "violet" },
  { label: "Board Report", pillar: "FP&A", color: "emerald" },
];

const COLORS: Record<string, string> = {
  cyan: "#06b6d4",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  emerald: "#10b981",
};

function WorkflowFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-8">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between gap-2 sm:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 min-w-0">
              {/* Node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center border text-xs font-bold"
                  style={{
                    borderColor: COLORS[step.color] + "40",
                    backgroundColor: COLORS[step.color] + "12",
                    color: COLORS[step.color],
                    boxShadow: `0 0 20px ${COLORS[step.color]}20`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className="text-[10px] sm:text-xs font-semibold leading-tight"
                    style={{ color: COLORS[step.color] }}
                  >
                    {step.pillar}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 hidden sm:block">
                    {step.label}
                  </p>
                </div>
              </div>

              {/* Arrow connector */}
              {i < STEPS.length - 1 && (
                <div className="flex-1 flex items-center mx-1 sm:mx-2 -mt-5">
                  <svg
                    viewBox="0 0 60 12"
                    className="w-full h-3 overflow-visible"
                    style={{ minWidth: 20 }}
                  >
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={COLORS[step.color]} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={COLORS[STEPS[i + 1].color]} stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 6 L 50 6"
                      stroke={`url(#grad-${i})`}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      fill="none"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="14"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <polygon
                      points="50,3 58,6 50,9"
                      fill={COLORS[STEPS[i + 1].color]}
                      opacity="0.8"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-600 mt-8">
          One transaction · Four systems · Zero manual handoffs
        </p>
      </div>
    </div>
  );
}

export default function WorkflowVisualization() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Only enable 3D on non-mobile, non-low-power devices
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
      } catch {
        return false;
      }
    })();

    if (!reducedMotion && !isMobile && hasWebGL) {
      setUse3D(true);
    }
  }, []);

  return (
    <section id="workflow" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <AnimateIn className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            Follow a transaction{" "}
            <span className="italic text-slate-300">end to end.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A single purchase order flows through all four pillars automatically — from
            procurement through accounting, tax, and into your FP&A dashboard.
          </p>
        </AnimateIn>

        {/* Visualization */}
        <AnimateIn>
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden" style={{ height: 340 }}>
            {use3D ? <WorkflowCanvas /> : <WorkflowFallback />}

            {/* Overlay labels for context */}
            {use3D && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <p className="text-xs text-slate-600 bg-[#080d18]/80 px-4 py-1.5 rounded-full">
                  One transaction · Four systems · Zero manual handoffs
                </p>
              </div>
            )}
          </div>
        </AnimateIn>

        {/* Step list — always visible */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 flex items-center gap-3"
            >
              <span
                className="text-xs font-mono font-bold"
                style={{ color: COLORS[step.color] }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{step.pillar}</p>
                <p className="text-[10px] text-slate-500">{step.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
