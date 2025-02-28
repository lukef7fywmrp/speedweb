"use client";

import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, MessageSquareText, Rocket } from "lucide-react";

// Simplified feature data
const features = [
  {
    title: "Speed That Sells",
    description:
      "Milliseconds matter! Faster pages mean lower bounce rates, better user experience, and higher conversions. We optimize every element to ensure your site loads instantly, keeping visitors engaged and moving toward action.",
    mobileDescription: "Faster pages = higher conversions.",
    customIcon: (
      <div className="flex items-center justify-center shadow-lg transition-transform duration-300">
        <img src="/images/icons/lightningIcon.png" alt="Lightning Icon" className="h-12 w-12" />
      </div>
    ),
    useCustomIcon: true,
  },
  {
    title: "Designed for Trust",
    description:
      "A reliable website builds confidence. With secure browsing, fast performance, and clear messaging, we create an experience that makes visitors feel safe and ready to take action.",
    mobileDescription: "Trust through design.",
    customIcon: (
      <div className="flex items-center justify-center transition-transform duration-300">
        <img src="/images/icons/lockIcon.png" alt="Unlock Icon" className="h-12 w-12" />
      </div>
    ),
    useCustomIcon: true,
  },
  {
    title: "CTAs That Work",
    description:
      "Strategic, attention-grabbing CTAs seamlessly guide visitors toward taking action—boosting leads and sales. We create clear, well-placed buttons and prompts that encourage users to take the next step with confidence.",
    mobileDescription: "Effective CTAs for more leads.",
    icon: MessageSquareText,
    customIcon: (
      <div className="flex items-center justify-center shadow-lg transition-transform duration-300">
        <img src="/images/icons/clickIcon.png" alt="Finger Click Icon" className="h-12 w-12" />
      </div>
    ),
    useCustomIcon: true,
  },

  {
    title: "SEO-Optimized for Growth",
    description:
      "Optimize your site for search engines and users with fast load speeds, smart keyword placement, and a well-structured layout to enhance visibility and drive organic traffic.",
    mobileDescription:
      "Optimize your site for search engines and users with fast load speeds, smart keyword placement, and a well-structured layout to enhance visibility and drive organic traffic.",
    icon: Rocket,
    customIcon: (
      <div className="flex items-center justify-center shadow-lg transition-transform duration-300">
        <img src="/images/icons/graphIcon.png" alt="Bar Up Icon" className="h-12 w-12" />
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
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  // Initialize counters with shorter duration
  const counters = stats.map((stat, index) => useCounter(stat.value, 1500, 0, index * 100));

  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      counters.forEach((counter) => counter.setIsAnimating(true));
    }
  }, [isInView]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold mb-4">
            {isMobile ? (
              "High-Converting Pages"
            ) : (
              <>
                <div className="flex justify-center items-center gap-4 mb-2">
                  <span>More Clicks.</span>
                  <span className="text-[#FE8B00]">More Leads.</span>
                </div>
                <span className="block">More Sales.</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
            Design That Doesn't Just Look Good—It Sells.
          </p>
        </div>

        {/* Stats Section - Centered layout with reduced gap */}
        <div className="mb-20">
          <div className="flex justify-center items-center gap-4 md:gap-16 lg:gap-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.p
                  className={`text-4xl md:text-5xl font-bold mb-1 ${
                    index === 0 ? "text-[#FE8B00]" : "text-white"
                  }`}
                  initial={{ scale: 0.9 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {counters[index].count}
                  {stat.suffix}
                </motion.p>
                <p className="text-xs md:text-sm text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Subtle divider */}
          <div className="h-px w-full max-w-md mx-auto bg-zinc-800/50 mt-12"></div>
        </div>

        {/* Features Section - Clean layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex items-center gap-3">
                    {feature.useCustomIcon ? (
                      feature.customIcon
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FE8B00]/10 group-hover:bg-[#FE8B00]/20 transition-transform duration-300">
                        {Icon && <Icon className="h-5 w-5 text-[#FE8B00]" />}
                      </div>
                    )}
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#FE8B00] transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {isMobile ? feature.mobileDescription : feature.description}
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
          className="mt-20 md:mt-28 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => openCalModal("speedweb/30min")}
            className="h-14 px-8 text-xl font-semibold text-white border-2 border-white hover:bg-white hover:text-black transition-transform duration-300 transform hover:scale-105"
          >
            <span className="flex items-center">
              Your Website Can Do More. Let's Prove It.
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
