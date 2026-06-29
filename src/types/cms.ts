export interface HeroContent {
  headline: string;
  headlineAccent: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderContent {
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterContent {
  copyright: string;
  links: NavLink[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
}

export interface PricingContent {
  headline: string;
  subtitle: string;
  tiers: PricingTier[];
}

export interface SectionVisibility {
  hero: boolean;
  features: boolean;
  pricing: boolean;
  trial: boolean;
  youtube: boolean;
  faq: boolean;
  cta: boolean;
}

export interface CMSContent {
  hero: HeroContent;
  header: HeaderContent;
  footer: FooterContent;
  pricing: PricingContent;
  visibility: SectionVisibility;
}
