"use client";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function DiscoverBooksSectionCarousel() {
  //   const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const books = [
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
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 450.0,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      rating: 5,
      reviews: 134,
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 450.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      rating: 5,
      reviews: 134,
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 450.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      rating: 5,
      reviews: 134,
    },
    {
      id: 5,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 450.0,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      rating: 5,
      reviews: 134,
    },
    {
      id: 6,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 450.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      rating: 5,
      reviews: 134,
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleWishlist = (bookId: number) => {
    setWishlist(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  return (
    <section className='py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-12'>
          <div className='max-w-xl mb-6 md:mb-0'>
            <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-4'>
              Discover New Books Every Day
            </h2>
            <p className='text-gray-600 text-lg'>
              Explore handpicked books from top authors. Read ebooks or order physical copies
              straight to your door.
            </p>
          </div>
          <button className='px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all font-semibold shadow-lg'>
            Browse All Books
          </button>
        </div>

        {/* Books Carousel */}
        <div className='relative'>
          <div
            ref={scrollContainerRef}
            className='flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {books.map(book => (
              <div
                key={book.id}
                className='flex-none w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all'
              >
                <div className='relative bg-gray-100 rounded-xl mb-4 p-6 h-64 flex items-center justify-center'>
                  <Image
                    width={200}
                    height={300}
                    src={book.image}
                    alt={book.title}
                    className='h-full w-auto object-contain'
                  />
                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className='absolute top-3 right-3 p-2 bg-white rounded-full shadow-md'
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(book.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between items-start'>
                    <h3 className='text-lg font-bold text-gray-900'>{book.title}</h3>
                    <span className='text-xl font-bold'>৳{book.price.toFixed(2)}</span>
                  </div>
                  <p className='text-gray-600 text-sm'>{book.author}</p>
                  <div className='flex items-center gap-2'>
                    <div className='flex'>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className='w-4 h-4 text-yellow-400 fill-yellow-400'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      ))}
                    </div>
                    <span className='text-sm text-gray-600'>({book.reviews})</span>
                  </div>
                  <button className='w-full py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all font-semibold'>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className='flex justify-center gap-4 mt-8'>
          <button
            onClick={() => scroll("left")}
            className='p-3 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all shadow-md'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            onClick={() => scroll("right")}
            className='p-3 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all shadow-md'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      </div>
    </section>
  );
}
