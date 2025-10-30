"use client";

import { ArrowRight } from "lucide-react";

import { useState } from "react";

import InstructorCard from "@/app/(main)/instructors/InstructorCard";
import { instructorsData } from "@/app/(main)/instructors/instructorsData";

// import type { InstructorAdvanced } from "../instructor/instructorCard.types.ts";

// const instructorsAdvanced: Instructor[] = [
//   {
//     id: 1,
//     name: "Esther Howard",
//     title: "Senior Instructor",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     borderColor: "border-orange-500",
//     students: 1250,
//     courses: 12,
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     name: "Beverly Hathcock",
//     title: "Senior Instructor",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     borderColor: "border-orange-500",
//     students: 980,
//     courses: 8,
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     name: "Donald Gonzales",
//     title: "Junior Instructor",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
//     borderColor: "border-orange-500",
//     students: 650,
//     courses: 5,
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     name: "Eddie Lenz",
//     title: "Senior Instructor",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
//     borderColor: "border-orange-500",
//     students: 1100,
//     courses: 10,
//     rating: 4.9,
//   },
// ];

export function InstructorsSectionAdvanced() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const featuredInstructors = instructorsData.instructors
    .filter(instructor => instructor.featured)
    .slice(0, 4);
  return (
    <section className='py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div className='space-y-6 lg:pr-8 order-2 lg:order-1'>
            <div className='inline-block animate-fade-in'>
              <span className='px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold uppercase tracking-wide'>
                Our Instructor
              </span>
            </div>

            <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 leading-tight animate-slide-up'>
              Meet Our Expert
              <br />
              Instructor
            </h2>

            <p className='text-gray-600 text-base md:text-lg leading-relaxed animate-slide-up'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris...
            </p>

            <div className='flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up'>
              <button className='group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold'>
                <span>Contact Us</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
              <button className='flex items-center justify-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold'>
                <span>Find Courses</span>
                <ArrowRight className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Right - Instructors Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2'>
            {featuredInstructors.map(instructor => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor}
                isHovered={hoveredId === instructor.id}
                onHover={() => setHoveredId(instructor.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
