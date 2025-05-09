"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart, Users, Target, TrendingUp } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useCalendly } from "@/lib/hooks/useCalendly";

export function CtaSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const isSmallerDevice = useMediaQuery("(max-width: 429px)");
  const { openCalModal } = useCalendly();

  const ctaItems = [
    {
      icon: BarChart,
      text: "Crank Up Sales",
      mobileText: "Boost Sales",
      color: "from-[#FF6B6B] to-[#FF4757]",
    },
    {
      icon: Users,
      text: "Hook Your Users",
      mobileText: "Engage Users",
      color: "from-[#4CAF50] to-[#45B649]",
    },
    {
      icon: Target,
      text: "Nail Your Funnels",
      mobileText: "Optimize Funnels",
      color: "from-[#FFA41B] to-[#FF9800]",
    },
    {
      icon: TrendingUp,
      text: "Pump Up Revenue",
      mobileText: "Grow Revenue",
      color: "from-[#2196F3] to-[#1E88E5]",
    },
  ];

  return (
    <section ref={sectionRef} className="container py-24 relative">
      <div className="relative bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/10 to-transparent opacity-30" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-secondary/10 to-transparent opacity-30" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-left md:w-1/2"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary">
              {isDesktop ? "Supercharge Your Conversion Rates" : "Boost Your Conversions"}
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-muted-foreground">
              {isDesktop
                ? "Don't leave money on the table. Our battle-tested strategies have helped businesses just like yours skyrocket their online performance. Ready to join them?"
                : "Our strategies boost online performance. Ready to join?"}
            </p>
            <CTAButton
              href="#"
              className={`text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                !isDesktop ? "w-full" : ""
              }`}
              onClick={() => openCalModal("speedweb/30min")}
            >
              {isDesktop ? "Let's Talk Strategy" : "Talk Strategy"}
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {ctaItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-background/80 to-background/40 rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`${
                      !isDesktop
                        ? isSmallerDevice
                          ? "size-14"
                          : "size-16"
                        : "size-10 sm:size-12 md:size-16"
                    } mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color}`}
                  >
                    <item.icon
                      className={`${
                        !isDesktop
                          ? isSmallerDevice
                            ? "size-7"
                            : "size-8"
                          : "size-5 sm:size-6 md:size-8"
                      } text-white`}
                    />
                  </div>
                  <p
                    className={`${
                      !isDesktop
                        ? isSmallerDevice
                          ? "text-sm"
                          : "text-base"
                        : "text-xs sm:text-sm md:text-base lg:text-lg"
                    } font-medium group-hover:text-primary transition-colors duration-300`}
                  >
                    {!isDesktop ? item.mobileText : item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 size-full bg-gradient-radial from-[#FE8A0A]/20 via-transparent to-transparent opacity-50"></div>
      </div>
    </section>
  );
}

// ngrok config add-authtoken <token>
