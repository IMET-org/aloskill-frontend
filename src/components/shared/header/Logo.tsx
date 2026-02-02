import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href='/'
      className='flex items-center gap-2 cursor-pointer select-none'
    >
      <span className='text-xl font-bold text-gray-900  sm:block'>
        আলো <span style={{ color: "var(--color-orange)" }}>স্কিল</span>
      </span>
    </Link>
  );
};

export default Logo;
