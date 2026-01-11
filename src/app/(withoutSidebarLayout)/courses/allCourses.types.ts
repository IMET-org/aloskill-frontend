export interface CourseInstructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: string | number;
  image: string;
  category: string;
  categoryColor: string; // Tailwind class
  rating: number;
  reviewCount: string;
  price: number;

  originalPrice?: number; // optional
  discount?: number; // optional

  title: string;
  lessons: number;
  duration: string; // e.g. "19h 30m"
  students: string; // e.g. "20+"
  level: string; // Beginner | Intermediate | Advanced
  language: string; // e.g. "English"
  certificate: boolean;

  instructor: CourseInstructor;
}
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type Language = "ENGLISH" | "BANGLA" | string;
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" | string;
export type CourseType = {
  id: string;
  title: string;
  status: CourseStatus;
  originalPrice: number;
  discountPrice: number | null;
  thumbnailUrl: string | null | undefined;
  createdAt: Date;
  updatedAt?: Date;
  description?: string | null | undefined;
  previewVideoUrl?: string | null;
  level?: "beginner" | "intermediate" | "advanced" | string;
  language?: string | null;
  rating?: number | null;
  modules: {
    _count: {
      lessons: number;
    };
    lessons: {
      duration: number | null;
    }[];
  }[];
  category: {
    name: string;
  } | null;
  courseInstructors: {
    role: string | null;
  }[];
  _count: {
    enrollments: number;
    reviews: number;
  };
  instructor?: {
    id?: string;
    name?: string;
    bio?: string;
    avatarUrl?: string;
  } | null;
};
export type CourseCardProps = {
  id: string;
  image: string;
  category: string;
  categoryColor?: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  title: string;
  status: CourseStatus;
  lessons: number;
  duration: string;
  students: number;
  instructor: {
    name: string;
    avatar?: string;
  };

  onEnroll?: (courseId: string) => void;
  onAddToCart?: (courseId: string) => void;
  onAddToWishlist?: (courseId: string) => Promise<void> | void;

  isInCart?: boolean;
  isInWishlist?: boolean;

  /** Dashboard-only actions */
  dashboardActions?: {
    onView?: (courseId: string) => void;
    onEdit?: (courseId: string) => void;
    onDelete?: (courseId: string) => void;
  };
};
export type CourseDetails = {
  title: string;
  originalPrice: number;
  discountPrice: number | null;
  isDiscountActive: boolean;
  currency: string | null;
  enrollmentCount: number;
  enrolledLastWeek: number;
  language: string;
  thumbnailUrl: string | null;
  level: string;
  ratingAverage: number | null;
  ratingCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string | undefined;
  totalWishListed: number;
  createdBy: {
    displayName: string | undefined;
    avatarUrl: string | null | undefined;
  };
  courseInstructors: {
    role: string | null;
    displayName: string;
    avatarUrl: string | null;
  }[];
  reviews: {
    rating: number;
    body: string | null;
    createdAt: string;
    userDisplayName: string | undefined;
    avatarUrl: string | null;
  }[];
  content: {
    totalVideos: number;
    totalDuration: string;
    totalFiles: number;
  };
  ratingBreakdown: {
    star: number;
    count: number;
    percentage: string;
  }[];
};
// export type CourseDetails = {
//   // ===== Core =====
//   id: string;
//   title: string;
//   slug: string;
//   description: string;

//   welcomeMessage?: string | null;
//   congratulationsMessage?: string | null;

//   // ===== Pricing =====
//   originalPrice: number;
//   discountPercent?: number | null;
//   discountPrice?: number | null;
//   discountEndDate?: string | null;
//   isDiscountActive: boolean;
//   currency?: string | null;

//   // ===== Stats =====
//   enrollmentCount: number;
//   reviewCount: number;
//   moduleCount: number;
//   views: number;

//   ratingAverage?: number | null;
//   ratingCount: number;
//   totalRevenueAmount: number;

//   // ===== Media =====
//   thumbnailUrl: string;
//   trailerUrl?: string | null;

//   // ===== Meta =====
//   status: CourseStatus;
//   language: Language;
//   level: CourseLevel;

//   // ===== Ownership & Category =====
//   category?: {
//     id: string;
//     name: string;
//   } | null;

//   createdBy?: {
//     id: string;
//     fullName?: string | null;
//     avatarUrl?: string | null;
//   } | null;

//   // ===== Relations (counts or summaries) =====
//   tags?: {
//     id: string;
//     name: string;
//   }[];

//   // ===== Timestamps =====
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string | null;
// };
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterSidebarProps {
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  selectedDuration: string;
  setSelectedDuration: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  hasActiveFilters?: boolean;
  clearAllFilters?: () => void;
}

export interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export type ViewMode = "grid" | "list";

export type SortOption = "popular" | "rating" | "newest" | "price-low" | "price-high";
