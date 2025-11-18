import React, { useCallback, useEffect, useRef, useState } from "react";
import "./autoSlider.css";
interface AutoPlaySliderProps {
  slides: number[];
  visibleCount?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const AutoPlaySlider: React.FC<AutoPlaySliderProps> = ({
  slides: initialSlides,
  visibleCount = 3,
  autoplay = true,
  autoplayInterval = 2000,
}) => {
  // Clone initial slides to avoid mutation
  const [nums, setNums] = useState<number[]>(() => [...initialSlides]);
  const [current, setCurrent] = useState<number>(visibleCount);
  const [needTransition, setNeedTransition] = useState<boolean>(true);
  const [direction, setDirection] = useState<"NEXT" | "PREV" | "">("");

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate slide width percentage
  const slideWidth = 100 / visibleCount;

  // Handle transition end - this is where the magic happens
  const handleTransitionEnd = useCallback(() => {
    if (!direction) return;

    if (direction === "NEXT") {
      // Move first slide(s) to the end
      const movedSlides = nums.slice(0, 1);
      const remainingSlides = nums.slice(1);
      setNums([...remainingSlides, ...movedSlides]);
      setCurrent(current - 1);
    } else if (direction === "PREV") {
      // Move last slide(s) to the beginning
      const movedSlides = nums.slice(-1);
      const remainingSlides = nums.slice(0, -1);
      setNums([...movedSlides, ...remainingSlides]);
      setCurrent(current + 1);
    }

    // Reset for next interaction
    setNeedTransition(false);
    setDirection("");

    // Re-enable transitions after DOM update
    requestAnimationFrame(() => {
      setNeedTransition(true);
    });
  }, [direction, nums, current]);

  // Next slide function
  const nextSlide = useCallback(() => {
    if (current >= nums.length - 1) return;

    setDirection("NEXT");
    setNeedTransition(true);
    setCurrent(current + 1);
  }, [current, nums.length]);

  // Previous slide function
  const prevSlide = useCallback(() => {
    if (current <= 0) return;

    setDirection("PREV");
    setNeedTransition(true);
    setCurrent(current - 1);
  }, [current]);

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return;

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, autoplayInterval);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayInterval, nextSlide]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay) {
      autoplayRef.current = setInterval(nextSlide, autoplayInterval);
    }
  };

  // Calculate transform value
  const translateValue = -(current * slideWidth);

  return (
    <div
      className='slider-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={sliderRef}
        className='slider-track'
        style={{
          transform: `translateX(${translateValue}%)`,
          transition: needTransition ? "transform 0.3s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {nums.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className='slide'
            style={{ width: `${slideWidth}%` }}
          >
            {item}
          </div>
        ))}
      </div>

      <div className='controls'>
        <button onClick={prevSlide}>Prev</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};
export default AutoPlaySlider;
// Example usage in a Next.js page
// export default function Home() {
//   return (
//     <div className='page-container'>
//       <h1>Seamless Infinite Loop Slider with Autoplay</h1>
//       <AutoPlaySlider
//         slides={[1, 2, 3, 4, 5, 6, 7]}
//         visibleCount={3}
//         autoplayInterval={2000}
//       />
//     </div>
//   );
// }
