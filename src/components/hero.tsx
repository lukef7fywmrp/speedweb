"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Eye, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { Spotlight } from "@/components/ui/spotlight";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

function TypewriterText() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<
    "typing1" | "backspacing1" | "typing2" | "backspacing2" | "typing3" | "backspacing3" | "done"
  >("typing1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const staticText = "Craft High-Converting Pages:";
  const firstPhrase = "Boost Sales Now";
  const secondPhrase = "Turn Clicks into Cash";
  const thirdPhrase = isMobile ? "Sell More Today ⚡" : "Supercharge Your Sales ⚡";

  // Get typing speed based on character
  const getTypingSpeed = (char: string) => {
    if ([",", ":", "."].includes(char)) {
      return 500; // Longer pause at punctuation
    }
    if ([" "].includes(char)) {
      return 150; // Slight pause at spaces
    }
    return 80; // Normal typing speed
  };

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setPhase("typing1");
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let timeout: NodeJS.Timeout;

    switch (phase) {
      case "typing1":
        if (currentIndex < firstPhrase.length) {
          const currentChar = firstPhrase[currentIndex];
          const typingSpeed = getTypingSpeed(currentChar);

          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentChar);
            setCurrentIndex((prev) => prev + 1);

            if ([",", ":", "."].includes(currentChar)) {
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 400);
            }
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setPhase("backspacing1");
            setCurrentIndex(firstPhrase.length);
          }, 1500); // Pause before starting to backspace
        }
        break;

      case "backspacing1":
        if (currentIndex > 0) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1));
            setCurrentIndex((prev) => prev - 1);
          }, 50); // Backspace speed
        } else {
          timeout = setTimeout(() => {
            setPhase("typing2");
            setCurrentIndex(0);
          }, 500); // Pause before typing second phrase
        }
        break;

      case "typing2":
        if (currentIndex < secondPhrase.length) {
          const currentChar = secondPhrase[currentIndex];
          const typingSpeed = getTypingSpeed(currentChar);

          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentChar);
            setCurrentIndex((prev) => prev + 1);

            if ([",", ":", "."].includes(currentChar)) {
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 400);
            }
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setPhase("backspacing2");
            setCurrentIndex(displayText.length);
          }, 1500); // Pause before next backspace
        }
        break;

      case "backspacing2":
        if (currentIndex > 0) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1));
            setCurrentIndex((prev) => prev - 1);
          }, 50); // Backspace speed
        } else {
          timeout = setTimeout(() => {
            setPhase("typing3");
            setCurrentIndex(0);
          }, 500); // Pause before typing third phrase
        }
        break;

      case "typing3":
        if (currentIndex < thirdPhrase.length) {
          const currentChar = thirdPhrase[currentIndex];
          const typingSpeed = getTypingSpeed(currentChar);

          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentChar);
            setCurrentIndex((prev) => prev + 1);

            if ([",", ":", "."].includes(currentChar)) {
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 400);
            }
          }, typingSpeed);
        } else {
          setPhase("done"); // Stop after showing the third phrase
        }
        break;

      case "done":
        // Keep the last phrase displayed
        break;
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, phase, isPaused, firstPhrase, secondPhrase, thirdPhrase, displayText.length]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mobile:mb-0 sm:mb-[-0.5rem]">
        <span className="bg-gradient-to-r from-white via-white to-white/90 text-transparent bg-clip-text inline-block mobile:leading-[1.3] sm:leading-tight mobile:text-[1.75rem]">
          {staticText}
        </span>
      </div>
      <div className="relative flex justify-center w-full mobile:pb-1 sm:pb-1">
        <div className="relative inline-block">
          <span className="bg-gradient-to-r from-white via-white to-white/90 text-transparent bg-clip-text mobile:text-[1.75rem] mobile:leading-[1.8] sm:leading-normal inline-block">
            {displayText}
          </span>
          <span
            className={`${
              showCursor ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100 text-[#FE8A0A] ml-[2px] mobile:text-[1.75rem] inline-block`}
          >
            |
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  // Alternative mobile button texts
  const mobileButtonText = "Free Strategy Call";
  // Other options could be:
  // "Get Started Free"
  // "Book a Free Call"
  // "Talk to an Expert"
  // "Schedule a Call"

  return (
    <section
      id="about"
      className="container flex flex-col items-center justify-center mobile:gap-1 sm:gap-2 pt-12 sm:pt-16 relative min-h-[calc(100vh-80px)] overflow-hidden"
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl text-center font-heading text-4xl sm:text-5xl sm:leading-tight lg:text-7xl font-bold relative z-10 [text-wrap:balance] mb-0 mobile:mb-0"
      >
        <TypewriterText />
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl text-center text-base sm:text-xl text-muted-foreground mobile:mt-0 mb-4"
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
            <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-" />
          }
          className="mobile:text-[1.1rem]"
        >
          {isMobile ? mobileButtonText : "Book Your Free Growth Call"}
        </CTAButton>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative h-14 w-full sm:w-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-md opacity-50 mobile:opacity-80" />
          <Button
            size="lg"
            asChild
            variant="outline"
            className="w-full h-full text-base font-semibold hover:bg-secondary/10 transition duration-300 text-foreground hover:text-foreground group border-2 border-transparent bg-background relative z-10 m-[1px] mobile:m-[1.5px] mobile:hover:bg-black/50"
          >
            <Link href="#testimonials" className="flex items-center justify-center">
              <span className="mobile:text-[1.1rem]">
                {isMobile ? "Success Stories" : "See Success Stories"}
              </span>
              <Eye className="ml-2 size-4 mobile:h-[1.1rem] mobile:w-[1.1rem] group-hover:text-primary transition-colors" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col items-center justify-center mt-10 space-y-4 px-4 sm:px-0"
      >
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Zap className="size-4 text-primary" />
            </div>
            <span className="text-sm font-medium">
              {isMobile ? "Fast Results" : "Results in 30 Days"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="size-4 text-primary" />
            </div>
            <span className="text-sm font-medium">
              {isMobile ? "1:1 Support" : "Dedicated 1:1 Support"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Code className="size-4 text-primary" />
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
        className="text-center text-muted-foreground text-sm mt-4"
      >
        {isMobile
          ? "Boost conversions now. No commitment."
          : "Start boosting your conversions today. No commitment required."}
      </motion.p>
    </section>
  );
}
