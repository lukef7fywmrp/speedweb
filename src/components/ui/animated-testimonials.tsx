"use client";

import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="w-full mx-auto">
      {/* Testimonial Header */}
      <div className="mb-8 px-4">
        <p className="text-[#FE8B00] text-sm font-medium uppercase tracking-wider mb-2">
          Testimonials
        </p>
        <h2 className="font-heading text-3xl font-semibold text-white mb-4">
          Straight from Our Customers
        </h2>
      </div>

      {/* Image Section - Centered with border */}
      <div className="relative w-full max-w-[280px] mx-auto mb-8 aspect-[4/5]">
        <AnimatePresence mode="wait">
          {testimonials.map(
            (testimonial, index) =>
              isActive(index) && (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full border-2 border-[#FE8B00]/20">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      draggable={false}
                      className="object-cover object-center"
                    />
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Quote Section */}
      <div className="px-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-6"
          >
            <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
              "{testimonials[active].quote}"
            </p>

            <div className="flex flex-col mt-4">
              <h3 className="text-[#FE8B00] text-xl font-semibold">{testimonials[active].name}</h3>
              <p className="text-zinc-400 text-sm mt-1">{testimonials[active].designation}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator and Navigation */}
        <div className="flex items-center gap-1 mb-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-[#FE8B00]" : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <IconArrowLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 rounded-full bg-[#FE8B00] hover:bg-[#FE8B00]/90 flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <IconArrowRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
