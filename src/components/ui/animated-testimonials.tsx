"use client";

import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

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
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const isSmallerDevice = useMediaQuery("(max-width: 429px)");

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
      <div
        className={`mx-auto ${isDesktop ? "max-w-[350px]" : isSmallerDevice ? "max-w-[300px]" : "max-w-[350px]"}`}
      >
        {/* Testimonial Header */}
        <div className="mb-6 text-left">
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[#FE8B00]">
            TESTIMONIALS
          </p>
          <h2
            className={`mb-4 font-heading ${isDesktop ? "text-3xl" : isSmallerDevice ? "text-2xl" : "text-3xl"} font-semibold leading-tight text-white`}
          >
            Straight from Our Customers
          </h2>
        </div>

        {/* Image Section - Centered with border */}
        <div className="relative mb-8 aspect-[4/5] w-full">
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
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-6"
            >
              <p
                className={`mb-6 ${isDesktop ? "text-lg" : isSmallerDevice ? "text-base" : "text-lg"} italic leading-relaxed text-white/90`}
              >
                &quot;{testimonials[active].quote}&quot;
              </p>

              <div className="mt-4 flex flex-col">
                <h3
                  className={`${isDesktop ? "text-xl" : isSmallerDevice ? "text-lg" : "text-xl"} font-semibold text-[#FE8B00]`}
                >
                  {testimonials[active].name}
                </h3>
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
                className={`${
                  isDesktop ? "h-1.5" : isSmallerDevice ? "h-1.5" : "h-2"
                } rounded-full transition-all duration-300 ${
                  index === active
                    ? `${isDesktop ? "w-6" : isSmallerDevice ? "w-5" : "w-8"} bg-[#FE8B00]`
                    : `${
                        isDesktop ? "w-1.5" : isSmallerDevice ? "w-1.5" : "w-2"
                      } bg-zinc-700 hover:bg-zinc-600`
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className={`flex items-center justify-center rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700 ${
                isDesktop ? "size-10" : isSmallerDevice ? "size-9" : "size-12"
              }`}
              aria-label="Previous testimonial"
            >
              <IconArrowLeft
                className={`${
                  isDesktop ? "size-5" : isSmallerDevice ? "size-4" : "size-6"
                } text-white`}
              />
            </button>
            <button
              onClick={handleNext}
              className={`flex items-center justify-center rounded-full bg-[#FE8B00] transition-colors hover:bg-[#FE8B00]/90 ${
                isDesktop ? "size-10" : isSmallerDevice ? "size-9" : "size-12"
              }`}
              aria-label="Next testimonial"
            >
              <IconArrowRight
                className={`${
                  isDesktop ? "size-5" : isSmallerDevice ? "size-4" : "size-6"
                } text-white`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
