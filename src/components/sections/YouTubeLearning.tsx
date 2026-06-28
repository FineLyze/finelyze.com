import AnimateIn from "@/components/ui/AnimateIn";
import StaggerGroup from "@/components/ui/StaggerGroup";

export default function YouTubeLearning() {
  return (
    <section id="learn" className="bg-[#080d18]">
      <div className="container-max section-padding">
        <StaggerGroup className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateIn>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 uppercase tracking-wide">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
                </svg>
                Video Tutorials
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
                Get up to speed in minutes
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed">
                Our tutorial series walks you through every feature — from your first
                reconciliation run to advanced audit workflows. No finance degree required.
              </p>

              <a
                href="#" // TODO: replace with FineLyze YouTube channel URL
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-red-500" viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
                </svg>
                Visit FineLyze on YouTube
              </a>
            </div>
          </AnimateIn>

          <AnimateIn>
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] aspect-video bg-[#0a1020]">
              {/* TODO: replace YOUR_VIDEO_ID with the actual YouTube video ID */}
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="FineLyze Tutorial"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </AnimateIn>
        </StaggerGroup>
      </div>
    </section>
  );
}
