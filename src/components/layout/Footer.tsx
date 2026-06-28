export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#080d18]">
      <div className="container-max section-padding py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} FineLyze. All rights reserved.
        </p>
        <nav className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-200 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-200 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-200 transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
