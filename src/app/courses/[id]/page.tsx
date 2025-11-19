
"use client";

import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Facebook,
  FileText,
  Globe,
  Heart,
  Linkedin,
  Lock,
  Play,
  Share2,
  Star,
  Twitter,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Animation wrapper component
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}

// Mock data
const getCourseData = (id: string) => {
  return {
    id,
    title: "Complete Website Responsive Design: from Figma to Webflow to Website Design",
    subtitle:
      "A 10 + Course Learn to design websites with Figma, build with Webflow, and make a living freelancing.",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    price: 14.0,
    originalPrice: 21.0,
    discount: 56,
    rating: 4.9,
    reviewCount: "451,444",
    enrolled: "26,565",
    lastUpdated: "Jan 15, 2025",
    language: "English",
    level: "All Levels",
    duration: "20h 30m",
    lectures: 45,
    category: "Web Development",

    // Tabs
    tabs: ["Overview", "Curriculum", "Instructor", "Reviews"],

    // What you'll learn
    learningOutcomes: [
      "Build responsive websites from scratch using modern frameworks",
      "Master Figma for professional UI/UX design workflows",
      "Create stunning web designs that convert visitors to customers",
      "Understand HTML5, CSS3, JavaScript and modern best practices",
      "Deploy websites to production using industry-standard tools",
      "Work with Webflow for no-code website development",
    ],

    // Requirements
    requirements: [
      "Basic computer skills and internet connection",
      "No prior coding or design experience required",
      "A computer (Windows, Mac, or Linux)",
      "Eagerness to learn and build amazing websites",
    ],

    // Target audience
    targetAudience: [
      "Aspiring web designers who want to learn modern design tools",
      "Freelancers looking to add web design to their skillset",
      "Developers who want to improve their design skills",
      "Entrepreneurs who want to build their own websites",
      "Anyone interested in starting a career in web design",
    ],

    // Course includes
    includes: [
      { icon: Video, label: "20 hours on-demand video" },
      { icon: FileText, label: "15 articles" },
      { icon: BookOpen, label: "25 downloadable resources" },
      { icon: Award, label: "Certificate of completion" },
      { icon: Globe, label: "Access on mobile and TV" },
      { icon: Clock, label: "Full lifetime access" },
    ],

    // Instructors
    instructors: [
      {
        id: 1,
        name: "Vako Shvili",
        title: "UI/UX Designer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vako",
        students: 45123,
        courses: 8,
        rating: 4.9,
        bio: "Award-winning designer with 10+ years of experience in creating stunning digital experiences.",
      },
      {
        id: 2,
        name: "Arno Wilbur",
        title: "Full Stack Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arno",
        students: 32456,
        courses: 6,
        rating: 4.8,
        bio: "Passionate developer specializing in modern web technologies and user-centered design.",
      },
    ],

    // Curriculum
    curriculum: [
      {
        id: 1,
        title: "Basics of Website",
        lectures: 3,
        duration: "30m",
        items: [
          { id: 1, title: "What is Website Design", duration: "5:30", isFree: true },
          { id: 2, title: "Figma vs Webflow", duration: "12:45", isFree: true },
          { id: 3, title: "Setup Your Workspace", duration: "8:20", isFree: false },
        ],
      },
      {
        id: 2,
        title: "Nature of Visual Design",
        lectures: 5,
        duration: "1h 15m",
        items: [
          { id: 1, title: "Color Theory Basics", duration: "15:30", isFree: false },
          { id: 2, title: "Typography Fundamentals", duration: "18:45", isFree: false },
          { id: 3, title: "Layout and Composition", duration: "12:20", isFree: false },
          { id: 4, title: "Visual Hierarchy", duration: "16:30", isFree: false },
          { id: 5, title: "Design Systems", duration: "12:15", isFree: false },
        ],
      },
      {
        id: 3,
        title: "Master of Visual Design",
        lectures: 8,
        duration: "2h 30m",
        items: [
          { id: 1, title: "Advanced Color Techniques", duration: "20:30", isFree: false },
          { id: 2, title: "Responsive Design Patterns", duration: "25:45", isFree: false },
          { id: 3, title: "Animation Principles", duration: "18:20", isFree: false },
        ],
      },
      {
        id: 4,
        title: "Secrets of Fluid Design",
        lectures: 6,
        duration: "1h 45m",
        items: [
          { id: 1, title: "Fluid Typography", duration: "15:30", isFree: false },
          { id: 2, title: "Flexible Layouts", duration: "22:45", isFree: false },
        ],
      },
      {
        id: 5,
        title: "WEC Development Interface",
        lectures: 12,
        duration: "3h 20m",
        items: [
          { id: 1, title: "Introduction to Webflow", duration: "18:30", isFree: false },
          { id: 2, title: "Building Your First Site", duration: "35:45", isFree: false },
        ],
      },
      {
        id: 6,
        title: "Secrets of Making Hosting Website",
        lectures: 7,
        duration: "2h 10m",
        items: [
          { id: 1, title: "Domain Setup", duration: "12:30", isFree: false },
          { id: 2, title: "Hosting Configuration", duration: "25:45", isFree: false },
        ],
      },
      {
        id: 7,
        title: "Final Project",
        lectures: 4,
        duration: "1h 50m",
        items: [
          { id: 1, title: "Project Planning", duration: "15:30", isFree: false },
          { id: 2, title: "Building the Portfolio", duration: "45:20", isFree: false },
        ],
      },
    ],

    // Stats
    stats: [
      { label: "Total Sections", value: "07 Sections", icon: BookOpen },
      { label: "Total Lectures", value: "45 Lectures", icon: Video },
      { label: "Total Duration", value: "30+ Hours", icon: Clock },
      { label: "Total Students", value: "26k+", icon: Users },
    ],
  };
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = getCourseData(courseId);

  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1]));
  const [isInWishlist, setIsInWishlist] = useState(false);

  const toggleSection = (id: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const totalLectures = course.curriculum.reduce((sum, section) => sum + section.lectures, 0);
  const totalDuration = course.curriculum.reduce((sum, section) => {
    const hours = parseFloat(section.duration);
    return sum + hours;
  }, 0);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <FadeIn>
            <nav className='flex items-center gap-2 text-sm text-gray-600'>
              <Link
                href='/'
                className='hover:text-orange-600 transition-colors'
              >
                Home
              </Link>
              <ChevronRight className='w-4 h-4' />
              <Link
                href='/courses'
                className='hover:text-orange-600 transition-colors'
              >
                Web Development
              </Link>
              <ChevronRight className='w-4 h-4' />
              <Link
                href='/courses'
                className='hover:text-orange-600 transition-colors'
              >
                Web Development
              </Link>
              <ChevronRight className='w-4 h-4' />
              <span className='text-gray-900'>Responsive</span>
            </nav>
          </FadeIn>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Course Header */}
            <FadeIn delay={100}>
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
                <h1 className='text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight'>
                  {course.title}
                </h1>
                <p className='text-gray-600 mb-6 leading-relaxed'>{course.subtitle}</p>

                {/* Meta Info */}
                <div className='flex flex-wrap items-center gap-6 mb-6'>
                  {/* Rating */}
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-xl text-gray-900'>{course.rating}</span>
                    <div className='flex items-center'>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className='w-5 h-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                    <span className='text-gray-600'>({course.reviewCount} ratings)</span>
                  </div>

                  {/* Students */}
                  <div className='flex items-center gap-2'>
                    <Users className='w-5 h-5 text-gray-500' />
                    <span className='text-gray-600'>{course.enrolled} students</span>
                  </div>
                </div>

                {/* Instructors */}
                <div className='flex items-center gap-4 pt-4 border-t border-gray-200'>
                  <div className='flex -space-x-3'>
                    {course.instructors.map(instructor => (
                      <div
                        key={instructor.id}
                        className='relative w-12 h-12 rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform'
                      >
                        <Image
                          src={instructor.avatar}
                          alt={instructor.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Created by</p>
                    <p className='font-semibold text-gray-900'>
                      {course.instructors.map(i => i.name).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className='flex items-center gap-2 mt-4 text-sm text-gray-600'>
                  <Calendar className='w-4 h-4' />
                  <span>Last updated {course.lastUpdated}</span>
                </div>
              </div>
            </FadeIn>

            {/* Course Preview Image */}
            <FadeIn delay={200}>
              <div className='relative rounded-2xl overflow-hidden shadow-xl group'>
                <div className='relative aspect-video'>
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <button className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover:bg-orange-500'>
                      <Play
                        className='w-8 h-8 text-orange-600 group-hover:text-white ml-1 transition-colors'
                        fill='currentColor'
                      />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Tabs */}
            <FadeIn delay={300}>
              <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
                {/* Tab Headers */}
                <div className='flex border-b border-gray-200 overflow-x-auto'>
                  {course.tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all relative ${
                        activeTab === tab ? "text-orange-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-purple-600' />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className='p-8'>
                  {activeTab === "Overview" && <OverviewTab course={course} />}
                  {activeTab === "Curriculum" && (
                    <CurriculumTab
                      curriculum={course.curriculum}
                      expandedSections={expandedSections}
                      toggleSection={toggleSection}
                      totalLectures={totalLectures}
                      totalDuration={totalDuration}
                    />
                  )}
                  {activeTab === "Instructor" && <InstructorTab instructors={course.instructors} />}
                  {activeTab === "Reviews" && <ReviewsTab course={course} />}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <FadeIn delay={400}>
              <div className='sticky top-24'>
                <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
                  {/* Price */}
                  <div className='p-6 bg-gradient-to-br from-orange-50 to-purple-50'>
                    <div className='flex items-baseline gap-3 mb-4'>
                      <span className='text-4xl font-black text-gray-900'>
                        ${course.price.toFixed(2)}
                      </span>
                      <span className='text-2xl text-gray-400 line-through'>
                        ${course.originalPrice.toFixed(2)}
                      </span>
                      <span className='px-2 py-1 bg-red-500 text-white rounded text-xs font-bold'>
                        {course.discount}% OFF
                      </span>
                    </div>

                    <div className='flex items-center gap-2 text-sm text-red-600 mb-4'>
                      <Clock className='w-4 h-4' />
                      <span className='font-semibold'>2 days left at this price!</span>
                    </div>

                    <div className='space-y-3'>
                      <button className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300'>
                        Add To Cart
                      </button>
                      <button className='w-full border-2 border-orange-600 text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all'>
                        Buy Now
                      </button>
                    </div>
                  </div>

                  {/* This course includes */}
                  <div className='p-6 border-t border-gray-200'>
                    <h3 className='font-bold text-gray-900 mb-4'>This course includes:</h3>
                    <div className='space-y-3'>
                      {course.includes.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={index}
                            className='flex items-center gap-3 text-sm text-gray-700 hover:text-orange-600 transition-colors group'
                          >
                            <Icon className='w-5 h-5 text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform' />
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className='p-6 border-t border-gray-200 space-y-3'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>Language</span>
                      <span className='font-semibold text-gray-900'>{course.language}</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>Subtitle Language</span>
                      <span className='font-semibold text-gray-900'>Multiple Language</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>Subtitle</span>
                      <span className='font-semibold text-gray-900'>Yes</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>Level</span>
                      <span className='font-semibold text-gray-900'>{course.level}</span>
                    </div>
                  </div>

                  {/* Share */}
                  <div className='p-6 border-t border-gray-200'>
                    <h3 className='font-bold text-gray-900 mb-4'>Share this course:</h3>
                    <div className='flex gap-3'>
                      <button className='p-3 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all hover:scale-110 transform'>
                        <Facebook className='w-5 h-5' />
                      </button>
                      <button className='p-3 border border-gray-300 rounded-lg hover:border-sky-500 hover:text-sky-500 hover:bg-sky-50 transition-all hover:scale-110 transform'>
                        <Twitter className='w-5 h-5' />
                      </button>
                      <button className='p-3 border border-gray-300 rounded-lg hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 transition-all hover:scale-110 transform'>
                        <Linkedin className='w-5 h-5' />
                      </button>
                      <button className='p-3 border border-gray-300 rounded-lg hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 transition-all hover:scale-110 transform'>
                        <Share2 className='w-5 h-5' />
                      </button>
                    </div>
                  </div>

                  {/* Wishlist */}
                  <div className='p-6 border-t border-gray-200'>
                    <button
                      onClick={() => setIsInWishlist(!isInWishlist)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all hover:scale-105 transform ${
                        isInWishlist
                          ? "bg-red-50 text-red-600 border-2 border-red-600"
                          : "bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${isInWishlist ? "fill-red-600" : ""}`}
                      />
                      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ course }: { course: any }) {
  return (
    <div className='space-y-8'>
      {/* Description */}
      <FadeIn>
        <div>
          <h2 className='text-2xl font-black text-gray-900 mb-4'>Description</h2>
          <div className='prose prose-sm max-w-none text-gray-700 space-y-4'>
            <p className='leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className='leading-relaxed'>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* What you'll learn */}
      <FadeIn delay={100}>
        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200'>
          <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center'>
              <CheckCircle2 className='w-6 h-6 text-white' />
            </div>
            What you will learn in this course
          </h2>
          <div className='grid sm:grid-cols-2 gap-4'>
            {course.learningOutcomes.map((outcome: string, index: number) => (
              <div
                key={index}
                className='flex items-start gap-3 group'
              >
                <CheckCircle2 className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform' />
                <span className='text-gray-700 text-sm'>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Who this course is for */}
      <FadeIn delay={200}>
        <div>
          <h2 className='text-2xl font-black text-gray-900 mb-4'>Who this course is for:</h2>
          <ul className='space-y-3'>
            {course.targetAudience.map((audience: string, index: number) => (
              <li
                key={index}
                className='flex items-start gap-3 group'
              >
                <div className='w-6 h-6 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform'>
                  <span className='text-white text-xs'>✓</span>
                </div>
                <span className='text-gray-700 text-sm'>{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* Requirements */}
      <FadeIn delay={300}>
        <div>
          <h2 className='text-2xl font-black text-gray-900 mb-4'>Course requirements</h2>
          <ul className='space-y-3'>
            {course.requirements.map((req: string, index: number) => (
              <li
                key={index}
                className='flex items-start gap-3 group'
              >
                <div className='w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform' />
                <span className='text-gray-700 text-sm'>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}

// Curriculum Tab
function CurriculumTab({
  curriculum,
  expandedSections,
  toggleSection,
  totalLectures,
  totalDuration,
}: {
  curriculum: any[];
  expandedSections: Set<number>;
  toggleSection: (id: number) => void;
  totalLectures: number;
  totalDuration: number;
}) {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black text-gray-900'>Course Curriculum</h2>
        <div className='flex items-center gap-4 text-sm text-gray-600'>
          <span>{curriculum.length} Sections</span>
          <span>{totalLectures} Lectures</span>
          <span>{totalDuration.toFixed(1)}h total</span>
        </div>
      </div>

      {/* Sections */}
      <div className='space-y-3'>
        {curriculum.map((section, index) => (
          <FadeIn
            key={section.id}
            delay={index * 50}
          >
            <div className='border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow'>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className='w-full flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white hover:from-orange-50 hover:to-purple-50 transition-all group'
              >
                <div className='flex items-center gap-4'>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      expandedSections.has(section.id)
                        ? "bg-gradient-to-br from-orange-500 to-purple-600 scale-110"
                        : "bg-white border-2 border-gray-300 group-hover:border-orange-500"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-all duration-300 ${
                        expandedSections.has(section.id) ? "rotate-180 text-white" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className='text-left'>
                    <h3 className='font-bold text-gray-900 group-hover:text-orange-600 transition-colors'>
                      {section.title}
                    </h3>
                    <p className='text-sm text-gray-600 mt-1'>
                      {section.lectures} Lectures • {section.duration}
                    </p>
                  </div>
                </div>
              </button>

              {/* Section Content */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  expandedSections.has(section.id) ? "max-h-[2000px]" : "max-h-0"
                }`}
              >
                <div className='p-5 pt-0 space-y-2 bg-white'>
                  {section.items.map((item: any, itemIndex: number) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 rounded-lg transition-all group cursor-pointer'
                      style={{
                        animationDelay: `${itemIndex * 50}ms`,
                        animation: expandedSections.has(section.id)
                          ? "slideIn 0.3s ease-out forwards"
                          : "none",
                      }}
                    >
                      <div className='flex items-center gap-3'>
                        {item.isFree ? (
                          <Play className='w-4 h-4 text-green-600 flex-shrink-0 group-hover:scale-125 transition-transform' />
                        ) : (
                          <Lock className='w-4 h-4 text-gray-400 flex-shrink-0' />
                        )}
                        <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                          {item.title}
                        </span>
                        {item.isFree && (
                          <span className='px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded'>
                            Preview
                          </span>
                        )}
                      </div>
                      <span className='text-sm text-gray-500 flex items-center gap-2'>
                        <Clock className='w-3 h-3' />
                        {item.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Instructor Tab
function InstructorTab({ instructors }: { instructors: any[] }) {
  return (
    <div className='space-y-8'>
      {instructors.map((instructor, index) => (
        <FadeIn
          key={instructor.id}
          delay={index * 100}
        >
          <div className='flex flex-col sm:flex-row gap-6 p-6 bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl border-2 border-orange-200 hover:shadow-lg transition-all group'>
            <div className='relative flex-shrink-0'>
              <div className='relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white group-hover:ring-orange-500 transition-all'>
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-500'
                />
              </div>
              <div className='absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white group-hover:scale-125 transition-transform'>
                <Award className='w-6 h-6 text-white' />
              </div>
            </div>

            <div className='flex-1'>
              <div className='flex items-center gap-2 text-sm text-orange-600 font-semibold mb-2'>
                <Star className='w-4 h-4 fill-orange-600' />
                {instructor.title}
              </div>
              <h3 className='text-2xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors'>
                {instructor.name}
              </h3>

              {/* Stats */}
              <div className='flex flex-wrap gap-4 mb-4'>
                <div className='flex items-center gap-2 text-sm'>
                  <Users className='w-4 h-4 text-gray-500' />
                  <span className='text-gray-700'>
                    {instructor.students.toLocaleString()} Students
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <BookOpen className='w-4 h-4 text-gray-500' />
                  <span className='text-gray-700'>{instructor.courses} Courses</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                  <span className='text-gray-700'>{instructor.rating} Rating</span>
                </div>
              </div>

              {/* Bio */}
              <p className='text-gray-700 leading-relaxed'>{instructor.bio}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// Reviews Tab
function ReviewsTab({ course }: { course: any }) {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent course! Very well structured and easy to follow. The instructor explains everything clearly and provides real-world examples that make learning enjoyable.",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      rating: 5,
      date: "1 week ago",
      comment:
        "Best web design course I've taken. Highly recommended for beginners and intermediate learners. The projects are practical and fun to build.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Great content and well-paced lessons. Would love to see more advanced topics in future updates. Overall, very satisfied with my purchase.",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Rating Summary */}
      <FadeIn>
        <div className='bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-8 border-2 border-orange-200'>
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='text-center'>
              <div className='text-6xl font-black text-gray-900 mb-2'>{course.rating}</div>
              <div className='flex items-center justify-center mb-2'>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className='w-6 h-6 fill-yellow-400 text-yellow-400'
                  />
                ))}
              </div>
              <p className='text-sm text-gray-600'>Course Rating</p>
            </div>

            <div className='flex-1 space-y-2 w-full'>
              {[5, 4, 3, 2, 1].map(star => (
                <div
                  key={star}
                  className='flex items-center gap-3'
                >
                  <span className='text-sm text-gray-600 w-8'>{star}★</span>
                  <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-gradient-to-r from-orange-500 to-purple-600 transition-all duration-1000'
                      style={{
                        width: `${star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 3 : star === 2 ? 1 : 1}%`,
                      }}
                    />
                  </div>
                  <span className='text-sm text-gray-600 w-12'>
                    {star === 5 ? "75%" : star === 4 ? "20%" : star === 3 ? "3%" : "1%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Reviews */}
      <div className='space-y-4'>
        {reviews.map((review, index) => (
          <FadeIn
            key={review.id}
            delay={index * 100}
          >
            <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all bg-white group'>
              <div className='flex items-start gap-4'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-orange-500 transition-all'>
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-bold text-gray-900 group-hover:text-orange-600 transition-colors'>
                      {review.name}
                    </h4>
                    <span className='text-xs text-gray-500'>{review.date}</span>
                  </div>
                  <div className='flex items-center mb-3'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className='text-sm text-gray-700 leading-relaxed'>{review.comment}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
