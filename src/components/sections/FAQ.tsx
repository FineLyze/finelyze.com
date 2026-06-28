"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const faqs = [
  {
    q: "What is FineLyze?",
    a: "FineLyze is an audit-grade financial automation platform that helps finance teams automate reconciliation, close workflows, and compliance reporting — eliminating manual errors and significantly reducing time-to-close.",
  },
  {
    q: "How does automated reconciliation work?",
    a: "FineLyze connects to your ERP, bank feeds, and accounts payable/receivable systems, then matches transactions against your ledger in real time. Exceptions are surfaced with one-click resolution workflows, so your team focuses on discrepancies rather than matching rows.",
  },
  {
    q: "Which ERP systems does FineLyze integrate with?",
    a: "FineLyze supports SAP, Oracle NetSuite, QuickBooks, Xero, Microsoft Dynamics, and Sage out of the box. Custom connectors are available on the Enterprise plan for proprietary or legacy systems.",
  },
  {
    q: "Is FineLyze SOC 2 compliant?",
    a: "Yes. FineLyze is SOC 2 Type II certified, with encryption at rest and in transit, role-based access controls, and a complete audit trail for every action taken in the platform.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most teams are live within a week. Basic and Pro plans include guided self-serve onboarding with video walkthroughs. Enterprise customers receive a dedicated implementation engineer and a tailored rollout plan.",
  },
  {
    q: "Can I export audit-ready reports?",
    a: "Yes. FineLyze generates PDF and Excel reports formatted to auditor specifications — including variance analysis, supporting schedules, and reconciliation sign-off records ready for your external audit package.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need to know about FineLyze.
          </p>
        </AnimateIn>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map(({ q, a }, i) => (
            <AnimateIn key={i}>
              <div className="rounded-xl border border-white/[0.08] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium text-white hover:bg-white/[0.04] transition-colors"
                >
                  {q}
                  <svg
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      open === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] pt-4">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
