"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconQuote } from "@tabler/icons-react";
import { Play } from "lucide-react";

const testimonials = [
  {
    quote:
      "The ROI we've seen since implementing Speedweb's solutions has been remarkable. Our conversion rates have doubled in just two months.",
    name: "Raheel Abbas",
    designation: "CEO at House of Pakistan Restaurant Fujairah",
    company: "House of Pakistan Restaurant",
    src: "/images/raheelTestimonial.png",
  },
  {
    quote:
      "Working with Speedweb has transformed our online presence. Their attention to detail and focus on conversion optimization is unmatched.",
    name: "Michael Roberts",
    designation: "CEO at GrowthForce",
    company: "GrowthForce",
    src: "/images/testimonial-1.avif",
  },
  {
    quote:
      "Speedweb delivered exactly what we needed - a high-converting, professional website that truly represents our brand. The results speak for themselves.",
    name: "Emran Luden",
    designation: "CEO at Kalam Space",
    company: "Kalam Space",
    src: "/images/emranTestimonial.png",
  },
  {
    quote:
      "The expertise and professionalism of the Speedweb team is outstanding. They not only built our landing pages but helped optimize our entire conversion funnel.",
    name: "Minal Sohail",
    designation: "CEO at Al Jamal Al Sheyaka Beauty Salon",
    company: "Al Jamal Al Sheyaka Beauty Salon",
    src: "/images/minalTestimonial.png",
  },
];

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: (typeof testimonials)[0];
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 transition-all duration-300 hover:border-zinc-700/50",
        className,
      )}
    >
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 size-24 rounded-full bg-[#FE8B00]/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Quote icon */}
      <div className="absolute right-6 top-6 text-[#FE8B00]/10 transition-colors duration-300 group-hover:text-[#FE8B00]/20">
        <IconQuote size={40} />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative size-12 overflow-hidden border border-zinc-800 transition-colors duration-300 group-hover:border-[#FE8B00]/20">
            <Image src={testimonial.src} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-white transition-colors duration-300 group-hover:text-[#FE8B00]">
              {testimonial.name}
            </p>
            <p className="text-sm text-zinc-500">{testimonial.designation}</p>
          </div>
        </div>
        <blockquote className="grow text-lg leading-relaxed italic text-zinc-300">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="mt-6 border-t border-zinc-800 pt-6 transition-colors duration-300 group-hover:border-zinc-700">
          <p className="text-sm text-zinc-600">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VideoTestimonial() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700/50 overflow-hidden h-full"
    >
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 size-24 rounded-full bg-[#FE8B00]/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="mb-4 text-xl font-medium text-white">Client Success Story</h3>

        <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden flex-grow">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/images/videoTestimonial/posterImage.png"
            onEnded={handleVideoEnd}
            onPause={handleVideoPause}
            controls={isPlaying}
          >
            <source src="/images/videoTestimonial/WhatsApp Video 1806 (2).MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 bg-gradient-to-t from-black/60 via-black/20 to-transparent hover:from-black/70 hover:via-black/30"
              onClick={handlePlayClick}
            >
              <div className="flex flex-col items-center gap-3 transform transition-transform duration-300 hover:scale-105">
                <div className="size-14 sm:size-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300">
                  <Play className="size-6 sm:size-7 text-white" fill="white" />
                </div>
                <span className="text-white text-sm sm:text-base font-medium tracking-wide drop-shadow-md">
                  Watch Video
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800 transition-colors duration-300 group-hover:border-zinc-700">
          <p className="text-zinc-300">
            Watch how our solution transformed this client&apos;s business
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { openCalModal } = useCalendly();

  // Format testimonials for AnimatedTestimonials component
  const animatedTestimonialsData = testimonials.map((testimonial) => ({
    quote: testimonial.quote,
    name: testimonial.name,
    designation: testimonial.designation,
    src: testimonial.src,
  }));

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="container flex flex-col items-start gap-16 py-24"
    >
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-left max-w-[90%] sm:max-w-none"
        >
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#FE8B00] sm:text-base md:text-lg">
              Testimonials
            </p>
            <h2 className="font-heading text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl">
              Straight from Our Customers
            </h2>
          </div>
          <p className="max-w-[42rem] text-sm leading-normal text-zinc-400 sm:text-base sm:leading-relaxed md:text-lg">
            See how Speedweb drives growth for companies like yours. Real results, real success.
          </p>
        </motion.div>
      )}

      {isMobile ? (
        // Mobile view - Animated Testimonials and Video
        <div className="w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <AnimatedTestimonials testimonials={animatedTestimonialsData} autoplay={true} />
          </motion.div>

          {/* Video Testimonial for Mobile */}
          <VideoTestimonial />
        </div>
      ) : (
        // Desktop view - Video on left, testimonials on right in a grid
        <div className="grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr,2fr]">
          {/* Video testimonial on the left */}
          <VideoTestimonial />

          {/* Testimonials grid on the right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
