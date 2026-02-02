"use client";

import { useSessionContext } from "@/app/contexts/SessionContext.tsx";
import { apiClient } from "@/lib/api/client.ts";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import type { CourseType } from "../../courses/allCourses.types.ts";
import CourseCard from "../../courses/CourseCard.tsx";
export default function DashboardPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [courses, setCourses] = useState<CourseType[]>([]);
  const [apiError, setApiError] = useState<string>("");
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading) return;
    if (!user?.id) return;
    const getCourses = async () => {
      setApiError("");
      const coursesFromDB = await apiClient.get<CourseType[]>(
        `/course/student/allCourses?userId=${user?.id}`
      );

      try {
        if (!coursesFromDB.success) {
          setApiError("Something went wrong! try again later.");
          return;
        }
        if (!coursesFromDB.data || coursesFromDB.data.length === 0) {
          setApiError("No courses found!");
          return;
        }
        setCourses(coursesFromDB.data);
      } catch (_e) {
        setApiError("Something went wrong while fetching the courses.");
      }
    };
    getCourses();
  }, [user?.id, isLoading]);

  if (isLoading) {
    return (
      <p className='text-md font-semibold text-gray-600 flex items-center gap-2'>
        <Loader className='animate-spin' /> Loading...
      </p>
    );
  }

  const stats = [
    {
      icon: "🕐",
      value: "957",
      label: "Enrolled Courses",
      bgColor: "bg-orange-100",
    },
    {
      icon: "📚",
      value: "6",
      label: "Active Courses",
      bgColor: "bg-blue-200",
    },
    {
      icon: "✓",
      value: "951",
      label: "Completed Courses",
      bgColor: "bg-green-200",
    },
    {
      icon: "👥",
      value: "241",
      label: "Course Instructors",
      bgColor: "bg-orange-200",
    },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-6`}
          >
            <div className='flex items-center gap-4'>
              <div className='text-3xl'>{stat.icon}</div>
              <div>
                <div className='text-3xl font-bold text-gray-900'>{stat.value}</div>
                <div className='text-sm text-gray-600'>{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Section */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-xl font-semibold text-gray-900'>
            Let &apos;s start learning, {user?.name}
          </h3>
          <div className='flex gap-2'>
            <button className='w-10 h-10 rounded-lg border border-orange-300 text-orange-500'>
              ←
            </button>
            <button className='w-10 h-10 rounded-lg border border-orange-300 text-orange-500'>
              →
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {courses?.map(course => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
