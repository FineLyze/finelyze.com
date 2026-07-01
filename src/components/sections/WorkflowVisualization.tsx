"use client";

import { useEffect, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import { fadeUp } from "@/lib/motion";

const STEPS = [
  { label: "Supply Chain",  sub: "Purchase Order", color: "#06b6d4" },
  { label: "Accounting",    sub: "Journal Entry",  color: "#3b82f6" },
  { label: "Tax Reporting", sub: "GL-sourced",     color: "#8b5cf6" },
  { label: "FP&A",          sub: "Board Report",   color: "#10b981" },
];

/*
  Per-node SVG <animate> values for a 5-second loop.
  gv = glow halo fill-opacity values
  sv = node ring stroke-opacity values
  kt = keyTimes (same for both on each node)

  Timing: nodes are at 0%, 33.3%, 66.7%, 100% of the path.
  Node 0 and 3 both "activate" at the loop boundary (t=0/t=5s),
  which is correct — the particle restarts at node 0 the moment
  it finishes at node 3, creating a continuous loop.
*/
const NODE_ANIMS = [
  // Node 0 — activates at t=0s / t=5s (loop boundary)
  {
    kt: "0;0.07;0.20;0.92;1",
    gv: "0.18;0.06;0.02;0.02;0.18",
    sv: "0.85;0.40;0.22;0.22;0.85",
  },
  // Node 1 — activates at t≈1.67s (33.3% of 5s)
  {
    kt: "0;0.28;0.333;0.43;0.58;1",
    gv: "0.02;0.02;0.18;0.06;0.02;0.02",
    sv: "0.22;0.22;0.85;0.40;0.22;0.22",
  },
  // Node 2 — activates at t≈3.33s (66.7% of 5s)
  {
    kt: "0;0.61;0.667;0.76;0.88;1",
    gv: "0.02;0.02;0.18;0.06;0.02;0.02",
    sv: "0.22;0.22;0.85;0.40;0.22;0.22",
  },
  // Node 3 — activates at t=5s (loop end = loop start)
  {
    kt: "0;0.82;0.93;1",
    gv: "0.02;0.02;0.09;0.18",
    sv: "0.22;0.22;0.50;0.85",
  },
];

export default function WorkflowVisualization() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimated(true);
    }
  }, []);

  const N = STEPS.length;
  const VW = 1000;
  const VH = 210;
  const CY = 88;   // node center Y
  const PAD = 110; // horizontal padding inside viewBox
  const nodeX = STEPS.map((_, i) =>
    Math.round(PAD + (i / (N - 1)) * (VW - PAD * 2))
  ); // [110, 370, 630, 890] — fully symmetric, evenly spaced

  const pathD = `M ${nodeX[0]} ${CY} L ${nodeX[N - 1]} ${CY}`;

  return (
    <section id="workflow" className="bg-[#080d18]">
      <div className="container-max section-padding">
        {/* Header */}
        <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            One transaction.{" "}
            <span className="italic text-slate-300">Every system.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A single transaction flows across all four pillars — no exports, no re-keying.
          </p>
        </AnimateIn>

        {/* Workflow diagram — SVG-based, full-width, centered */}
        <AnimateIn variants={fadeUp}>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 sm:px-10 py-14 sm:py-16">
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full"
              role="img"
              aria-label="Transaction flow: Supply Chain → Accounting → Tax Reporting → FP&A"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Multi-stop gradient spanning all four pillar colours */}
                <linearGradient id="wf-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  {STEPS.map((s, i) => (
                    <stop
                      key={i}
                      offset={`${(i / (N - 1)) * 100}%`}
                      stopColor={s.color}
                      stopOpacity="0.6"
                    />
                  ))}
                </linearGradient>

                {/* Glow filter for the moving particle */}
                <filter id="wf-particle-glow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Path the particle travels — defined in defs, invisible */}
                <path id="wf-particle-path" d={pathD} />
              </defs>

              {/* Dim rail */}
              <line
                x1={nodeX[0]} y1={CY}
                x2={nodeX[N - 1]} y2={CY}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="2"
              />

              {/* Colour gradient overlay on rail */}
              <line
                x1={nodeX[0]} y1={CY}
                x2={nodeX[N - 1]} y2={CY}
                stroke="url(#wf-line-grad)"
                strokeWidth="1.5"
                opacity="0.45"
              />

              {/* Four pillar nodes */}
              {STEPS.map((step, i) => {
                const cx = nodeX[i];
                const anim = NODE_ANIMS[i];

                return (
                  <g key={step.label}>
                    {/* Outer glow halo — brightens when particle arrives */}
                    <circle cx={cx} cy={CY} r={38} fill={step.color} fillOpacity="0.02">
                      {animated && (
                        <animate
                          attributeName="fillOpacity"
                          values={anim.gv}
                          keyTimes={anim.kt}
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>

                    {/* Node ring */}
                    <circle
                      cx={cx} cy={CY} r={23}
                      fill={step.color} fillOpacity="0.08"
                      stroke={step.color} strokeWidth="1.5"
                      strokeOpacity={animated ? "0.22" : "0.45"}
                    >
                      {animated && (
                        <animate
                          attributeName="strokeOpacity"
                          values={anim.sv}
                          keyTimes={anim.kt}
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>

                    {/* Step number */}
                    <text
                      x={cx} y={CY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="ui-monospace, monospace"
                      fill={step.color}
                      fillOpacity="0.9"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>

                    {/* Pillar name */}
                    <text
                      x={cx} y={CY + 44}
                      textAnchor="middle"
                      dominantBaseline="hanging"
                      fontSize="12.5"
                      fontWeight="600"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fill="white"
                      fillOpacity="0.9"
                    >
                      {step.label}
                    </text>

                    {/* Sub-label */}
                    <text
                      x={cx} y={CY + 62}
                      textAnchor="middle"
                      dominantBaseline="hanging"
                      fontSize="10"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fill="rgba(148,163,184,0.55)"
                    >
                      {step.sub}
                    </text>
                  </g>
                );
              })}

              {/* Animated transaction particle — only when motion is OK */}
              {animated && (
                <g filter="url(#wf-particle-glow)">
                  {/* Outer halo */}
                  <circle r="11" fill="white" fillOpacity="0.10">
                    <animateMotion dur="5s" repeatCount="indefinite" calcMode="linear">
                      <mpath href="#wf-particle-path" />
                    </animateMotion>
                  </circle>
                  {/* Bright core */}
                  <circle r="5" fill="white" fillOpacity="0.95">
                    <animateMotion dur="5s" repeatCount="indefinite" calcMode="linear">
                      <mpath href="#wf-particle-path" />
                    </animateMotion>
                  </circle>
                </g>
              )}
            </svg>

            <p className="text-center text-xs text-slate-600 mt-8">
              One transaction · Four systems · Zero manual handoffs
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
