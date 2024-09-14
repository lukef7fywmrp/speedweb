"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface WorkItem {
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  results: string;
}

const recentWork: WorkItem[] = [
  {
    title: "Streamline: Task Management",
    description:
      "Innovative landing page design that boosted conversions by 150%. Our team crafted a sleek, user-friendly interface that simplified complex task management processes, resulting in increased user engagement and productivity.",
    shortDescription: "Landing page redesign boosted conversions by 150%.",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Farrow.png&w=3840&q=75",
    challenge: "Low conversion rates and complex UI",
    solution: "Redesigned landing page with intuitive flow",
    results: "150% conversion increase, better engagement",
  },
  {
    title: "FashionFusion: E-commerce Revamp",
    description:
      "E-commerce redesign that increased sales by 200% in 3 months. We completely overhauled the user experience, implemented advanced product recommendation algorithms, and optimized the checkout process to drive unprecedented growth.",
    shortDescription: "E-commerce redesign increased sales by 200% in 3 months.",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fopenstage.png&w=3840&q=75",
    challenge: "Stagnant sales and poor UX",
    solution: "UX overhaul and recommendation system",
    results: "200% sales increase in 3 months",
  },
  {
    title: "DataViz Pro: Analytics Dashboard",
    description:
      "SaaS dashboard that improved user engagement by 80%. Our team developed an intuitive, visually striking dashboard that transformed complex data into actionable insights, empowering businesses to make data-driven decisions with ease.",
    shortDescription: "SaaS dashboard improved user engagement by 80%.",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fdevjuice.png&w=3840&q=75",
    challenge: "Complex data and low engagement",
    solution: "Intuitive, visual dashboard design",
    results: "80% engagement improvement",
  },
  {
    title: "HealthTrack: Wellness App",
    description:
      "Mobile app design that increased user retention by 50%. We created a comprehensive health tracking solution with personalized insights, seamless integration with wearables, and an engaging user interface that kept users coming back.",
    shortDescription: "Health app design increased retention by 50%.",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fdevjuice.png&w=3840&q=75",
    challenge: "Low user retention in health app",
    solution: "Personalized insights and wearable integration",
    results: "50% increase in user retention",
  },
  {
    title: "EcoSmart: Sustainable Branding",
    description:
      "Branding overhaul that led to 100% increase in brand recognition. Our team developed a cohesive brand identity that resonated with environmentally conscious consumers, including a striking logo, eco-friendly packaging designs, and a compelling brand story.",
    shortDescription: "Branding overhaul doubled brand recognition.",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fdevjuice.png&w=3840&q=75",
    challenge: "Low brand recognition in eco-market",
    solution: "Comprehensive eco-friendly branding",
    results: "100% increase in brand recognition",
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Card className="h-full shadow-lg overflow-hidden group relative">
      <CardContent className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
          <div className="text-sm text-gray-200 mb-4">
            <p>
              <strong>Challenge:</strong> {item.challenge}
            </p>
            <p>
              <strong>Solution:</strong> {item.solution}
            </p>
            <p>
              <strong>Results:</strong> {item.results}
            </p>
          </div>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            {isMobile ? "View" : "View Project"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function WorkItem({ item, index }: { item: WorkItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const isMobile = useMediaQuery("(max-width: 640px)");

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row gap-8 items-center min-h-[500px] ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
        <p className="text-muted-foreground">
          {isMobile ? item.shortDescription : item.description}
        </p>
      </div>
      <div className="md:w-1/2 w-full">
        <WorkCard item={item} />
      </div>
    </motion.div>
  );
}

export function RecentWork() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <section
      id="work"
      ref={sectionRef}
      className="container flex flex-col items-center gap-6 py-24 sm:gap-10"
    >
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl mb-4">
          Our Recent Work
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {isMobile
            ? "See how we've boosted businesses with innovative design."
            : "Discover how we've helped businesses like yours achieve remarkable results through innovative design and conversion-focused strategies."}
        </p>
      </div>
      <div className="w-full max-w-6xl mt-12 flex flex-col gap-16">
        {recentWork.map((item, index) => (
          <WorkItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
