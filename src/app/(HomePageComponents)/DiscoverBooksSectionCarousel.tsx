"use client";

import { BookCard } from "@/components/cards/BookCard.tsx";
import SectionHeader from "@/components/sections/SectionHeader.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

export function DiscoverBooksSectionCarousel() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 450.0,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
      rating: 5,
      reviews: 134,
    },
    {
      id: 2,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 520.0,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      rating: 5,
      reviews: 234,
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      price: 380.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      rating: 5,
      reviews: 567,
    },
    {
      id: 4,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 420.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      rating: 4,
      reviews: 189,
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      price: 490.0,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      rating: 5,
      reviews: 345,
    },
    {
      id: 6,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      price: 550.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      rating: 4,
      reviews: 278,
    },
  ];

  /* ------------------ AUTO SCROLL HELPERS ------------------ */

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();

    autoScrollRef.current = setInterval(() => {
      if (!scrollContainerRef.current || isPaused) return;

      const container = scrollContainerRef.current;
      container.scrollLeft += 1;

      // Loop when reaching end
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1
      ) {
        container.scrollLeft = 0;
      }
    }, 16); // ~60fps
  }, [isPaused]);

  const restartAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [startAutoScroll]);

  /* ------------------ MANUAL NAVIGATION ------------------ */

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const amount = 420;

    stopAutoScroll(); // IMPORTANT

    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - amount
          : container.scrollLeft + amount,
      behavior: "smooth",
    });

    // Resume auto-scroll after animation
    setTimeout(restartAutoScroll, 500);
  };

  /* ------------------ ACTIONS ------------------ */

  const toggleWishlist = (bookId: number) => {
    setWishlist(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleAddToCart = (bookId: number) => {
    console.log("Added to cart:", bookId);
  };

  /* ------------------ RENDER ------------------ */

  return (
    <section className="py-20 bg-gradient-to-br overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <SectionHeader
          title="Discover New Books Every Day"
          subtitle="Explore handpicked books from top authors."
          showButton
          buttonText="Browse All Books"
        />

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={stopAutoScroll}
            onMouseUp={restartAutoScroll}
          >
            {books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isInWishlist={wishlist.includes(book.id)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll("left")}
            className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 hover:bg-orange-50 transition-all shadow-md hover:scale-110"
            aria-label="Previous books"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 hover:bg-orange-50 transition-all shadow-md hover:scale-110"
            aria-label="Next books"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-md">
              Auto-scroll paused
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
