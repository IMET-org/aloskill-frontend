// ============================================
// FILE: components/Footer.tsx
// ============================================
"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  usefulLinks: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & condition", href: "/terms" },
    { label: "Student spotlight", href: "/spotlight" },
  ],
  learning: [
    { label: "Business Strategy", href: "/learning/business" },
    { label: "Become A Teacher", href: "/learning/teacher" },
    { label: "Project Management", href: "/learning/project" },
    { label: "Membership", href: "/membership" },
  ],
  resources: [
    { label: "Online Guides", href: "/guides" },
    { label: "Latest News", href: "/news" },
    { label: "Forum", href: "/forum" },
    { label: "Downloads", href: "/downloads" },
  ],
  contact: [
    {
      icon: Phone,
      label: "+88-658 654 528",
      href: "tel:+8801658654528",
    },
    {
      icon: Mail,
      label: "info@aloskill.com",
      href: "mailto:info@aloskill.com",
    },
    {
      icon: MapPin,
      label: "PO Box 16122 Collins Street, West Victoria 8007 Australia",
      href: "#",
    },
  ],
};
const paymentMethods = [
  {
    name: "Visa",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg",
  },
  { name: "Mastercard", image: "https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" },
  {
    name: "American Express",
    image: "https://cdn.worldvectorlogo.com/logos/american-express-1.svg",
  },
  { name: "PayPal", image: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg" },
  { name: "Stripe", image: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
  { name: "Apple Pay", image: "https://cdn.worldvectorlogo.com/logos/apple-pay-logo.svg" },
  { name: "Google Pay", image: "https://cdn.worldvectorlogo.com/logos/google-pay-2.svg" },
  { name: "Alipay", image: "https://cdn.worldvectorlogo.com/logos/alipay.svg" },
];
// const blogPosts = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80",
//     title: "I think really important to design...",
//     href: "/blog/design-importance",
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&q=80",
//     title: "Recognizing the need is the primary...",
//     href: "/blog/recognizing-need",
//   },
// ];

export default function FooterSimple() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative bg-white overflow-hidden w-full mx-auto'>
      {/* Decorative Gradient Blobs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Purple Blob */}
        <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-linear-to-br from-purple-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>

        {/* Orange Blob */}
        <div className='absolute -top-32 -right-32 w-96 h-96 bg-linear-to-br from-orange-400 to-[#DA7C36] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>

        {/* Pink Blob */}
        <div className='absolute bottom-1/2 right-1/4 w-80 h-80 bg-linear-to-br from-pink-400 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>

        {/* Additional Gradient Circle */}
        <div className='absolute bottom-0 right-0 w-[600px] h-[600px] bg-linear-to-tl from-purple-200 via-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10'></div>
      </div>

      <div className='relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8'>
        {/* Top Section */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12'>
          {/* Brand Section - Spans 3 columns */}
          <div className='lg:col-span-3'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-12 h-12 bg-linear-to-br from-[#DA7C36] to-[#B85C1A] rounded-xl flex items-center justify-center shadow-lg'>
                <span className='text-white font-bold text-2xl'>আ</span>
              </div>
              <span className='text-2xl font-bold text-gray-900'>
                আলো <span className='text-[#DA7C36]'>স্কিল</span>
              </span>
            </div>
            <p className='text-gray-600 leading-relaxed mb-6 max-w-sm'>
              We create digital experiences for brands and companies by using technology. Learn from
              expert instructors in Bangla.
            </p>
            {/* Social Icons */}
            <div className='flex gap-4'>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-100 hover:bg-[#DA7C36] flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300'
                aria-label='Facebook'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-100 hover:bg-[#DA7C36] flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300'
                aria-label='Twitter'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-100 hover:bg-[#DA7C36] flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300'
                aria-label='Instagram'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-100 hover:bg-[#DA7C36] flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300'
                aria-label='YouTube'
              >
                <Youtube className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Useful Links - Spans 2 columns */}
          <div className='lg:col-span-2'>
            <h3 className='text-lg font-bold text-gray-900 mb-6'>Useful Links</h3>
            <ul className='space-y-3'>
              {footerLinks.usefulLinks.map(link => (
                <li key={link.href}>
                  <a
                    className='text-gray-600 hover:text-[#DA7C36] transition-colors duration-300 text-sm'
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning - Spans 2 columns */}
          <div className='lg:col-span-2'>
            <h3 className='text-lg font-bold text-gray-900 mb-6'>Learning</h3>
            <ul className='space-y-3'>
              {footerLinks.learning.map(link => (
                <li key={link.href}>
                  <a
                    className='text-gray-600 hover:text-[#DA7C36] transition-colors duration-300 text-sm'
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Spans 2 columns */}
          <div className='lg:col-span-2'>
            <h3 className='text-lg font-bold text-gray-900 mb-6'>Resources</h3>
            <ul className='space-y-3'>
              {footerLinks.resources.map(link => (
                <li key={link.href}>
                  <a
                    className='text-gray-600 hover:text-[#DA7C36] transition-colors duration-300 text-sm'
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Blog - Spans 3 columns */}
          <div className='text-center sm:text-left lg:col-span-2'>
            <h3 className='text-lg font-bold text-gray-900'>Contact Us</h3>
            <ul className='mt-8 space-y-4 text-sm'>
              <li>
                <a
                  href='tel:+8801658654528'
                  className='flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                >
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DA7C36]/10 transition-colors'>
                    <Phone className='w-5 h-5' />
                  </div>
                  <span>+88-658 654 528</span>
                </a>
              </li>
              <li>
                <a
                  href='mailto:info@aloskill.com'
                  className='flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                >
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DA7C36]/10 transition-colors'>
                    <Mail className='w-5 h-5' />
                  </div>
                  <span>info@aloskill.com</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-start justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                >
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DA7C36]/10 transition-colors shrink-0'>
                    <MapPin className='w-5 h-5' />
                  </div>
                  <span className='text-left'>
                    PO Box 16122 Collins Street
                    <br />
                    West Victoria 8007 Australia
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='border-t border-gray-200 pt-8 mb-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-4'>
              <span className='text-gray-700 font-semibold text-sm whitespace-nowrap'>
                Pay With
              </span>
              <div className='flex flex-wrap items-center gap-3'>
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className='w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1 hover:shadow-md transition-shadow'
                  >
                    <Image
                      width={32}
                      height={32}
                      src={method.image}
                      alt={method.name}
                      className='w-full h-full object-contain'
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='shrink-0'>
              <a
                href='https://www.sslcommerz.com'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block'
              >
                <div className='bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors'>
                  Verified by
                  <br />
                  <span className='text-lg'>SSLCommerz</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex flex-wrap justify-center sm:justify-start gap-6 text-sm'>
            <a
              href='/privacy'
              className='text-gray-600 hover:text-[#DA7C36] transition-colors'
            >
              Privacy policy
            </a>
            <a
              href='/legal'
              className='text-gray-600 hover:text-[#DA7C36] transition-colors'
            >
              Legal notice
            </a>
            <a
              href='/terms'
              className='text-gray-600 hover:text-[#DA7C36] transition-colors'
            >
              Terms of service
            </a>
          </div>
          <p className='text-sm text-gray-500'>© {currentYear} আলো স্কিল. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
}
