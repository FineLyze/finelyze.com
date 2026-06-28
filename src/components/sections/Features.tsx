import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";
import { scaleIn } from "@/lib/motion";

const features = [
  {
    title: "Automated Reconciliation",
    description: "Match transactions against your ledger in real time. Exceptions are surfaced instantly with one-click resolution — no more manual row-by-row comparison.",
    icon: "⚖️",
  },
  {
    title: "Close Workflow Automation",
    description: "Automate your month-end and quarter-end close with structured task sequences, preparer/reviewer sign-offs, and built-in deadlines that keep every cycle on track.",
    icon: "✅",
  },
  {
    title: "Audit-Ready Reporting",
    description: "Generate PDF and Excel reports formatted to auditor specifications — including variance analysis, supporting schedules, and reconciliation sign-off records.",
    icon: "📋",
  },
  {
    title: "ERP Integrations",
    description: "Connect SAP, Oracle NetSuite, QuickBooks, Xero, Microsoft Dynamics, and Sage out of the box. Custom connectors available for proprietary systems.",
    icon: "🔌",
  },
  {
    title: "Real-Time Variance Analysis",
    description: "Catch discrepancies the moment they occur. FineLyze flags budget-vs-actual variances, period-over-period shifts, and unexplained balances automatically.",
    icon: "📊",
  },
  {
    title: "SOC 2 Type II Compliant",
    description: "Enterprise-grade security with encryption at rest and in transit, role-based access controls, and a complete audit trail for every action on the platform.",
    icon: "🔒",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            End-to-end financial automation
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every tool your finance team needs to close faster, report accurately,
            and stay audit-ready year-round.
          </p>
        </AnimateIn>

        <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon }) => (
            <AnimateIn key={title} variants={scaleIn}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-200 h-full">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            </AnimateIn>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
