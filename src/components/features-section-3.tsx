"use client";

import { Target, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createElement, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";

const clientTypes = [
  {
    icon: Target,
    title: "E-commerce Brands",
    description:
      "We craft high-converting landing pages that showcase your products effectively, optimize your sales funnel, and significantly boost your conversion rates. From product launches to seasonal campaigns, we turn visitors into loyal customers.",
  },
  {
    icon: TrendingUp,
    title: "B2B Service Providers",
    description:
      "Our landing pages clearly communicate your value proposition, generate quality leads, and drive conversions. We tailor designs to showcase your expertise, build trust, and guide potential clients through your sales process effectively.",
  },
  {
    icon: Zap,
    title: "SaaS Companies",
    description:
      "We design landing pages that simplify complex offerings, highlight key features, and drive user signups. Our conversion-focused approach ensures your SaaS product stands out in a crowded market and attracts the right users.",
  },
];

export function Features3() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="container flex flex-col items-center gap-8 py-24 sm:gap-12 bg-gradient-to-b from-background to-background/80 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl max-w-3xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Tailored Solutions for Every Business
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover how our conversion-focused design empowers different business types to thrive in
          their unique markets.
        </p>
      </motion.div>
      <div className="w-full max-w-4xl relative">
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
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-background via-background/90 to-background">
              <CardContent className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full">
                    {createElement(clientTypes[activeIndex].icon, {
                      size: 40,
                      className: "text-primary",
                    })}
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                      {clientTypes[activeIndex].title}
                    </h3>
                    <p className="text-muted-foreground">{clientTypes[activeIndex].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-wrap justify-center mt-8 gap-4 relative z-20">
          {clientTypes.map((clientType, index) => (
            <Button
              key={index}
              variant={activeIndex === index ? "default" : "outline"}
              onClick={() => setActiveIndex(index)}
              className={`text-sm ${
                activeIndex === index
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className={activeIndex === index ? "text-black" : ""}>{clientType.title}</span>
            </Button>
          ))}
        </div>
      </div>
      <CTAButton href="#">Elevate Your {clientTypes[activeIndex].title} Conversions</CTAButton>
    </section>
  );
}
