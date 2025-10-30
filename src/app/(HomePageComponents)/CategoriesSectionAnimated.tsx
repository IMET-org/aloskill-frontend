"use client";

import {
  ArrowRight,
  Briefcase,
  Camera,
  Code,
  GraduationCap,
  Heart,
  Laptop,
  Music,
  Palette,
} from "lucide-react";
import { useState } from "react";

const categoriesData = [
  {
    id: 1,
    icon: Code,
    title: "Development",
    subtitle: "Code with Confident",
    bgColor: "bg-yellow-50",
    iconColor: "text-purple-600",
    courses: 120,
  },
  {
    id: 2,
    icon: Palette,
    title: "UI/UX Design",
    subtitle: "Design with Confident",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    courses: 85,
  },
  {
    id: 3,
    icon: Heart,
    title: "Lifestyle",
    subtitle: "New Skills, New You",
    bgColor: "bg-orange-50",
    iconColor: "text-purple-500",
    courses: 95,
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Business",
    subtitle: "Improve your business",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-500",
    courses: 110,
  },
  {
    id: 5,
    icon: Camera,
    title: "Photography",
    subtitle: "Major or Minor",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
    courses: 65,
  },
  {
    id: 6,
    icon: Music,
    title: "Music",
    subtitle: "Control your Wallet",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    courses: 45,
  },
  {
    id: 7,
    icon: GraduationCap,
    title: "Teaching",
    subtitle: "High Education Level",
    bgColor: "bg-green-50",
    iconColor: "text-orange-500",
    courses: 75,
  },
  {
    id: 8,
    icon: Laptop,
    title: "Development",
    subtitle: "Improve your business",
    bgColor: "bg-purple-50",
    iconColor: "text-green-500",
    courses: 90,
  },
];

export function CategoriesSectionAnimated() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className='py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16 space-y-4'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 animate-fade-in'>
            Most demanding categories
          </h2>
          <p className='text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed animate-slide-up'>
            Learn from expert instructors in Bangla. Upgrade your skills with the most popular and
            effective online courses.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {categoriesData.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredId === category.id;

            return (
              <div
                key={category.id}
                className={`
                  group relative ${category.bgColor} rounded-2xl px-6 py-4
                  transition-all duration-300 
                  hover:shadow-xl hover:-translate-y-2
                  cursor-pointer border border-transparent hover:border-gray-200
                  ${isHovered ? "scale-105" : "scale-100"}
                `}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className='mb-4'>
                  <div
                    className={`
                    w-14 h-14 ${category.bgColor} rounded-xl 
                    flex items-center justify-center
                    transition-all duration-300
                    shadow-sm
                    ${isHovered ? "scale-110 rotate-6" : "scale-100 rotate-0"}
                  `}
                  >
                    <Icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className='space-y-1 mb-3'>
                  <h4
                    className={`
                    text-xl font-bold transition-colors
                    ${isHovered ? "text-orange-600" : "text-gray-900"}
                  `}
                  >
                    {category.title}
                  </h4>
                  <p className='text-sm text-gray-500 font-medium'>{category.subtitle}</p>
                </div>

                {/* Course Count (Shows on Hover) */}
                <div
                  className={`
                  flex items-center gap-2 text-sm font-semibold text-gray-700
                  transition-all duration-300
                  ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                `}
                >
                  <span>{category.courses} Courses</span>
                  <ArrowRight className='w-4 h-4' />
                </div>

                {/* Decorative Corner */}
                <div
                  className={`
                  absolute top-6 right-6 
                  transition-all duration-300
                  ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                `}
                >
                  <div className='w-8 h-8 bg-white/50 rounded-full flex items-center justify-center'>
                    <ArrowRight className='w-4 h-4 text-gray-600' />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className='text-center mt-12'>
          <button className='w-full sm:w-auto relative inline-flex h-14 active:scale-95 transition-all duration-700 overflow-hidden rounded-full p-[2px] focus:outline-none shadow-md hover:shadow-lg '>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DA7C36_0%,#f472b6_50%,#bd5fff_100%)]'></span>
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-900 backdrop-blur-3xl gap-2 hover:bg-[var(--color-orange)] hover:text-white transition-colors'>
              <span>Browse All Categories</span>
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </span>
          </button>
          {/* <button className='group inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg font-semibold'>
            <span>Browse All Categories</span>
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </button> */}
        </div>
      </div>
    </section>
  );
}
