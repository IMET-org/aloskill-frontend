"use client";
import CourseGrid from "@/components/grids/CourseGrid";
import { PageHeading } from "@/components/shared/PageHeading.tsx";
import {
  ChevronRight,
  Filter,
  Grid,
  LayoutList,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { Course } from "./allCourses.types.ts";

// Mock courses data - Replace with API
const ALL_COURSES: Course[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    category: "Development",
    categoryColor: "bg-blue-600",
    rating: 4.8,
    reviewCount: "15,000",
    price: 49.99,
    originalPrice: 99.99,
    discount: 50,
    title: "Complete Digital Design: Learn Consistent Designing For Beginners",
    lessons: 10,
    duration: "19h 30m",
    students: "2.5k",
    level: "Beginner",
    language: "English",
    certificate: true,
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    category: "Business",
    categoryColor: "bg-purple-600",
    rating: 4.7,
    reviewCount: "12,000",
    price: 39.99,
    title: "Agile Practise PLLC - Advanced Trading Course",
    lessons: 8,
    duration: "15h 20m",
    students: "1.8k",
    level: "Advanced",
    language: "English",
    certificate: true,
    instructor: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
    category: "IT & Software",
    categoryColor: "bg-green-600",
    rating: 4.9,
    reviewCount: "20,000",
    price: 59.99,
    originalPrice: 119.99,
    title: "Ultimate AWS Certified Solutions Architect Associate 2025",
    lessons: 15,
    duration: "25h 00m",
    students: "5.2k",
    level: "Intermediate",
    language: "English",
    certificate: true,
    instructor: {
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    category: "Design",
    categoryColor: "bg-pink-600",
    rating: 4.6,
    reviewCount: "8,500",
    price: 44.99,
    title: "Learn Ethical Hacking from Scratch 2025",
    lessons: 12,
    duration: "18h 45m",
    students: "3.1k",
    level: "Beginner",
    language: "English",
    certificate: true,
    instructor: {
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&q=80",
    category: "Marketing",
    categoryColor: "bg-orange-600",
    rating: 4.5,
    reviewCount: "10,000",
    price: 34.99,
    originalPrice: 69.99,
    title: "Adapting - The Complete Guide Select Database",
    lessons: 9,
    duration: "14h 30m",
    students: "2.3k",
    level: "All Levels",
    language: "English",
    certificate: true,
    instructor: {
      name: "David Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    category: "Development",
    categoryColor: "bg-blue-600",
    rating: 4.8,
    reviewCount: "18,000",
    price: 54.99,
    title: "SQL for NEWBS: Weekender Crash Course",
    lessons: 11,
    duration: "16h 15m",
    students: "4.5k",
    level: "Beginner",
    language: "English",
    certificate: true,
    instructor: {
      name: "Alex Turner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    category: "Finance & Accounting",
    categoryColor: "bg-teal-600",
    rating: 4.7,
    reviewCount: "9,000",
    price: 64.99,
    originalPrice: 129.99,
    title: "ISO 45001 - Complete ISO 45001 Exam Prep and ISO",
    lessons: 13,
    duration: "20h 00m",
    students: "1.9k",
    level: "Advanced",
    language: "English",
    certificate: true,
    instructor: {
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80",
    category: "Design",
    categoryColor: "bg-pink-600",
    rating: 4.9,
    reviewCount: "22,000",
    price: 49.99,
    title: "[NEW] Ultimate 2025 Certified Course - Sustainable",
    lessons: 14,
    duration: "22h 30m",
    students: "6.8k",
    level: "Intermediate",
    language: "English",
    certificate: true,
    instructor: {
      name: "Chris Martin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    },
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    category: "Health & Fitness",
    categoryColor: "bg-red-600",
    rating: 4.4,
    reviewCount: "7,000",
    price: 29.99,
    title: "Complete Beginner's Guide To Cycling and Equipment",
    lessons: 7,
    duration: "12h 00m",
    students: "1.5k",
    level: "Beginner",
    language: "English",
    certificate: false,
    instructor: {
      name: "Tom Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    },
  },
];

// Filter options
const CATEGORIES = [
  { value: "all", label: "All Categories", count: 125 },
  { value: "development", label: "Development", count: 45 },
  { value: "business", label: "Business", count: 32 },
  { value: "finance-accounting", label: "Finance & Accounting", count: 28 },
  { value: "it-software", label: "IT & Software", count: 38 },
  { value: "design", label: "Design", count: 25 },
  { value: "marketing", label: "Marketing", count: 22 },
  { value: "health-fitness", label: "Health & Fitness", count: 18 },
];

const LEVELS = [
  { value: "all", label: "All Levels", count: 125 },
  { value: "beginner", label: "Beginner", count: 55 },
  { value: "intermediate", label: "Intermediate", count: 42 },
  { value: "advanced", label: "Advanced", count: 28 },
];

const LANGUAGES = [
  { value: "all", label: "All Languages", count: 125 },
  { value: "english", label: "English", count: 98 },
  { value: "spanish", label: "Spanish", count: 15 },
  { value: "french", label: "French", count: 12 },
];

const RATINGS = [
  { value: "all", label: "All Ratings" },
  { value: "4.5", label: "4.5 & up" },
  { value: "4.0", label: "4.0 & up" },
  { value: "3.5", label: "3.5 & up" },
  { value: "3.0", label: "3.0 & up" },
];

const DURATIONS = [
  { value: "all", label: "All Durations" },
  { value: "0-2", label: "0-2 Hours" },
  { value: "2-5", label: "2-5 Hours" },
  { value: "5-10", label: "5-10 Hours" },
  { value: "10+", label: "10+ Hours" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function AllCoursesPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cart and wishlist
  const [cartItems, setCartItems] = useState<Set<string | number>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["category", "rating", "level"])
  );

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Filter and sort logic
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = [...ALL_COURSES];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        course =>
          course.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCategory
      );
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(course => course.level?.toLowerCase() === selectedLevel);
    }

    // Language filter
    if (selectedLanguage !== "all") {
      filtered = filtered.filter(course => course.language?.toLowerCase() === selectedLanguage);
    }

    // Rating filter
    if (selectedRating !== "all") {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(course => course.rating >= minRating);
    }

    // Duration filter
    if (selectedDuration !== "all") {
      filtered = filtered.filter(course => {
        const hours = parseFloat(course.duration);
        if (selectedDuration === "0-2") return hours <= 2;
        if (selectedDuration === "2-5") return hours > 2 && hours <= 5;
        if (selectedDuration === "5-10") return hours > 5 && hours <= 10;
        if (selectedDuration === "10+") return hours > 10;
        return true;
      });
    }

    // Price range filter
    filtered = filtered.filter(
      course => course.price >= (priceRange?.[0] ?? 0) && course.price <= (priceRange?.[1] ?? 100)
    );

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        // Popular - by review count
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedLanguage,
    selectedRating,
    selectedDuration,
    priceRange,
    sortBy,
  ]);

  // Handlers
  const handleAddToCart = useCallback((courseId: string | number) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  }, []);

  const handleAddToWishlist = useCallback(async (courseId: string | number) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
    await new Promise(resolve => setTimeout(resolve, 300));
  }, []);

  const handleEnroll = useCallback((courseId: string | number) => {
    console.log(`Enrolling in course: ${courseId}`);
    // Navigate to checkout or show modal
  }, []);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedLanguage("all");
    setSelectedRating("all");
    setSelectedDuration("all");
    setPriceRange([0, 100]);
    setSortBy("popular");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedLevel !== "all" ||
    selectedLanguage !== "all" ||
    selectedRating !== "all" ||
    selectedDuration !== "all" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 100;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30'>
      <div className='mx-auto max-w-[1920px] '>
        <PageHeading />

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className='lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-200'
        >
          <SlidersHorizontal className='w-5 h-5' />
        </button>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className='lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'>
            <div className='absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto'>
              <div className='sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between z-10'>
                <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                  <Filter className='w-5 h-5 text-orange-600' />
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className='p-2 hover:bg-gray-100 rounded-xl transition-colors'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
              <FilterSidebar
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                hasActiveFilters={hasActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        )}

        <div className='flex '>
          {/* Left Sidebar - Desktop */}
          <aside className='hidden lg:block w-72 xl:w-80 shrink-0 bg-white/80 backdrop-blur-sm border-r border-gray-100 h-screen sticky top-0 overflow-y-auto shadow-sm pl-4  '>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-100'>
                <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                  <div className='p-2 bg-orange-50 rounded-lg'>
                    <Filter className='w-5 h-5 text-orange-600' />
                  </div>
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className='text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all'
                  >
                    Clear All
                  </button>
                )}
              </div>

              <FilterSidebar
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                hasActiveFilters={hasActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className='flex-1 min-w-0'>
            {/* Top Bar */}
            <div className='sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'>
              <div className='px-4 sm:px-6 lg:px-8 py-5'>
                {/* Search Bar */}
                <div className='mb-5'>
                  <div className='relative max-w-2xl'>
                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                      <Search className='w-5 h-5' />
                    </div>
                    <input
                      type='text'
                      placeholder='Search for courses...'
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className='w-full pl-12 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 text-gray-900 placeholder-gray-400 transition-all shadow-sm hover:shadow-md'
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-100'>
                      <span className='text-sm font-semibold text-orange-600'>
                        {filteredAndSortedCourses.length}
                      </span>
                      <span className='text-sm text-gray-600'>
                        {filteredAndSortedCourses.length === 1 ? "course" : "courses"} found
                      </span>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    {/* Sort */}
                    <div className='relative'>
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className='appearance-none px-5 py-2 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm bg-white font-medium text-gray-700 cursor-pointer transition-all shadow-sm hover:shadow-md'
                      >
                        {SORT_OPTIONS.map(option => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronRight className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none' />
                    </div>

                    {/* View Mode */}
                    <div className='flex items-center gap-1 bg-gray-100 rounded-lg p-1 shadow-sm'>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "grid"
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        aria-label='Grid view'
                      >
                        <Grid className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "list"
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        aria-label='List view'
                      >
                        <LayoutList className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className='p-4'>
              <CourseGrid
                courses={filteredAndSortedCourses}
                isLoading={isLoading}
                onEnroll={handleEnroll}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                emptyStateMessage='No courses found. Try adjusting your filters.'
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Filter Sidebar Component
function FilterSidebar({
  expandedSections,
  toggleSection,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedLanguage,
  setSelectedLanguage,
  selectedRating,
  setSelectedRating,
  selectedDuration,
  setSelectedDuration,
  priceRange,
  setPriceRange,
}: FilterSidebarProps) {
  return (
    <div className='space-y-3'>
      {/* Category */}
      <FilterSection
        title='CATEGORY'
        isExpanded={expandedSections.has("category")}
        onToggle={() => toggleSection("category")}
      >
        <div className='space-y-1'>
          {CATEGORIES.map(cat => (
            <label
              key={cat.value}
              className='flex items-center justify-between px-3 py-1 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 rounded-lg cursor-pointer group transition-all'
            >
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='category'
                  value={cat.value}
                  checked={selectedCategory === cat.value}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className='w-4 h-4 text-orange-600 focus:ring-orange-500 focus:ring-2'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors'>
                  {cat.label}
                </span>
              </div>
              <span className='text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md'>
                {cat.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection
        title='RATING'
        isExpanded={expandedSections.has("rating")}
        onToggle={() => toggleSection("rating")}
      >
        <div className='space-y-1.5'>
          {RATINGS.map(rating => (
            <label
              key={rating.value}
              className='flex items-center gap-3 px-3 py-1  hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 rounded-xl cursor-pointer group transition-all'
            >
              <input
                type='radio'
                name='rating'
                value={rating.value}
                checked={selectedRating === rating.value}
                onChange={e => setSelectedRating(e.target.value)}
                className='w-4 h-4 text-orange-600 focus:ring-orange-500 focus:ring-2'
              />
              <div className='flex items-center gap-2'>
                {rating.value !== "all" && (
                  <div className='flex items-center gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(parseFloat(rating.value))
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors'>
                  {rating.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Level */}
      <FilterSection
        title='LEVEL'
        isExpanded={expandedSections.has("level")}
        onToggle={() => toggleSection("level")}
      >
        <div className='space-y-1.5'>
          {LEVELS.map(level => (
            <label
              key={level.value}
              className='flex items-center justify-between px-3 py-1  hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 rounded-xl cursor-pointer group transition-all'
            >
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='level'
                  value={level.value}
                  checked={selectedLevel === level.value}
                  onChange={e => setSelectedLevel(e.target.value)}
                  className='w-4 h-4 text-orange-600 focus:ring-orange-500 focus:ring-2'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors'>
                  {level.label}
                </span>
              </div>
              <span className='text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md'>
                {level.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Language */}
      <FilterSection
        title='LANGUAGE'
        isExpanded={expandedSections.has("language")}
        onToggle={() => toggleSection("language")}
      >
        <div className='space-y-1.5'>
          {LANGUAGES.map(lang => (
            <label
              key={lang.value}
              className='flex items-center justify-between px-3 py-1  hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 rounded-xl cursor-pointer group transition-all'
            >
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='language'
                  value={lang.value}
                  checked={selectedLanguage === lang.value}
                  onChange={e => setSelectedLanguage(e.target.value)}
                  className='w-4 h-4 text-orange-600 focus:ring-orange-500 focus:ring-2'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors'>
                  {lang.label}
                </span>
              </div>
              <span className='text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md'>
                {lang.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection
        title='DURATION'
        isExpanded={expandedSections.has("duration")}
        onToggle={() => toggleSection("duration")}
      >
        <div className='space-y-1.5'>
          {DURATIONS.map(duration => (
            <label
              key={duration.value}
              className='flex items-center gap-3 px-3 py-1  hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 rounded-xl cursor-pointer group transition-all'
            >
              <input
                type='radio'
                name='duration'
                value={duration.value}
                checked={selectedDuration === duration.value}
                onChange={e => setSelectedDuration(e.target.value)}
                className='w-4 h-4 text-orange-600 focus:ring-orange-500 focus:ring-2'
              />
              <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors'>
                {duration.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title='PRICE'
        isExpanded={expandedSections.has("price")}
        onToggle={() => toggleSection("price")}
      >
        <div className='space-y-5'>
          <div className='flex items-center justify-between px-1'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 font-medium'>Min</span>
              <span className='text-lg font-bold text-gray-900'>${priceRange[0]}</span>
            </div>
            <div className='h-px w-8 bg-gray-300'></div>
            <div className='flex flex-col items-end'>
              <span className='text-xs text-gray-500 font-medium'>Max</span>
              <span className='text-lg font-bold text-gray-900'>${priceRange[1]}</span>
            </div>
          </div>

          <div className='space-y-3 px-1'>
            <div className='relative'>
              <input
                type='range'
                min='0'
                max='100'
                value={priceRange[0]}
                onChange={e => setPriceRange([parseInt(e.target.value), priceRange?.[1] ?? 100])}
                className='w-full h-2 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full appearance-none cursor-pointer accent-orange-600 hover:accent-orange-700'
              />
            </div>
            <div className='relative'>
              <input
                type='range'
                min='0'
                max='100'
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange?.[0] ?? 0, parseInt(e.target.value)])}
                className='w-full h-2 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full appearance-none cursor-pointer accent-orange-600 hover:accent-orange-700'
              />
            </div>
          </div>

          <div className='flex gap-3'>
            <div className='flex-1'>
              <label className='text-xs font-medium text-gray-600 mb-1.5 block'>Min Price</label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium'>
                  $
                </span>
                <input
                  type='number'
                  value={priceRange[0]}
                  onChange={e =>
                    setPriceRange([parseInt(e.target.value) || 0, priceRange?.[1] ?? 100])
                  }
                  className='w-full pl-7 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all'
                  placeholder='0'
                />
              </div>
            </div>
            <div className='flex-1'>
              <label className='text-xs font-medium text-gray-600 mb-1.5 block'>Max Price</label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium'>
                  $
                </span>
                <input
                  type='number'
                  value={priceRange[1]}
                  onChange={e =>
                    setPriceRange([priceRange?.[0] ?? 0, parseInt(e.target.value) || 100])
                  }
                  className='w-full pl-7 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all'
                  placeholder='100'
                />
              </div>
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

// Filter Section Component
interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

interface FilterSidebarProps {
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

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className='border-b border-gray-100 pb-2 last:border-b-0'>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between  p-2  hover:bg-gray-50 rounded-xl transition-all group'
      >
        <h3 className='text-sm font-bold text-gray-600 tracking-wider uppercase group-hover:text-gray-900 transition-colors'>
          {title}
        </h3>
        <div
          className={`p-1.5 bg-gray-100 rounded-lg group-hover:bg-orange-100 transition-all ${isExpanded ? "rotate-90" : ""}`}
        >
          <ChevronRight
            className={`w-3.5 h-3.5 text-gray-500 group-hover:text-orange-600 transition-all`}
          />
        </div>
      </button>
      {isExpanded && (
        <div className='animate-in fade-in slide-in-from-top-2 duration-200'>{children}</div>
      )}
    </div>
  );
}
