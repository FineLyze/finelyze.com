"use client";

import { useState } from "react";
import type {
  CMSContent,
  NavLink,
  HeroContent,
  HeaderContent,
  FooterContent,
  PricingContent,
  PricingTier,
  SectionVisibility,
} from "@/types/cms";
import {
  saveHeroContent,
  saveHeaderContent,
  saveFooterContent,
  savePricingContent,
  saveVisibility,
} from "../actions";

// ─── Shared UI ────────────────────────────────────────────────────────────────

const IN =
  "w-full rounded-lg bg-[#0d1629] border border-white/[0.1] text-white px-3 py-2 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
const TA = `${IN} resize-none`;
const BTN =
  "px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors";
const GHOST =
  "px-3 py-1.5 text-xs text-slate-400 border border-white/[0.1] rounded-lg hover:border-white/20 hover:text-white transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-600 mt-1">{hint}</p>}
    </div>
  );
}

function SaveStatus({ status }: { status: { ok: boolean; msg: string } | null }) {
  if (!status) return null;
  return (
    <span
      className={`text-xs px-3 py-1.5 rounded-lg ${
        status.ok ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
      }`}
    >
      {status.msg}
    </span>
  );
}

function useSave() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const run = async (fn: () => Promise<{ success: boolean; error?: string }>) => {
    setSaving(true);
    setStatus(null);
    try {
      const r = await fn();
      setStatus({ ok: r.success, msg: r.success ? "Saved!" : r.error ?? "Save failed." });
    } catch {
      setStatus({ ok: false, msg: "Unexpected error." });
    } finally {
      setSaving(false);
    }
  };

  return { saving, status, run };
}

// ─── Hero Form ────────────────────────────────────────────────────────────────

