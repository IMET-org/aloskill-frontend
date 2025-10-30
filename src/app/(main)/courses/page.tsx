// // ============================================================================
// // FILE: app/courses/page.tsx
// // All Courses Page with Filters, Search, and Pagination
// // ============================================================================

// "use client";

// import CourseGrid from "@/components/grids/CourseGrid";
// import { PageHeading } from "@/components/shared/PageHeading.tsx";
// import type { Course } from "@/types/course.types";
// import { Filter, Grid, List, Search, X } from "lucide-react";
// import { useCallback, useState } from "react";

// // Mock courses data - Replace with API call
// const ALL_COURSES: Course[] = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
//     category: "Digital Marketing",
//     categoryColor: "bg-blue-900",
//     rating: 4.5,
//     reviewCount: "4.5k",
//     price: 50.0,
//     originalPrice: 100.0,
//     discount: 50,
//     title: "IT Statistics Data Science And Business Analysis",
//     lessons: 10,
//     duration: "19h 30m",
//     students: "20+",
//     level: "Beginner",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Samantha",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
//     },
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
//     category: "Social Marketing",
//     categoryColor: "bg-purple-700",
//     rating: 4.5,
//     reviewCount: "4.5k",
//     price: 50.0,
//     title: "Beginner Adobe Illustrator For Graphic Design",
//     lessons: 10,
//     duration: "19h 30m",
//     students: "20+",
//     level: "Beginner",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Charles",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charles",
//     },
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
//     category: "Social Marketing",
//     categoryColor: "bg-purple-700",
//     rating: 4.5,
//     reviewCount: "4.5k",
//     price: 50.0,
//     originalPrice: 75.0,
//     discount: 33,
//     title: "Starting SEO As Your Home Based Business",
//     lessons: 8,
//     duration: "19h 30m",
//     students: "20+",
//     level: "Intermediate",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Morgan",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
//     },
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
//     category: "Web Development",
//     categoryColor: "bg-green-700",
//     rating: 4.8,
//     reviewCount: "3.2k",
//     price: 45.0,
//     title: "Full Stack Web Development Bootcamp",
//     lessons: 15,
//     duration: "25h 00m",
//     students: "50+",
//     level: "Advanced",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Alex",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
//     },
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&q=80",
//     category: "Python Programming",
//     categoryColor: "bg-yellow-700",
//     rating: 4.7,
//     reviewCount: "2.8k",
//     price: 55.0,
//     originalPrice: 90.0,
//     title: "Python for Data Science and Machine Learning",
//     lessons: 12,
//     duration: "22h 15m",
//     students: "35+",
//     level: "Intermediate",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Sarah",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//     },
//   },
//   {
//     id: 6,
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
//     category: "Business",
//     categoryColor: "bg-indigo-700",
//     rating: 4.6,
//     reviewCount: "1.9k",
//     price: 40.0,
//     title: "Digital Marketing Strategy Masterclass",
//     lessons: 9,
//     duration: "15h 45m",
//     students: "28+",
//     level: "All Levels",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "David",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
//     },
//   },
//   {
//     id: 7,
//     image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
//     category: "Programming",
//     categoryColor: "bg-teal-700",
//     rating: 4.9,
//     reviewCount: "5.1k",
//     price: 60.0,
//     originalPrice: 120.0,
//     title: "Complete JavaScript Course From Zero to Hero",
//     lessons: 18,
//     duration: "30h 00m",
//     students: "100+",
//     level: "Beginner",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "John",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//     },
//   },
//   {
//     id: 8,
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
//     category: "Data Science",
//     categoryColor: "bg-red-700",
//     rating: 4.4,
//     reviewCount: "2.3k",
//     price: 65.0,
//     title: "Data Analysis and Visualization with Excel",
//     lessons: 11,
//     duration: "18h 30m",
//     students: "40+",
//     level: "Intermediate",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Emma",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
//     },
//   },
//   {
//     id: 9,
//     image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80",
//     category: "UI/UX Design",
//     categoryColor: "bg-pink-700",
//     rating: 4.7,
//     reviewCount: "3.5k",
//     price: 48.0,
//     originalPrice: 80.0,
//     title: "UI/UX Design Fundamentals with Figma",
//     lessons: 14,
//     duration: "20h 15m",
//     students: "60+",
//     level: "Beginner",
//     language: "English",
//     certificate: true,
//     instructor: {
//       name: "Olivia",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
//     },
//   },
// ];

