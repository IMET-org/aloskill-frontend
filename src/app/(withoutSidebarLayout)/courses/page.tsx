"use client";
import CourseGrid from "@/components/grids/CourseGrid";
import { PageHeading } from "@/components/shared/PageHeading.tsx";
import { apiClient } from "@/lib/api/client.ts";
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
import { useCallback, useEffect, useState } from "react";
import type { CourseType } from "./allCourses.types.ts";

// Filter options
const CATEGORIES = [
  { value: "", label: "All Categories", count: 125 },
  { value: "development", label: "Development", count: 45 },
  { value: "business", label: "Business", count: 32 },
  { value: "finance-accounting", label: "Finance & Accounting", count: 28 },
  { value: "technology", label: "Technology", count: 38 },
  { value: "javascript", label: "Javascript", count: 25 },
  { value: "marketing", label: "Marketing", count: 22 },
  { value: "health-fitness", label: "Health & Fitness", count: 18 },
];

const LEVELS = [
  { value: "", label: "All Levels", count: 125 },
  { value: "beginner", label: "Beginner", count: 55 },
  { value: "intermediate", label: "Intermediate", count: 42 },
  { value: "advanced", label: "Advanced", count: 28 },
];

const LANGUAGES = [
  { value: "", label: "All Languages", count: 125 },
  { value: "english", label: "English", count: 98 },
  { value: "bangla", label: "Bangla", count: 15 },
];

