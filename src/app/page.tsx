import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import TrialDownload from "@/components/sections/TrialDownload";
import YouTubeLearning from "@/components/sections/YouTubeLearning";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <TrialDownload />
        <YouTubeLearning />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