// // Categories for filter
// const CATEGORIES = [
//   { value: "all", label: "All Categories" },
//   { value: "digital-marketing", label: "Digital Marketing" },
//   { value: "web-development", label: "Web Development" },
//   { value: "programming", label: "Programming" },
//   { value: "data-science", label: "Data Science" },
//   { value: "ui-ux", label: "UI/UX Design" },
//   { value: "business", label: "Business" },
// ];

// // Levels for filter
// const LEVELS = [
//   { value: "all", label: "All Levels" },
//   { value: "beginner", label: "Beginner" },
//   { value: "intermediate", label: "Intermediate" },
//   { value: "advanced", label: "Advanced" },
// ];

// // Price ranges for filter
// const PRICE_RANGES = [
//   { value: "all", label: "All Prices" },
//   { value: "0-50", label: "Under $50" },
//   { value: "50-100", label: "$50 - $100" },
//   { value: "100+", label: "$100+" },
// ];

// // Sort options
// const SORT_OPTIONS = [
//   { value: "popular", label: "Most Popular" },
//   { value: "rating", label: "Highest Rated" },
//   { value: "price-low", label: "Price: Low to High" },
//   { value: "price-high", label: "Price: High to Low" },
//   { value: "newest", label: "Newest First" },
// ];

// export default function AllCoursesPage() {
//   const [courses, setCourses] = useState<Course[]>(ALL_COURSES.slice(0, 9));
//   const [allCourses] = useState<Course[]>(ALL_COURSES);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedLevel, setSelectedLevel] = useState("all");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("all");
//   const [sortBy, setSortBy] = useState("popular");
//   const [showFilters, setShowFilters] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   // Cart and wishlist state
//   const [cartItems, setCartItems] = useState<Set<string | number>>(new Set());
//   const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());

//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(allCourses.length / itemsPerPage);

