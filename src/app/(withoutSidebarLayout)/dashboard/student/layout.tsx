// "use client";

// import { ChevronLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Suspense } from "react";

// export default function StudentLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Dashboard", path: "/dashboard/student" },
//     { name: "Courses", path: "/dashboard/student/courses" },
//     { name: "Teachers", path: "/dashboard/student/teachers" },
//     { name: "Message", path: "/dashboard/student/message" },
//     { name: "Wishlist", path: "/dashboard/student/wishlist" },
//     { name: "Purchase History", path: "/dashboard/student/purchase" },
//     { name: "Settings", path: "/dashboard/student/settings" },
//   ];

//   return (
//     <div className='min-h-screen w-[80%] mx-auto '>
//       <div className='w-full px-4 pt-4'>
//         <Link
//           href='/'
//           className='hover:text-orange-dark'
//         >
//           <p className='flex gap-2 items-center'>
//             {" "}
//             <ChevronLeft /> Back to the Home
//           </p>
//         </Link>
//       </div>
//       <div className='w-full px-4 py-4'>
//         {/* Header Card - Shared across all pages */}
//         <div className='bg-white rounded shadow-sm px-6 pt-6 mb-6'>
//           <div className='flex items-center justify-between mb-4'>
//             <div className='flex items-center gap-4'>
//               <div className='w-16 h-16 rounded-full bg-gray-300 overflow-hidden'>
//                 <Image
//                   width={80}
//                   height={80}
//                   src='/api/placeholder/80/80'
//                   alt='Kevin Gilbert'
//                   className='w-full h-full object-cover'
//                 />
//               </div>
//               <div>
//                 <h2 className='font-semibold text-gray-900'>Kevin Gilbert</h2>
//                 <p className='text-gray-500 text-sm'>Web Designer & Best-Selling Instructor</p>
//               </div>
//             </div>
//             <Link
//               href={"/auth/instructor-signup"}
//               className='px-4 py-2 bg-orange-50 text-orange-500 rounded font-medium hover:bg-orange-100 transition-colors flex items-center gap-2'
//             >
//               Become Instructor
//               <svg
//                 className='w-4 h-4'
//                 fill='none'
//                 stroke='currentColor'
//                 viewBox='0 0 24 24'
//               >
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M9 5l7 7-7 7'
//                 />
//               </svg>
//             </Link>
//           </div>

//           {/* Navigation - Works with browser back/forward */}
//           <nav className='flex justify-between border-t pt-4'>
//             {navItems.map(item => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`pb-2 font-medium transition-colors relative ${
//                   pathname === item.path ? "text-orange-500" : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 {item.name}
//                 {pathname === item.path && (
//                   <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500'></span>
//                 )}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         {/* Page Content with Suspense for loading states */}
//         <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
//       </div>
//     </div>
//   );
// }

// // Loading fallback component
// function LoadingFallback() {
//   return (
//     <div className='bg-white rounded-lg shadow-sm p-8'>
//       <div className='animate-pulse space-y-4'>
//         <div className='h-4 bg-gray-200 rounded w-3/4'></div>
//         <div className='h-4 bg-gray-200 rounded w-1/2'></div>
//         <div className='h-4 bg-gray-200 rounded w-5/6'></div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useSessionContext } from "@/app/contexts/SessionContext.tsx";
import {
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useSessionContext();
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/student" },
    { name: "Courses", icon: GraduationCap, path: "/dashboard/student/courses" },
    { name: "Teachers", icon: Star, path: "/dashboard/student/teachers" },
    { name: "Message", icon: Calendar, path: "/dashboard/student/message" },
    { name: "Wishlist", icon: MessageSquare, path: "/dashboard/student/wishlist" },
    { name: "Purchase", icon: MessageSquare, path: "/dashboard/student/purchase" },
    { name: "Settings", icon: Settings, path: "/dashboard/student/settings" },
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='flex min-h-screen bg-[#E9F3EE] p-6 '>
      {/* Sidebar */}
      <aside
        className={`${isCollapsed ? "w-24" : "w-50"}  bg-orange rounded-lg flex flex-col text-white p-8`}
      >
        <button
          className='mb-4'
          type='button'
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          <Menu size={24} />
        </button>
        <div className='flex flex-col items-center mb-6'>
          <div className={`relative ${isCollapsed ? "w-12 h-12" : "w-20 h-20"} mb-4`}>
            {/* Profile Ring */}
            <div className='absolute inset-0 border-3 border-orange-300 rounded-full'></div>
            <Image
              src={user?.image || "/api/placeholder/80/80"}
              width={100}
              height={100}
              alt={user?.name || "User Avatar"}
              className='rounded-full w-full h-full object-cover p-1'
            />
          </div>
          {/* <h2
            className={`text-lg font-semibold text-(--color-text-dark) ${isCollapsed ? "hidden" : "block"}`}
          >
            {user?.name}
          </h2> */}
        </div>

        <nav className='flex-1 space-y-4 '>
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-4 px-2"} py-2 rounded-md transition-all ${
                pathname === item.path ? "bg-white text-(--color-text-dark)" : "hover:bg-white/10"
              }`}
            >
              <item.icon size={isCollapsed ? 26 : 24} />

              <span
                className={`m-0 p-0 font-medium text-(--color-text-dark) ${isCollapsed && "hidden"}`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <button className='flex items-center gap-4 px-4 py-3 mt-auto hover:bg-white/10 rounded-xl transition-all'>
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 ml-8 overflow-y-auto'>{children}</main>
    </div>
  );
}
