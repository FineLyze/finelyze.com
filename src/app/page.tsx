import { getCMSContent } from "@/lib/cms";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import TrialDownload from "@/components/sections/TrialDownload";
import YouTubeLearning from "@/components/sections/YouTubeLearning";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const revalidate = 60;

export default async function Home() {
  const cms = await getCMSContent();
  const vis = cms.visibility;

  return (
    <>
      <Header content={cms.header} />
      <main>
        {vis.hero && <Hero content={cms.hero} />}
        {vis.features && <Features />}
        {vis.pricing && <Pricing content={cms.pricing} />}
        {vis.trial && <TrialDownload />}
        {vis.youtube && <YouTubeLearning />}
        {vis.faq && <FAQ />}
        {vis.cta && <CTA />}
      </main>
      <Footer content={cms.footer} />
    </>
  );
}