//   // Filter and sort courses
//   const getFilteredAndSortedCourses = useCallback(() => {
//     let filtered = [...allCourses];

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter(course =>
//         course.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Category filter
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(course =>
//         course.category.toLowerCase().includes(selectedCategory.replace("-", " "))
//       );
//     }

//     // Level filter
//     if (selectedLevel !== "all") {
//       filtered = filtered.filter(course => course.level?.toLowerCase() === selectedLevel);
//     }

//     // Price range filter
//     if (selectedPriceRange !== "all") {
//       if (selectedPriceRange === "0-50") {
//         filtered = filtered.filter(course => course.price < 50);
//       } else if (selectedPriceRange === "50-100") {
//         filtered = filtered.filter(course => course.price >= 50 && course.price <= 100);
//       } else if (selectedPriceRange === "100+") {
//         filtered = filtered.filter(course => course.price > 100);
//       }
//     }

//     // Sort
//     switch (sortBy) {
//       case "rating":
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       case "price-low":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case "newest":
//         // Assuming newer courses have higher IDs
//         filtered.sort((a, b) => Number(b.id) - Number(a.id));
//         break;
//       default:
//         // Popular - sort by review count
//         break;
//     }

//     return filtered;
//   }, [allCourses, searchQuery, selectedCategory, selectedLevel, selectedPriceRange, sortBy]);

//   // Load more / pagination
//   const handleLoadMore = useCallback(async () => {
//     setIsLoading(true);

//     const filtered = getFilteredAndSortedCourses();
//     const nextPage = currentPage + 1;
//     const startIndex = 0;
//     const endIndex = nextPage * itemsPerPage;

//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));

//       setCourses(filtered.slice(startIndex, endIndex));
//       setCurrentPage(nextPage);
//     } catch (error) {
//       console.error("Failed to load more courses:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPage, getFilteredAndSortedCourses]);

//   // Apply filters
//   const applyFilters = useCallback(() => {
//     const filtered = getFilteredAndSortedCourses();
//     setCourses(filtered.slice(0, itemsPerPage));
//     setCurrentPage(1);
//   }, [getFilteredAndSortedCourses]);

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     setSearchQuery("");
//     setSelectedCategory("all");
//     setSelectedLevel("all");
//     setSelectedPriceRange("all");
//     setSortBy("popular");
//     setCourses(allCourses.slice(0, itemsPerPage));
//     setCurrentPage(1);
//   }, [allCourses]);

//   // Handle cart
//   const handleAddToCart = useCallback((courseId: string | number) => {
//     setCartItems(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(courseId)) {
//         newSet.delete(courseId);
//       } else {
//         newSet.add(courseId);
//       }
//       return newSet;
//     });
//   }, []);

//   // Handle wishlist
//   const handleAddToWishlist = useCallback(async (courseId: string | number) => {
//     setWishlistItems(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(courseId)) {
//         newSet.delete(courseId);
//       } else {
//         newSet.add(courseId);
//       }
//       return newSet;
//     });
//     await new Promise(resolve => setTimeout(resolve, 500));
//   }, []);

//   // Handle enroll
//   const handleEnroll = useCallback((courseId: string | number) => {
//     console.log(`Enrolling in course: ${courseId}`);
//   }, []);

//   // Apply filters when any filter changes
//   const handleFilterChange = useCallback(() => {
//     applyFilters();
//   }, [applyFilters]);

//   const hasActiveFilters =
//     searchQuery ||
//     selectedCategory !== "all" ||
//     selectedLevel !== "all" ||
//     selectedPriceRange !== "all" ||
//     sortBy !== "popular";

//   const filteredCoursesCount = getFilteredAndSortedCourses().length;
//   const hasMoreToLoad = currentPage * itemsPerPage < filteredCoursesCount;

//   return (
//     <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
//       {/* Header */}
//       {/* <div className='bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <h1 className='text-4xl md:text-5xl font-black mb-4'>Explore All Courses</h1>
//           <p className='text-lg text-orange-100 max-w-2xl'>
//             Discover {allCourses.length}+ courses to help you learn new skills and advance your
//             career
//           </p>
//         </div>
//       </div> */}
//       <PageHeading />
//       {/* Main Content */}
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
//         {/* Search Bar */}
//         <div className='mb-8'>
//           <div className='relative'>
//             <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
//             <input
//               type='text'
//               placeholder='Search courses...'
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && handleFilterChange()}
//               className='w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-900 placeholder-gray-400'
//             />
//           </div>
//         </div>

//         {/* Filters Bar */}
//         <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8'>
//           <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
//             {/* Left side - Filters */}
//             <div className='flex flex-wrap items-center gap-3 flex-1'>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
//               >
//                 <Filter className='w-4 h-4' />
//                 <span className='text-sm font-semibold'>Filters</span>
//               </button>

//               {/* Category */}
//               <select
//                 value={selectedCategory}
//                 onChange={e => {
//                   setSelectedCategory(e.target.value);
//                   handleFilterChange();
//                 }}
//                 className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm'
//               >
//                 {CATEGORIES.map(cat => (
//                   <option
//                     key={cat.value}
//                     value={cat.value}
//                   >
//                     {cat.label}
//                   </option>
//                 ))}
//               </select>

//               {/* Level */}
//               <select
//                 value={selectedLevel}
//                 onChange={e => {
//                   setSelectedLevel(e.target.value);
//                   handleFilterChange();
//                 }}
//                 className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm'
//               >
//                 {LEVELS.map(level => (
//                   <option
//                     key={level.value}
//                     value={level.value}
//                   >
//                     {level.label}
//                   </option>
//                 ))}
//               </select>

//               {/* Price Range */}
//               <select
//                 value={selectedPriceRange}
//                 onChange={e => {
//                   setSelectedPriceRange(e.target.value);
//                   handleFilterChange();
//                 }}
//                 className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm'
//               >
//                 {PRICE_RANGES.map(range => (
//                   <option
//                     key={range.value}
//                     value={range.value}
//                   >
//                     {range.label}
//                   </option>
//                 ))}
//               </select>

//               {hasActiveFilters && (
//                 <button
//                   onClick={clearFilters}
//                   className='flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-semibold'
//                 >
//                   <X className='w-4 h-4' />
//                   Clear Filters
//                 </button>
//               )}
//             </div>

//             {/* Right side - Sort & View */}
//             <div className='flex items-center gap-3'>
//               {/* Sort */}
//               <select
//                 value={sortBy}
//                 onChange={e => {
//                   setSortBy(e.target.value);
//                   handleFilterChange();
//                 }}
//                 className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm'
//               >
//                 {SORT_OPTIONS.map(option => (
//                   <option
//                     key={option.value}
//                     value={option.value}
//                   >
//                     {option.label}
//                   </option>
//                 ))}
//               </select>

//               {/* View Mode Toggle */}
//               <div className='flex items-center gap-1 bg-gray-100 rounded-lg p-1'>
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded transition-colors ${
//                     viewMode === "grid"
//                       ? "bg-white text-orange-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                   aria-label='Grid view'
//                 >
//                   <Grid className='w-4 h-4' />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded transition-colors ${
//                     viewMode === "list"
//                       ? "bg-white text-orange-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                   aria-label='List view'
//                 >
//                   <List className='w-4 h-4' />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className='mb-6'>
//           <p className='text-gray-600'>
//             Showing <span className='font-semibold text-gray-900'>{courses.length}</span> of{" "}
//             <span className='font-semibold text-gray-900'>{filteredCoursesCount}</span> courses
//           </p>
//         </div>

//         {/* Courses Grid */}
//         <CourseGrid
//           courses={courses}
//           isLoading={isLoading}
//           onEnroll={handleEnroll}
//           onAddToCart={handleAddToCart}
//           onAddToWishlist={handleAddToWishlist}
//           cartItems={cartItems}
//           wishlistItems={wishlistItems}
//           emptyStateMessage='No courses found. Try adjusting your filters.'
//         />

//         {/* Load More / Pagination */}
//         {hasMoreToLoad && !isLoading && (
//           <div className='mt-12 flex justify-center'>
//             <button
//               onClick={handleLoadMore}
//               className='px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl'
//             >
//               Load More Courses
//             </button>
//           </div>
//         )}

//         {/* Pagination Info */}
//         {filteredCoursesCount > itemsPerPage && (
//           <div className='mt-8 text-center text-gray-600'>
//             <p>
//               Page {currentPage} of {Math.ceil(filteredCoursesCount / itemsPerPage)}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ============================================================================
// FILE: app/courses/page.tsx
// All Courses Page with Left Sidebar Filters - Production Ready
// ============================================================================

"use client";

import CourseGrid from "@/components/grids/CourseGrid";
import { PageHeading } from "@/components/shared/PageHeading.tsx";
import type { Course } from "@/types/course.types";
import { ChevronRight, Filter, Grid, LayoutList, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { FilterSectionProps, FilterSidebarProps } from "./allCourses.types.ts";

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
    <div className='bg-gradient-to-tr from-pink-50 via-purple-50 to-white'>
      <div className='min-h-screen  max-w-[80%] mx-auto'>
        <PageHeading />
        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className='lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform'
        >
          <SlidersHorizontal className='w-6 h-6' />
        </button>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className='lg:hidden fixed inset-0 z-50 bg-black/50'>
            <div className='absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10'>
                <h2 className='text-lg font-bold text-gray-900'>Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
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

        <div className='max-w-[1920px] mx-auto'>
          <div className='flex'>
            {/* Left Sidebar - Desktop */}
            <aside className='hidden lg:block w-80 flex-shrink-0 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-black text-gray-900 flex items-center gap-2'>
                    <Filter className='w-5 h-5' />
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className='text-sm text-orange-600 hover:text-orange-700 font-semibold'
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
              <div className='sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm'>
                <div className='px-4 sm:px-6 lg:px-8 py-4'>
                  {/* Search Bar */}
                  <div className='mb-4'>
                    <div className='relative max-w-2xl'>
                      <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                      <input
                        type='text'
                        placeholder='Search course...'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className='w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-900 placeholder-gray-400'
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                      <p className='text-sm text-gray-600'>
                        Showing{" "}
                        <span className='font-semibold text-gray-900'>
                          {filteredAndSortedCourses.length}
                        </span>{" "}
                        results
                      </p>
                    </div>

                    <div className='flex items-center gap-3'>
                      {/* Sort */}
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm bg-white'
                      >
                        <option
                          value=''
                          disabled
                        >
                          Sort By
                        </option>
                        {SORT_OPTIONS.map(option => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>

                      {/* View Mode */}
                      <div className='flex items-center gap-1 bg-gray-100 rounded-lg p-1'>
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded transition-colors ${
                            viewMode === "grid"
                              ? "bg-white text-orange-600 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                          aria-label='Grid view'
                        >
                          <Grid className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded transition-colors ${
                            viewMode === "list"
                              ? "bg-white text-orange-600 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
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
              <div className='p-4 sm:p-6 lg:p-8'>
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
    <div className='space-y-6'>
      {/* Category */}
      <FilterSection
        title='CATEGORY'
        isExpanded={expandedSections.has("category")}
        onToggle={() => toggleSection("category")}
      >
        <div className='space-y-2'>
          {CATEGORIES.map(cat => (
            <label
              key={cat.value}
              className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group'
            >
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='category'
                  value={cat.value}
                  checked={selectedCategory === cat.value}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className='w-4 h-4 text-orange-600 focus:ring-orange-500'
                />
                <span className='text-sm text-gray-700 group-hover:text-gray-900'>{cat.label}</span>
              </div>
              <span className='text-xs text-gray-400'>({cat.count})</span>
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
        <div className='space-y-2'>
          {RATINGS.map(rating => (
            <label
              key={rating.value}
              className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group'
            >
              <input
                type='radio'
                name='rating'
                value={rating.value}
                checked={selectedRating === rating.value}
                onChange={e => setSelectedRating(e.target.value)}
                className='w-4 h-4 text-orange-600 focus:ring-orange-500'
              />
              <div className='flex items-center gap-2'>
                {rating.value !== "all" && (
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < parseFloat(rating.value) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <span className='text-sm text-gray-700 group-hover:text-gray-900'>
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
        <div className='space-y-2'>
          {LEVELS.map(level => (
            <label
              key={level.value}
              className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group'
            >
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='level'
                  value={level.value}
                  checked={selectedLevel === level.value}
                  onChange={e => setSelectedLevel(e.target.value)}
                  className='w-4 h-4 text-orange-600 focus:ring-orange-500'
                />
                <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                  {level.label}
                </span>
              </div>
              <span className='text-xs text-gray-400'>({level.count})</span>
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
        <div className='space-y-2'>
          {LANGUAGES.map(lang => (
            <label
              key={lang.value}
              className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group'
            >
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='language'
                  value={lang.value}
                  checked={selectedLanguage === lang.value}
                  onChange={e => setSelectedLanguage(e.target.value)}
                  className='w-4 h-4 text-orange-600 focus:ring-orange-500'
                />
                <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                  {lang.label}
                </span>
              </div>
              <span className='text-xs text-gray-400'>({lang.count})</span>
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
        <div className='space-y-2'>
          {DURATIONS.map(duration => (
            <label
              key={duration.value}
              className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group'
            >
              <input
                type='radio'
                name='duration'
                value={duration.value}
                checked={selectedDuration === duration.value}
                onChange={e => setSelectedDuration(e.target.value)}
                className='w-4 h-4 text-orange-600 focus:ring-orange-500'
              />
              <span className='text-sm text-gray-700 group-hover:text-gray-900'>
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
        <div className='space-y-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-gray-600'>Min: ${priceRange[0]}</span>
            <span className='text-gray-600'>Max: ${priceRange[1]}</span>
          </div>
          <div className='space-y-2'>
            <input
              type='range'
              min='0'
              max='100'
              value={priceRange[0]}
              onChange={e => setPriceRange([parseInt(e.target.value), priceRange?.[1] ?? 100])}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600'
            />
            <input
              type='range'
              min='0'
              max='100'
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange?.[0] ?? 0, parseInt(e.target.value)])}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600'
            />
          </div>
          <div className='flex gap-2'>
            <input
              type='number'
              value={priceRange[0]}
              onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange?.[1] ?? 100])}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm'
              placeholder='Min'
            />
            <input
              type='number'
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange?.[0] ?? 0, parseInt(e.target.value) || 100])}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm'
              placeholder='Max'
            />
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

// Filter Section Component

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className='border-b border-gray-200 pb-6 last:border-b-0'>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between mb-4 group'
      >
        <h3 className='text-xs font-bold text-gray-900 tracking-wider'>{title}</h3>
        <ChevronRight
          className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}
