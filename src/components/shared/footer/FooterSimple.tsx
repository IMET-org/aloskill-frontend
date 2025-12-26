"use client";

import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
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

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative  bg-gradient-to-br from-slate-50 via-white to-orange-50/30 overflow-hidden'>
      {/* Subtle Background Pattern */}
      <div className='absolute inset-0 opacity-40'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(218, 124, 54, 0.08) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      {/* Gradient Orbs */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-purple-200/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/20 to-pink-100/20 rounded-full blur-3xl'></div>

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='py-12 lg:py-20 max-w-[1420px] mx-auto'>
          {/* Mobile: 2 columns per row, Desktop: Original layout */}
          <div className='grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8'>
            {/* Brand Section - Full width on mobile, spans 4 cols on desktop */}
            <div className='col-span-2 lg:col-span-4'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#DA7C36] via-[#E88A4A] to-[#B85C1A] rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20'>
                  <span className='text-white font-bold text-2xl sm:text-3xl'>আ</span>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent'></div>
                </div>
                <span className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'>
                  আলো{" "}
                  <span className='bg-gradient-to-r from-[#DA7C36] to-[#E88A4A] bg-clip-text text-transparent'>
                    স্কিল
                  </span>
                </span>
              </div>

              <p className='text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base'>
                Empowering learners with expert-led courses in Bangla. Transform your skills with
                cutting-edge technology.
              </p>

              {/* Newsletter Section */}
              <div className='mb-6 sm:mb-8'>
                <h4 className='text-xs sm:text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider'>
                  Stay Updated
                </h4>
                <div className='flex gap-2'>
                  <input
                    type='email'
                    placeholder='Your email'
                    className='flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DA7C36]/20 focus:border-[#DA7C36] transition-all'
                  />
                  <button className='px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#DA7C36] to-[#E88A4A] text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center'>
                    <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
                  </button>
                </div>
              </div>

              {/* Social Icons */}
              <div>
                <h4 className='text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider'>
                  Follow Us
                </h4>
                <div className='flex gap-2 sm:gap-3'>
                  {[
                    { icon: Facebook, label: "Facebook", color: "hover:bg-blue-500" },
                    { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
                    { icon: Instagram, label: "Instagram", color: "hover:bg-pink-500" },
                    { icon: Youtube, label: "YouTube", color: "hover:bg-red-500" },
                  ].map(social => (
                    <a
                      key={social.label}
                      href='#'
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className='w-4 h-4 sm:w-5 sm:h-5' />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Useful Links - 1st column on mobile */}
            <div className='col-span-1 lg:col-span-2'>
              <h3 className='text-sm md:text-md font-bold text-gray-900 mb-4 sm:mb-5 uppercase tracking-wider relative inline-block'>
                Useful Links
                <span className='absolute -bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#DA7C36] to-transparent rounded-full'></span>
              </h3>
              <ul className='space-y-2 sm:space-y-3'>
                {footerLinks.usefulLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className='text-gray-600 hover:text-[#DA7C36] transition-colors duration-200 text-sm flex items-center gap-2 group'
                    >
                      <span className='w-0 group-hover:w-2 h-0.5 bg-[#DA7C36] transition-all duration-200'></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning - 2nd column on mobile */}
            <div className='col-span-1 lg:col-span-2'>
              <h3 className='text-sm md:text-md font-bold text-gray-900 mb-4 sm:mb-5 uppercase tracking-wider relative inline-block'>
                Learning
                <span className='absolute -bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#DA7C36] to-transparent rounded-full'></span>
              </h3>
              <ul className='space-y-2 sm:space-y-3'>
                {footerLinks.learning.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className='text-gray-600 hover:text-[#DA7C36] transition-colors duration-200 text-sm flex items-center gap-2 group'
                    >
                      <span className='w-0 group-hover:w-2 h-0.5 bg-[#DA7C36] transition-all duration-200'></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources - 1st column on mobile (2nd row) */}
            <div className='col-span-1 lg:col-span-2'>
              <h3 className='text-sm md:text-md font-bold text-gray-900 mb-4 sm:mb-5 uppercase tracking-wider relative inline-block'>
                Resources
                <span className='absolute -bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#DA7C36] to-transparent rounded-full'></span>
              </h3>
              <ul className='space-y-2 sm:space-y-3'>
                {footerLinks.resources.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className='text-gray-600 hover:text-[#DA7C36] transition-colors duration-200 text-sm flex items-center gap-2 group'
                    >
                      <span className='w-0 group-hover:w-2 h-0.5 bg-[#DA7C36] transition-all duration-200'></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section - 2nd column on mobile (2nd row) */}
            <div className='col-span-1 lg:col-span-2'>
              <h3 className='text-sm md:text-md font-bold text-gray-900 mb-4 sm:mb-5 uppercase tracking-wider relative inline-block'>
                Contact
                <span className='absolute -bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#DA7C36] to-transparent rounded-full'></span>
              </h3>
              <ul className='space-y-3 '>
                {footerLinks.contact.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className='flex items-start gap-2 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                    >
                      <div className='w-8 h-8  rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 flex items-center justify-center group-hover:from-[#DA7C36] group-hover:to-[#E88A4A] transition-all duration-300 shrink-0 border border-orange-100 group-hover:border-transparent'>
                        <item.icon className='w-4 h-4  text-[#DA7C36] group-hover:text-white transition-colors' />
                      </div>
                      <span className='text-sm leading-relaxed pt-1 sm:pt-2'>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='border-t border-gray-200/60 py-6 sm:py-8'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
            <div className='flex flex-col items-center lg:items-start gap-4 sm:gap-6 w-full lg:w-auto'>
              <span className='text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Secure Payment
              </span>
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3'>
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className='w-12 h-8 sm:w-14 sm:h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1.5 sm:p-2 hover:shadow-md hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5'
                    title={method.name}
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

            <a
              href='https://www.sslcommerz.com'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block'
            >
              <div className='bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105'>
                <div className='flex items-center gap-2'>
                  <svg
                    className='w-3 h-3 sm:w-4 sm:h-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>Verified by SSLCommerz</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-200/60 py-5 sm:py-6'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm'>
              <a
                href='/privacy'
                className='text-gray-600 hover:text-[#DA7C36] transition-colors font-medium'
              >
                Privacy Policy
              </a>
              <span className='text-gray-300 hidden sm:inline'>•</span>
              <a
                href='/legal'
                className='text-gray-600 hover:text-[#DA7C36] transition-colors font-medium'
              >
                Legal Notice
              </a>
              <span className='text-gray-300 hidden sm:inline'>•</span>
              <a
                href='/terms'
                className='text-gray-600 hover:text-[#DA7C36] transition-colors font-medium'
              >
                Terms of Service
              </a>
            </div>
            <p className='text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-right'>
              © {currentYear} আলো স্কিল. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
