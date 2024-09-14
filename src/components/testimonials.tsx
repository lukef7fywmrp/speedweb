"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

const testimonials = [
  {
    id: 1,
    content: {
      desktop:
        "Speedweb transformed our online presence. Our conversion rates skyrocketed by 150% within just two months!",
      mobile: "Speedweb boosted our conversions by 150% in 2 months!",
    },
    author: "John Smith",
    role: "CEO, TechInnovate",
    image: "/images/testimonial-1.avif",
    rating: 5,
    companyLogo: "https://logo.clearbit.com/microsoft.com",
    verifiedBadge: true,
  },
  {
    id: 2,
    content: {
      desktop:
        "The team&apos;s expertise in performance optimization cut our load times in half. Our customers love the seamless experience!",
      mobile: "Speedweb halved our load times. Customers love it!",
    },
    author: "Emily Chen",
    role: "CTO, FastGrowth",
    image: "/images/testimonial-2.avif",
    rating: 5,
    companyLogo: "https://logo.clearbit.com/google.com",
    verifiedBadge: true,
  },
  {
    id: 3,
    content: {
      desktop:
        "Speedweb&apos;s tailored solutions helped us stand out in a crowded market. We&apos;ve seen a 200% increase in user engagement.",
      mobile: "Speedweb&apos;s solutions increased our engagement by 200%!",
    },
    author: "Michael Johnson",
    role: "Marketing Director, BrandBoost",
    image: "/images/testimonial-3.avif",
    rating: 5,
    companyLogo: "https://logo.clearbit.com/amazon.com",
    verifiedBadge: true,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [autoplay]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="container flex flex-col items-center gap-8 py-24 sm:gap-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl max-w-3xl mx-auto">
          {isMobile ? "Success Stories" : "Transforming Businesses Worldwide"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {isMobile
            ? "Real results from our clients."
            : "See how Speedweb drives growth for companies like yours. Real results, real success."}
        </p>
      </motion.div>

      <div className="relative w-full max-w-4xl mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl">
              <CardContent className="p-8 sm:p-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center mb-6"
                >
                  <Quote className="text-primary w-12 h-12" />
                  <div className="flex items-center">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl sm:text-2xl font-medium mb-6 text-foreground"
                >
                  &ldquo;
                  {isMobile
                    ? testimonials[currentIndex].content.mobile
                    : testimonials[currentIndex].content.desktop}
                  &rdquo;
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      fill
                      className="rounded-full object-cover"
                    />
                    {testimonials[currentIndex].verifiedBadge && (
                      <div className="absolute -bottom-1 -right-1 bg-primary text-background rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                  </div>
                  {!isMobile && (
                    <div className="ml-auto w-20 h-10 relative">
                      <Image
                        src={testimonials[currentIndex].companyLogo}
                        alt={`${testimonials[currentIndex].author}&apos;s company logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background p-2 rounded-full shadow-lg hover:bg-primary/10 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background p-2 rounded-full shadow-lg hover:bg-primary/10 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              setCurrentIndex(index);
              setAutoplay(false);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-muted-foreground mb-4">
          {isMobile ? "Join 500+ happy customers" : "Join 500+ satisfied customers worldwide"}
        </p>
        <CTAButton href="#">{isMobile ? "Start Now" : "Start Your Conversion Journey"}</CTAButton>
      </motion.div>
    </section>
  );
}
