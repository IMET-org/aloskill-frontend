"use client";
import AnnouncementBar from "./AnnouncementBar.tsx";
import NavBar from "./NavBar.tsx";

const Header = () => {
  return (
    <div className='fixed top-0 w-full z-50  backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
      <AnnouncementBar />
      <NavBar />
    </div>
  );
};

export default Header;
