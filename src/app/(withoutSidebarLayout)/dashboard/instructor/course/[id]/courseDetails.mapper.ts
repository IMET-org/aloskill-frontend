import type { CourseDetailsViewModel } from "@/app/(withoutSidebarLayout)/courses/allCourses.types.ts";
const toISOStringRequired = (value: string | Date): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid required date value");
  }
  return date.toISOString();
};
const toISOStringOptional = (value?: string | Date | null): string | null => {
  if (!value) return null;

  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

export const mapCourseToDetailsViewModel = (course: any): CourseDetailsViewModel => ({
  id: course.id,
  title: course.title,
  slug: course.slug,
  description: course.description,

  welcomeMessage: course.welcomeMessage,
  congratulationsMessage: course.congratulationsMessage,

  originalPrice: Number(course.originalPrice),
  discountPercent: course.discountPercent,
  discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
  discountEndDate: toISOStringOptional(course.discountEndDate),
  isDiscountActive: course.isDiscountActive,
  currency: course.currency,

  enrollmentCount: course.enrollmentCount,
  reviewCount: course.reviewCount,
  moduleCount: course.moduleCount,
  views: course.views,

  ratingAverage: course.ratingAverage ? Number(course.ratingAverage) : null,
  ratingCount: course.ratingCount,
  totalRevenueAmount: Number(course.totalRevenueAmount),

  thumbnailUrl: course.thumbnailUrl ?? "/images/course-placeholder.png",
  trailerUrl: course.trailerUrl ?? null,

  status: course.status,
  language: course.language,
  level: course.level,

  category:
    course.category?.id && course.category?.name
      ? { id: course.category.id, name: course.category.name }
      : null,

  createdBy: course.createdBy
    ? {
        id: course.createdBy.id,
        fullName: course.createdBy.fullName,
        avatarUrl: course.createdBy.avatarUrl,
      }
    : null,

  tags: Array.isArray(course.tags)
    ? course.tags
        .filter((t: any) => t?.tag?.id && t?.tag?.name)
        .map((t: any) => ({
          id: t.tag.id,
          name: t.tag.name,
        }))
    : [],

  createdAt: toISOStringRequired(course.createdAt),
  updatedAt: toISOStringRequired(course.updatedAt),
});
