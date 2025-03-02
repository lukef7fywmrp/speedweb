import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RecentWork } from "@/components/recent-work";
import { ConversionOptimizationFeatures } from "@/components/conversion-optimization-features";
import { TailoredSolutionsSection } from "@/components/tailored-solutions-section";
// import { Technologies } from "@/components/technologies";
import { ComparisonGrid } from "@/components/comparison-grid";
// import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <RecentWork />
      <ConversionOptimizationFeatures />
      <TailoredSolutionsSection />
      {/* <Technologies /> */}
      <ComparisonGrid />
      {/* <Pricing /> */}
      <Testimonials />
      <Faq />
      <CtaSection />
      <Footer />
    </>
  );
}
