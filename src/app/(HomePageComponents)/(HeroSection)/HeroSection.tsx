// ============================================
// FILE: components/HeroSection.tsx
// ============================================
"use client";

import BorderGradientButton from "@/components/buttons/BorderGradientButton.tsx";
import { ArrowRightIcon, CheckCircle, Send, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "../../../components/buttons/GradientButton.tsx";
import "./HeroSection.module.css";
const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
];

const features = ["1000+ Courses Available", "Expert Instructors", "Lifetime Access"];

export default function HeroSection() {
  const router = useRouter();
  const handleRegistration = () => {
    router.push("/auth/signup");
  };
  return (
    <section className='relative min-h-screen  flex items-center justify-center px-4  py-30 overflow-hidden   '>
      {/* Decorative Blobs */}
      <div className='absolute inset-0 bg-gradient-bpyg overflow-hidden pointer-events-none  filter blur-2xl opacity-50 '></div>

      <div className='relative z-10 max-w-5xl mx-auto text-center space-y-6'>
        {/* Social Proof - Top */}
        <div className='flex items-center justify-center gap-4 flex-wrap animate-fade-in'>
          {/* Avatars */}
          <div className='flex items-center'>
            <div className='flex -space-x-3'>
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-pointer'
                >
                  <Image
                    src={avatar}
                    alt={`Student ${index + 1}`}
                    width={48}
                    height={48}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md'>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className='w-4 h-4 text-yellow-500 fill-yellow-500'
              />
            ))}
            <span className='text-sm font-semibold text-gray-700 ml-2'>5.0</span>
          </div>

          {/* Reviews */}
          <div className='bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md'>
            <p className='text-sm font-medium text-gray-700'>From Reviews 178+</p>
          </div>
        </div>

        {/* Badge */}
        <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-(--color-orange)/20 animate-slide-up'>
          <span className='w-2 h-2 bg-(--color-orange) rounded-full animate-pulse'></span>
          <p className='text-sm font-semibold text-gray-700'>Learning and reading at one place</p>
        </div>

        {/* Main Heading */}
        <div className='space-y-4 animate-fade-in'>
          <h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl  font-black text-gray-900 leading-tight'>
            Start Learning{" "}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-(--color-orange) to-orange-600'>
              Today
            </span>
          </h1>

          {/* Subheading */}
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4'>
            চাহিদাসম্পন্ন দক্ষতা অর্জন করুন এবং অসাধারণ বই আবিষ্কার করুন — সব এক প্ল্যাটফর্মে,
            বাংলায়।
          </p>
        </div>
        <div></div>
        {/* Primary Action Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up'>
          <GradientButton
            icon={ArrowRightIcon}
            iconPosition='right'
            iconAnimation='slide'
            onClick={handleRegistration}
          >
            Free Registration
          </GradientButton>
          <Link href='/auth/instructor-signup'>
            <BorderGradientButton icon={Send}>Become Instructor</BorderGradientButton>
          </Link>
        </div>

        {/* Features List */}
        <div className='flex flex-wrap items-center justify-center gap-4 pt-4 animate-slide-up'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex items-center gap-2 text-sm font-medium text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm'
            >
              <CheckCircle className='w-4 h-4 text-(--color-orange)' />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Quick Action Pills */}
        <div className='flex flex-wrap justify-center gap-3 pt-4 animate-fade-in'>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-(--color-orange) hover:text-white transition-all duration-300 text-sm font-medium border border-gray-200 shadow-md hover:shadow-lg'>
            Start learning & Get certificated
          </button>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-(--color-orange) hover:text-white transition-all duration-300 text-sm font-medium border border-gray-200 shadow-md hover:shadow-lg'>
            Career on aloskill
          </button>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-(--color-orange) hover:text-white transition-all duration-300 text-sm font-medium border border-gray-200 shadow-md hover:shadow-lg'>
            Learn & Earn Together
          </button>
        </div>
      </div>
    </section>
  );
}
