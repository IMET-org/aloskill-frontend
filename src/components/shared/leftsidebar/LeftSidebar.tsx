"use client";

import {
  Briefcase,
  Calendar,
  Facebook,
  GraduationCap,
  Home,
  Instagram,
  Trophy,
  Twitter,
  UserCircle,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LeftSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: Home, label: "Home", href: "/", color: "text-orange-700" },
  { icon: UserCircle, label: "Sign In/Up", href: "/auth/signup", color: "text-orange-500" },
  { icon: GraduationCap, label: "Instructors", href: "/instructors", color: "text-blue-500" },
  { icon: Users, label: "Students", href: "/students", color: "text-green-500" },
  { icon: Calendar, label: "Events", href: "/events", color: "text-purple-500" },
  { icon: UserPlus, label: "Groups", href: "/groups", color: "text-pink-500" },
  { icon: Trophy, label: "Challenge", href: "/challengefg", color: "text-yellow-500" },
  { icon: Briefcase, label: "Workshop", href: "/workshopfg", color: "text-indigo-500" },
  { icon: UserPlus, label: "Groups", href: "/groupsfg", color: "text-pink-500" },
  { icon: Trophy, label: "Challenge", href: "/challengfg", color: "text-yellow-500" },
  { icon: Briefcase, label: "Workshop", href: "/workshopfgfhg", color: "text-indigo-500" },
  { icon: UserPlus, label: "Groups", href: "/groupfg", color: "text-pink-500" },
  { icon: Trophy, label: "Challenge", href: "/challengef", color: "text-yellow-500" },
  { icon: Briefcase, label: "Workshop", href: "/workshokpg", color: "text-indigo-500" },
  { icon: UserPlus, label: "Groups", href: "/groupfghg", color: "text-pink-500" },
  { icon: Trophy, label: "Challenge", href: "/challengefhg", color: "text-yellow-500" },
  { icon: Briefcase, label: "Workshop", href: "/workshokpggh", color: "text-indigo-500" },
  { icon: UserPlus, label: "Groups", href: "/groupfghgkl", color: "text-pink-500" },
  { icon: Trophy, label: "Challenge", href: "/challengefhgkl", color: "text-yellow-500" },
  { icon: Briefcase, label: "Workshop", href: "/workshokpgghkl", color: "text-indigo-500" },
];

export default function LeftSidebar({ isOpen = false, onClose }: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ===== Overlay for mobile ===== */}
      {isOpen && (
        <div
          className='fixed top-5 inset-0 bg-black/40 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* ===== Sidebar Wrapper ===== */}
      <aside
        className={`z-40
      bg-white border-r border-gray-200 shadow-lg
      w-44 xl:w-52
      transition-transform duration-300 ease-in-out
      overflow-y-auto
      fixed top-12 left-0 h-[calc(100vh-2rem)]
      lg:sticky lg:top-24 lg:h-[calc(100vh-2rem)] xl:h-[calc(100vh-6rem)]  lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
      >
        {/* ===== Mobile Close Button ===== */}
        <div className='lg:hidden flex justify-end p-4'>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X className='w-6 h-6 text-gray-700' />
          </button>
        </div>

        {/* ===== Nav Links ===== */}
        <nav className='px-4 py-6 space-y-2 '>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose} // close drawer on click (mobile)
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-orange-500" : item.color}`} />
                <span className='text-sm'>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ===== Social Footer ===== */}
        <div className='px-6  pt-3 sticky bottom-0 left-0 bg-white  border-t border-gray-200'>
          <p className='text-xs text-gray-500 mb-3 font-medium'>Follow Us</p>
          <div className='flex gap-3'>
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-sky-500 hover:text-sky-500 transition-all duration-300 hover:shadow-md'
            >
              <Twitter className='w-4 h-4' />
            </a>
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-md'
            >
              <Facebook className='w-4 h-4' />
            </a>
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 hover:shadow-md'
            >
              <Instagram className='w-4 h-4' />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
