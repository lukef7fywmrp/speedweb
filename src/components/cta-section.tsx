"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { BarChart, Users, Target, TrendingUp } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function CtaSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const isMobile = useMediaQuery("(max-width: 640px)");

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
    <section ref={sectionRef} className="container py-24 relative overflow-hidden">
      <motion.div
        style={{ scale }}
        className="relative bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl min-h-[600px]"
      >
        <motion.div
          style={{ rotate, x: "-50%", y: "-50%" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/20 to-transparent opacity-50 blur-3xl"
        />
        <motion.div
          style={{ rotate: rotateReverse, x: "50%", y: "50%" }}
          className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-secondary/20 to-transparent opacity-50 blur-3xl"
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left md:w-1/2"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary">
              {isMobile ? "Boost Your Conversions" : "Supercharge Your Conversion Rates"}
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-muted-foreground">
              {isMobile
                ? "Our strategies boost online performance. Ready to join?"
                : "Don't leave money on the table. Our battle-tested strategies have helped businesses just like yours skyrocket their online performance. Ready to join them?"}
            </p>
            <CTAButton
              href="#"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isMobile ? "Talk Strategy" : "Let's Talk Strategy"}
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {ctaItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color}`}
                  >
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                  </motion.div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium group-hover:text-primary transition-colors duration-300">
                    {isMobile ? item.mobileText : item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
