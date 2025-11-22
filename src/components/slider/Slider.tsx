"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* -------------------------
   Types
--------------------------*/
export interface SlideItem {
  id?: string;
  content: React.ReactNode;
}

export interface SliderBreakpoint {
  visibleCount: number;
}

export interface SliderProps {
  slides: React.ReactNode[] | SlideItem[];
  visibleCount?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  breakpoints?: Record<number, SliderBreakpoint>;
  className?: string;
  slideClassName?: string;
  ariaLabel?: string;
  centerMode?: boolean;
  snap?: "none" | "mandatory";
  onChange?: (currentIndex: number) => void;
  prefersReducedMotion?: boolean;
}

/* -------------------------
   Helpers
--------------------------*/
const normalizeSlides = (slides: React.ReactNode[] | SlideItem[]): SlideItem[] =>
  slides.map((s, i) =>
    React.isValidElement(s) || typeof s === "string" || typeof s === "number"
      ? { id: `slide-${i}`, content: s }
      : { id: (s as SlideItem).id || `slide-${i}`, content: (s as SlideItem).content }
  );

const usePrefersReducedMotion = (fallback = false) => {
  const [reduced, setReduced] = useState(fallback);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/* -------------------------
   Component
--------------------------*/
const Slider: React.FC<SliderProps> = ({
  slides,
  visibleCount: initialVisibleCount = 1,
  loop = false,
  autoplay = false,
  autoplayInterval = 4000,
  showArrows = true,
  showDots = true,
  breakpoints,
  className = "",
  slideClassName = "",
  ariaLabel = "carousel",
  centerMode = false,
  snap = "none",
  onChange,
  prefersReducedMotion,
}) => {
  // Normalize slides
  const baseSlides = useMemo(() => normalizeSlides(slides), [slides]);
  const totalBase = baseSlides.length;

  // responsive visibleCount (useLayoutEffect for less flicker)
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  useLayoutEffect(() => {
    if (!breakpoints) {
      setVisibleCount(initialVisibleCount);
      return;
    }
    const update = () => {
      const w = window.innerWidth;
      const keys = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a);
      for (const k of keys) {
        if (w >= k) {
          setVisibleCount(breakpoints[k]?.visibleCount ?? initialVisibleCount);
          return;
        }
      }
      setVisibleCount(initialVisibleCount);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoints, initialVisibleCount]);

  // clones for seamless loop
  const clonesCount = loop ? visibleCount : 0;
  const slidesWithClones = useMemo(() => {
    if (!loop || totalBase === 0) return baseSlides;
    const head = baseSlides.slice(0, clonesCount).map((s, i) => ({
      ...s,
      id: `clone-head-${i}-${s.id}`,
    }));
    const tail = baseSlides.slice(-clonesCount).map((s, i) => ({
      ...s,
      id: `clone-tail-${i}-${s.id}`,
    }));
    return [...tail, ...baseSlides, ...head];
  }, [loop, baseSlides, clonesCount, totalBase]);

  const totalSlides = slidesWithClones.length;
  const firstRealIndex = clonesCount; // index of baseSlides[0] inside slidesWithClones
  const lastRealIndex = firstRealIndex + totalBase - 1;

  // reduced motion
  const reducedFromSystem = usePrefersReducedMotion(false);
  const shouldReduceMotion = prefersReducedMotion ?? reducedFromSystem;

  // state
  const [current, setCurrent] = useState(firstRealIndex); // index in slidesWithClones
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [trackWidthOnDrag, setTrackWidthOnDrag] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // refs
  const trackRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const interactionTimeoutRef = useRef<number | null>(null);

  // clamp helper (in real-index space)
  const clampRealIndex = useCallback(
    (realIndex: number) => {
      if (totalBase === 0) return firstRealIndex;
      if (realIndex < 0) return 0;
      if (realIndex >= totalBase) return totalBase - 1;
      return realIndex;
    },
    [totalBase, firstRealIndex]
  );

  /* -------------------------
     NAVIGATION (all updates go through these)
  --------------------------*/
  // internal setter that keeps clones in mind; target is real slide index (0..totalBase-1)
  const goToReal = useCallback(
    (realIdx: number, { immediate = false } = {}) => {
      if (totalBase === 0) return;
      // compute the target index in slidesWithClones
      const target = firstRealIndex + Math.max(0, Math.min(realIdx, totalBase - 1));

      // if already transitioning, ignore (prevents double-trigger)
      if (isTransitioning && !immediate) return;

      // perform transition
      setIsTransitioning(!immediate && !shouldReduceMotion);
      setCurrent(target);
      onChange?.(Math.max(0, Math.min(realIdx, totalBase - 1)));

      if (!shouldReduceMotion && !immediate) {
        // end of transition
        window.setTimeout(() => setIsTransitioning(false), 300);
      } else {
        setIsTransitioning(false);
      }
    },
    [firstRealIndex, isTransitioning, onChange, shouldReduceMotion, totalBase]
  );

  // go next/prev in real index steps
  const goToNext = useCallback(() => {
    if (totalBase === 0) return;
    const currentReal = (current - firstRealIndex + totalBase) % totalBase;
    let nextReal = currentReal + visibleCount;
    if (!loop) nextReal = Math.min(nextReal, totalBase - visibleCount);
    if (nextReal >= totalBase && !loop) return;
    if (loop) nextReal = nextReal % totalBase;
    goToReal(nextReal);
  }, [current, firstRealIndex, goToReal, loop, totalBase, visibleCount]);

  const goToPrev = useCallback(() => {
    if (totalBase === 0) return;
    const currentReal = (current - firstRealIndex + totalBase) % totalBase;
    let prevReal = currentReal - visibleCount;
    if (!loop) prevReal = Math.max(0, prevReal);
    if (prevReal < 0 && !loop) return;
    if (loop) {
      // wrap
      prevReal = ((prevReal % totalBase) + totalBase) % totalBase;
    }
    goToReal(prevReal);
  }, [current, firstRealIndex, goToReal, loop, totalBase, visibleCount]);

  const goToPage = useCallback(
    (pageIndex: number) => {
      const real = pageIndex * visibleCount;
      goToReal(real);
    },
    [goToReal, visibleCount]
  );

  /* -------------------------
     Autoplay
  --------------------------*/
  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (!autoplay || isPaused || totalBase <= visibleCount) return;
    autoplayRef.current = window.setInterval(
      () => {
        goToNext();
      },
      Math.max(500, autoplayInterval)
    );
  }, [autoplay, autoplayInterval, clearAutoplay, goToNext, isPaused, totalBase, visibleCount]);

  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay, current, isPaused]);

  // Pause/resume helpers with unified cleanup
  const pause = useCallback(() => {
    setIsPaused(true);
    clearAutoplay();
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  }, [clearAutoplay]);

  const resume = useCallback(() => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }
    // small delay so quick hover/focus won't restart immediately
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 400);
  }, []);

  /* -------------------------
     Drag / Swipe
  --------------------------*/
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!trackRef.current) return;
      (e.target as Element).setPointerCapture(e.pointerId);
      setIsDragging(true);
      setDragStartX(e.clientX);
      setDragOffsetX(0);
      setTrackWidthOnDrag(trackRef.current.offsetWidth);
      pause();
    },
    [pause]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const offset = e.clientX - dragStartX;
      setDragOffsetX(offset);
    },
    [isDragging, dragStartX]
  );

  const finalizeDrag = useCallback(() => {
    if (!isDragging) return;
    const threshold = Math.max(40, (trackWidthOnDrag || 1) * 0.12); // 12% or 40px min
    if (Math.abs(dragOffsetX) > threshold) {
      if (dragOffsetX > 0) goToPrev();
      else goToNext();
    }
    setIsDragging(false);
    setDragOffsetX(0);
    setTrackWidthOnDrag(null);
    resume();
  }, [isDragging, dragOffsetX, goToNext, goToPrev, resume, trackWidthOnDrag]);

  // Cancel drag (pointer leave) - should cancel rather than commit
  const cancelDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffsetX(0);
    setTrackWidthOnDrag(null);
    resume();
  }, [isDragging, resume]);

  /* -------------------------
     Keyboard
  --------------------------*/
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      pause();
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          goToReal(0);
          break;
        case "End":
          e.preventDefault();
          goToReal(totalBase - visibleCount);
          break;
      }
      resume();
    },
    [goToPrev, goToNext, goToReal, resume, pause, totalBase, visibleCount]
  );

  /* -------------------------
     Handle clone boundary correction after transition
     (When using clones, jump to the corresponding real slide without transition)
  --------------------------*/
  useEffect(() => {
    if (!loop) return;
    if (isTransitioning) return; // only correct after transition ends
    // if current landed on a clone head / tail, jump to equivalent real index (no transition)
    if (current < firstRealIndex) {
      // landed in tail-clone zone: map to equivalent real index
      const offsetFromTail = firstRealIndex - current; // e.g. 1 -> maps to last - 0
      const real = (totalBase - offsetFromTail) % totalBase;
      // jump immediately
      setCurrent(firstRealIndex + real);
      // no onChange because it's same slide; but call to keep external sync:
      onChange?.(real);
    } else if (current > lastRealIndex) {
      // landed in head-clone zone
      const offsetIntoHead = current - lastRealIndex - 1;
      const real = offsetIntoHead % totalBase;
      setCurrent(firstRealIndex + real);
      onChange?.(real);
    }
  }, [current, firstRealIndex, lastRealIndex, loop, onChange, totalBase, isTransitioning]);

  /* -------------------------
     Clamp current when visibleCount / totalBase changes
  --------------------------*/
  useEffect(() => {
    if (totalBase === 0) return;
    // compute real index and clamp to safe range
    const realIndex = (current - firstRealIndex + totalBase) % totalBase;
    const maxStart = Math.max(0, totalBase - visibleCount);
    const newReal = Math.min(realIndex, maxStart);
    if (newReal !== realIndex) {
      // immediate jump to clamped real index
      const target = firstRealIndex + newReal;
      setCurrent(target);
      onChange?.(newReal);
    }
  }, [visibleCount, totalBase]); // intentionally minimal deps

  /* -------------------------
     Cleanup timers on unmount
  --------------------------*/
  useEffect(
    () => () => {
      // cleanup
      clearAutoplay();
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    },
    [clearAutoplay]
  );

  /* -------------------------
     Render calculations
  --------------------------*/
  // width per slide in %
  const slideWidthPct = 100 / visibleCount;
  // translateX in percent (based on current index in slidesWithClones)
  const baseTranslate = -(current * slideWidthPct);
  // dragOffset expressed in percent of track width (use trackWidthOnDrag if exists, else compute)
  const trackWidth = trackRef.current?.offsetWidth ?? trackWidthOnDrag ?? 1;
  const dragPct = (dragOffsetX / trackWidth) * 100;
  const translateX = baseTranslate + dragPct;

  // pages/dots
  const totalPages = Math.max(1, Math.ceil(totalBase / visibleCount));
  const currentRealPage = Math.floor(
    ((current - firstRealIndex + totalBase) % totalBase) / visibleCount
  );

  /* -------------------------
     Edge cases: no slides or single slide
  --------------------------*/
  if (totalBase === 0) {
    return (
      <div
        className={`py-8 text-center text-gray-500 ${className}`}
        role='region'
        aria-label={ariaLabel}
      >
        No slides available
      </div>
    );
  }

  if (totalBase === 1 && !loop) {
    return (
      <div
        className={`relative ${className}`}
        role='region'
        aria-label={ariaLabel}
      >
        <div className='overflow-hidden'>
          <div className={`w-full ${slideClassName}`}>{baseSlides[0]!.content}</div>
        </div>
      </div>
    );
  }

  /* -------------------------
     JSX
  --------------------------*/
  return (
    <div
      className={`relative ${className}`}
      role='region'
      aria-roledescription='carousel'
      aria-label={ariaLabel}
      onMouseEnter={autoplay ? pause : undefined}
      onMouseLeave={autoplay ? resume : undefined}
      onFocus={autoplay ? pause : undefined}
      onBlur={autoplay ? resume : undefined}
    >
      {/* Live region for accessible announcements */}
      {autoplay && (
        <div
          className='sr-only'
          aria-live='polite'
          aria-atomic='true'
        >
          Slide {((current - firstRealIndex + totalBase) % totalBase) + 1} of {totalBase}
        </div>
      )}

      {/* Track container */}
      <div
        className='overflow-hidden'
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-roledescription='carousel'
      >
        <div
          ref={trackRef}
          className='flex gap-4'
          role='list'
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={e => {
            // release pointer capture
            try {
              (e.target as Element).releasePointerCapture?.((e as any).pointerId);
            } catch {}
            finalizeDrag();
          }}
          onPointerCancel={cancelDrag}
          onPointerLeave={() => {
            // if dragging -> cancel, otherwise do nothing
            if (isDragging) cancelDrag();
          }}
          style={{
            transform: `translateX(${translateX}%)`,
            transition:
              isTransitioning || (!isDragging && !shouldReduceMotion)
                ? "transform 300ms cubic-bezier(0.4,0,0.2,1)"
                : "none",
            touchAction: "pan-y",
            willChange: "transform",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {slidesWithClones.map((s, idx) => {
            const visible = idx >= current && idx < current + visibleCount;
            return (
              <div
                key={s.id || `${idx}`}
                role='listitem'
                aria-hidden={!visible}
                className={`flex-shrink-0 ${slideClassName}`}
                style={{ width: `${slideWidthPct}%` }}
              >
                {s.content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && totalBase > visibleCount && (
        <>
          <button
            aria-label='Previous slide'
            onClick={goToPrev}
            className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow z-10 disabled:opacity-50'
            disabled={!loop && current - firstRealIndex <= 0}
          >
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <path
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            aria-label='Next slide'
            onClick={goToNext}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow z-10 disabled:opacity-50'
            disabled={!loop && current - firstRealIndex >= totalBase - visibleCount}
          >
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <path
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalPages > 1 && (
        <div
          className='flex justify-center gap-2 mt-3'
          role='tablist'
          aria-label='Carousel pages'
        >
          {Array.from({ length: totalPages }).map((_, page) => (
            <button
              key={page}
              role='tab'
              aria-current={page === currentRealPage}
              aria-label={`Go to page ${page + 1}`}
              onClick={() => goToPage(page)}
              className={`rounded-full transition-all ${page === currentRealPage ? "w-6 h-2 bg-blue-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
