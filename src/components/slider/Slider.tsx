import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SliderProps {
  slides: React.ReactNode[] | { content: React.ReactNode; id?: string | number }[];
  visibleCount?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  gap?: number;
  breakpoints?: {
    [key: number]: { visibleCount: number; gap: number };
  };
  transitionDuration?: number;
  customArrows?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
  onSlideChange?: (currentIndex: number) => void;
  direction?: "horizontal" | "vertical";
  reverseOnEnd?: boolean; // New prop to enable reverse behavior
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
  direction = "horizontal",
  reverseOnEnd = false, // Default to false for backward compatibility
}) => {
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

  // For infinite loop, we clone slides at the beginning and end
  const extendedSlides = useMemo(() => {
    if (!loop || normalizedSlides.length <= visibleCount) {
      return normalizedSlides;
    }

    const cloneBefore = normalizedSlides.slice(-visibleCount).map((slide, idx) => ({
      ...slide,
      id: `clone-before-${idx}`,
    }));

    const cloneAfter = normalizedSlides.slice(0, visibleCount).map((slide, idx) => ({
      ...slide,
      id: `clone-after-${idx}`,
    }));

    return [...cloneBefore, ...normalizedSlides, ...cloneAfter];
  }, [normalizedSlides, loop, visibleCount]);

  const [currentIndex, setCurrentIndex] = useState(loop ? visibleCount : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentVisibleCount, setCurrentVisibleCount] = useState(visibleCount);
  const [currentGap, setCurrentGap] = useState(gap || 16);
  const [isReversed, setIsReversed] = useState(false); // Track direction state

  const totalPages = useMemo(() => {
    return Math.ceil(normalizedSlides.length / currentVisibleCount);
  }, [normalizedSlides.length, currentVisibleCount]);

  const isAtStart = !loop && currentIndex === 0;
  const isAtEnd = !loop && currentIndex >= normalizedSlides.length - currentVisibleCount;

  const goToSlide = useCallback(
    (index: number, immediate = false) => {
      if (isTransitioning && !immediate) return;

      setCurrentIndex(index);
      setIsTransitioning(true);

      const timeout = immediate ? 0 : transitionDuration;

      setTimeout(() => {
        setIsTransitioning(false);
      }, timeout);
    },
    [isTransitioning, transitionDuration]
  );

  const handleTransitionEnd = useCallback(() => {
    if (!loop) return;

    // If we're at a cloned slide, jump to the real slide without transition
    if (currentIndex <= 0) {
      // We're in the "before" clones, jump to end
      const realIndex = normalizedSlides.length;
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(realIndex);
      }, 0);
    } else if (currentIndex >= normalizedSlides.length + visibleCount) {
      // We're in the "after" clones, jump to beginning
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(visibleCount);
      }, 0);
    }
  }, [loop, currentIndex, visibleCount, normalizedSlides.length]);

  const nextSlide = useCallback(() => {
    if (!loop && isAtEnd) {
      if (reverseOnEnd) {
        setIsReversed(true);
        return;
      }
      return;
    }

    const newIndex = currentIndex + 1;
    goToSlide(newIndex);

    // Calculate the actual slide index (excluding clones)
    const actualIndex = loop
      ? (((newIndex - visibleCount) % normalizedSlides.length) + normalizedSlides.length) %
        normalizedSlides.length
      : newIndex;
    onSlideChange?.(actualIndex);
  }, [
    currentIndex,
    isAtEnd,
    loop,
    goToSlide,
    onSlideChange,
    visibleCount,
    normalizedSlides.length,
    reverseOnEnd,
  ]);

  const prevSlide = useCallback(() => {
    if (!loop && isAtStart) {
      if (reverseOnEnd) {
        setIsReversed(false);
        return;
      }
      return;
    }

    const newIndex = currentIndex - 1;
    goToSlide(newIndex);

    const actualIndex = loop
      ? (((newIndex - visibleCount) % normalizedSlides.length) + normalizedSlides.length) %
        normalizedSlides.length
      : newIndex;
    onSlideChange?.(actualIndex);
  }, [
    currentIndex,
    isAtStart,
    loop,
    goToSlide,
    onSlideChange,
    visibleCount,
    normalizedSlides.length,
    reverseOnEnd,
  ]);

  const goToPage = useCallback(
    (pageIndex: number) => {
      const targetIndex = loop ? pageIndex + visibleCount : pageIndex;
      goToSlide(targetIndex);
      onSlideChange?.(pageIndex);
    },
    [goToSlide, loop, visibleCount, onSlideChange]
  );

  // Autoplay with reverse support
  const autoplayAction = useCallback(() => {
    if (reverseOnEnd) {
      if (isReversed) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      nextSlide();
    }
  }, [reverseOnEnd, isReversed, nextSlide, prevSlide]);

  // Reset autoplay
  const resetAutoplay = useCallback(() => {
    if (!autoplay) return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(autoplayAction, autoplayInterval);
  }, [autoplay, autoplayAction, autoplayInterval]);

  useEffect(() => {
    if (!autoplay) return;

    resetAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, resetAutoplay]);

  const handleMouseEnter = useCallback(() => {
    if (autoplay && autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, [autoplay]);

  const handleMouseLeave = useCallback(() => {
    if (autoplay) {
      resetAutoplay();
    }
  }, [autoplay, resetAutoplay]);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    const firstTouch = e.targetTouches.item(0);
    if (!firstTouch) return;
    setTouchEnd(null);
    setTouchStart(direction === "horizontal" ? firstTouch.clientX : firstTouch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const firstTouch = e.targetTouches.item(0);
    if (!firstTouch) return;
    setTouchEnd(direction === "horizontal" ? firstTouch.clientX : firstTouch.clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isForwardSwipe = distance > minSwipeDistance;
    const isBackwardSwipe = distance < -minSwipeDistance;

    if (isForwardSwipe) {
      nextSlide();
    } else if (isBackwardSwipe) {
      prevSlide();
    }

    setIsDragging(false);
    resetAutoplay();
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (direction === "horizontal") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevSlide();
          resetAutoplay();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          nextSlide();
          resetAutoplay();
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          prevSlide();
          resetAutoplay();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          nextSlide();
          resetAutoplay();
        }
      }
    },
    [prevSlide, nextSlide, resetAutoplay, direction]
  );

  const translateValue = useMemo(() => {
    const slideSize = 100 / currentVisibleCount;
    const gapAdjustment = (currentGap * currentIndex) / currentVisibleCount;
    return -(currentIndex * slideSize);
  }, [currentIndex, currentVisibleCount, currentGap]);

  const currentPageIndex = useMemo(() => {
    if (loop) {
      const actualIndex =
        (((currentIndex - visibleCount) % normalizedSlides.length) + normalizedSlides.length) %
        normalizedSlides.length;
      return actualIndex;
    }
    return currentIndex;
  }, [currentIndex, loop, visibleCount, normalizedSlides.length]);

  const isHorizontal = direction === "horizontal";

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
      <div
        className='overflow-hidden relative'
        style={!isHorizontal ? { height: "100%" } : {}}
      >
        <div
          className={`flex ${isHorizontal ? "flex-row" : "flex-col"} ${isDragging ? "" : "transition-transform ease-out"}`}
          style={{
            transform: isHorizontal
              ? `translateX(${translateValue}%)`
              : `translateY(${translateValue}%)`,
            transitionDuration: isDragging ? "0ms" : `${transitionDuration}ms`,
            gap: `${currentGap}px`,
            height: !isHorizontal ? "100%" : "auto",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={slide.id}
              className='flex shrink-0 select-none'
              style={{
                [isHorizontal ? "flexBasis" : "minHeight"]:
                  `calc(${100 / currentVisibleCount}% - ${(currentGap * (currentVisibleCount - 1)) / currentVisibleCount}px)`,
                width: !isHorizontal ? "100%" : "auto",
              }}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {showArrows && normalizedSlides.length > currentVisibleCount && (
        <>
          <button
            onClick={() => {
              prevSlide();
              resetAutoplay();
            }}
            disabled={isAtStart && !reverseOnEnd}
            className={`absolute ${
              isHorizontal ? "left-2 top-1/2 -translate-y-1/2" : "top-2 left-1/2 -translate-x-1/2"
            } z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 
              transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label='Previous slide'
          >
            {customArrows?.prev ||
              (isHorizontal ? (
                <ChevronLeft className='w-6 h-6 text-gray-800' />
              ) : (
                <ChevronUp className='w-6 h-6 text-gray-800' />
              ))}
          </button>

          <button
            onClick={() => {
              nextSlide();
              resetAutoplay();
            }}
            disabled={isAtEnd && !reverseOnEnd}
            className={`absolute ${
              isHorizontal
                ? "right-2 top-1/2 -translate-y-1/2"
                : "bottom-2 left-1/2 -translate-x-1/2"
            } z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 
              transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label='Next slide'
          >
            {customArrows?.next ||
              (isHorizontal ? (
                <ChevronRight className='w-6 h-6 text-gray-800' />
              ) : (
                <ChevronDown className='w-6 h-6 text-gray-800' />
              ))}
          </button>
        </>
      )}

      {showDots && normalizedSlides.length > 1 && (
        <div
          className={`flex ${isHorizontal ? "flex-row" : "flex-col"} justify-center gap-2 ${isHorizontal ? "mt-4" : "absolute right-4 top-1/2 -translate-y-1/2"}`}
          role='tablist'
        >
          {normalizedSlides.map((_, pageIndex) => {
            const isActive = currentPageIndex === pageIndex;
            return (
              <button
                key={pageIndex}
                onClick={() => {
                  goToPage(pageIndex);
                  resetAutoplay();
                }}
                className={`rounded-full transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${
                    isActive
                      ? `bg-blue-600 ${isHorizontal ? "w-8 h-2.5" : "w-2.5 h-8"}`
                      : `bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5`
                  }`}
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
export default Slider;
