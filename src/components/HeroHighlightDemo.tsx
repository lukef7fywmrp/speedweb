"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/HeroHighlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-[#3D0066] dark:text-white max-w-4xl leading-normal lg:leading-normal text-center mx-auto"
      >
        Take Full Control Of Your Website. Edit anything. anytime in real time{" "}
        <Highlight className="text-gray-100 dark:text-white">No tech team needed.</Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
