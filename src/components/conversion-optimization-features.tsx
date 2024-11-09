"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const features = [
  {
    iconSrc: "/lottie/data-driven-optimization.json",
    title: "Data-Driven Optimization",
    description: "Leverage analytics to improve conversion rates.",
    mobileDescription: "Use data to boost conversions.",
  },
  {
    iconSrc: "/lottie/psychology-driven-design.json",
    title: "Psychology-Driven Design",
    description: "Implement persuasive design principles to boost engagement.",
    mobileDescription: "Persuasive design for engagement.",
  },
  {
    iconSrc: "/lottie/conversion-focused-copy.json",
    title: "Conversion-Focused Copy",
    description: "Craft compelling narratives that drive action and sales.",
    mobileDescription: "Compelling copy for more sales.",
  },
  {
    iconSrc: "/lottie/rapid-implementation.json",
    title: "Rapid Implementation",
    description: "Quick turnaround times to get your optimized pages live fast.",
    mobileDescription: "Fast optimization deployment.",
  },
];

export function ConversionOptimizationFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const playerRefs = useRef<(Player | null)[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  useEffect(() => {
    playerRefs.current = playerRefs.current.slice(0, features.length);
  }, []);

  useEffect(() => {
    playerRefs.current.forEach((player, index) => {
      if (hoveredIndex === index) {
        player?.play();
      } else {
        player?.stop();
      }
    });
  }, [hoveredIndex]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="container flex flex-col items-center gap-8 py-24 sm:gap-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl lg:text-4xl max-w-3xl mx-auto">
          {isMobile ? "High-Converting Pages" : "Unlock the Power of High-Converting Pages"}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          {isMobile
            ? "Boost sales with proven optimization strategies."
            : "Transform your website into a sales-generating machine with our proven conversion optimization strategies."}
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="h-full shadow-lg border-0 overflow-hidden group relative">
              <CardContent className="flex flex-col gap-6 p-8 text-center items-center h-full">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Player
                    ref={(el) => {
                      playerRefs.current[index] = el;
                    }}
                    src={feature.iconSrc}
                    className="w-12 h-12"
                    loop={false}
                    autoplay={false}
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)",
                    }}
                  />
                </div>
                <div>
                  <h4 className="mb-3 text-lg sm:text-xl font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {isMobile ? feature.mobileDescription : feature.description}
                  </p>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <CTAButton href="#" onClick={() => openCalModal("speedweb/30min")}>
          {isMobile ? "Boost Conversions" : "Boost Your Conversions Now"}
        </CTAButton>
      </motion.div>
    </section>
  );
}
