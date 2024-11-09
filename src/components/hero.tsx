"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Eye, Users, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { Spotlight } from "@/components/ui/spotlight";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  return (
    <section
      id="about"
      className="container flex flex-col items-center justify-center gap-8 pt-12 sm:pt-16 sm:gap-10 relative min-h-[calc(100vh-80px)] overflow-hidden"
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl text-center font-heading text-4xl sm:text-5xl sm:leading-tight lg:text-7xl font-bold relative z-10"
      >
        {isMobile ? "Boost Sales Now" : "Craft High-Converting Pages: Boost Sales Now"}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
      >
        {isMobile
          ? "Double your revenue with psychology-driven design. Unlock the power of conversion-focused pages."
          : "Unlock the secret to skyrocketing sales with our conversion-focused pages. Imagine doubling your revenue without working harder – that's the power of psychology-driven design at your fingertips."}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto"
      >
        <CTAButton
          href="#"
          onClick={() => openCalModal("speedweb/15min")}
          icon={
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          }
        >
          {isMobile ? "Book Free Call" : "Book Your Free Growth Call"}
        </CTAButton>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative h-14 w-full sm:w-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-md opacity-50" />
          <Button
            size="lg"
            asChild
            variant="outline"
            className="w-full h-full text-base font-semibold hover:bg-secondary/10 transition duration-300 text-foreground hover:text-foreground group border-2 border-transparent bg-background relative z-10 m-[1px]"
          >
            <Link href="#testimonials" className="flex items-center justify-center">
              {isMobile ? "Success Stories" : "See Success Stories"}
              <Eye className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col items-center justify-center mt-8 space-y-4 px-4 sm:px-0"
      >
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">
              {isMobile ? "Fast Results" : "Results in 30 Days"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">
              {isMobile ? "1:1 Support" : "Dedicated 1:1 Support"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Code className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">
              {isMobile ? "Custom Code" : "Custom-Built Solutions"}
            </span>
          </div>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center text-muted-foreground text-sm"
      >
        {isMobile
          ? "Boost conversions now. No commitment."
          : "Start boosting your conversions today. No commitment required."}
      </motion.p>
    </section>
  );
}
