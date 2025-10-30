"use client";

import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const cards = [
  {
    id: 1,
    icon: BookOpen,
    title: "Discover New Books Every Day",
    gradient: "from-orange-100 to-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Explore Amazing Stories",
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: 3,
    icon: Star,
    title: "Rated by Thousands",
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Trending This Week",
    gradient: "from-pink-100 to-pink-50",
    iconColor: "text-pink-500",
  },
];

const images = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
];

export default function RightSidebar() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll images
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Auto-scroll cards
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentCardIndex(prev => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentCard = cards[currentCardIndex];
  if (!currentCard) return null;
  const CurrentIcon = currentCard.icon;

  return (
    <aside className=' xl:block sticky top-28 right-0 xl:w-65  h-[calc(100vh-7rem)] z-40'>
      <div
        className='h-full overflow-y-auto px-4 py-6'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className=' w-full flex
        flex-row flex-wrap xl:flex-col justify-center gap-4 '
        >
          {/* Image Slider */}
          <div className='relative group rounded-2xl overflow-hidden flex-1 shadow-sm hover:shadow-md transition-shadow duration-300'>
            <div className='relative h-48 bg-gray-100'>
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Book ${index + 1}`}
                  width={240}
                  height={192}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
                }
                className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
                aria-label='Previous image'
              >
                <ChevronLeft className='w-4 h-4 text-gray-700' />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
                aria-label='Next image'
              >
                <ChevronRight className='w-4 h-4 text-gray-700' />
              </button>

              {/* Dot Indicators */}
              <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/60 hover:bg-white/80 w-2"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card Slider */}
          <div className='relative flex-1 group'>
            <div
              className={`bg-linear-to-br ${currentCard.gradient} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 min-h-[180px]`}
            >
              <div className={`${currentCard.iconColor} mb-3`}>
                <CurrentIcon className='w-10 h-10' />
              </div>
              <p className='text-sm font-medium text-gray-800 leading-relaxed'>
                {currentCard.title}
              </p>

              {/* Card Dot Indicators */}
              <div className='flex gap-1.5 mt-4'>
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentCardIndex
                        ? "bg-gray-600 w-6"
                        : "bg-gray-300 w-1.5 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Card Navigation Arrows */}
            <button
              onClick={() => setCurrentCardIndex(prev => (prev - 1 + cards.length) % cards.length)}
              className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              aria-label='Previous card'
            >
              <ChevronLeft className='w-4 h-4 text-gray-700' />
            </button>
            <button
              onClick={() => setCurrentCardIndex(prev => (prev + 1) % cards.length)}
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              aria-label='Next card'
            >
              <ChevronRight className='w-4 h-4 text-gray-700' />
            </button>
          </div>

          {/* Static Cards */}
          <div className='space-y-4 flex-1'>
            {cards.slice(0, 2).map(card => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className={`bg-linear-to-br ${card.gradient} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100`}
                >
                  <div className={`${card.iconColor} mb-3`}>
                    <Icon className='w-10 h-10' />
                  </div>
                  <p className='text-sm font-medium text-gray-800 leading-relaxed'>{card.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
    </aside>
  );
}
