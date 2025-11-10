"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";
import { memo } from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
  isLoading?: boolean;
}

const SectionHeader = memo(function SectionHeader({
  badge,
  title,
  subtitle,
  showButton = false,
  buttonText = "Load More",
  buttonIcon: ButtonIcon = ArrowRight,
  onButtonClick,
  isLoading = false,
}: SectionHeaderProps) {
  return (
    <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6'>
      <div className='flex-1'>
        {badge && (
          <div className='inline-block mb-4'>
            <span className='px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold uppercase tracking-wide'>
              {badge}
            </span>
          </div>
        )}
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-blue-900'>{title}</h2>
        {subtitle && <p className='mt-3 text-gray-600 text-lg'>{subtitle}</p>}
      </div>

      {showButton && (
        <button
          onClick={onButtonClick}
          disabled={isLoading}
          className='group flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label={buttonText}
        >
          <span>{isLoading ? "Loading..." : buttonText}</span>
          {!isLoading && (
            <ButtonIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          )}
        </button>
      )}
    </div>
  );
});

export default SectionHeader;
