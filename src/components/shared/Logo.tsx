"use client";
const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-8 h-8 bg-gradient-to-br from-[var(--color-orange)] to-[#B85C1A] rounded-lg flex items-center justify-center'>
        <span className='text-white font-bold text-lg'>আ</span>
      </div>
      <span className='text-xl font-bold text-gray-900 hidden sm:block'>
        আলো <span style={{ color: "var(--color-orange)" }}>স্কিল</span>
      </span>
    </div>
  );
};

export default Logo;
