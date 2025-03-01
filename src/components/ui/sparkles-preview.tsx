"use client";
import React from "react";
import { SparklesCore } from "./sparkles";

interface SparklesPreviewProps {
  heading?: React.ReactNode;
  headingText?: string;
  subheading?: string;
  className?: string;
}

export function SparklesPreview({
  heading,
  headingText,
  subheading,
  className = "",
}: SparklesPreviewProps) {
  // Default heading with styled parts if no custom heading is provided
  const defaultHeading = headingText ? (
    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-white relative z-20 max-w-4xl">
      <span className="inline-block">More Clicks.</span>{" "}
      <span className="inline-block text-white">
        More <span className="text-[#FE8B00]">Leads</span>.
      </span>{" "}
      <span className="inline-block relative">
        More Sales.
        <div className="absolute -bottom-32 inset-x-0 h-28 overflow-hidden">
          {/* More subtle gradient line */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#FE8B00]/80 to-transparent" />

          {/* White highlight for balance */}
          <div className="absolute inset-x-0 top-0 h-[1px] w-[80%] mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

          {/* Reduced orange glow */}
          <div className="absolute inset-x-0 top-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[#FE8B00]/50 to-transparent blur-[3px] opacity-50" />
          <div className="absolute inset-x-0 top-0 h-[6px] w-[60%] mx-auto bg-gradient-to-r from-transparent via-[#FE8B00]/20 to-transparent blur-[8px]" />

          {/* Core sparkles component with slightly increased density */}
          <SparklesCore
            background="transparent"
            minSize={0.6}
            maxSize={1.8}
            particleDensity={350}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
      </span>
    </h2>
  ) : null;

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      {heading || defaultHeading}

      {subheading && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-36 text-center relative z-20">
          {subheading}
        </p>
      )}
    </div>
  );
}
