"use client";

import Link from "next/link";
import { ArrowRight, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px)");

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
          icon={
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          }
        >
          {isMobile ? "Free Audit" : "Get Your Free Conversion Audit"}
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
            <Link href="#" className="flex items-center justify-center">
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
        className="flex flex-col items-center justify-center mt-8 space-y-4 px-4 sm:px-0 sm:flex-row sm:space-y-0 sm:space-x-6"
      >
        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <div className="flex items-center">
            <Image
              src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg"
              alt="Trustpilot"
              width={100}
              height={24}
              className="brightness-150 w-24 sm:w-[120px]"
            />
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center sm:text-left">
          {isMobile ? (
            <>
              <span className="text-primary font-semibold">500+</span> happy customers
              <br />
              Avg. rating: <span className="text-primary font-semibold">4.9/5</span>
            </>
          ) : (
            <>
              Trusted by <span className="text-primary font-semibold">500+</span> happy customers
              with an average rating of <span className="text-primary font-semibold">4.9/5</span>
            </>
          )}
        </span>
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
