"use client";

import Slider from "@/components/slider/Slider.tsx";
import { useState } from "react";
import CourseCard from "../courses/CourseCard.tsx";
import type { CourseCardProps } from "../courses/allCourses.types.ts";

interface FeaturedCoursesCarouselProps {
  courses: Omit<
    CourseCardProps,
    "onEnroll" | "onAddToCart" | "onAddToWishlist" | "isInCart" | "isInWishlist"
  >[];
}

export default function FeaturedCoursesCarousel({ courses }: FeaturedCoursesCarouselProps) {
  const [cartItems, setCartItems] = useState(new Set<string>());
  const [wishlistItems, setWishlistItems] = useState(new Set<string>());

  const handleEnroll = (courseId: string | number) => {
    console.log(`Enrolling in course ${courseId}`);
    // Add your enrollment logic (redirect to checkout, etc.)
  };

  const handleAddToCart = (courseId: string | number) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(String(courseId))) {
        newSet.delete(String(courseId));
      } else {
        newSet.add(String(courseId));
      }
      return newSet;
    });
  };

  const handleAddToWishlist = async (courseId: string | number) => {
    // Simulate API call
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setWishlistItems(prev => {
          const newSet = new Set(prev);
          if (newSet.has(String(courseId))) {
            newSet.delete(String(courseId));
          } else {
            newSet.add(String(courseId));
          }
          return newSet;
        });
        resolve();
      }, 300);
    });
  };

  // Map courses to CourseCard components
  const courseSlides = courses.map(course => (
    <CourseCard
      key={course.id}
      {...course}
      onEnroll={handleEnroll}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
      isInCart={cartItems.has(String(course.id))}
      isInWishlist={wishlistItems.has(String(course.id))}
    />
  ));

  return (
    <section className='w-full'>
      <Slider
        reverseOnEnd={true}
        slides={courseSlides}
        visibleCount={4}
        loop={false}
        autoplay
        autoplayInterval={1000}
        showArrows
        showDots
        direction='horizontal'
        gap={16}
        transitionDuration={500}
        breakpoints={{
          1280: { visibleCount: 4, gap: 24 },
          768: { visibleCount: 3, gap: 16 },
          640: { visibleCount: 1, gap: 12 },
        }}
      />
    </section>
  );
}
