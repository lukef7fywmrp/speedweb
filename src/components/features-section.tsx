"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface WorkItem {
  title: string;
  description: string;
  imageUrl: string;
}

const recentWork: WorkItem[] = [
  {
    title: "Project 1",
    description: "Innovative landing page design that boosted conversions by 150%",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Farrow.png&w=3840&q=75",
  },
  {
    title: "Project 2",
    description: "E-commerce redesign that increased sales by 200% in 3 months",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fopenstage.png&w=3840&q=75",
  },
  {
    title: "Project 3",
    description: "SaaS dashboard that improved user engagement by 80%",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fdevjuice.png&w=3840&q=75",
  },
  {
    title: "Project 4",
    description: "Mobile app design that increased user retention by 50%",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fdevjuice.png&w=3840&q=75",
  },
  {
    title: "Project 5",
    description: "Branding overhaul that led to 100% increase in brand recognition",
    imageUrl:
      "https://www.withsupafast.com/_next/image?url=%2Fimages%2Fwork%2Fdevjuice.png&w=3840&q=75",
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Card className="h-full shadow-md overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative h-48 md:h-64">
          <Image
            src={item.imageUrl}
            alt={item.title}
            layout="fill"
            className="transition-transform duration-300 group-hover:scale-110 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Features() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      const newIndex = Math.min(
        Math.floor(scrollPercentage * recentWork.length),
        recentWork.length - 1,
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} className="container flex flex-col items-center gap-6 py-24 sm:gap-10">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl mb-4">
          Our Recent Work
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover how we've helped businesses like yours achieve remarkable results through
          innovative design and conversion-focused strategies.
        </p>
      </motion.div>
      <div className="w-full max-w-6xl mt-12 flex flex-col gap-24">
        {recentWork.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: index === activeIndex ? 1 : 0.3, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
            <div className="md:w-1/2">
              <WorkCard item={item} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
