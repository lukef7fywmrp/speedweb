"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useCalendly } from "@/lib/hooks/useCalendly";

const faqs = [
  {
    question: "How soon can I expect results?",
    answer: {
      desktop:
        "Fast. We typically see meaningful improvements within 1-2 weeks. Every project is unique, but we're committed to delivering quick wins while building long-term success.",
      mobile:
        "Fast. We typically see improvements within 1-2 weeks, balancing quick wins and long-term success.",
    },
  },
  {
    question: "What sets your service apart?",
    answer: {
      desktop:
        "We design and build high-performance websites, integrating them with Sanity to give you full control—so you can easily update content without relying on a tech team.",
      mobile:
        "We build websites with Sanity integration, giving you full control to update content without needing a tech team.",
    },
  },
  {
    question: "Can I fully control and edit my website without a developer?",
    answer: {
      desktop:
        "Yes! We not only build your website, but we also integrate it with Sanity, a powerful and user-friendly content management system (CMS). This integration gives you full control to update your website—change text, images, layouts, and more—without needing any technical skills or a developer. You get complete flexibility without touching a single line of code.",
      mobile:
        "Yes! We integrate your site with Sanity CMS, giving you full control to update text, images, and layouts without any technical skills or developer assistance.",
    },
  },
  {
    question: "What if I'm not happy with the results?",
    answer: {
      desktop:
        "We offer revision rounds based on your plan: 1 for Starter, 3 for Growth, and unlimited for Enterprise. We're committed to your satisfaction and will refine the code until you're happy.",
      mobile: "We offer revisions based on your plan and will refine until you're satisfied.",
    },
  },
  {
    question: "How do you maximize results?",
    answer: {
      desktop:
        "We use a mix of market research, competitor analysis, user behavior studies, and A/B testing. Our approach is data-driven and constantly refined. We implement these insights directly into the code for optimal performance.",
      mobile:
        "Data-driven approach: research, analysis, and A/B testing, implemented for optimal performance.",
    },
  },
  {
    question: "Do I get full ownership and flexibility to edit my website as needed?",
    answer: {
      desktop:
        "Yes! You get full ownership of your website, along with the flexibility to edit and update it anytime through our Sanity integration—no developer needed.",
      mobile:
        "Yes! You get full ownership and can edit your website anytime through Sanity—no developer needed.",
    },
  },
];

export function Faq() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="container flex flex-col items-center gap-12 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary">
          {isMobile ? "FAQs" : "Frequently Asked Questions"}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {isMobile
            ? "Quick answers about our conversion optimization services."
            : "Get quick answers to your most pressing questions about our comprehensive conversion optimization services and code delivery."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-3xl"
      >
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={(value) => setOpenItem(value)}
          className="w-full space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-primary/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium hover:no-underline bg-gradient-to-r from-background to-background/80 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                {isMobile ? faq.answer.mobile : faq.answer.desktop}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-lg text-muted-foreground mb-6">
          {isMobile
            ? "More questions? We're here to help!"
            : "Still have questions about our code or services? We're here to help!"}
        </p>
        <CTAButton href="#" onClick={() => openCalModal("speedweb/30min")}>
          Contact Our Dev Team
        </CTAButton>
      </motion.div>
    </section>
  );
}
