import type { FooterContent } from "@/types/cms";

const DEFAULT_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer({ content }: { content?: FooterContent }) {
  const copyright = content?.copyright ?? "FineLyze. All rights reserved.";
  const links = content?.links ?? DEFAULT_LINKS;

  return (
    <footer className="border-t border-white/[0.08] bg-[#080d18]">
      <div className="container-max section-padding py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {copyright}
        </p>
        <nav className="flex gap-6 text-sm text-slate-500">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-slate-200 transition-colors">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
