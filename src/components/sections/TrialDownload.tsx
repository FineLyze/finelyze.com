import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";
import { fadeUp } from "@/lib/motion";

export default function TrialDownload() {
  return (
    <section id="trial" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-900/20 via-[#080d18] to-slate-900/10 p-10 sm:p-14 text-center">
          <StaggerGroup>
            <AnimateIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 uppercase tracking-wide mb-6">
                Free 14-Day Trial
              </span>
            </AnimateIn>

            <AnimateIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                Test FineLyze with your own data
              </h2>
            </AnimateIn>

            <AnimateIn>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                Download the full ERP connector and run FineLyze against your live
                financial data — no credit card, no commitment.
              </p>
            </AnimateIn>

            <AnimateIn variants={fadeUp}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#" // TODO: replace with real download link
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Trial
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                >
                  View pricing
                </a>
              </div>
            </AnimateIn>

            <AnimateIn>
              <p className="mt-6 text-xs text-slate-500">
                Compatible with SAP, QuickBooks, Xero, Oracle NetSuite, Microsoft Dynamics, and Sage.
              </p>
            </AnimateIn>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
