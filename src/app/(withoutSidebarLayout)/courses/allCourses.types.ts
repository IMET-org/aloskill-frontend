

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