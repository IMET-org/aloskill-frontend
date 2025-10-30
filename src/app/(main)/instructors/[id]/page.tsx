"use client";
import { instructorDetailsData } from "@/app/(main)/instructors/instructor-details.ts";
import { BookOpen, Facebook, Globe, Instagram, Linkedin, Star, Twitter, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AboutTab } from "./about.tsx";
import { CoursesTab } from "./courses.tsx";
import { ReviewsTab } from "./reviews.tsx";

export default function InstructorDetailsPage({ instructorId = "1" }) {
  const [activeTab, setActiveTab] = useState("about-us");
  const instructor = instructorDetailsData[instructorId as keyof typeof instructorDetailsData];

  if (!instructor) {
    return <div>Instructor not found</div>;
  }

  const tabs = [
    { id: "about-us", label: "About me" },
    { id: "courses", label: "Courses" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Profile Card */}
        <div className='bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 animate-fade-in'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
            {/* Profile Image */}
            <div className='relative'>
              <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#DA7C36] shadow-lg'>
                <Image
                  width={128}
                  height={128}
                  src={instructor.image}
                  alt={instructor.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-2 -right-2 bg-orange-100 text-[#DA7C36] px-3 py-1 rounded-full text-xs font-bold'>
                Top Rated
              </div>
            </div>

            {/* Profile Info */}
            <div className='flex-1'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4'>
                <div>
                  <h1 className='text-2xl sm:text-3xl font-bold text-[#074079] mb-1'>
                    {instructor.name}
                  </h1>
                  <p className='text-gray-600 mb-3'>{instructor.title}</p>

                  {/* Stats */}
                  <div className='flex flex-wrap gap-4 text-sm'>
                    <div className='flex items-center gap-1'>
                      <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                      <span className='font-semibold text-gray-700'>
                        {instructor.rating} Instructor Rating
                      </span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='w-4 h-4 text-[#DA7C36]' />
                      <span className='font-semibold text-gray-700'>
                        {instructor.students.toLocaleString()} Students
                      </span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <BookOpen className='w-4 h-4 text-[#074079]' />
                      <span className='font-semibold text-gray-700'>
                        {instructor.courses} Courses
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className='flex gap-2'>
                  {[
                    { icon: Facebook, link: instructor.socialLinks.facebook },
                    { icon: Twitter, link: instructor.socialLinks.twitter },
                    { icon: Instagram, link: instructor.socialLinks.instagram },
                    { icon: Linkedin, link: instructor.socialLinks.linkedin },
                    { icon: Globe, link: instructor.socialLinks.website },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-[#DA7C36] hover:bg-[#DA7C36] hover:text-white transition-all duration-300 text-gray-600'
                    >
                      <social.icon className='w-4 h-4' />
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${instructor.email}`}
                className='inline-flex items-center gap-2 text-[#DA7C36] hover:text-[#d15100] transition-colors duration-200'
              >
                <Globe className='w-4 h-4' />
                <span className='text-sm font-medium'>{instructor.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden animate-slide-up'>
          {/* Tab Headers */}
          <div className='border-b border-gray-200'>
            <div className='flex'>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm sm:text-base font-semibold transition-all duration-300 relative ${
                    activeTab === tab.id ? "text-[#DA7C36]" : "text-gray-600 hover:text-[#074079]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className='absolute bottom-0 left-0 right-0 h-1 bg-[#DA7C36] animate-expand'></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className='p-6 sm:p-8'>
            {activeTab === "about-us" && <AboutTab instructor={instructor} />}
            {activeTab === "courses" && <CoursesTab courses={instructor.coursesOffered} />}
            {activeTab === "reviews" && <ReviewsTab reviews={instructor.reviews} />}
          </div>
        </div>
      </div>

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
        @keyframes expand {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        .animate-expand {
          animation: expand 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
