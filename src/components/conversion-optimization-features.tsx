"use client";

import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Simplified feature data
const features = [
  {
    title: "Speed That Sells",
    description:
      "Milliseconds matter! Faster pages mean lower bounce rates, better user experience, and higher conversions. We optimize every element to ensure your site loads instantly, keeping visitors engaged and moving toward action.",
    mobileDescription:
      "Milliseconds matter! Faster pages mean better UX, higher conversions, and lower bounce rates. We optimize every element for instant loading.",
    customIcon: (
      <div className="flex items-center justify-center transition-all duration-300 shadow-lg">
        <Image
          src="/images/icons/lightningIcon.png"
          alt="Lightning Icon"
          width={48}
          height={48}
          className="size-12"
        />
      </div>
    ),
    useCustomIcon: true,
  },
  {
    title: "Designed For Trust",
    description:
      "A reliable website builds confidence. With secure browsing, fast performance, and clear messaging, we create an experience that makes visitors feel safe and ready to take action.",
    mobileDescription:
      "A reliable website builds trust. With secure browsing, fast performance, and clear messaging, visitors feel confident and ready to act.",
    customIcon: (
      <div className="flex items-center justify-center transition-all duration-300">
        <Image
          src="/images/icons/lockIcon.png"
          alt="Unlock Icon"
          width={48}
          height={48}
          className="size-12"
        />
      </div>
    ),
    useCustomIcon: true,
  },
  {
    title: "CTAs That Work",
    description:
      "Strategic, attention-grabbing CTAs seamlessly guide visitors toward taking action—boosting leads and sales. We create clear, well-placed buttons and prompts that encourage users to take the next step with confidence.",
    mobileDescription:
      "Attention-grabbing CTAs drive action, boosting leads and sales. We design clear, well-placed prompts for confident next steps.",
    customIcon: (
      <div className="flex items-center justify-center transition-all duration-300 shadow-lg">
        <Image
          src="/images/icons/clickIcon.png"
          alt="Finger Click Icon"
          width={48}
          height={48}
          className="size-12"
        />
      </div>
    ),
    useCustomIcon: true,
  },

  {
    title: "SEO-Optimized For Growth",
    description:
      "Optimize your site for search engines and users with fast load speeds, smart keyword placement, and a well-structured layout to enhance visibility and drive organic traffic.",
    mobileDescription:
      "Optimize your site with speed, smart keywords, and a structured layout to boost visibility and drive traffic.",
    customIcon: (
      <div className="flex items-center justify-center transition-all duration-300 shadow-lg">
        <Image
          src="/images/icons/graphIcon.png"
          alt="Bar Up Icon"
          width={48}
          height={48}
          className="size-12"
        />
      </div>
    ),
    useCustomIcon: true,
  },
];

// Stats data
const stats = [
  { value: 100, suffix: "%", label: "Conversion Rate Increase" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "", label: "Years Experience" },
];

// Counter animation hook with linear animation
function useCounter(end: number, duration: number = 1500, start: number = 0, delay: number = 0) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number | null = null;
    let animationFrame: number;
    const stepValue = end / 30; // Ensure smooth steps

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Linear animation for consistent speed
      setCount(Math.floor(start + percentage * (end - start)));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, [start, end, duration, isAnimating, delay]);

  return { count, setIsAnimating };
}

export function ConversionOptimizationFeatures() {
  // Move hook calls inside the component
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const isSmallerDevice = useMediaQuery("(max-width: 429px)");
  const { openCalModal } = useCalendly();

  // Create individual counter hooks outside of any callbacks
  const counter1 = useCounter(stats[0]?.value || 100, 1500, 0, 0);
  const counter2 = useCounter(stats[1]?.value || 50, 1500, 0, 100);
  const counter3 = useCounter(stats[2]?.value || 5, 1500, 0, 200);
  const counter4 = useCounter(stats[3]?.value || 0, 1500, 0, 300);

  // Store counters in an array using useMemo
  const counters = useMemo(() => {
    return [counter1, counter2, counter3, counter4].slice(0, stats.length);
  }, [counter1, counter2, counter3, counter4]);

  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      counters.forEach((counter) => counter.setIsAnimating(true));
    }
  }, [isInView, counters]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-6 sm:px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 font-heading text-3xl font-semibold md:text-5xl lg:text-6xl">
            {isDesktop ? (
              <>
                <div className="mb-2 flex items-center justify-center gap-4">
                  <span>More Clicks.</span>
                  <span className="text-[#FE8B00]">More Leads.</span>
                </div>
                <span className="block">More Sales.</span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="block mb-2 text-5xl">More Clicks.</span>
                <span className="block mb-2 text-5xl text-[#FE8B00]">More Leads.</span>
                <span className="block text-5xl">More Sales.</span>
              </div>
            )}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
            {!isDesktop ? (
              <>
                Design That Doesn&apos;t Just Look Good—
                <br />
                It Sells.
              </>
            ) : (
              "Design That Doesn&apos;t Just Look Good—It Sells."
            )}
          </p>
        </div>

        {/* Stats Section - Centered layout with reduced gap */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-4 md:gap-16 lg:gap-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.p
                  className={`mb-1 text-4xl font-bold md:text-5xl ${
                    index === 0 ? "text-[#FE8B00]" : "text-white"
                  }`}
                  initial={{ scale: 0.9 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {counters[index].count}
                  {stat.suffix}
                </motion.p>
                <p className="text-xs text-zinc-500 md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Subtle divider */}
          <div className="mx-auto mt-12 h-px w-full max-w-md bg-zinc-800/50"></div>
        </div>

        {/* Features Section - Clean layout */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {features.map((feature, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group px-2"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    {feature.useCustomIcon ? (
                      feature.customIcon
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#FE8B00]/10 transition-all duration-300 group-hover:bg-[#FE8B00]/20">
                        <ArrowRight className="size-5 text-[#FE8B00]" />
                      </div>
                    )}
                    <h3
                      className={`font-semibold text-white transition-colors duration-300 group-hover:text-[#FE8B00] ${
                        !isDesktop ? "text-2xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p
                    className={`leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 ${
                      !isDesktop ? "text-lg" : "text-base"
                    }`}
                  >
                    {!isDesktop ? feature.mobileDescription : feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center md:mt-28"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => openCalModal("speedweb/30min")}
            className={`transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black text-white border-2 border-white ${
              !isDesktop
                ? "h-14 px-6 text-lg font-medium w-full max-w-[350px]"
                : "h-14 px-8 text-xl font-semibold"
            }`}
          >
            <span className="flex items-center justify-center">
              {!isDesktop
                ? "Let's Boost Your Website"
                : "Your Website Can Do More. Let's Prove It."}
              <ArrowRight className="ml-2 size-5 transition-all duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
