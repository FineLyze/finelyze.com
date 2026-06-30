import { db } from './db';
import type {
  CMSContent,
  HeroContent,
  HeaderContent,
  FooterContent,
  PricingContent,
  SectionVisibility,
} from '@/types/cms';

export const DEFAULT_CMS: CMSContent = {
  hero: {
    headline: 'Four Pillars.',
    headlineAccent: 'One Unified ERP.',
    subtitle:
      'FineLyze connects Corporate Accounting, Taxes, Supply Chain, and FP&A into one intelligent system — every transaction traceable from origin to final report.',
    primaryButtonText: 'Start Free Trial',
    primaryButtonHref: '#cta',
    secondaryButtonText: 'See the Platform',
    secondaryButtonHref: '#pillars',
  },
  header: {
    navLinks: [
      { label: 'Platform', href: '#pillars' },
      { label: 'How It Works', href: '#workflow' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '#cta',
  },
  footer: {
    copyright: 'FineLyze. All rights reserved.',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  pricing: {
    headline: 'Simple, transparent pricing',
    subtitle: 'Start free, scale as your team grows. No hidden fees, no surprise invoices.',
    tiers: [
      {
        name: 'Basic',
        price: '$49',
        period: '/month',
        description: 'For small finance teams getting started with automation.',
        features: ['Up to 3 users', 'Bank reconciliation', 'Standard financial reports', 'CSV & Excel export', 'Email support'],
        cta: 'Get Started',
        href: '#',
        highlight: false,
      },
      {
        name: 'Pro',
        price: '$149',
        period: '/month',
        description: 'For growing teams that need ERP integrations and full close automation.',
        features: ['Up to 15 users', 'Everything in Basic', 'ERP integrations (SAP, QuickBooks, Xero)', 'Automated close workflows', 'Audit trail & variance analysis', 'Priority support'],
        cta: 'Get Started',
        href: '#',
        highlight: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'Audit-grade compliance and white-glove onboarding for large teams.',
        features: ['Unlimited users', 'Everything in Pro', 'SOC 2 Type II compliance', 'Custom ERP connectors', 'Dedicated account manager', 'SLA & 24/7 support'],
        cta: 'Contact Sales',
        href: '#',
        highlight: false,
      },
    ],
  },
  visibility: {
    hero: true,
    features: true,
    pricing: true,
    trial: true,
    youtube: true,
    faq: true,
    cta: true,
  },
};

export async function getCMSContent(): Promise<CMSContent> {
  if (!db) return DEFAULT_CMS;
  try {
    const records = await db.siteContent.findMany();
    const map = Object.fromEntries(records.map((r) => [r.section, r.data]));
    return {
      hero: (map.hero as unknown as HeroContent) ?? DEFAULT_CMS.hero,
      header: (map.header as unknown as HeaderContent) ?? DEFAULT_CMS.header,
      footer: (map.footer as unknown as FooterContent) ?? DEFAULT_CMS.footer,
      pricing: (map.pricing as unknown as PricingContent) ?? DEFAULT_CMS.pricing,
      visibility: (map.visibility as unknown as SectionVisibility) ?? DEFAULT_CMS.visibility,
    };
  } catch {
    return DEFAULT_CMS;
  }
}

export async function upsertSection(section: string, data: unknown) {
  if (!db) throw new Error("Database not configured");
  return db.siteContent.upsert({
    where: { section },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create: { section, data: data as any },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: { data: data as any },
  });
}
