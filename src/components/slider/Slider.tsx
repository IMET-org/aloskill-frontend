import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Slider Component - A fully reusable, accessible carousel/slider
 *
 * @component
 * @example
 * ```tsx
 * <Slider
 *   slides={[<div>Slide 1</div>, <div>Slide 2</div>]}
 *   visibleCount={1}
 *   autoplay
 *   loop
 * />
 * ```
 */

interface SliderProps {
  /** Array of slide content (React nodes or objects with 'content' property) */
  slides: React.ReactNode[] | { content: React.ReactNode; id?: string | number }[];

  /** Number of slides visible at once */
  visibleCount?: number;

  /** Enable infinite loop */
  loop?: boolean;

  /** Enable autoplay */
  autoplay?: boolean;

  /** Autoplay interval in milliseconds */
  autoplayInterval?: number;

  /** Show navigation arrows */
  showArrows?: boolean;

  /** Show pagination dots */
  showDots?: boolean;

  /** Additional CSS classes for container */
  className?: string;

  /** Gap between slides in pixels */
  gap?: number;

  /** Responsive breakpoints for visibleCount and gap */
  breakpoints?: {
    [key: number]: { visibleCount: number; gap: number };
  };

  /** Transition duration in milliseconds */
  transitionDuration?: number;

  /** Custom arrow components */
  customArrows?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };

  /** Callback when slide changes */
  onSlideChange?: (currentIndex: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  visibleCount = 1,
  loop = false,
  autoplay = false,
  autoplayInterval = 3000,
  showArrows = true,
  showDots = true,
  className = "",
  gap = 16,
  breakpoints,
  transitionDuration = 300,
  customArrows,
  onSlideChange,
}) => {
  // Normalize slides to always have consistent structure
  const normalizedSlides = useMemo(() => {
    return slides.map((slide, index) => {
      if (slide == null) {
        return { content: null, id: index };
      }

      if (React.isValidElement(slide) || typeof slide === "string" || typeof slide === "number") {
        return { content: slide, id: index };
      }

      if (typeof slide === "object" && "content" in slide) {
        const typedSlide = slide as { content: React.ReactNode; id?: string | number };
        return { content: typedSlide.content, id: typedSlide.id ?? index };
      }

      return { content: null, id: index };
    });
  }, [slides]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Responsive state
  const [currentVisibleCount, setCurrentVisibleCount] = useState(visibleCount);
  const [currentGap, setCurrentGap] = useState(gap || 16);

  // Calculate total pages based on visible count
  const totalPages = useMemo(() => {
    return Math.ceil(normalizedSlides.length / currentVisibleCount);
  }, [normalizedSlides.length, currentVisibleCount]);

  // Check if we're at boundaries
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= normalizedSlides.length - currentVisibleCount;

  /**
   * Navigate to a specific slide index
   */
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      let newIndex = index;

      // Handle looping logic
      if (loop) {
        if (index < 0) {
          newIndex = normalizedSlides.length - currentVisibleCount;
        } else if (index > normalizedSlides.length - currentVisibleCount) {
          newIndex = 0;
        }
      } else {
        // Clamp to valid range
        newIndex = Math.max(0, Math.min(index, normalizedSlides.length - currentVisibleCount));
      }

      setCurrentIndex(newIndex);
      setIsTransitioning(true);
      onSlideChange?.(newIndex);

      // Reset transition state
      setTimeout(() => setIsTransitioning(false), transitionDuration);
    },
    [
      isTransitioning,
      loop,
      normalizedSlides.length,
      currentVisibleCount,
      transitionDuration,
      onSlideChange,
    ]
  );

  /**
   * Navigate to next slide
   */
  const nextSlide = useCallback(() => {
    if (!loop && isAtEnd) return;
    goToSlide(currentIndex + visibleCount);
  }, [currentIndex, visibleCount, isAtEnd, loop, goToSlide]);

  /**
   * Navigate to previous slide
   */
  const prevSlide = useCallback(() => {
    if (!loop && isAtStart) return;
    goToSlide(currentIndex - visibleCount);
  }, [currentIndex, visibleCount, isAtStart, loop, goToSlide]);

  /**
   * Navigate to specific page (for dots)
   */
  const goToPage = useCallback(
    (pageIndex: number) => {
      goToSlide(pageIndex * visibleCount);
    },
    [visibleCount, goToSlide]
  );

  /**
   * Setup and cleanup autoplay
   */
  useEffect(() => {
    if (!autoplay) return;

    const startAutoplay = () => {
      autoplayRef.current = setInterval(nextSlide, autoplayInterval);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayInterval, nextSlide]);

  /**
   * Pause autoplay on hover/focus
   */
  const handleMouseEnter = useCallback(() => {
    if (autoplay && autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  }, [autoplay]);

  const handleMouseLeave = useCallback(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(nextSlide, autoplayInterval);
    }
  }, [autoplay, nextSlide, autoplayInterval]);

  /**
   * Touch/Swipe handlers for mobile
   */
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    const firstTouch = e.targetTouches.item(0);
    if (!firstTouch) return;
    setTouchEnd(null);
    setTouchStart(firstTouch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const firstTouch = e.targetTouches.item(0);
    if (!firstTouch) return;
    setTouchEnd(firstTouch.clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setIsDragging(false);
  };

  /**
   * Keyboard navigation
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    },
    [prevSlide, nextSlide]
  );

  /**
   * Calculate transform for slide track
   */
  const translateX = useMemo(() => {
    const slideWidth = 100 / visibleCount;
    return -(currentIndex * slideWidth);
  }, [currentIndex, visibleCount]);

  return (
    <div
      ref={sliderRef}
      className={`relative w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role='region'
      aria-label='Content slider'
      aria-live={autoplay ? "polite" : "off"}
    >
      {/* Slider viewport */}
      <div className='overflow-hidden relative'>
        <div
          className={`flex transition-transform ease-out ${isDragging ? "duration-0" : ""}`}
          style={{
            transform: `translateX(${translateX}%)`,
            transitionDuration: isDragging ? "0ms" : `${transitionDuration}ms`,
            gap: `${currentGap}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {normalizedSlides.map((slide, index) => (
            <div
              key={slide.id}
              className='flex shrink-0 select-none'
              style={{
                flexBasis: `calc(${100 / currentVisibleCount}% - ${(currentGap * (currentVisibleCount - 1)) / currentVisibleCount}px)`,
              }}
              aria-hidden={index < currentIndex || index >= currentIndex + currentVisibleCount}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && normalizedSlides.length > visibleCount && (
        <>
          <button
            onClick={prevSlide}
            disabled={!loop && isAtStart}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 
              bg-white/90 hover:bg-white shadow-lg rounded-full p-2 
              transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label='Previous slide'
          >
            {customArrows?.prev || <ChevronLeft className='w-6 h-6 text-gray-800' />}
          </button>

          <button
            onClick={nextSlide}
            disabled={!loop && isAtEnd}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 
              bg-white/90 hover:bg-white shadow-lg rounded-full p-2 
              transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label='Next slide'
          >
            {customArrows?.next || <ChevronRight className='w-6 h-6 text-gray-800' />}
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && totalPages > 1 && (
        <div
          className='flex justify-center gap-2 mt-4'
          role='tablist'
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const isActive = Math.floor(currentIndex / visibleCount) === pageIndex;
            return (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isActive ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Go to slide ${pageIndex + 1}`}
                aria-current={isActive}
                role='tab'
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(Slider);

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Featured Courses Carousel
 */
// export function FeaturedCoursesCarousel() {
//   const courses = [
//     { id: 1, title: 'React Masterclass', image: '🎨', price: '$99' },
//     { id: 2, title: 'Node.js Backend', image: '⚙️', price: '$89' },
//     { id: 3, title: 'TypeScript Pro', image: '📘', price: '$79' },
//     { id: 4, title: 'Next.js Complete', image: '▲', price: '$109' },
//     { id: 5, title: 'Tailwind CSS', image: '💨', price: '$59' },
//     { id: 6, title: 'MongoDB Guide', image: '🍃', price: '$69' },
//   ];

//   const courseSlides = courses.map((course) => ({
//     id: course.id,
//     content: (
//       <div className="bg-white rounded-lg shadow-md p-6 h-64 flex flex-col justify-between">
//         <div>
//           <div className="text-5xl mb-4">{course.image}</div>
//           <h3 className="text-xl font-bold mb-2">{course.title}</h3>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-2xl font-bold text-blue-600">{course.price}</span>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//             Enroll
//           </button>
//         </div>
//       </div>
//     ),
//   }));

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h2 className="text-3xl font-bold mb-6">Featured Courses</h2>
//       <Slider
//         slides={courseSlides}
//         visibleCount={3}
//         autoplay
//         autoplayInterval={4000}
//         loop
//         showArrows
//         showDots
//         slideGap="gap-6"
//       />
//     </div>
//   );
// }

/**
 * Example 2: Testimonials Slider
 */
// export function TestimonialsSlider() {
//   const testimonials = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       role: 'Frontend Developer',
//       content: 'This platform transformed my career. The courses are practical and engaging!',
//       avatar: '👩‍💻',
//     },
//     {
//       id: 2,
//       name: 'Mike Chen',
//       role: 'Full Stack Engineer',
//       content: 'Best investment I made in my professional development this year.',
//       avatar: '👨‍💼',
//     },
//     {
//       id: 3,
//       name: 'Emma Davis',
//       role: 'UI/UX Designer',
//       content: 'The instructors are world-class. I learned more here than in my bootcamp.',
//       avatar: '👩‍🎨',
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-8">What Students Say</h2>
//       <Slider
//         slides={testimonials.map((t) => (
//           <div key={t.id} className="bg-white rounded-xl shadow-lg p-8 text-center">
//             <div className="text-6xl mb-4">{t.avatar}</div>
//             <p className="text-lg italic mb-4 text-gray-700">"{t.content}"</p>
//             <h4 className="font-bold text-lg">{t.name}</h4>
//             <p className="text-gray-500">{t.role}</p>
//           </div>
//         ))}
//         visibleCount={1}
//         autoplay
//         loop
//         showArrows
//         showDots
//       />
//     </div>
//   );
// }

/**
 * Example 3: Product Showcase (Homepage)
 */
// export function ProductShowcase() {
//   const products = [
//     { name: 'Laptop Pro', price: '$1,299', emoji: '💻' },
//     { name: 'Wireless Mouse', price: '$49', emoji: '🖱️' },
//     { name: 'Mechanical Keyboard', price: '$129', emoji: '⌨️' },
//     { name: 'Monitor 4K', price: '$499', emoji: '🖥️' },
//     { name: 'Headphones', price: '$199', emoji: '🎧' },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       <h2 className="text-3xl font-bold mb-6">Top Products</h2>
//       <Slider
//         slides={products.map((p, i) => (
//           <div key={i} className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center h-48 flex flex-col justify-center">
//             <div className="text-6xl mb-2">{p.emoji}</div>
//             <h3 className="text-xl font-bold">{p.name}</h3>
//             <p className="text-2xl font-bold mt-2">{p.price}</p>
//           </div>
//         ))}
//         visibleCount={2}
//         autoplay={false}
//         loop
//         slideGap="gap-4"
//       />
//     </div>
//   );
// }

/**
 * Example 4: Sidebar Ad Banner (Single slide with autoplay)
 */
// export function SidebarAdBanner() {
//   const ads = [
//     { title: '50% OFF', subtitle: 'Summer Sale!', bg: 'bg-red-500' },
//     { title: 'NEW', subtitle: 'Course Launch', bg: 'bg-green-500' },
//     { title: 'FREE', subtitle: 'Trial Week', bg: 'bg-blue-500' },
//   ];

//   return (
//     <div className="w-64">
//       <Slider
//         slides={ads.map((ad, i) => (
//           <div key={i} className={`${ad.bg} text-white rounded-lg p-6 h-32 flex flex-col justify-center`}>
//             <h3 className="text-3xl font-bold">{ad.title}</h3>
//             <p className="text-lg">{ad.subtitle}</p>
//           </div>
//         ))}
//         visibleCount={1}
//         autoplay
//         autoplayInterval={3000}
//         loop
//         showArrows={false}
//         showDots={true}
//       />
//     </div>
//   );
// }

// Demo Component showing all examples
// export default function SliderDemo() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-12 space-y-16">
//       <FeaturedCoursesCarousel />
//       <TestimonialsSlider />
//       <ProductShowcase />
//       <div className="flex justify-center">
//         <SidebarAdBanner />
//       </div>
//     </div>
//   );
// }
