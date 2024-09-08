"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Zap, Target, Rocket } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: LineChart,
    title: "Data-Driven Optimization",
    description: "Leverage analytics to continuously improve conversion rates.",
  },
  {
    icon: Zap,
    title: "Psychology-Driven Design",
    description: "Implement persuasive design principles to boost engagement.",
  },
  {
    icon: Target,
    title: "Conversion-Focused Copy",
    description: "Craft compelling narratives that drive action and sales.",
  },
  {
    icon: Rocket,
    title: "Rapid Implementation",
    description: "Quick turnaround times to get your optimized pages live fast.",
  },
];

export function Features2() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="container flex flex-col items-center gap-8 py-24 sm:gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl max-w-3xl mx-auto">
          Unlock the Power of High-Converting Pages
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your website into a sales-generating machine with our proven conversion
          optimization strategies.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="h-full shadow-lg border-0 overflow-hidden group relative">
              <CardContent className="flex flex-col gap-6 p-8 text-center items-center h-full">
                <motion.div
                  className="inline-flex items-center justify-center rounded-full p-3 bg-primary/10"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    backgroundColor:
                      hoveredIndex === index ? "var(--primary)" : "var(--primary-10)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon size={32} className="text-primary" />
                </motion.div>
                <div>
                  <h4 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button size="lg" className="mt-8 text-lg font-semibold">
          Boost Your Conversions Now
        </Button>
      </motion.div>
    </section>
  );
}
