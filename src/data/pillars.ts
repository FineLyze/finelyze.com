export type PillarColor = 'blue' | 'violet' | 'cyan' | 'emerald';
export type PillarIconKey = 'accounting' | 'taxes' | 'scm' | 'fpa';

export interface ModuleGroup {
  heading?: string;
  items: string[];
}

export interface PillarData {
  id: string;
  number: string;
  name: string;
  tagline: string;
  color: PillarColor;
  icon: PillarIconKey;
  moduleGroups: ModuleGroup[];
  integration: string;
  differentiator?: string;
}

export const PILLARS: PillarData[] = [
  {
    id: 'accounting',
    number: '01',
    name: 'Corporate Accounting',
    tagline: 'The financial foundation.',
    color: 'blue',
    icon: 'accounting',
    moduleGroups: [
      {
        items: [
          'General Ledger (GL)',
          'Journal Entries',
          'Daily Accounting',
          'Accounts Payable (AP)',
          'Accounts Receivable (AR)',
          'Banking & Reconciliation',
          'Fixed Assets & Depreciation',
          'Payroll Entries',
          'Inventory Accounting',
          'Cost Pool Mapping',
          'Multi-Period Trial Balance',
          'Period Close & Adjustments',
          'Compliance & Audit Controls',
        ],
      },
    ],
    integration: 'Receives every transaction from SCM and Tax in real time.',
  },
  {
    id: 'taxes',
    number: '02',
    name: 'Taxes',
    tagline: 'Compliant by design.',
    color: 'violet',
    icon: 'taxes',
    differentiator: 'GL-sourced · Read-only · Audit-grade — all tax data flows automatically from Corporate Accounting. Zero duplicate entry, zero reconciliation.',
    moduleGroups: [
      {
        heading: 'US Tax Forms',
        items: ['1099-NEC', '1099-MISC', '1099-K', 'Purchase Tax', 'Sales Tax Reports'],
      },
      {
        heading: 'International',
        items: ['EU VAT', 'UK VAT', 'Canada GST/HST', 'Australia BAS', 'GCC VAT'],
      },
      {
        heading: 'Compliance',
        items: ['Tax Audit Log'],
      },
    ],
    integration: 'Auto-calculated from Accounting transactions — no duplicate entry.',
  },
  {
    id: 'scm',
    number: '03',
    name: 'Supply Chain Management',
    tagline: 'End-to-end operational clarity.',
    color: 'cyan',
    icon: 'scm',
    moduleGroups: [
      {
        items: [
          'Procurement & Vendor Management',
          'RFQ & Sourcing',
          'Returns to Vendor',
          'Purchase Orders & Receipts',
          'Inventory Planning & Replenishment',
          'Warehouse Management',
          'Item Costing & Valuation',
          'Material Requirements Planning (MRP)',
          'Delivery Scheduling & Fulfillment',
          'Supplier Performance Analytics',
          'Logistics & Shipment Tracking',
          'Supply Chain Forecasting',
          'Integration with Contracts & Accounting',
        ],
      },
    ],
    integration: 'Every PO and receipt flows directly into Accounting and FP&A.',
  },
  {
    id: 'fpa',
    number: '04',
    name: 'FP&A',
    tagline: 'Insight at enterprise scale.',
    color: 'emerald',
    icon: 'fpa',
    moduleGroups: [
      {
        items: [
          'FP&A Dashboard',
          'Financial Statements & Reports',
          'Forecasting & Budgeting',
          'Variance Analysis',
          'Profitability Analysis',
          'Cash Flow Management',
          'KPI Dashboards',
          'Statistical Metrics (Non-Financial)',
          'Market Share',
          'Executive Reporting',
        ],
      },
    ],
    integration: 'Pulls live actuals from all three pillars — no data exports needed.',
  },
];
