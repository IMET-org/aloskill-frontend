"use client";

import { useEffect, useState } from "react";

import InstructorCard from "@/app/(mainLayout)/instructors/InstructorCard";
import BorderGradientButton from "@/components/buttons/BorderGradientButton.tsx";
import GradientButton from "@/components/buttons/GradientButton.tsx";
import { apiClient } from "@/lib/api/client.ts";
import { type Instructor, type InstructorListApiResponse } from "@/types/instructor.types.ts";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function InstructorsSectionAdvanced() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [featuredInstructors, setFeaturedInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleAllInstructor = () => {
    setLoading(true);
    router.push("/instructors");
  };
  const handleAllCourses = () => {
    setLoading(true);
    router.push("/courses");
  };
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);

        // ✅ Fetch from homepage
        const response = await apiClient.get<InstructorListApiResponse[]>("/user/instructors/all");
        const transformInstructor = (apiData: InstructorListApiResponse): Instructor => ({
          id: apiData.id,
          name: apiData.displayName,
          image:
            apiData.avaterUrl ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
          roles: apiData.role || [],
          skills: apiData.skills || [],
          rating: Number(apiData.ratingAverage) || 0,
          totalCourses: apiData.totalCourses || 0,
        });
        if (response.success && response.data) {
          // take first 4
          const transformed = response.data.slice(0, 4).map(transformInstructor);

          setFeaturedInstructors(transformed);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);
  if (loading) return <div>Loading...</div>;
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
              <GradientButton
                onClick={handleAllInstructor}
                loading={loading}
                icon={ArrowRightIcon}
                iconPosition='right'
                iconAnimation='slide'
              >
                All Experts
              </GradientButton>
              <BorderGradientButton onClick={handleAllCourses}>Find Courses</BorderGradientButton>
            </div>
          </div>

          {/* Right - Instructors Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2'>
            {featuredInstructors.map((instructor, index) => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor} // ✅ Pass data as prop
                isHovered={hoveredId === instructor.id}
                onHover={() => setHoveredId(instructor.id)}
                onLeave={() => setHoveredId(null)}
                animationDelay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
