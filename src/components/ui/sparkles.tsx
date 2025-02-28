"use client";

import React, { useRef, useEffect } from "react";
import { useWindowSize } from "@/lib/hooks/useWindowSize";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1000,
  particleColor = "#FFF",
  className,
  style,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = (width || window.innerWidth) * dpr;
    canvas.height = (height || window.innerHeight) * dpr;
    ctx.scale(dpr, dpr);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityChange: number;
      sparkleType: number; // 0 = dot, 1 = cross, 2 = star
    }[] = [];

    // Create particles
    for (let i = 0; i < particleDensity; i++) {
      const x = Math.random() * (width || window.innerWidth);
      const y = Math.random() * (height || window.innerHeight);
      const size = Math.random() * (maxSize - minSize) + minSize;
      const speedX = Math.random() * 0.3 - 0.15; // Slower movement
      const speedY = Math.random() * 0.3 - 0.15; // Slower movement
      const opacity = Math.random() * 0.5 + 0.5; // Higher base opacity
      const opacityChange = Math.random() * 0.02 - 0.01; // Slower opacity change
      const sparkleType = Math.floor(Math.random() * 3); // Random sparkle type

      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        opacity,
        opacityChange,
        sparkleType,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particleColor;
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = particle.size / 8;

        // Draw different sparkle types
        switch (particle.sparkleType) {
          case 0: // Simple dot
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 1: // Cross sparkle
            const crossSize = particle.size * 1.5;
            ctx.beginPath();
            // Horizontal line
            ctx.moveTo(particle.x - crossSize / 2, particle.y);
            ctx.lineTo(particle.x + crossSize / 2, particle.y);
            // Vertical line
            ctx.moveTo(particle.x, particle.y - crossSize / 2);
            ctx.lineTo(particle.x, particle.y + crossSize / 2);
            ctx.stroke();
            // Center dot
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 2: // Star sparkle
            const starPoints = 4;
            const outerRadius = particle.size * 2;
            const innerRadius = particle.size * 0.8;

            ctx.beginPath();
            for (let i = 0; i < starPoints * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (Math.PI * i) / starPoints;
              const x = particle.x + radius * Math.cos(angle);
              const y = particle.y + radius * Math.sin(angle);

              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            break;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Update opacity for twinkling effect
        particle.opacity += particle.opacityChange;
        if (particle.opacity > 1 || particle.opacity < 0.3) {
          particle.opacityChange = -particle.opacityChange;
        }

        // Boundary checks with wrap-around
        if (particle.x < -10) particle.x = (width || window.innerWidth) + 10;
        if (particle.x > (width || window.innerWidth) + 10) particle.x = -10;
        if (particle.y < -10) particle.y = (height || window.innerHeight) + 10;
        if (particle.y > (height || window.innerHeight) + 10) particle.y = -10;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if needed
    };
  }, [background, height, maxSize, minSize, particleColor, particleDensity, width]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
};
