"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiRadixui,
  SiVercel,
} from "react-icons/si";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

const technologies = [
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiReact, name: "React" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiRadixui, name: "Radix UI" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiVercel, name: "Vercel" },
];

export function Technologies() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="container flex flex-col items-center gap-10 py-24 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">
          {isMobile ? "Our Tech Stack" : "Cutting-Edge Technology Stack"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {isMobile
            ? "Modern tools for high-performance web apps."
            : "We leverage the most modern and powerful tools to build high-performance, scalable web applications."}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-4xl"
      >
        <TooltipProvider>
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Card className="group hover:border-primary transition-colors duration-300">
                    <CardContent className="flex items-center justify-center p-6">
                      <tech.icon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  <p>{tech.name}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </TooltipProvider>
      </motion.div>
    </section>
  );
}
