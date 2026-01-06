import type {
  CourseCardProps,
  CourseType,
} from "@/app/(withoutSidebarLayout)/courses/allCourses.types.ts";

const formatDuration = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};
const normalizeNumber = (value: number | string | null): number => {
  if (value === null) return 0;
  if (typeof value === "string") return Number(value);
  return value;
};

export const mapCourseToCourseCardProps = (course: CourseType): CourseCardProps => {
  const rawPrice =
    course.discountPrice !== null
      ? normalizeNumber(course.discountPrice)
      : normalizeNumber(course.originalPrice);

  const originalPrice =
    course.discountPrice !== null ? normalizeNumber(course.originalPrice) : undefined;
  const totalLessons = course.modules.reduce((acc, module) => acc + module._count.lessons, 0);

  const totalSeconds = course.modules.reduce((acc, module) => {
    const moduleSeconds = module.lessons.reduce((sum, lesson) => sum + (lesson.duration ?? 0), 0);
    return acc + moduleSeconds;
  }, 0);

  return {
    id: course.id,
    title: course.title,

    image:
      course.thumbnailUrl ??
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",

    category: course.category?.name ?? "Uncategorized",
    categoryColor: "bg-orange-500",

    price: rawPrice, // ✅ always number
    originalPrice, // ✅ number | undefined

    discount:
      originalPrice && rawPrice < originalPrice
        ? Math.round(((originalPrice - rawPrice) / originalPrice) * 100)
        : undefined,

    lessons: totalLessons,
    duration: formatDuration(totalSeconds),

    students: course._count.enrollments,
    reviewCount: course._count.reviews,
    rating: 0,

    instructor: {
      name: "Instructor",
    },
  };
};
