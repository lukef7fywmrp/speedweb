import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features-section";
import { Features2 } from "@/components/features-section-2";
import { Features3 } from "@/components/features-section-3";
import { Technologies } from "@/components/technologies";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Features2 />
      <Features3 />
      <Technologies />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaSection />
      <Footer />
    </>
  );
}
