"use client";

import FooterSimple from "@/components/shared/footer/FooterSimple.tsx";
import AnnouncementBar from "@/components/shared/header/AnnouncementBar.tsx";
import NavBar from "@/components/shared/header/NavBar";
import LeftSidebar from "@/components/shared/sidebars/LeftSidebar.tsx";
import { useState } from "react";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex flex-col bg-gray-50 '>
      <div className='z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
        <AnnouncementBar />
        <NavBar onMenuToggle={() => setIsSidebarOpen(prev => !prev)} />
      </div>
      <div className='flex flex-1 pt-12 lg:hidden '>
        <LeftSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <main className=''>{children}</main>
      <FooterSimple />
    </div>
  );
}
