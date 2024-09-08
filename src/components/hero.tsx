"use client";

import Link from "next/link";
import { ArrowRight, Eye, ZoomIn, ZoomOut } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function InteractiveLandingPage() {
  const [isZoomed, setIsZoomed] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="cursor-move relative"
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src="https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Farrow.png&w=3840&q=75"
          alt="Interactive landing page example"
          width={800}
          height={600}
          className="rounded-lg shadow-2xl"
        />
        <AnimatePresence>
          {!isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg"
            />
          )}
        </AnimatePresence>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
            className="bg-white/80 shadow-lg hover:bg-white/90 transition-all duration-300"
          >
            {isZoomed ? (
              <ZoomOut className="h-4 w-4 text-gray-800" />
            ) : (
              <ZoomIn className="h-4 w-4 text-gray-800" />
            )}
          </Button>
        </motion.div>
      </motion.div>
      {isZoomed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
            <Image
              src="https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Farrow.png&w=3840&q=75"
              alt="Interactive landing page example"
              layout="fill"
              className="rounded-lg object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/80 shadow-lg hover:bg-white/90 transition-all duration-300"
            >
              <ZoomOut className="h-4 w-4 text-gray-800" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 pt-20 sm:gap-10 relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl text-center font-heading text-4xl sm:text-5xl sm:leading-tight lg:text-7xl font-bold"
      >
        Craft High-Converting Pages: Boost Sales Now
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
      >
        Unlock the secret to skyrocketing sales with our conversion-focused pages. Imagine doubling
        your revenue without working harder – that's the power of psychology-driven design at your
        fingertips.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto"
      >
        <Button
          size="lg"
          asChild
          variant="default"
          className="w-full sm:w-auto h-14 text-base font-semibold hover:scale-105 transition duration-300 group bg-primary text-gray-900 hover:bg-primary/90"
        >
          <Link href="#" className="flex items-center justify-center">
            Get Your Free Conversion Audit
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
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
              See Success Stories
              <Eye className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex items-center justify-center mt-6 space-x-4"
      >
        <Image src="/trustpilot-logo.png" alt="Trustpilot" width={100} height={24} />
        <span className="text-sm text-muted-foreground">4.9/5 from 500+ reviews</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center text-muted-foreground text-sm"
      >
        Start boosting your conversions today. No commitment required.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative mt-12 w-full max-w-4xl"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-secondary/20 [filter:blur(100px)]" />
        <InteractiveLandingPage />
        <p className="text-center text-sm text-muted-foreground mt-4">
          Interact with the image above to see how our designs come to life
        </p>
      </motion.div>
    </section>
  );
}
