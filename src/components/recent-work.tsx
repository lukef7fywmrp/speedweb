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
  projectUrl: string;
}

const recentWork: WorkItem[] = [
  {
    title: "NVIDIA Website Redesign Concept",
    description:
      "Created a conceptual redesign of NVIDIA's AI platform website, focusing on improved user experience and technical content presentation. This concept project demonstrates our approach to handling complex technical information through intuitive navigation and interactive demonstrations.",
    shortDescription: "UI/UX concept redesign for NVIDIA's AI platform.",
    imageUrl: "/images/nvidia/hero-banner.png",
    challenge: "Simplifying complex technical content while maintaining visual appeal",
    solution: "Conceptual redesign with focus on user experience and clarity",
    results: "Showcase of modern design principles for technical platforms",
    projectUrl: "https://nvidia-phi.vercel.app/",
  },
  {
    title: "Al Jamal Al Sheyaka Beauty Salon",
    description:
      "Created an elegant, user-friendly website for a premium beauty salon in Sharjah, featuring WhatsApp integration for appointments, service showcase, and customer testimonials. The design emphasizes luxury and professionalism while maintaining accessibility for diverse clientele.",
    shortDescription: "Premium salon website with WhatsApp booking.",
    imageUrl: "/images/salon/hero-banner.png",
    challenge: "Balancing luxury aesthetics with simple booking process",
    solution: "Intuitive UI with WhatsApp integration for direct appointments",
    results: "Streamlined client communication and booking process",
    projectUrl: "https://al-jamal-al-sheyaka.vercel.app",
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full shadow-lg overflow-hidden group relative">
      <CardContent className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className={`object-cover ${!isMobile && "md:transition-transform md:duration-500 md:ease-in-out md:group-hover:scale-105"}`}
          />
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>
        {!isMobile && (
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
              asChild
            >
              <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                {isMobile ? "View" : "View Project"}
              </a>
            </Button>
          </div>
        )}
        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white truncate pr-2">{item.title}</h3>
              <a
                href={item.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors group/link"
              >
                <span className="text-sm">View</span>
                <svg
                  className="w-4 h-4 transform transition-transform group-hover/link:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}
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
