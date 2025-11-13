"use client";

import type { Course } from "@/app/(main)/courses/course.types";
import { courseService, type CourseFilters } from "@/services/course.service";
import { useCallback, useEffect, useState } from "react";

interface UseCoursesResult {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing courses
 */
export function useCourses(initialLimit: number = 10, filters?: CourseFilters): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCourses = useCallback(
    async (pageNum: number, append: boolean = false) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await courseService.getCourses(pageNum, initialLimit, filters);

        setCourses(prev => (append ? [...prev, ...response.data] : response.data));
        setHasMore(response.pagination.hasNext);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
        console.error("Error in useCourses:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [initialLimit, filters]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchCourses(nextPage, true);
  }, [page, hasMore, isLoading, fetchCourses]);

  const refresh = useCallback(async () => {
    setPage(1);
    await fetchCourses(1, false);
  }, [fetchCourses]);

  useEffect(() => {
    fetchCourses(1, false);
  }, [fetchCourses]);

  return {
    courses,
    isLoading,
    error,
    hasMore,
    page,
    loadMore,
    refresh,
  };
}