const RATINGS = [
  { value: "", label: "All Ratings" },
  { value: "4.5", label: "4.5 & up" },
  { value: "4.0", label: "4.0 & up" },
  { value: "3.5", label: "3.5 & up" },
  { value: "3.0", label: "3.0 & up" },
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
  const [filteredQuery, setFilteredQuery] = useState({
    category: "",
    level: "",
    language: "",
    rating: "",
    priceRange: [0, 100],
  });
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>([]);
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

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilteredQuery(prev => ({ ...prev, [fieldName]: value }));
  };
  // Filter and sort logic
  // const filteredAndSortedCourses = useMemo(() => {
  //   // let filtered = [...ALL_COURSES];

  //   // Search filter
  //   if (searchQuery) {
  //     filtered = filtered.filter(course =>
  //       course.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   // Category filter
  //   if (selectedCategory !== "all") {
  //     filtered = filtered.filter(
  //       course =>
  //         course.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCategory
  //     );
  //   }

  //   // Level filter
  //   if (selectedLevel !== "all") {
  //     filtered = filtered.filter(course => course.level?.toLowerCase() === selectedLevel);
  //   }

  //   // Language filter
  //   if (selectedLanguage !== "all") {
  //     filtered = filtered.filter(course => course.language?.toLowerCase() === selectedLanguage);
  //   }

  //   // Rating filter
  //   if (selectedRating !== "all") {
  //     const minRating = parseFloat(selectedRating);
  //     filtered = filtered.filter(course => course.rating >= minRating);
  //   }

  //

  //   // Price range filter
  //   filtered = filtered.filter(
  //     course => course.price >= (priceRange?.[0] ?? 0) && course.price <= (priceRange?.[1] ?? 100)
  //   );

  //   // Sort
  //   switch (sortBy) {
  //     case "rating":
  //       filtered.sort((a, b) => b.rating - a.rating);
  //       break;
  //     case "price-low":
  //       filtered.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-high":
  //       filtered.sort((a, b) => b.price - a.price);
  //       break;
  //     case "newest":
  //       filtered.sort((a, b) => Number(b.id) - Number(a.id));
  //       break;
  //     default:
  //       // Popular - by review count
  //       break;
  //   }

  //   return filtered;
  // }, [
  //   searchQuery,
  //   selectedCategory,
  //   selectedLevel,
  //   selectedLanguage,
  //   selectedRating,
  //   priceRange,
  //   sortBy,
  // ]);

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<CourseType[]>(
          `/course/public/allCourses?category=${filteredQuery.category}&level=${filteredQuery.level}&language=${filteredQuery.language}&rating=${filteredQuery.rating}&priceMin=${filteredQuery.priceRange[0]}&priceMax=${filteredQuery.priceRange[1]}`
        );
        console.log(response);
        setCourses(response.data ?? []);
      } catch (error) {
        console.error("Failed to fetch popular courses", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [filteredQuery]);
  const clearAllFilters = () => {
    setSearchQuery("");
    setSortBy("popular");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    filteredQuery.category !== "all" ||
    filteredQuery.level !== "all" ||
    filteredQuery.language !== "all" ||
    filteredQuery.rating !== "all" ||
    filteredQuery.priceRange[0] !== 0 ||
    filteredQuery.priceRange[1] !== 100;

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
                filteredQuery={filteredQuery}
                setFilteredQuery={setFilteredQuery}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                hasActiveFilters={hasActiveFilters}
                clearAllFilters={clearAllFilters}
                handleFilterChange={handleFilterChange}
              />
              {/* <FilterSidebar
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                selectedCategory={filteredQuery.category}
                setSelectedCategory={category => setFilteredQuery({ ...filteredQuery, category })}
                selectedLevel={filteredQuery.level}
                setSelectedLevel={level => setFilteredQuery({ ...filteredQuery, level })}
                selectedLanguage={filteredQuery.language}
                setSelectedLanguage={language => setFilteredQuery({ ...filteredQuery, language })}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              /> */}
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
                filteredQuery={filteredQuery}
                setFilteredQuery={setFilteredQuery}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                hasActiveFilters={hasActiveFilters}
                clearAllFilters={clearAllFilters}
                handleFilterChange={handleFilterChange}
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
                      {/* <span className='text-sm font-semibold text-orange-600'>
                        {filteredAndSortedCourses.length}
                      </span>
                      <span className='text-sm text-gray-600'>
                        {filteredAndSortedCourses.length === 1 ? "course" : "courses"} found
                      </span> */}
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
                courses={courses}
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
  filteredQuery,
  setFilteredQuery,
  hasActiveFilters,
  clearAllFilters,
  handleFilterChange,
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
                  checked={filteredQuery.category === cat.value}
                  onChange={e => setFilteredQuery(prev => ({ ...prev, category: e.target.value }))}
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
                checked={filteredQuery.rating === rating.value}
                onChange={e => setFilteredQuery(prev => ({ ...prev, rating: e.target.value }))}
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
                  checked={filteredQuery.level === level.value}
                  onChange={e => setFilteredQuery(prev => ({ ...prev, level: e.target.value }))}
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
                  checked={filteredQuery.language === lang.value}
                  onChange={e => setFilteredQuery(prev => ({ ...prev, language: e.target.value }))}
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
              <span className='text-lg font-bold text-gray-900'>
                ${filteredQuery.priceRange[0]}
              </span>
            </div>
            <div className='h-px w-8 bg-gray-300'></div>
            <div className='flex flex-col items-end'>
              <span className='text-xs text-gray-500 font-medium'>Max</span>
              <span className='text-lg font-bold text-gray-900'>
                ${filteredQuery.priceRange[1]}
              </span>
            </div>
          </div>

          <div className='space-y-3 px-1'>
            <div className='relative'>
              <input
                type='range'
                min='0'
                max='100'
                value={filteredQuery.priceRange[0]}
                onChange={e =>
                  setFilteredQuery(prev => ({
                    ...prev,
                    priceRange: [Number(e.target.value), prev.priceRange?.[1] ?? 100],
                  }))
                }
                className='w-full h-2 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full appearance-none cursor-pointer accent-orange-600 hover:accent-orange-700'
              />
            </div>
            <div className='relative'>
              <input
                type='range'
                min='0'
                max='100'
                value={filteredQuery.priceRange[1]}
                onChange={e =>
                  setFilteredQuery(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange?.[0] ?? 0, Number(e.target.value)],
                  }))
                }
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
                  value={filteredQuery.priceRange[0]}
                  onChange={e =>
                    setFilteredQuery(prev => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange?.[1] ?? 100],
                    }))
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
                  value={filteredQuery.priceRange[1]}
                  onChange={e =>
                    setFilteredQuery(prev => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange?.[1] ?? 100],
                    }))
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
  handleFilterChange?: (fieldName: string, value: string) => void;
}

interface FilterSidebarProps {
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
  filteredQuery: {
    category: string;
    level: string;
    language: string;
    rating: string;
    priceRange: number[];
  };
  setFilteredQuery: React.Dispatch<
    React.SetStateAction<{
      category: string;
      level: string;
      language: string;
      rating: string;
      priceRange: number[];
    }>
  >;
  hasActiveFilters?: boolean;
  clearAllFilters?: () => void;
  handleFilterChange: (fieldName: string, value: string) => void;
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
