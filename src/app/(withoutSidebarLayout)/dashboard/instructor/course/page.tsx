"use client";

import type { CourseType } from "@/app/(withoutSidebarLayout)/courses/allCourses.types.ts";
import CourseCard from "@/app/(withoutSidebarLayout)/courses/CourseCard.tsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../../lib/api/client";

const InstructorCoursePage = () => {
  const [apiError, setApiError] = useState<string>("");
  const [courses, setCourses] = useState<CourseType[]>([]);
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData?.user.id) return;
    const getCourses = async () => {
      setApiError("");
      const coursesFromDB = await apiClient.get<CourseType[]>(
        `/course/allCourses?userId=${sessionData?.user.id}`
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
      } catch (e) {
        setApiError("Something went wrong while fetching the courses.");
      }
    };
    getCourses();
  }, [sessionData?.user.id]);

  // const calculateTotalDuration = (course: CourseType) => {
  //   const totalSeconds = course.modules.reduce((acc, module) => {
  //     const moduleSum = module.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
  //     return acc + moduleSum;
  //   }, 0);

  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);

  //   if (hours > 0) return `${hours}h ${minutes}m`;
  //   return `${minutes}m`;
  // };

  return (
    <div className='min-h-screen w-full px-4'>
      {/* Courses Grid */}
      {apiError ? (
        <p className='text-md font-semibold text-red-400'>{apiError}</p>
      ) : (
        <>
          <div className='grid grid-cols-3 gap-3'>
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                dashboardActions={{
                  onView: id => router.push(`/dashboard/instructor/course/${id}`),
                  onEdit: id => router.push(`/dashboard/instructor/create-course/${id}`),
                  onDelete: id => {
                    console.log("delete: ", id);
                  },
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InstructorCoursePage;
