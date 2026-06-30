import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";

export default function CTA() {
  return (
    <section id="cta" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-[#080d18] to-slate-900/20 p-10 sm:p-16 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.12),transparent)] pointer-events-none" />

          <StaggerGroup className="relative z-10">
            <AnimateIn>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Get started today
              </p>
            </AnimateIn>
            <AnimateIn>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                One ERP to run it all.
              </h2>
            </AnimateIn>
            <AnimateIn>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Join finance teams that have unified their Accounting, Taxes, Supply Chain,
                and FP&A on FineLyze. 14-day free trial, no credit card required.
              </p>
            </AnimateIn>
            <AnimateIn>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="inline-block rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
                >
                  Start Free Trial
                </a>
                <a
                  href="#"
                  className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                >
                  Talk to Sales
                </a>
              </div>
            </AnimateIn>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
