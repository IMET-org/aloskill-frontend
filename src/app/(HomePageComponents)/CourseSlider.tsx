"use client";

import CourseCard from "@/components/cards/CourseCard";
import type { Course } from "@/types/course.types";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

interface CourseSliderProps {
  courses: Course[];
  isLoading?: boolean;
  emptyStateMessage?: string;
  onEnroll?: (courseId: string | number) => void;
  onAddToCart?: (courseId: string | number) => void;
  onAddToWishlist?: (courseId: string | number) => void;
  cartItems?: Set<string | number>;
  wishlistItems?: Set<string | number>;
  autoScrollSpeed?: number; // milliseconds per scroll
  pauseOnHover?: boolean;
}

const CourseSlider = memo(function CourseSlider({
  courses,
  isLoading = false,
  emptyStateMessage = "No courses available at the moment.",
  onEnroll,
  onAddToCart,
  onAddToWishlist,
  cartItems = new Set(),
  wishlistItems = new Set(),
  autoScrollSpeed = 3000,
  pauseOnHover = true,
}: CourseSliderProps) {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Duplicate courses for infinite loop effect
  const duplicatedCourses = courses.length > 0 ? [...courses, ...courses, ...courses] : [];

  // Auto-scroll functionality
  useEffect(() => {
    if (!sliderRef.current || isPaused || courses.length === 0) return;

    const slider = sliderRef.current;
    let animationId: number;

    const scroll = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 3) {
        // Reset to middle section for infinite loop
        slider.scrollLeft = slider.scrollWidth / 3 - slider.offsetWidth;
      } else {
        slider.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(scroll);
    };

    const startScroll = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, autoScrollSpeed);

    return () => {
      clearTimeout(startScroll);
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, courses.length, autoScrollSpeed]);

  // Check scroll position for navigation buttons
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const slider = sliderRef.current;
    slider?.addEventListener("scroll", checkScroll);
    return () => slider?.removeEventListener("scroll", checkScroll);
  }, [courses]);

  const scrollTo = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className='relative'>
        <div className='flex gap-6 overflow-hidden'>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className='min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse'
            >
              <div className='h-48 bg-gray-200' />
              <div className='p-5 space-y-4'>
                <div className='h-4 bg-gray-200 rounded w-3/4' />
                <div className='h-6 bg-gray-200 rounded' />
                <div className='h-6 bg-gray-200 rounded w-5/6' />
                <div className='flex gap-4'>
                  <div className='h-4 bg-gray-200 rounded flex-1' />
                  <div className='h-4 bg-gray-200 rounded flex-1' />
                </div>
                <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                  <div className='h-8 bg-gray-200 rounded-full w-24' />
                  <div className='h-8 bg-gray-200 rounded w-20' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4'>
        <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse'>
          <BookOpen className='w-12 h-12 text-gray-400' />
        </div>
        <h3 className='text-xl font-bold text-gray-900 mb-2'>No Courses Found</h3>
        <p className='text-gray-600 text-center max-w-md'>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className='relative group'>
      {/* Navigation Buttons */}
      <button
        onClick={() => scrollTo("left")}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-orange hover:bg-orange shadow-lg rounded-full p-3 transition-all duration-300 ${
          canScrollLeft ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label='Scroll left'
      >
        <ChevronLeft className='w-6 h-6 text-gray-800' />
      </button>

      <button
        onClick={() => scrollTo("right")}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-orange hover:bg-orange shadow-lg rounded-full p-3 transition-all duration-300 ${
          canScrollRight ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label='Scroll right'
      >
        <ChevronRight className='w-6 h-6 text-gray-800' />
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        className='flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {duplicatedCourses.map((course, index) => (
          <div
            key={`${course.id}-${index}`}
            className='shrink-0 transform transition-transform duration-300 hover:scale-105'
            style={{
              width: "calc((100% - 90px) / 3.5)", // Desktop: 3.5 cards
              minWidth: "280px", // Mobile: at least 280px
            }}
          >
            <CourseCard
              {...course}
              onEnroll={onEnroll}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              isInCart={cartItems.has(course.id)}
              isInWishlist={wishlistItems.has(course.id)}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlays for fade effect */}
      <div className='absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent pointer-events-none' />
      <div className='absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent pointer-events-none' />
    </div>
  );
});

export default CourseSlider;
