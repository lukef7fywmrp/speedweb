"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Eye, Users, Zap, Trophy, Star } from "lucide-react";
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
  const isIphoneXR = useMediaQuery("(width: 414px) and (height: 896px)");
  const isIphone12Pro = useMediaQuery("(width: 390px) and (height: 844px)");
  const isIphone14ProMax = useMediaQuery("(width: 430px) and (height: 932px)");
  const isSmallerDevice = useMediaQuery("(max-width: 380px)"); // For iPhone SE and similar small devices

  // Add Android device detection - simplified
  const is412x915Device = useMediaQuery("(width: 412px) and (height: 915px)"); // For Pixel 7 and Samsung Galaxy S20 Ultra
  const isGalaxyS8Plus = useMediaQuery("(width: 360px) and (height: 740px)");

  // Check if current device is any of the Android devices
  const isAndroidDevice = is412x915Device || isGalaxyS8Plus;

  // Modify static text for Android devices to force line breaks, similar to iPhone 12 Pro
  const staticText =
    isMobile || isIphone14ProMax || isIphone12Pro || is412x915Device || isGalaxyS8Plus
      ? "Build Websites You Fully Control:"
      : "Build Websites You Fully Control:";

  // Use non-breaking space for "Turn Clicks into Cash" to prevent unwanted line breaks
  const firstPhrase = "No\u00A0tech\u00A0team\u00A0needed";
  const secondPhrase =
    isIphone12Pro || isAndroidDevice ? "Edit in real-time ⚡" : "Edit in real-time ⚡";
  const thirdPhrase = isMobile
    ? "Turn\u00A0Clicks\u00A0into\u00A0Cash"
    : "Turn\u00A0Clicks\u00A0into\u00A0Cash⚡";

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
        <span
          className={`bg-gradient-to-r from-white via-white to-white/90 text-transparent bg-clip-text inline-block ${
            isMobile || isIphone14ProMax || isIphone12Pro || is412x915Device || isGalaxyS8Plus
              ? "mobile:leading-[1.3]"
              : "whitespace-nowrap mobile:leading-[1.3] sm:leading-tight"
          } ${
            isIphone14ProMax
              ? "text-[2.5rem]"
              : isIphone12Pro
                ? "text-[2rem]"
                : isIphoneXR
                  ? "text-[2.25rem]"
                  : isGalaxyS8Plus
                    ? "!text-[28px]"
                    : is412x915Device
                      ? "text-[2.25rem]"
                      : isSmallerDevice
                        ? "text-[2.1875rem]"
                        : "mobile:text-[2.5rem]"
          }`}
          style={isGalaxyS8Plus ? { fontSize: "28px" } : {}}
        >
          {staticText}
        </span>
      </div>
      <div className="relative flex justify-center w-full mobile:pb-1 sm:pb-1">
        {/* For iPhone 12 Pro and Android devices, use a special layout to keep cursor inline */}
        {isIphone12Pro || isAndroidDevice ? (
          <div className="text-center inline-flex items-center justify-center">
            <span
              className={`bg-gradient-to-r from-white via-white to-white/90 text-transparent bg-clip-text ${
                isGalaxyS8Plus
                  ? "!text-[28px]"
                  : isIphone12Pro
                    ? "text-[2rem]"
                    : isIphone14ProMax
                      ? "text-[2.25rem]"
                      : "text-[2rem]"
              } leading-[1.4]`}
              style={isGalaxyS8Plus ? { fontSize: "28px" } : {}}
            >
              {displayText}
            </span>
            <span
              className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100 text-[#FE8A0A] ${
                isGalaxyS8Plus
                  ? "!text-[28px]"
                  : isIphone12Pro
                    ? "text-[2rem]"
                    : isIphone14ProMax
                      ? "text-[2.25rem]"
                      : "text-[2rem]"
              }`}
              style={isGalaxyS8Plus ? { fontSize: "28px" } : {}}
            >
              |
            </span>
          </div>
        ) : (
          <div className="text-center min-w-[300px]">
            <span
              className={`bg-gradient-to-r from-white via-white to-white/90 text-transparent bg-clip-text whitespace-nowrap ${
                isIphoneXR
                  ? "text-[2.25rem] leading-[1.4]"
                  : isSmallerDevice
                    ? "text-[2.1875rem] leading-[1.4]"
                    : "mobile:text-[2.5rem] mobile:leading-[1.8]"
              } sm:leading-normal`}
            >
              {displayText}
            </span>
            <span
              className={`${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-100 text-[#FE8A0A] ${
                isIphoneXR
                  ? "text-[2.25rem]"
                  : isSmallerDevice
                    ? "text-[2.1875rem]"
                    : "mobile:text-[2.5rem]"
              } inline-block`}
            >
              |
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isIphoneXR = useMediaQuery("(width: 414px) and (height: 896px)");
  const isIphone12Pro = useMediaQuery("(width: 390px) and (height: 844px)");
  const isIphone14ProMax = useMediaQuery("(width: 430px) and (height: 932px)");
  const isSmallerDevice = useMediaQuery("(max-width: 380px)"); // For iPhone SE and similar small devices

  // Add Android device detection - simplified
  const is412x915Device = useMediaQuery("(width: 412px) and (height: 915px)"); // For Pixel 7 and Samsung Galaxy S20 Ultra
  const isGalaxyS8Plus = useMediaQuery("(width: 360px) and (height: 740px)");

  // Check if current device is any of the Android devices
  const isAndroidDevice = is412x915Device || isGalaxyS8Plus;

  const { openCalModal } = useCalendly();

  // Alternative mobile button texts
  const mobileButtonText = "Book Your Free Strategy Call";
  // Other options could be:
  // "Get Started Free"
  // "Book a Free Call"
  // "Talk to an Expert"
  // "Schedule a Call"

  return (
    <section
      id="about"
      className={`container flex flex-col items-center justify-center mobile:gap-1 sm:gap-2 ${
        isIphone14ProMax
          ? "pt-0 -mt-8"
          : isIphoneXR
            ? "pt-1" // Minimal padding for iPhone XR
            : isAndroidDevice
              ? "pt-0 -mt-2" // Reduced padding and slight negative margin for Android devices
              : isSmallerDevice
                ? "pt-4" // Modest padding for iPhone SE
                : isMobile
                  ? "pt-2 -mt-4" // Balanced spacing for other mobile devices
                  : "pt-16" // Desktop spacing
      } sm:pt-16 relative ${isIphoneXR || isAndroidDevice ? "min-h-[calc(100vh-100px)]" : "min-h-[calc(100vh-80px)]"} overflow-hidden`}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`max-w-5xl text-center font-heading text-4xl sm:text-5xl sm:leading-tight lg:text-7xl font-bold relative z-10 [text-wrap:balance] mb-0 mobile:mb-0 ${
          isIphoneXR ? "mt-0" : isAndroidDevice ? "-mt-1" : "mt-4"
        }`}
      >
        <TypewriterText />
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`max-w-2xl text-center ${isIphone14ProMax ? "text-lg" : isIphoneXR || isAndroidDevice ? "text-base mt-0" : "text-base"} sm:text-xl text-muted-foreground mobile:mt-0 mb-4`}
      >
        {isMobile
          ? "We design & build your website with Sanity CMS, allowing you to edit and update everything without a tech team."
          : "We design & build your website—then integrate it with Sanity, letting you edit, update, and manage everything in real-time without a tech team. You get full control over content, design, and functionality—no coding needed."}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto"
      >
        {isIphone14ProMax ? (
          <Button
            size="lg"
            onClick={() => openCalModal("speedweb/15min")}
            className="btn-grad h-14 text-[1.3rem] font-bold tracking-wide transition duration-300 group hover:bg-black hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),_0_0_0_2px_#FF9500] active:scale-95"
          >
            <span className="flex items-center justify-center text-white">
              {mobileButtonText}
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Button>
        ) : (
          // Regular CTAButton for all other devices
          <CTAButton
            href="#"
            onClick={() => openCalModal("speedweb/15min")}
            icon={<ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-" />}
            className="mobile:text-[1.1rem] text-[1.3rem] font-bold"
          >
            {isMobile ? mobileButtonText : "Book Your Free Growth Call"}
          </CTAButton>
        )}
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
          }}
          className="relative h-14 w-full sm:w-auto"
        >
          {isIphone14ProMax ? (
            <Button
              size="lg"
              asChild
              className="w-full h-14 text-lg font-medium bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/15 hover:backdrop-blur-md transition-all duration-300 group shadow-[0_6px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:translate-y-[-2px]"
            >
              <Link
                href="#testimonials"
                className="flex items-center justify-center whitespace-nowrap"
              >
                <span className="font-semibold text-[1.25rem]">Success Stories</span>
                <Star className="ml-2 size-5 group-hover:text-primary transition-colors" />
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              asChild
              className="w-full h-full text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/15 hover:backdrop-blur-md transition-all duration-300 group shadow-[0_6px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:translate-y-[-2px]"
            >
              <Link
                href="#testimonials"
                className="flex items-center justify-center whitespace-nowrap"
              >
                <span className="mobile:text-[1.25rem] text-[1.15rem] font-semibold">
                  {isMobile ? "Success Stories" : "See Success Stories"}
                </span>
                <Star className="ml-2 size-4 mobile:h-[1.2rem] mobile:w-[1.2rem] group-hover:text-primary transition-colors" />
              </Link>
            </Button>
          )}
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
            <div className={`p-2 rounded-full bg-primary/10 ${isIphone14ProMax ? "p-3" : ""}`}>
              <Zap className={`${isIphone14ProMax ? "size-5" : "size-4"} text-primary`} />
            </div>
            <span className={`${isIphone14ProMax ? "text-base" : "text-sm"} font-medium`}>
              {isMobile ? "Fast Results" : "Results in 30 Days"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full bg-primary/10 ${isIphone14ProMax ? "p-3" : ""}`}>
              <Users className={`${isIphone14ProMax ? "size-5" : "size-4"} text-primary`} />
            </div>
            <span className={`${isIphone14ProMax ? "text-base" : "text-sm"} font-medium`}>
              {isMobile ? "1:1 Support" : "Dedicated 1:1 Support"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full bg-primary/10 ${isIphone14ProMax ? "p-3" : ""}`}>
              <Code className={`${isIphone14ProMax ? "size-5" : "size-4"} text-primary`} />
            </div>
            <span className={`${isIphone14ProMax ? "text-base" : "text-sm"} font-medium`}>
              {isMobile ? "Custom Code" : "Custom-Built Solutions"}
            </span>
          </div>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className={`text-center text-muted-foreground ${isIphone14ProMax ? "text-base" : "text-sm"} mt-4`}
      >
        {isMobile
          ? "Boost conversions now. No commitment."
          : "Start boosting your conversions today. No commitment required."}
      </motion.p>
    </section>
  );
}
