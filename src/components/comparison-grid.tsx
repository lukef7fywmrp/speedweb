"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { motion } from "framer-motion";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { Button } from "./ui/button";

// Add a custom color to match your brand
const brandColor = "#FE8A0A";

// Desktop features
const desktopFeatures = [
  "Lightning-fast Next.js development with instant deployments",
  "Flexible payment options tailored to your business needs",
  "Full-stack expertise in one dedicated team for your project",
  "Streamlined workflow process with automated optimization",
  "Real-time collaboration & updates throughout development",
  "Scalable solutions on demand for continuous business growth",
];

// Mobile features - shorter and more concise
const mobileFeatures = [
  "Blazing-fast Next.js development with instant deployment",
  "Flexible payment options tailored to you",
  "Full-stack expertise in one dedicated team",
  "Automated optimization for a smooth workflow",
  "Real-time collaboration & updates",
  "Scalable solutions for ongoing growth",
];

export function ComparisonGrid() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isIphone14ProMax = useMediaQuery("(width: 430px) and (height: 932px)");
  const [activeProvider, setActiveProvider] = useState(0);
  // State to track if carousel rotation is paused
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { openCalModal } = useCalendly();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
      mirror: true,
    });

    // Add custom animation
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
        [data-aos="width"] {
          width: 0;
          transition-property: width;
        }
        [data-aos="width"].aos-animate {
          width: 100px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Provider data for mobile carousel
  const providers = [
    {
      title: "Speedweb",
      features: mobileFeatures,
      useRocketIcon: true,
      isFeatured: true,
    },
    {
      title: "Agencies",
      items: [
        "(Monthly retainers)",
        "(Complex pricing)",
        "(Fragmented teams)",
        "(Lengthy timelines)",
        "(Communication gaps)",
        "(Inflexible contracts)",
      ],
    },
    {
      title: "WordPress",
      items: [
        "(Limited features)",
        "(Hidden costs)",
        "(Plugin dependency)",
        "(Security risks)",
        "(Slow performance)",
        "(No customization)",
      ],
    },
    {
      title: "DIY",
      items: [
        "(Amateur results)",
        "(Time-consuming)",
        "(No support)",
        "(Basic features)",
        "(Poor optimization)",
        "(Limited growth)",
      ],
    },
  ];

  // Filter out DIY for mobile
  const mobileProviders = providers.slice(0, 3);

  // Include all providers for mobile (including DIY)
  const allMobileProviders = providers;

  // Auto-rotate carousel for mobile with pause functionality
  useEffect(() => {
    if (isMobile && !isPaused) {
      const interval = setInterval(() => {
        setActiveProvider((prev) => (prev + 1) % allMobileProviders.length);
      }, 3800); // Change every 3.8 seconds

      return () => clearInterval(interval);
    }
  }, [isMobile, isPaused, allMobileProviders.length]);

  // Handle pause and resume of carousel
  const handleCarouselInteraction = (pause: boolean) => {
    setIsPaused(pause);
  };

  // Choose which features to display based on device
  const featuresToDisplay = isMobile ? mobileFeatures : desktopFeatures;

  const nextProvider = () => {
    setActiveProvider((prev) => (prev + 1) % allMobileProviders.length);
  };

  const prevProvider = () => {
    setActiveProvider((prev) => (prev - 1 + allMobileProviders.length) % allMobileProviders.length);
  };

  const goToProvider = (index: number) => {
    setActiveProvider(index);
  };

  return (
    <section className="container py-20">
      <div className="mb-12">
        <div className="flex flex-col gap-2">
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white/90 font-heading leading-tight"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-offset="200"
          >
            A Smarter Choice
          </h2>
          <div
            className="text-4xl md:text-4xl lg:text-6xl font-bold text-[#FE8A0A] font-heading leading-tight relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            data-aos-offset="200"
          >
            For Your Business
            <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-[#FE8A0A] to-transparent"></div>
          </div>
          <p
            className="text-lg md:text-xl text-zinc-400 mt-4 max-w-2xl"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            Compare our offerings and see why businesses choose Speedweb for their growth
          </p>
        </div>
      </div>

      {/* Desktop view - Grid layout */}
      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
          {/* Speedweb Column */}
          <div
            className="md:col-span-4 bg-zinc-900/80 px-8 py-10 rounded-3xl border-2 border-[#FE8A0A]/25 shadow-xl transition-all duration-500 hover:bg-gradient-to-br hover:from-zinc-900/90 hover:via-zinc-800/90 hover:to-zinc-900/90 hover:scale-[1.02]"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="200"
          >
            <h3 className="text-4xl font-bold mb-12 text-[#FE8A0A] min-h-[40px] text-center relative pb-6">
              Speedweb
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#FE8A0A]/30 to-transparent" />
            </h3>
            <ul className="space-y-[2.5rem] mb-4">
              {desktopFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex gap-3 items-start h-auto min-h-[3rem] hover:translate-x-2 transition-all duration-300"
                >
                  <Image
                    src="/images/rocketicon.png"
                    alt="Speedweb feature"
                    width={32}
                    height={32}
                    className="text-[#FE8A0A] shrink-0 mt-1 group-hover:rotate-12 transition-all duration-300"
                  />
                  <span className="text-lg font-medium text-zinc-100 hover:text-[#FE8A0A] transition-colors duration-300 leading-6">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Other columns */}
          {[
            {
              title: "Agencies",
              items: [
                "(Monthly retainers)",
                "(Complex pricing)",
                "(Fragmented teams)",
                "(Lengthy timelines)",
                "(Communication gaps)",
                "(Inflexible contracts)",
              ],
            },
            {
              title: "WordPress",
              items: [
                "(Limited features)",
                "(Hidden costs)",
                "(Plugin dependency)",
                "(Security risks)",
                "(Slow performance)",
                "(No customization)",
              ],
            },
            {
              title: "DIY",
              items: [
                "(Amateur results)",
                "(Time-consuming)",
                "(No support)",
                "(Basic features)",
                "(Poor optimization)",
                "(Limited growth)",
              ],
            },
          ].map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="md:col-span-2 bg-zinc-900/80 px-4 py-10 rounded-3xl border border-white/15 backdrop-blur-sm"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={columnIndex * 150}
              data-aos-offset="200"
            >
              <h3 className="text-2xl font-bold mb-12 text-white/90 min-h-[40px] text-center relative pb-6">
                {column.title}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </h3>
              <ul className="space-y-[2.5rem] mb-4">
                {column.items.map((item, index) => (
                  <li key={index} className="flex gap-2 items-start h-12">
                    <X className="size-6 text-red-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-lg font-medium text-zinc-200 leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Mobile view - Swipeable Carousel */}
      {isMobile && (
        <div className="relative">
          {/* Auto-rotating carousel container */}
          <div
            className="relative overflow-hidden rounded-3xl"
            onMouseDown={() => handleCarouselInteraction(true)}
            onMouseUp={() => handleCarouselInteraction(false)}
            onMouseLeave={() => handleCarouselInteraction(false)}
            onTouchStart={() => handleCarouselInteraction(true)}
            onTouchEnd={() => handleCarouselInteraction(false)}
          >
            {/* Provider cards */}
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeProvider * 100}%)` }}
            >
              {/* Map through all providers including DIY */}
              {allMobileProviders.map((provider, providerIndex) => (
                <div
                  key={providerIndex}
                  className={`w-full flex-shrink-0 ${
                    provider.isFeatured
                      ? "bg-zinc-900/80 border-2 border-[#FE8A0A]/25"
                      : "bg-zinc-900/80 border border-white/15"
                  } p-8 rounded-3xl min-h-[480px]`}
                >
                  <h3
                    className={`text-3xl font-bold mb-10 text-center relative pb-6 ${
                      provider.isFeatured ? "text-[#FE8A0A]" : "text-white/90"
                    }`}
                  >
                    {provider.title}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r ${
                        provider.isFeatured
                          ? "from-transparent via-[#FE8A0A]/30 to-transparent"
                          : "from-transparent via-white/30 to-transparent"
                      }`}
                    />
                  </h3>

                  {provider.useRocketIcon ? (
                    <ul className="space-y-8 mb-4">
                      {mobileFeatures.map((feature, index) => (
                        <li key={index} className="flex gap-4 items-start min-h-[3.5rem]">
                          <Image
                            src="/images/rocketicon.png"
                            alt="Speedweb feature"
                            width={28}
                            height={28}
                            className="text-[#FE8A0A] shrink-0 mt-1"
                          />
                          <span className="text-lg font-medium text-zinc-100 leading-tight">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-8 mb-4">
                      {provider.items?.map((item, index) => (
                        <li key={index} className="flex gap-3 items-start min-h-[3.5rem]">
                          <X className="size-6 text-red-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-lg font-medium text-zinc-200 leading-tight">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators (non-clickable) */}
          <div className="flex justify-center gap-3 mt-8">
            {allMobileProviders.map((_, index) => (
              <div
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeProvider ? "w-10 bg-[#FE8B00]" : "w-3 bg-zinc-700"
                }`}
                aria-label={`Provider ${index + 1} of ${allMobileProviders.length}`}
              />
            ))}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              Paused
            </div>
          )}
        </div>
      )}

      {/* Payment Options Button - For both mobile and desktop */}
      <div
        className="flex justify-center mt-16"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-offset="200"
      ></div>
    </section>
  );
}
