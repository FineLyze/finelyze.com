import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";

export default function CTA() {
  return (
    <section id="cta" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/25 via-[#080d18] to-slate-900/10 p-10 sm:p-16">
          <StaggerGroup className="text-center">
            <AnimateIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                Ready to get started?
              </h2>
            </AnimateIn>

            <AnimateIn>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of teams already using our platform. No credit card required.
              </p>
            </AnimateIn>

            <AnimateIn>
              <a
                href="#"
                className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Create your free account
              </a>
            </AnimateIn>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
