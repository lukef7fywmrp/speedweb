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

const testimonials = [
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "David Anderson",
    designation: "Operations Director at CloudScale",
    company: "CloudScale",
    src: "/images/testimonial-3.avif",
  },
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
      className={cn("group relative rounded-2xl bg-[#18181B] p-8", className)}
    >
      <div className="absolute top-8 right-8 text-[80px] font-serif text-white/[0.07] select-none">
        "
      </div>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={testimonial.src} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-white">{testimonial.name}</p>
            <p className="text-sm text-zinc-500">{testimonial.designation}</p>
          </div>
        </div>
        <blockquote className="text-lg text-zinc-300 flex-grow leading-relaxed">
          {testimonial.quote}
        </blockquote>
        <div className="mt-6 pt-6 border-t border-zinc-800">
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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="container flex flex-col items-center gap-16 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center max-w-[90%] sm:max-w-none"
      >
        <h2 className="font-heading text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] sm:leading-[1.1]">
          Transforming Businesses <span className="block sm:inline">Worldwide</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-[42rem] mx-auto leading-normal sm:leading-relaxed">
          See how Speedweb drives growth for companies like yours. Real results, real success.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
