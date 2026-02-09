import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/aloskill-logo.avif";
const Logo = () => {
  return (
    <Link
      href='/'
      className='flex items-center gap-2 cursor-pointer select-none'
    >
      <Image
        src={logo}
        alt='aloskill logo'
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
