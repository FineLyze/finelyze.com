import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#080d18]/80 backdrop-blur-md border-b border-white/[0.08]">
      <div className="container-max section-padding py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            FineLyze
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#cta"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
