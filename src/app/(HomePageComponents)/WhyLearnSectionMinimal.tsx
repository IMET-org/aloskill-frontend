"use client";

import { Briefcase, GraduationCap, Monitor } from "lucide-react";

export function WhyLearnSectionMinimal() {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Why learn with our courses?</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempordunt ut
            labore vanum...
          </p>
        </div>

        {/* Grid */}
        <div className='grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300'>
          {/* Learn */}
          <div className='text-center p-8'>
            <div className='flex justify-center mb-6'>
              <div className='p-5 bg-orange-100 rounded-2xl'>
                <Monitor className='w-14 h-14 text-orange-500 stroke-[1.5]' />
              </div>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>01. Learn</h3>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis donec massa aliquip.
            </p>
          </div>

          {/* Graduate */}
          <div className='text-center p-8'>
            <div className='flex justify-center mb-6'>
              <div className='p-5 bg-orange-100 rounded-2xl'>
                <GraduationCap className='w-14 h-14 text-orange-500 stroke-[1.5]' />
              </div>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>02. Graduate</h3>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis donec massa aliquip.
            </p>
          </div>

          {/* Work */}
          <div className='text-center p-8'>
            <div className='flex justify-center mb-6'>
              <div className='p-5 bg-orange-100 rounded-2xl'>
                <Briefcase className='w-14 h-14 text-orange-500 stroke-[1.5]' />
              </div>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>03. Work</h3>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis donec massa aliquip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
