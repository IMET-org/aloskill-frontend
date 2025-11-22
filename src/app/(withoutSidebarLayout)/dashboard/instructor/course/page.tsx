"use client";

import { useState } from "react";
import { Search, Star, Users, ChevronDown, MoreVertical, Trash2, Edit } from "lucide-react";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    rating: 4.9,
    students: "982,941",
    price: "$24.00",
  },
  {
    id: 2,
    title: "Learn Python Programming Masterclass",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=250&fit=crop",
    rating: 4.0,
    students: "511,123",
    price: "$49.00",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms Essentials (2021)",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    rating: 5.0,
    students: "197,637",
    price: "$23.00",
    originalPrice: "$35.00",
  },
  {
    id: 4,
    title: "Learning A-Z™: Hands-On Python Data Science",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    rating: 5.0,
    students: "211,434",
    price: "$89.00",
  },
  {
    id: 5,
    title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    rating: 4.9,
    students: "982,941",
    price: "$24.00",
  },
  {
    id: 6,
    title: "Learn Python Programming Masterclass",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=250&fit=crop",
    rating: 4.0,
    students: "511,123",
    price: "$49.00",
  },
  {
    id: 7,
    title: "Data Structures & Algorithms Essentials (2021)",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    rating: 5.0,
    students: "197,637",
    price: "$23.00",
    originalPrice: "$35.00",
  },
  {
    id: 8,
    title: "Learning A-Z™: Hands-On Python Data Science",
    category: "DEVELOPMENTS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    rating: 5.0,
    students: "211,434",
    price: "$89.00",
  },
];

const InstructorCoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [category, setCategory] = useState("All Category");
  const [rating, setRating] = useState("4 Star & Up");
  const [showMenu, setShowMenu] = useState(0);

  return (
    <div className='min-h-screen w-full px-4'>
      {/* Filters Section */}
      <div className='mb-8'>
        <div className='grid grid-cols-4 gap-6'>
          {/* Search */}
          <div>
            <label className='block text-xs text-gray-700 mb-2'>Search:</label>
            <div className='relative'>
              <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
              <input
                type='text'
                placeholder='Search in your courses...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full pl-8 pr-4 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent bg-white placeholder:text-sm'
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className='block text-xs text-gray-700 mb-2'>Sort by:</label>
            <div className='relative'>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className='w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent bg-white appearance-none cursor-pointer'
              >
                <option>Latest</option>
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className='block text-xs text-gray-700 mb-2'>Category</label>
            <div className='relative'>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent bg-white appearance-none cursor-pointer'
              >
                <option>All Category</option>
                <option>Developments</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className='block text-xs text-gray-700 mb-2'>Rating</label>
            <div className='relative'>
              <select
                value={rating}
                onChange={e => setRating(e.target.value)}
                className='w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent bg-white appearance-none cursor-pointer'
              >
                <option>4 Star & Up</option>
                <option>3 Star & Up</option>
                <option>2 Star & Up</option>
                <option>All Ratings</option>
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className='grid grid-cols-3 gap-3'>
        {courses.map(course => (
          <div
            key={course.id}
            className='bg-white rounded overflow-hidden group'
          >
            {/* Course Image */}
            <div className='relative h-[55%] overflow-hidden'>
              <Image
                width={250}
                height={250}
                src={course.image}
                alt={course.title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
              />
              {/* Menu Button */}
              <div className='absolute top-3 right-3'>
                <button
                  onClick={() => setShowMenu(showMenu === course.id ? 0 : course.id)}
                  className='w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors'
                >
                  <MoreVertical className='w-4 h-4 text-gray-600' />
                </button>

                {/* Dropdown Menu */}
                {showMenu === course.id && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-10'>
                    <button className='w-full px-4 py-2 text-left text-sm text-orange-500 hover:bg-orange-50 transition-colors flex items-center space-x-2'>
                      <span>View Details</span>
                    </button>
                    <button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2'>
                      <Edit className='w-4 h-4' />
                      <span>Edit Course</span>
                    </button>
                    <button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2'>
                      <Trash2 className='w-4 h-4' />
                      <span>Delete Course</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className='flex flex-col gap-2 mt-2'>
              <div className='px-3 flex flex-col gap-2'>
                {/* Category Badge */}
                <div className=''>
                  <span className='inline-block px-2 py-1 text-xs font-semibold text-orange bg-orange-50 rounded'>
                    {course.category}
                  </span>
                </div>

                {/* Title */}
                <h4 className='font-semibold group-hover:text-orange! transition-colors'>
                  {course.title}
                </h4>

                {/* Rating and Students */}
                <div className='flex items-center justify-between '>
                  <div className='flex items-center gap-2'>
                    <Star className='w-4 h-4 text-orange-400 fill-current' />
                    <span className='text-sm font-semibold text-gray-800'>{course.rating}</span>
                  </div>
                  <div className='flex items-center space-x-1 text-gray-500'>
                    <Users className='w-4 h-4' />
                    <span className='text-sm'>
                      {course.students} <span className='text-gray-400'>students</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className='flex items-center px-3 py-2 gap-2 border-t border-gray-100'>
                <span className='text-xl font-bold text-orange-500'>{course.price}</span>
                {course.originalPrice && (
                  <span className='text-sm text-gray-400 line-through'>{course.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCoursePage;
