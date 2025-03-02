"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    quote:
      "The ROI we've seen since implementing Speedweb's solutions has been remarkable. Our conversion rates have doubled in just two months.",
    name: "Sarah Chen",
    designation: "Marketing Lead at TechFlow",
    company: "TechFlow",
    src: "/images/testimonial-2.avif",
  },
  {
    quote:
      "Working with Speedweb has transformed our online presence. Their attention to detail and focus on conversion optimization is unmatched.",
    name: "Michael Roberts",
    designation: "CEO at GrowthForce",
    company: "GrowthForce",
    src: "/images/testimonial-1.avif",
  },
  {
    quote:
      "The level of customization and attention to detail exceeded our expectations. Our landing page conversion rate increased by 150% within weeks.",
    name: "Emily Thompson",
    designation: "Digital Marketing Director at InnovateTech",
    company: "InnovateTech",
    src: "/images/testimonial-4.avif",
  },
  {
    quote:
      "Speedweb delivered exactly what we needed - a high-converting, professional website that truly represents our brand. The results speak for themselves.",
    name: "James Wilson",
    designation: "Founder at ScaleUp Solutions",
    company: "ScaleUp Solutions",
    src: "/images/testimonial-5.avif",
  },
  {
    quote:
      "The expertise and professionalism of the Speedweb team is outstanding. They not only built our landing pages but helped optimize our entire conversion funnel.",
    name: "Lisa Martinez",
    designation: "Head of Growth at FutureFlow",
    company: "FutureFlow",
    src: "/images/testimonial-6.avif",
  },
];

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: (typeof testimonials)[0];
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 transition-all duration-300 hover:border-zinc-700/50",
        className,
      )}
    >
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 size-24 rounded-full bg-[#FE8B00]/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Quote icon */}
      <div className="absolute right-6 top-6 text-[#FE8B00]/10 transition-colors duration-300 group-hover:text-[#FE8B00]/20">
        <IconQuote size={40} />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative size-12 overflow-hidden border border-zinc-800 transition-colors duration-300 group-hover:border-[#FE8B00]/20">
            <Image src={testimonial.src} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-white transition-colors duration-300 group-hover:text-[#FE8B00]">
              {testimonial.name}
            </p>
            <p className="text-sm text-zinc-500">{testimonial.designation}</p>
          </div>
        </div>
        <blockquote className="grow text-lg leading-relaxed italic text-zinc-300">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="mt-6 border-t border-zinc-800 pt-6 transition-colors duration-300 group-hover:border-zinc-700">
          <p className="text-sm text-zinc-600">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  // Format testimonials for AnimatedTestimonials component
  const animatedTestimonialsData = testimonials.map((testimonial) => ({
    quote: testimonial.quote,
    name: testimonial.name,
    designation: testimonial.designation,
    src: testimonial.src,
  }));

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="container flex flex-col items-start gap-16 py-24"
    >
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-left max-w-[90%] sm:max-w-none"
        >
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#FE8B00] sm:text-base md:text-lg">
              Testimonials
            </p>
            <h2 className="font-heading text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl">
              Straight from Our Customers
            </h2>
          </div>
          <p className="max-w-[42rem] text-sm leading-normal text-zinc-400 sm:text-base sm:leading-relaxed md:text-lg">
            See how Speedweb drives growth for companies like yours. Real results, real success.
          </p>
        </motion.div>
      )}

      {isMobile ? (
        // Mobile view - Animated Testimonials
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <AnimatedTestimonials testimonials={animatedTestimonialsData} autoplay={true} />
        </motion.div>
      ) : (
        // Desktop view - Regular testimonial cards
        <div className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      )}
    </section>
  );
}
