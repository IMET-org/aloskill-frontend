// File: components/home/PopularCoursesSection.tsx
"use client";

import CourseGrid from "@/components/grids/CourseGrid";
import SectionHeader from "@/components/sections/SectionHeader";
import type { Course } from "@/types/course.types";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// Mock data - In production, fetch from API
const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    category: "Digital Marketing",
    categoryColor: "bg-blue-900",
    rating: 4.5,
    reviewCount: "4.5k",
    price: 50.0,
    originalPrice: 100.0,
    discount: 50,
    title: "IT Statistics Data Science And Business Analysis",
    lessons: 10,
    duration: "19h 30m",
    students: "20+",
    level: "Beginner",
    language: "English",
    certificate: true,
    instructor: {
      name: "Samantha",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
    },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    category: "Social Marketing",
    categoryColor: "bg-purple-700",
    rating: 4.5,
    reviewCount: "4.5k",
    price: 50.0,
    title: "Beginner Adobe Illustrator For Graphic Design",
    lessons: 10,
    duration: "19h 30m",
    students: "20+",
    level: "Beginner",
    language: "English",
    certificate: true,
    instructor: {
      name: "Charles",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charles",
    },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
    category: "Social Marketing",
    categoryColor: "bg-purple-700",
    rating: 4.5,
    reviewCount: "4.5k",
    price: 50.0,
    originalPrice: 75.0,
    discount: 33,
    title: "Starting SEO As Your Home Based Business",
    lessons: 8,
    duration: "19h 30m",
    students: "20+",
    level: "Intermediate",
    language: "English",
    certificate: true,
    instructor: {
      name: "Morgan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
    },
  },
];

/**
 * PopularCoursesSection Component
 * Production-ready section displaying popular courses with full functionality
 */
export default function PopularCoursesSection() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<Set<string | number>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());
  const router = useRouter();
  /**
   * Handle course enrollment
   * In production: Navigate to checkout or enrollment page
   */
  const handleEnroll = useCallback((courseId: string | number) => {
    console.log(`Enrolling in course: ${courseId}`);
    // TODO: Implement enrollment logic
    // - Check authentication
    // - Navigate to checkout
    // - Show confirmation modal
  }, []);

  /**
   * Handle add to cart
   * In production: Update cart state/context and show notification
   */
  const handleAddToCart = useCallback((courseId: string | number) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        console.log(`Removed course ${courseId} from cart`);
        // TODO: Show toast notification
      } else {
        newSet.add(courseId);
        console.log(`Added course ${courseId} to cart`);
        // TODO: Show toast notification
      }
      return newSet;
    });
  }, []);

  /**
   * Handle add to wishlist
   * In production: Update wishlist state/context and sync with backend
   */
  const handleAddToWishlist = useCallback(async (courseId: string | number) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        console.log(`Removed course ${courseId} from wishlist`);
        // TODO: API call to remove from wishlist
      } else {
        newSet.add(courseId);
        console.log(`Added course ${courseId} to wishlist`);
        // TODO: API call to add to wishlist
      }
      return newSet;
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }, []);

  /**
   * Handle load more courses
   * In production: Fetch next page from API
   */
  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);

    router.push("/courses");
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/courses?page=2&limit=6');
      // const newCourses = await response.json();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock: Add more courses (in production, append from API)
      const moreCourses: Course[] = [
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
          category: "Web Development",
          categoryColor: "bg-green-700",
          rating: 4.8,
          reviewCount: "3.2k",
          price: 45.0,
          title: "Full Stack Web Development Bootcamp",
          lessons: 15,
          duration: "25h 00m",
          students: "50+",
          level: "Advanced",
          language: "English",
          certificate: true,
          instructor: {
            name: "Alex",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          },
        },
      ];

      setCourses(prev => [...prev, ...moreCourses]);
      console.log("Loaded more courses");
    } catch (error) {
      console.error("Failed to load more courses:", error);
      // TODO: Show error toast notification
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section
      className='py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden'
      aria-labelledby='popular-courses-heading'
    >
      {/* Decorative Background Element */}
      <div
        className='absolute top-16 right-16 opacity-10 pointer-events-none'
        aria-hidden='true'
      >
        <Pencil className='w-32 h-32 text-orange-400 rotate-12' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}

        <SectionHeader
          badge='Top Popular Course'
          title={
            <>
              Aloskill Course Student Can
              <br />
              Join With Us.
            </>
          }
          showButton={true}
          buttonText='Load More Courses'
          onButtonClick={handleLoadMore}
          isLoading={isLoading}
        />

        {/* Courses Grid */}
        <CourseGrid
          courses={courses}
          isLoading={false}
          onEnroll={handleEnroll}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          emptyStateMessage='No popular courses available right now. Check back soon!'
        />
      </div>
    </section>
  );
}