function HeroForm({ content }: { content: HeroContent }) {
  const [d, setD] = useState(content);
  const { saving, status, run } = useSave();
  const set =
    (k: keyof HeroContent) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setD((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="space-y-5">
      <Field label="Headline (white text)" hint='e.g. "Automated Financial Close."'>
        <input className={IN} value={d.headline} onChange={set("headline")} />
      </Field>
      <Field label="Headline Accent (blue text)" hint='e.g. "Audit-Grade Accuracy."'>
        <input className={IN} value={d.headlineAccent} onChange={set("headlineAccent")} />
      </Field>
      <Field label="Subtitle">
        <textarea className={TA} rows={3} value={d.subtitle} onChange={set("subtitle")} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary Button Text">
          <input className={IN} value={d.primaryButtonText} onChange={set("primaryButtonText")} />
        </Field>
        <Field label="Primary Button URL">
          <input className={IN} value={d.primaryButtonHref} onChange={set("primaryButtonHref")} />
        </Field>
        <Field label="Secondary Button Text">
          <input className={IN} value={d.secondaryButtonText} onChange={set("secondaryButtonText")} />
        </Field>
        <Field label="Secondary Button URL">
          <input className={IN} value={d.secondaryButtonHref} onChange={set("secondaryButtonHref")} />
        </Field>
      </div>
      <div className="flex items-center gap-3">
        <button className={BTN} disabled={saving} onClick={() => run(() => saveHeroContent(d))}>
          {saving ? "Saving…" : "Save Hero"}
        </button>
        <SaveStatus status={status} />
      </div>
    </div>
  );
}

// ─── Header Form ──────────────────────────────────────────────────────────────

function HeaderForm({ content }: { content: HeaderContent }) {
  const [ctaText, setCtaText] = useState(content.ctaText);
  const [ctaHref, setCtaHref] = useState(content.ctaHref);
  const [links, setLinks] = useState<NavLink[]>(content.navLinks);
  const { saving, status, run } = useSave();

  const update = (i: number, k: keyof NavLink, v: string) =>
    setLinks((p) => p.map((l, j) => (j === i ? { ...l, [k]: v } : l)));

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Nav Links</span>
          <button className={GHOST} onClick={() => setLinks((p) => [...p, { label: "", href: "" }])}>
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {links.map((l, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className={IN} placeholder="Label" value={l.label} onChange={(e) => update(i, "label", e.target.value)} />
              <input className={IN} placeholder="URL" value={l.href} onChange={(e) => update(i, "href", e.target.value)} />
              <button
                className="text-slate-500 hover:text-red-400 px-1.5 py-1 text-xs transition-colors"
                onClick={() => setLinks((p) => p.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="CTA Button Text">
          <input className={IN} value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
        </Field>
        <Field label="CTA Button URL">
          <input className={IN} value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} />
        </Field>
      </div>
      <div className="flex items-center gap-3">
        <button
          className={BTN}
          disabled={saving}
          onClick={() => run(() => saveHeaderContent({ navLinks: links, ctaText, ctaHref }))}
        >
          {saving ? "Saving…" : "Save Header"}
        </button>
        <SaveStatus status={status} />
      </div>
    </div>
  );
}

// ─── Footer Form ──────────────────────────────────────────────────────────────

function FooterForm({ content }: { content: FooterContent }) {
  const [copyright, setCopyright] = useState(content.copyright);
  const [links, setLinks] = useState<NavLink[]>(content.links);
  const { saving, status, run } = useSave();

  const update = (i: number, k: keyof NavLink, v: string) =>
    setLinks((p) => p.map((l, j) => (j === i ? { ...l, [k]: v } : l)));

  return (
    <div className="space-y-5">
      <Field
        label="Copyright Text"
        hint={`Displayed as: © ${new Date().getFullYear()} ${copyright}`}
      >
        <input className={IN} value={copyright} onChange={(e) => setCopyright(e.target.value)} />
      </Field>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Footer Links</span>
          <button className={GHOST} onClick={() => setLinks((p) => [...p, { label: "", href: "" }])}>
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {links.map((l, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className={IN} placeholder="Label" value={l.label} onChange={(e) => update(i, "label", e.target.value)} />
              <input className={IN} placeholder="URL" value={l.href} onChange={(e) => update(i, "href", e.target.value)} />
              <button
                className="text-slate-500 hover:text-red-400 px-1.5 py-1 text-xs transition-colors"
                onClick={() => setLinks((p) => p.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className={BTN} disabled={saving} onClick={() => run(() => saveFooterContent({ copyright, links }))}>
          {saving ? "Saving…" : "Save Footer"}
        </button>
        <SaveStatus status={status} />
      </div>
    </div>
  );
}

// ─── Pricing Form ─────────────────────────────────────────────────────────────

function PricingForm({ content }: { content: PricingContent }) {
  const [headline, setHeadline] = useState(content.headline);
  const [subtitle, setSubtitle] = useState(content.subtitle);
  const [tiers, setTiers] = useState<PricingTier[]>(content.tiers);
  const { saving, status, run } = useSave();

  const updateTier = (i: number, k: keyof PricingTier, v: string | boolean | string[]) =>
    setTiers((p) => p.map((t, j) => (j === i ? { ...t, [k]: v } : t)));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Section Headline">
          <input className={IN} value={headline} onChange={(e) => setHeadline(e.target.value)} />
        </Field>
        <Field label="Section Subtitle">
          <input className={IN} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </Field>
      </div>

      {tiers.map((tier, i) => (
        <div key={i} className="rounded-xl border border-white/[0.08] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{tier.name || `Tier ${i + 1}`}</span>
            {tier.highlight && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 font-semibold uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Name">
              <input className={IN} value={tier.name} onChange={(e) => updateTier(i, "name", e.target.value)} />
            </Field>
            <Field label="Price">
              <input className={IN} value={tier.price} onChange={(e) => updateTier(i, "price", e.target.value)} />
            </Field>
            <Field label="Period">
              <input className={IN} placeholder="/month" value={tier.period} onChange={(e) => updateTier(i, "period", e.target.value)} />
            </Field>
          </div>
          <Field label="Description">
            <input className={IN} value={tier.description} onChange={(e) => updateTier(i, "description", e.target.value)} />
          </Field>
          <Field label="Features (one per line)">
            <textarea
              className={TA}
              rows={5}
              value={tier.features.join("\n")}
              onChange={(e) => updateTier(i, "features", e.target.value.split("\n"))}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA Text">
              <input className={IN} value={tier.cta} onChange={(e) => updateTier(i, "cta", e.target.value)} />
            </Field>
            <Field label="CTA URL">
              <input className={IN} value={tier.href} onChange={(e) => updateTier(i, "href", e.target.value)} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={tier.highlight}
              onChange={(e) => updateTier(i, "highlight", e.target.checked)}
              className="w-4 h-4 rounded accent-blue-600"
            />
            Mark as featured / highlighted tier
          </label>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button
          className={BTN}
          disabled={saving}
          onClick={() =>
            run(() =>
              savePricingContent({
                headline,
                subtitle,
                tiers: tiers.map((t) => ({ ...t, features: t.features.filter(Boolean) })),
              })
            )
          }
        >
          {saving ? "Saving…" : "Save Pricing"}
        </button>
        <SaveStatus status={status} />
      </div>
    </div>
  );
}

// ─── Visibility Form ──────────────────────────────────────────────────────────

const SECTIONS: { key: keyof SectionVisibility; label: string; desc: string }[] = [
  { key: "hero", label: "Hero", desc: "Main headline and CTA buttons" },
  { key: "features", label: "Features", desc: "6-card features grid" },
  { key: "pricing", label: "Pricing", desc: "Pricing tier comparison" },
  { key: "trial", label: "Trial Download", desc: "14-day free trial CTA" },
  { key: "youtube", label: "YouTube Tutorials", desc: "Video embed and channel link" },
  { key: "faq", label: "FAQ", desc: "Accordion FAQ section" },
  { key: "cta", label: "Bottom CTA", desc: '"Ready to get started?" section' },
];

function VisibilityForm({ content }: { content: SectionVisibility }) {
  const [vis, setVis] = useState(content);
  const { saving, status, run } = useSave();

  return (
    <div className="space-y-2">
      {SECTIONS.map(({ key, label, desc }) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-xl border border-white/[0.08] px-4 py-3 hover:border-white/[0.12] transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
          <button
            role="switch"
            aria-checked={vis[key]}
            onClick={() => setVis((p) => ({ ...p, [key]: !p[key] }))}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
              vis[key] ? "bg-blue-600" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                vis[key] ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-3 pt-3">
        <button className={BTN} disabled={saving} onClick={() => run(() => saveVisibility(vis))}>
          {saving ? "Saving…" : "Save Visibility"}
        </button>
        <SaveStatus status={status} />
      </div>
    </div>
  );
}

// ─── Main CmsEditor ───────────────────────────────────────────────────────────

type Tab = "hero" | "header" | "footer" | "pricing" | "visibility";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "header", label: "Header" },
  { id: "footer", label: "Footer" },
  { id: "pricing", label: "Pricing" },
  { id: "visibility", label: "Show / Hide" },
];

export default function CmsEditor({ initialContent }: { initialContent: CMSContent }) {
  const [tab, setTab] = useState<Tab>("hero");

  return (
    <div>
      <div className="flex gap-1 border-b border-white/[0.08] mb-8 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
              tab === t.id
                ? "text-white border-blue-500"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "hero" && <HeroForm content={initialContent.hero} />}
      {tab === "header" && <HeaderForm content={initialContent.header} />}
      {tab === "footer" && <FooterForm content={initialContent.footer} />}
      {tab === "pricing" && <PricingForm content={initialContent.pricing} />}
      {tab === "visibility" && <VisibilityForm content={initialContent.visibility} />}
    </div>
  );
}
