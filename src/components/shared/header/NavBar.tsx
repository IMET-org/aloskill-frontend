// ============================================
// FILE: components/Header.tsx
// ============================================
"use client";

import { Bell, Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function NavBar({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(2);
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/auth/signin");
    // Implement your sign-in logic here
    console.log("Sign-in button clicked");
  };
  return (
    <header className='w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
      <div className=' flex items-center justify-between px-4 md:px-6 py-3 max-w-full mx-auto'>
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
          aria-label='Toggle menu'
        >
          <Menu className='w-6 h-6 text-gray-700' />
        </button>

        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-linear-to-br from-(--color-orange) to-[#B85C1A] rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>আ</span>
          </div>
          <span className='text-xl font-bold text-gray-900 hidden sm:block'>
            আলো <span style={{ color: "var(--color-orange)" }}>স্কিল</span>
          </span>
        </div>

        {/* Category Button */}
        <button className='hidden md:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-(--color-orange) to-[#B85C1A] text-white rounded-full hover:from-[#B85C1A] hover:to-(--color-orange) transition-all duration-300 shadow-md hover:shadow-lg'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
          <span className='text-sm font-medium'>Category</span>
        </button>

        {/* Search Bar */}
        <div className='flex-1 max-w-xl mx-4 hidden md:block'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Search courses, books, or topics...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-1 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-orange) focus:border-transparent transition-all'
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-3'>
          {/* Shopping Cart */}
          <button className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
            <ShoppingCart className='w-6 h-6 text-gray-700 group-hover:text-(--color-orange) transition-colors' />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-(--color-orange) text-white text-xs font-bold rounded-full flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <button className='hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
            <Heart className='w-6 h-6 text-gray-700 group-hover:text-(--color-orange) transition-colors' />
          </button>

          {/* User Account */}
          <button className='hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
            <User className='w-6 h-6 text-gray-700 group-hover:text-(--color-orange) transition-colors' />
          </button>

          {/* Notification Icon */}
          <button className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
            <Bell className='w-5 h-5 text-gray-700 group-hover:text-(--color-orange) transition-colors' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-(--color-orange) rounded-full'></span>
          </button>

          {/* Login Button */}
          <button
            onClick={handleSignIn}
            className='px-4 md:px-6 py-2 bg-linear-to-r from-(--color-orange) to-[#B85C1A] text-white rounded-full hover:from-[#B85C1A] hover:to-(--color-orange) transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm'
          >
            Login account
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className='md:hidden px-2 pb-2 w-sm mx-auto'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4  bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-orange)'
          />
        </div>
      </div>
    </header>
  );
}
