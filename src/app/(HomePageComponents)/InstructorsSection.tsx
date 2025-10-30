"use client";

import { ArrowRight, Share2 } from "lucide-react";
import Image from "next/image";

interface Instructor {
  id: number;
  name: string;
  title: string;
  image: string;
  borderColor: string;
}

const instructors: Instructor[] = [
  {
    id: 1,
    name: "Esther Howard",
    title: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    borderColor: "border-orange-500",
  },
  {
    id: 2,
    name: "Beverly Hathcock",
    title: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    borderColor: "border-orange-500",
  },
  {
    id: 3,
    name: "Donald Gonzales",
    title: "Junior Instructor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    borderColor: "border-orange-500",
  },
  {
    id: 4,
    name: "Eddie Lenz",
    title: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    borderColor: "border-orange-500",
  },
];

export default function InstructorsSection() {
  return (
    <section className='py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div className='space-y-6 lg:pr-8'>
            {/* Badge */}
            <div className='inline-block'>
              <span className='px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold uppercase tracking-wide'>
                Our Instructor
              </span>
            </div>

            {/* Heading */}
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 leading-tight'>
              Meet Our Expert
              <br />
              Instructor
            </h2>

            {/* Description */}
            <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris...
            </p>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
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
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {instructors.map(instructor => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Instructor Card Component
interface InstructorCardProps {
  instructor: Instructor;
}

function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div
      className={`
        group relative bg-white rounded-2xl overflow-hidden 
        border-4 ${instructor.borderColor} 
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 hover:-translate-y-2
      `}
    >
      {/* Share Button */}
      <button className='absolute top-4 right-4 z-10 p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110'>
        <Share2 className='w-5 h-5' />
      </button>

      {/* Instructor Image */}
      <div className='relative h-72 sm:h-80 overflow-hidden'>
        <Image
          width={400}
          height={400}
          src={instructor.image}
          alt={instructor.name}
          className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500'
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Instructor Info Card */}
      <div className='absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-gray-900 mb-1'>{instructor.name}</h3>
            <p className='text-sm text-gray-500 font-medium'>{instructor.title}</p>
          </div>
          {/* Decorative Arrow Icon */}
          <div className='flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg'>
            <svg
              className='w-6 h-6 text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
