"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

interface BreakpointConfig {
  visibleCount: number;
}

interface SliderProps {
  slides: ReactNode[];
  visibleCount?: number;
  breakpoints?: Record<number, BreakpointConfig>;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  gap?: number; // gap in pixels
}

export default function Slider({
  slides,
  visibleCount = 1,
  breakpoints,
  autoplay = false,
  autoplayInterval = 3000,
  loop = false,
  showDots = true,
  showArrows = true,
  gap = 16, // default 16px gap (px-2 = 8px on each side)
}: SliderProps) {
  const [currentVisible, setCurrentVisible] = useState(visibleCount);
  const [index, setIndex] = useState(0);

  const total = slides.length;
  const maxIndex = Math.max(total - currentVisible, 0);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newCount = visibleCount;

      if (breakpoints) {
        const sortedBps = Object.keys(breakpoints)
          .map(Number)
          .sort((a, b) => a - b);

        for (const bp of sortedBps) {
          if (width >= bp) {
            newCount = breakpoints[bp]?.visibleCount ?? newCount;
          }
        }
      }

      setCurrentVisible(newCount);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints, visibleCount]);

  // Reset index if out of bounds after resize
  useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [maxIndex, index]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || maxIndex === 0) return;

    const timer = setInterval(() => {
      setIndex(prev => {
        if (prev >= maxIndex) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, loop, maxIndex]);

  const next = () => {
    setIndex(prev => {
      if (prev >= maxIndex) return loop ? 0 : prev;
      return prev + 1;
    });
  };

  const prev = () => {
    setIndex(prev => {
      if (prev <= 0) return loop ? maxIndex : 0;
      return prev - 1;
    });
  };

  // Calculate translation considering gap
  const slideWidth = 100 / currentVisible;
  const translateX = -(index * slideWidth);

  return (
    <div className='relative w-full'>
      <div className='overflow-hidden'>
        <motion.div
          className='flex'
          style={{ gap: `${gap}px` }}
          animate={{ x: `${translateX}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className='shrink-0'
              style={{
                width: `calc(${slideWidth}% - ${(gap * (currentVisible - 1)) / currentVisible}px)`,
              }}
            >
              {slide}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && maxIndex > 0 && (
        <>
          <button
            onClick={prev}
            disabled={!loop && index === 0}
            className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed'
            aria-label='Previous slide'
          >
            <ChevronLeft className='w-5 h-5 text-gray-800' />
          </button>
          <button
            onClick={next}
            disabled={!loop && index === maxIndex}
            className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed'
            aria-label='Next slide'
          >
            <ChevronRight className='w-5 h-5 text-gray-800' />
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {showDots && maxIndex > 0 && (
        <div className='flex justify-center gap-2 mt-4'>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                i === index ? "bg-orange-500 w-6" : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
