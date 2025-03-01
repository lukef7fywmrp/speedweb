"use client";

import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

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

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

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
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto w-full">
      {/* Testimonial Header */}
      <div className="mb-8 px-4">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#FE8B00]">
          Testimonials
        </p>
        <h2 className="mb-4 font-heading text-3xl font-semibold text-white">
          Straight from Our Customers
        </h2>
      </div>

      {/* Image Section - Centered with border */}
      <div className="relative mx-auto mb-8 aspect-[4/5] w-full max-w-[280px]">
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
                  <div className="relative h-full w-full border-2 border-[#FE8B00]/20">
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
      <div className="w-full px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-6"
          >
            <p className="mb-6 text-lg italic leading-relaxed text-white/90">
              &quot;{testimonials[active].quote}&quot;
            </p>

            <div className="mt-4 flex flex-col">
              <h3 className="text-xl font-semibold text-[#FE8B00]">{testimonials[active].name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{testimonials[active].designation}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator and Navigation */}
        <div className="mb-4 flex items-center gap-1">
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
            className="flex size-10 items-center justify-center rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700"
            aria-label="Previous testimonial"
          >
            <IconArrowLeft className="size-5 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="flex size-10 items-center justify-center rounded-full bg-[#FE8B00] transition-colors hover:bg-[#FE8B00]/90"
            aria-label="Next testimonial"
          >
            <IconArrowRight className="size-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
