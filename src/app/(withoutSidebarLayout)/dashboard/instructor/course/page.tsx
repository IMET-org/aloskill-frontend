"use client";

import type { CourseType } from "@/app/(withoutSidebarLayout)/courses/allCourses.types.ts";
import CourseCard from "@/app/(withoutSidebarLayout)/courses/CourseCard.tsx";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../../../../lib/api/client";
import { mapCourseToCourseCardProps } from "./mapCourseToCourseCardProps.ts";

const InstructorCoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [category, setCategory] = useState("All Category");
  const [rating, setRating] = useState("4 Star & Up");
  const [showMenu, setShowMenu] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [courses, setCourses] = useState<CourseType[]>([]);

  const { data: sessionData } = useSession();

  const [cartItems, setCartItems] = useState<Set<string | number>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());

  const handleEnroll = useCallback((courseId: string | number) => {
    console.log(`Enrolling in course: ${courseId}`);
  }, []);
  const handleAddToCart = useCallback((courseId: string | number) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        console.log(`Removed course ${courseId} from cart`);
      } else {
        newSet.add(courseId);
        console.log(`Added course ${courseId} to cart`);
      }
      return newSet;
    });
  }, []);
  const handleAddToWishlist = useCallback(async (courseId: string | number) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        console.log(`Removed course ${courseId} from wishlist`);
      } else {
        newSet.add(courseId);
        console.log(`Added course ${courseId} to wishlist`);
      }
      return newSet;
    });

    await new Promise(resolve => setTimeout(resolve, 500));
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      setApiError("");
      const coursesFromDB = await apiClient.get<CourseType[]>(
        `/course/allCourses?userId=${sessionData?.user.id}`
      );

      if (!coursesFromDB.success) {
        setApiError("Something went wrong! try again later.");
        return;
      }
      if (coursesFromDB.data) {
        if (coursesFromDB.data.length === 0) {
          setApiError("No courses found!");
          return;
        }
        setCourses(coursesFromDB.data);
      }
    };

    getCourses();
  }, [sessionData?.user.id]);

  const calculateTotalDuration = (course: CourseType) => {
    const totalSeconds = course.modules.reduce((acc, module) => {
      const moduleSum = module.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
      return acc + moduleSum;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

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
                {...mapCourseToCourseCardProps(course)}
                onEnroll={handleEnroll}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isInCart={cartItems.has(course.id)}
                isInWishlist={wishlistItems.has(course.id)}
              />

              // <div
              //   key={course.id}
              //   className='bg-white rounded overflow-hidden group relative'
              // >

              //   {/* Course Badge */}
              //   <span className='w-fit text-xs! font-semibold text-white bg-orange rounded absolute top-2 left-2 px-2 py-1 z-10'>
              //     {course.status}
              //   </span>
              //   {/* Course Image */}
              //   <div className='relative h-[55%] overflow-hidden'>
              //     <Image
              //       width={250}
              //       height={250}
              //       src={
              //         course.thumbnailUrl ??
              //         "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
              //       }
              //       alt={course.title}
              //       className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
              //     />
              //     {/* Menu Button */}
              //     <div className='absolute top-3 right-3'>
              //       <button
              //         onClick={() => setShowMenu(showMenu === course.id ? "" : course.id)}
              //         className='w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors'
              //       >
              //         <MoreVertical className='w-4 h-4 text-gray-600' />
              //       </button>

                //     {/* Dropdown Menu */}
                //     {showMenu === course.id && (
                //       <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-10'>
                //         <Link href={`/dashboard/instructor/course/${course.id}`}>
                //           <button className='w-full px-4 py-2 text-left text-sm text-orange-500 hover:bg-orange-50 transition-colors flex items-center space-x-2 cursor-pointer'>
                //             <span>View Details</span>
                //           </button>
                //         </Link>
                //         <Link href={`/dashboard/instructor/create-course/${course.id}`}>
                //           <button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2'>
                //             <Edit className='w-4 h-4' />
                //             <span>Edit Course</span>
                //           </button>
                //         </Link>
                //         <button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2'>
                //           <Trash2 className='w-4 h-4' />
                //           <span>Delete Course</span>
                //         </button>
                //       </div>
                //     )}
                //   </div>
                // </div>

              //   {/* Course Content */}
              //   <div className='flex flex-col gap-2 mt-2'>
              //     <div className='px-3 flex flex-col gap-2'>
              //       {/* Category Badge */}
              //       <div className=''>
              //         <span className='inline-block px-2 py-1 text-xs font-semibold text-orange bg-orange-50 rounded'>
              //           {course.category && course.category.name}
              //         </span>
              //       </div>

              //       {/* Title */}
              //       <h4 className='font-semibold group-hover:text-orange! transition-colors'>
              //         {course.title}
              //       </h4>

              //       <div className='flex items-center gap-2'>
              //         {/* Duration */}
              //         <div className='flex items-center gap-2'>
              //           <span className='text-sm text-gray-500'>Duration:</span>
              //           <span className='text-sm font-medium text-gray-800'>
              //             {calculateTotalDuration(course)}
              //           </span>
              //         </div>

              //         {/* Lessons */}
              //         <div className='flex items-center gap-2'>
              //           <span className='text-sm text-gray-500'>Lessons:</span>
              //           <span className='text-sm font-medium text-gray-800'>
              //             {course.modules.reduce((acc, mod) => acc + mod._count.lessons, 0)}
              //           </span>
              //         </div>
              //       </div>

              //       {/* Rating and Students */}
              //       <div className='flex items-center justify-between '>
              //         <div className='flex items-center gap-2'>
              //           <Star className='w-4 h-4 text-orange-400 fill-current' />
              //           <span className='text-sm font-semibold text-gray-800'>
              //             {course._count.reviews}
              //           </span>
              //         </div>
              //         <div className='flex items-center space-x-1 text-gray-500'>
              //           <Users className='w-4 h-4' />
              //           <span className='text-sm'>
              //             {course._count.enrollments}{" "}
              //             <span className='text-gray-400'>students</span>
              //           </span>
              //         </div>
              //       </div>
              //     </div>

              //     {/* Price and Actions */}
              //     <div className='flex items-center px-3 py-2 gap-2 border-t border-gray-100'>
              //       <span className='text-xl font-bold text-orange-500'>
              //         {course.discountPrice}
              //       </span>
              //       {course.originalPrice && (
              //         <span className='text-sm text-gray-400 line-through'>
              //           {course.originalPrice}
              //         </span>
              //       )}
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InstructorCoursePage;
