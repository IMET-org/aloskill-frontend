"use client";
import Link from "next/link";
import { useState } from "react";
import InstructorCard from "./InstructorCard.tsx";
import { instructorsData } from "./instructorsData.ts";

export default function AllInstructorsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Filter instructors by category
  const leadershipTeam = instructorsData.instructors.filter(i => i.category === "leadership");
  const fieldTeam = instructorsData.instructors.filter(i => i.category === "field");

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50'>
      {/* Hero Section */}
      <section className='relative py-16 md:py-20 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='inline-block mb-4 animate-fade-in'>
            <span className='px-4 py-2 bg-orange-100 text-[#DA7C36] rounded-full text-sm font-semibold uppercase tracking-wide'>
              Our Team
            </span>
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-6xl font-black text-[#074079] mb-4 animate-slide-up'>
            Our Dedicated Team
          </h1>

          <p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed animate-slide-up'>
            Together, we are dedicated and engaged in persuasive pursuits to make the
            <br className='hidden md:block' />
            world, we are living in better and happier
          </p>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className='py-12 md:py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-10 animate-fade-in'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#074079] mb-2'>
              Our Leadership Team
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              The leadership team is a group of men and women of great commitment
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            {leadershipTeam.map((instructor, index) => (
              <Link
                key={instructor.id}
                href={`/instructors/${instructor.id}`}
              >
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                  isHovered={hoveredId === instructor.id}
                  onHover={() => setHoveredId(instructor.id)}
                  onLeave={() => setHoveredId(null)}
                  animationDelay={index * 100}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Field and Volunteer Team Section */}
      <section className='py-12 md:py-16 bg-white/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-10 animate-fade-in'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#074079] mb-2'>
              Field and Volunteer Team
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              The field team is a group of individuals, some paid and others working,
              <br className='hidden md:block' />
              voluntarily
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {fieldTeam.map((instructor, index) => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor}
                isHovered={hoveredId === instructor.id}
                onHover={() => setHoveredId(instructor.id)}
                onLeave={() => setHoveredId(null)}
                animationDelay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
