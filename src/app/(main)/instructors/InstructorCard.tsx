// components/InstructorCard.tsx - FIXED VERSION

import type { InstructorCardProps } from "@/types/instructor.types";
import { Award, Share2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function InstructorCard({
  instructor,
  isHovered,
  onHover,
  onLeave,
  animationDelay = 0,
}: InstructorCardProps) {
  console.log("instructorrrr::", instructor);
  // Generate a border color based on expertise or category
  const getBorderColor = () => {
    const categoryColors: { [key: string]: string } = {
      BUSINESS: "border-blue-500",
      MARKETING: "border-green-500",
      ENTREPRENEURSHIP: "border-purple-500",
      ICT: "border-orange-500",
      TECHNOLOGY: "border-cyan-500",
      DESIGN: "border-pink-500",
    };

    // Check if instructor has category field, otherwise use a default
    const category =
      instructor.category?.toUpperCase() ||
      instructor.title?.split(" ")[0]?.toUpperCase() ||
      "DEFAULT";

    return categoryColors[category] || "border-blue-500";
  };

  return (
    <Link href={`/instructors/${instructor.id}`}>
      <div
        className={`
         relative bg-white rounded-xl overflow-hidden
        border-4 ${getBorderColor()}
        shadow-lg hover:shadow-2xl
        transition-all duration-300 hover:-translate-y-2
        ${isHovered ? "scale-105" : "scale-100"}
        animate-fade-in-card
      `}
        style={{ animationDelay: `${animationDelay}ms` }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Share Button */}
        <button
          className='absolute top-4 right-4 z-10 p-2.5 bg-[#DA7C36] text-white rounded-full hover:bg-[#d15100] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110'
          onClick={e => {
            e.preventDefault();
            // Share functionality
            if (navigator.share) {
              navigator.share({
                title: instructor.displayName,
                text: `Check out ${instructor.displayName} `,
                url: window.location.href,
              });
            }
          }}
        >
          <Share2 className='w-5 h-5' />
        </button>

        {/* Instructor Image */}
        <div className='relative h-72 sm:h-80 overflow-hidden bg-gray-200'>
          <Image
            width={400}
            height={400}
            src={instructor.avaterUrl || ""}
            alt={instructor.displayName || "Instructor Image"}
            className='w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500'
            onError={e => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";
            }}
          />

          {/* Hover Overlay with Stats */}
          <div
            className={`
            absolute inset-0 bg-gradient-to-t from-[#074079]/95 via-[#074079]/80 to-transparent
            transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className='absolute bottom-20 left-0 right-0 p-4 space-y-3'>
              <div className='flex items-center justify-between text-white'>
                <div className='flex items-center gap-2'>
                  <Award className='w-5 h-5' />
                  <span className='text-sm font-semibold'>
                    {instructor.totalCourses && instructor.totalCourses > 0
                      ? `${instructor.totalCourses} Courses`
                      : instructor.displayName || "Instructor"}
                  </span>
                </div>
                {instructor.ratingAverage && instructor.ratingAverage > 0 && (
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                    <span className='text-sm font-semibold'>{instructor.ratingAverage}</span>
                  </div>
                )}
              </div>

              {/* Display students count */}
              <div className='text-white text-sm font-semibold'>
                {instructor.totalStudents && instructor.totalStudents > 0
                  ? `${instructor.totalStudents.toLocaleString()}+ Students`
                  : "New Instructor"}
              </div>

              {/* Skills tags */}
              {instructor.skills && instructor.skills.length > 0 && (
                <div className='flex flex-wrap gap-1 mt-2'>
                  {instructor.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className='px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full'
                    >
                      {skill}
                    </span>
                  ))}
                  {instructor.skills.length > 3 && (
                    <span className='px-2 py-0.5 bg-white/30 backdrop-blur-sm text-white text-xs rounded-full'>
                      +{instructor.skills.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructor Info Card */}
        <div className='absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex-1 min-w-0'>
              <h3 className='text-lg font-bold text-gray-900 mb-1 truncate'>
                {instructor.displayName}
              </h3>
              <p className='text-sm text-gray-600 font-medium truncate mb-1'>
                {instructor?.skills && instructor?.skills.join(", ")}
              </p>

              {/* Status Badges */}
              <div className='flex flex-wrap gap-1 mt-1'>
                {instructor.status === "approved" && (
                  <span className='inline-block px-2 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded'>
                    ✓ Verified
                  </span>
                )}

                {instructor.featured && (
                  <span className='inline-block px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded'>
                    ⭐ Featured
                  </span>
                )}

                {instructor.category && (
                  <span className='inline-block px-2 py-0.5 bg-blue-50 text-[#074079] text-xs font-semibold rounded'>
                    cat {instructor.category}
                  </span>
                )}
              </div>
            </div>

            <div className='flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg hover:bg-[#DA7C36] transition-colors duration-300 flex-shrink-0 ml-2'>
              <svg
                className='w-6 h-6 text-purple-400 hover:text-white transition-colors duration-300'
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
    </Link>
  );
}

export default InstructorCard;
