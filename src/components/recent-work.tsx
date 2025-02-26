"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useState, useEffect } from "react";

interface WorkItem {
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  results: string;
  projectUrl: string;
  featured?: boolean;
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
    featured: true,
  },
  {
    title: "Shan Pakistan Restaurant",
    description:
      "Developed a vibrant, appetizing website for Shan Pakistan Restaurant that showcases their authentic Pakistani cuisine. The site features mouth-watering food photography, easy online ordering functionality, and a user-friendly interface that highlights their menu offerings while capturing the rich culinary heritage of Pakistan.",
    shortDescription: "Authentic Pakistani restaurant website with online ordering.",
    imageUrl: "/images/shanpakistan/shanpakistan.png",
    challenge:
      "Presenting traditional cuisine in a modern, appetizing digital format while maintaining cultural authenticity",
    solution:
      "Visually-rich design with high-quality food imagery and intuitive online ordering system",
    results:
      "Increased online visibility and streamlined ordering process for improved customer experience",
    projectUrl: "https://www.shanpakistan.com/",
  },
  {
    title: "Ristretto Coffee Company",
    description:
      "Designed an elegant, immersive website for Ristretto Coffee Company that showcases their premium coffee experience. The site features rich imagery, smooth animations, and a clean layout that emphasizes the brand's sophisticated aesthetic while providing easy access to their menu and offerings.",
    shortDescription: "Premium coffee brand website with immersive design.",
    imageUrl: "/images/ristretto/ristretto.png",
    challenge:
      "Creating an immersive digital experience that captures the premium coffee atmosphere",
    solution:
      "Elegant design with rich imagery and smooth animations that highlight the brand's quality",
    results:
      "A sophisticated online presence that enhances brand perception and customer engagement",
    projectUrl: "https://barista-r5g9w0vk6-manahilctr123s-projects.vercel.app/",
    featured: true,
  },
  {
    title: "Kalam Space - Creative Community Platform",
    description:
      "Designed and developed a vibrant platform for creative collaboration, featuring a clean, pastel-themed UI with intuitive navigation. The site showcases community features, creative tools, and educational resources with a focus on user engagement and accessibility.",
    shortDescription: "Community platform for creative collaboration with a pastel aesthetic.",
    imageUrl: "/images/kalamspace/kalamspace.png",
    challenge: "Creating an inviting digital space that fosters creativity and community building",
    solution: "Warm, approachable design with intuitive UX and clear information architecture",
    results:
      "Engaging platform that successfully connects creative individuals and educational resources",
    projectUrl: "https://kalamspace.vercel.app/",
    featured: true,
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

function ProjectCard({ project, index }: { project: WorkItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 mx-3 relative"
    >
      {/* Pure image display without containers */}
      <div className="relative w-full aspect-video">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Featured indicator as a small dot */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#FE8200]"></div>
            <span className="text-xs font-medium text-white/90">Featured</span>
          </div>
        )}
      </div>

      {/* Overlay with title and link on hover */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 mobile:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 mobile:p-3">
        <h3 className="text-xl mobile:text-sm font-medium text-white mb-2 mobile:mb-1 group-hover:text-[#FE8200] transition-colors duration-300 line-clamp-1">
          {project.title}
        </h3>

        <p className="text-sm mobile:text-xs text-zinc-300 mb-4 mobile:mb-2 mobile:line-clamp-2">
          {isMobile ? project.shortDescription : project.shortDescription}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="px-0 text-white hover:text-[#FE8200] hover:bg-transparent transition-colors text-sm mobile:text-xs font-medium w-fit"
          asChild
        >
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            View Project <ExternalLink className="h-3.5 w-3.5 mobile:h-3 mobile:w-3" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

export function RecentWork() {
  const sectionRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollAmount = 600;

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active index based on scroll position
    const itemWidth = scrollWidth / recentWork.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.scrollWidth / recentWork.length;
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      id="work"
      ref={sectionRef}
      className="container py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl mb-3">
          Our Recent <span className="text-[#FE8200]">Work</span>
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          {isMobile ? (
            "See how we've boosted businesses with innovative design."
          ) : (
            <>
              Discover how we've helped businesses achieve remarkable
              <br />
              results through innovative design.
            </>
          )}
        </p>

        {/* Subtle orange accent line */}
        <div className="h-px w-16 bg-[#FE8200]/70 mx-auto mt-4"></div>
      </motion.div>

      {/* Carousel container with navigation */}
      <div className="relative">
        {/* Left navigation arrow */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 text-white/80 hover:text-white hover:bg-black/70 transition-all"
            aria-label="Previous projects"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
        )}

        {/* Swipeable carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={handleScroll}
        >
          <div className="pl-4"></div> {/* Left padding */}
          {recentWork.map((project, index) => (
            <div key={index} className="snap-start">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          <div className="pr-4"></div> {/* Right padding */}
        </div>

        {/* Right navigation arrow */}
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 text-white/80 hover:text-white hover:bg-black/70 transition-all"
            aria-label="Next projects"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-4 gap-2"
        >
          {recentWork.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-[#FE8200]" : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
