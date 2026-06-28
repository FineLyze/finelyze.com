import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";
import { scaleIn } from "@/lib/motion";

const tiers = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    description: "For small finance teams getting started with automation.",
    features: [
      "Up to 3 users",
      "Bank reconciliation",
      "Standard financial reports",
      "CSV & Excel export",
      "Email support",
    ],
    cta: "Get Started",
    href: "#",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/month",
    description: "For growing teams that need ERP integrations and full close automation.",
    features: [
      "Up to 15 users",
      "Everything in Basic",
      "ERP integrations (SAP, QuickBooks, Xero)",
      "Automated close workflows",
      "Audit trail & variance analysis",
      "Priority support",
    ],
    cta: "Get Started",
    href: "#",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Audit-grade compliance and white-glove onboarding for large teams.",
    features: [
      "Unlimited users",
      "Everything in Pro",
      "SOC 2 Type II compliance",
      "Custom ERP connectors",
      "Dedicated account manager",
      "SLA & 24/7 support",
    ],
    cta: "Contact Sales",
    href: "#",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Start free, scale as your team grows. No hidden fees, no surprise invoices.
          </p>
        </AnimateIn>

        <StaggerGroup className="grid gap-8 lg:grid-cols-3">
          {tiers.map(({ name, price, period, description, features, cta, href, highlight }) => (
            <AnimateIn key={name} variants={scaleIn}>
              <div
                className={`relative rounded-2xl border p-8 h-full flex flex-col transition-all duration-200 ${
                  highlight
                    ? "border-blue-500/50 bg-blue-600/[0.08] hover:border-blue-400/60"
                    : "border-white/[0.08] bg-white/[0.04] hover:border-white/[0.15] hover:bg-white/[0.06]"
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-white">{price}</span>
                    {period && <span className="text-slate-400 text-sm">{period}</span>}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg
                        className="w-4 h-4 mt-0.5 shrink-0 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  className={`block w-full text-center rounded-full py-3 text-sm font-semibold transition-colors ${
                    highlight
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {cta}
                </a>
              </div>
            </AnimateIn>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
