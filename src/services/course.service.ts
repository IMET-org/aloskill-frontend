import type { Course } from "@/app/(main)/courses/course.types";

/**
 * API Response type
 */
interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

/**
 * Paginated response type
 */
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Course filter options
 */
export interface CourseFilters {
  category?: string;
  level?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  search?: string;
}

/**
 * CourseService
 * Handles all course-related API calls
 */
class CourseService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env["NEXT_PUBLIC_API_URL"] || "/api";
  }

  /**
   * Fetch all courses with optional filters and pagination
   */
  async getCourses(
    page: number = 1,
    limit: number = 10,
    filters?: CourseFilters
  ): Promise<PaginatedResponse<Course>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.category && { category: filters.category }),
        ...(filters?.level && { level: filters.level }),
        ...(filters?.priceMin && { priceMin: filters.priceMin.toString() }),
        ...(filters?.priceMax && { priceMax: filters.priceMax.toString() }),
        ...(filters?.rating && { rating: filters.rating.toString() }),
        ...(filters?.search && { search: filters.search }),
      });

      const response = await fetch(`${this.baseUrl}/courses?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }

  /**
   * Fetch a single course by ID
   */
  async getCourseById(id: string | number): Promise<ApiResponse<Course>> {
    try {
      const response = await fetch(`${this.baseUrl}/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch course: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch popular courses
   */
  async getPopularCourses(limit: number = 6): Promise<Course[]> {
    try {
      const response = await fetch(`${this.baseUrl}/courses/popular?limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch popular courses: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("Error fetching popular courses:", error);
      throw error;
    }
  }

  /**
   * Add course to cart
   */
  async addToCart(courseId: string | number): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  /**
   * Add course to wishlist
   */
  async addToWishlist(courseId: string | number): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to wishlist: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  }

  /**
   * Remove course from wishlist
   */
  async removeFromWishlist(courseId: string | number): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove from wishlist: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  }

  /**
   * Enroll in a course
   */
  async enrollInCourse(courseId: string | number): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to enroll: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error enrolling in course:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const courseService = new CourseService();

// Export class for testing
export default CourseService;
