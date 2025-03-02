"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { createElement, useState, useRef } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useCalendly } from "@/lib/hooks/useCalendly";

const clientTypes = [
  {
    iconType: "image",
    iconSrc: "/images/icons/graphIcon.png",
    title: "B2B Service Providers",
    description: {
      desktop:
        "Our landing pages clearly communicate your value proposition, generate quality leads, and drive conversions. We tailor designs to showcase your expertise, build trust, and guide potential clients through your sales process effectively.",
      mobile:
        "We create pages that communicate value, generate leads, and drive conversions. We showcase expertise and guide clients effectively.",
    },
  },
  {
    iconType: "image",
    iconSrc: "/images/icons/target.png",
    title: "E-commerce Brands",
    description: {
      desktop:
        "We craft high-converting landing pages that showcase your products effectively, optimize your sales funnel, and significantly boost your conversion rates. From product launches to seasonal campaigns, we turn visitors into loyal customers.",
      mobile:
        "We craft high-converting pages to showcase products, optimize funnels, and boost conversions. We turn visitors into loyal customers.",
    },
  },
  {
    iconType: "image",
    iconSrc: "/images/icons/lightningIcon.png",
    title: "SaaS Companies",
    description: {
      desktop:
        "We design landing pages that simplify complex offerings, highlight key features, and drive user signups. Our conversion-focused approach ensures your SaaS product stands out in a crowded market and attracts the right users.",
      mobile:
        "We design pages that simplify offerings, highlight features, and drive signups. We make your SaaS product stand out and attract users.",
    },
  },
];

export function TailoredSolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const isSmallerDevice = useMediaQuery("(max-width: 429px)");
  const { openCalModal } = useCalendly();

  // Function to render the appropriate icon based on type
  const renderIcon = (clientType: any, size: number) => {
    if (clientType.iconType === "image") {
      return (
        <div className="relative" style={{ width: size, height: size }}>
          <Image src={clientType.iconSrc} alt={clientType.title} fill className="object-contain" />
        </div>
      );
    } else {
      return createElement(clientType.icon, {
        size: size,
        className: "text-primary",
      });
    }
  };

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className={`container flex flex-col items-center ${
        !isDesktop ? "gap-10 py-28" : "gap-8 py-24"
      } sm:gap-12 bg-gradient-to-b from-background to-background/80 overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2
          className={`font-heading font-semibold max-w-3xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground ${
            !isDesktop ? "text-4xl" : "text-2xl sm:text-3xl lg:text-4xl"
          }`}
        >
          Tailored Solutions for Every Business
        </h2>
        <p
          className={`text-muted-foreground max-w-2xl mx-auto ${
            !isDesktop ? "text-lg" : "text-base sm:text-lg"
          }`}
        >
          {isDesktop
            ? "Discover how our conversion-focused design empowers different business types to thrive in their unique markets."
            : "See how our design empowers businesses to thrive in their unique markets."}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`w-full ${!isDesktop ? "max-w-[390px]" : "max-w-4xl"} relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-3xl pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Card
              className={`border-0 shadow-xl overflow-hidden bg-gradient-to-br from-background via-background/90 to-background ${
                !isDesktop ? "rounded-2xl" : ""
              }`}
            >
              <CardContent className={`${!isDesktop ? "p-8" : "p-6 sm:p-10"}`}>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div
                    className={`flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full ${
                      !isDesktop
                        ? isSmallerDevice
                          ? "size-16"
                          : "size-20"
                        : "w-16 h-16 sm:w-20 sm:h-20"
                    }`}
                  >
                    {renderIcon(
                      clientTypes[activeIndex],
                      !isDesktop ? (isSmallerDevice ? 32 : 40) : 40,
                    )}
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3
                      className={`font-semibold mb-4 text-primary ${
                        !isDesktop
                          ? isSmallerDevice
                            ? "text-xl"
                            : "text-2xl"
                          : "text-xl sm:text-2xl"
                      }`}
                    >
                      {clientTypes[activeIndex].title}
                    </h3>
                    <p
                      className={`text-muted-foreground ${
                        !isDesktop
                          ? isSmallerDevice
                            ? "text-base"
                            : "text-lg"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      {!isDesktop
                        ? clientTypes[activeIndex].description.desktop
                        : clientTypes[activeIndex].description.desktop}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`relative z-20 ${
            !isDesktop
              ? "flex flex-col w-full mt-8 gap-3"
              : "flex flex-wrap justify-center mt-8 gap-4"
          }`}
        >
          {clientTypes.map((clientType, index) => (
            <Button
              key={index}
              variant={activeIndex === index ? "default" : "outline"}
              onClick={() => setActiveIndex(index)}
              className={`${
                !isDesktop
                  ? `text-base w-full py-4 h-auto rounded-xl border-2 ${isSmallerDevice ? "text-sm" : ""}`
                  : "text-xs sm:text-sm"
              } ${
                activeIndex === index
                  ? !isDesktop
                    ? "bg-white text-black hover:bg-white/90 border-white/80 shadow-lg"
                    : "bg-white text-black hover:bg-white/90"
                  : !isDesktop
                    ? "bg-zinc-900/80 text-white hover:bg-zinc-800 border-zinc-700/50"
                    : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className={activeIndex === index ? "text-black font-medium" : ""}>
                {clientType.title}
              </span>
            </Button>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={
          !isDesktop ? `mt-8 w-full ${isSmallerDevice ? "max-w-[300px]" : "max-w-[390px]"}` : ""
        }
      >
        <CTAButton
          href="#"
          onClick={() => openCalModal("speedweb/30min")}
          className={
            !isDesktop ? `text-lg px-8 py-4 w-full ${isSmallerDevice ? "text-base px-6" : ""}` : ""
          }
        >
          {isDesktop
            ? `Elevate Your ${clientTypes[activeIndex].title} Conversions`
            : `Boost Your ${clientTypes[activeIndex].title}`}
        </CTAButton>
      </motion.div>
    </section>
  );
}
