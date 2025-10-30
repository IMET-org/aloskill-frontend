"use client";

import FooterSimple from "@/components/shared/footer/FooterSimple.tsx";
import AnnouncementBar from "@/components/shared/header/AnnouncementBar";
import NavBar from "@/components/shared/header/NavBar";
import LeftSidebar from "@/components/shared/leftSidebar/LeftSidebar";

import RightSidebar from "@/components/shared/RightSidebar";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {/* Top section (Announcement + Navbar) */}
      <div className='fixed top-0 w-full z-50  backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
        <AnnouncementBar />
        <NavBar onMenuToggle={() => setIsSidebarOpen(prev => !prev)} />
      </div>

      {/* Main content area */}
      <div className='flex flex-1  min-h-screen'>
        {/* Left Sidebar (mobile + desktop responsive) */}
        <div className='hidden lg:pt-24 lg:block    '>
          <LeftSidebar isOpen={true} />
        </div>
        <div className='lg:hidden'>
          <LeftSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main content */}
        <main className='flex-1 min-h-screen   pt-20 w-full'>{children}</main>

        {/* Right Sidebar */}
        <div className='hidden xl:block '>
          <RightSidebar />
        </div>
      </div>

      {/* Footer */}

      <FooterSimple />
    </div>
  );
}
