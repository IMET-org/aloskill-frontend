import { Award, Share2, Star } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import type { InstructorCardProps } from "./instructorCard.types.ts";

function InstructorCard({
  instructor,
  isHovered,
  onHover,
  onLeave,
  animationDelay = 0,
}: InstructorCardProps) {
  return (
    <Link href={`/instructors/${instructor.id}`}>
      <div
        className={`
        group relative bg-white rounded-2xl overflow-hidden
        border-4 ${instructor.borderColor}
        shadow-lg hover:shadow-2xl
        transition-all duration-300 hover:-translate-y-2
        ${isHovered ? "scale-105" : "scale-100"}
        animate-fade-in-card
      `}
        style={{ animationDelay: `${animationDelay}ms` }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Share Button */}
        <button className='absolute top-4 right-4 z-10 p-2.5 bg-[#DA7C36] text-white rounded-full hover:bg-[#d15100] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110'>
          <Share2 className='w-5 h-5' />
        </button>

        {/* Instructor Image */}
        <div className='relative h-72 sm:h-80 overflow-hidden'>
          <Image
            width={400}
            height={400}
            src={instructor.image}
            alt={instructor.name}
            className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500'
          />

          {/* Hover Overlay with Stats */}
          <div
            className={`
            absolute inset-0 bg-gradient-to-t from-[#074079]/95 via-[#074079]/80 to-transparent
            transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className='absolute bottom-20 left-0 right-0 p-4 space-y-3'>
              <div className='flex items-center justify-between text-white'>
                <div className='flex items-center gap-2'>
                  <Award className='w-5 h-5' />
                  <span className='text-sm font-semibold'>{instructor.courses} Courses</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                  <span className='text-sm font-semibold'>{instructor.rating}</span>
                </div>
              </div>
              <div className='text-white text-sm font-semibold'>
                {instructor.students.toLocaleString()}+ Students
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Info Card */}
        <div className='absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>{instructor.name}</h3>
              <p className='text-sm text-gray-500 font-medium'>{instructor.title}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg group-hover:bg-[#DA7C36] transition-colors duration-300'>
              <svg
                className='w-6 h-6 text-purple-400 group-hover:text-white transition-colors duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-card {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-card {
            animation: fade-in-card 0.6s ease-out;
            animation-fill-mode: both;
          }
        `}</style>
      </div>
    </Link>
  );
}
// function InstructorCard({ instructor, isHovered, onHover, onLeave }: InstructorCardProps) {
//   return (
//     <div
//       className={`
//         group relative bg-white rounded-2xl overflow-hidden
//         border-4 ${instructor.borderColor}
//         shadow-lg hover:shadow-2xl
//         transition-all duration-300 hover:-translate-y-2
//         ${isHovered ? "scale-105" : "scale-100"}
//       `}
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//     >
//       {/* Share Button */}
//       <button className='absolute top-4 right-4 z-10 p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110'>
//         <Share2 className='w-5 h-5' />
//       </button>

//       {/* Instructor Image */}
//       <div className='relative h-72 sm:h-80 overflow-hidden'>
//         <Image
//           width={400}
//           height={400}
//           src={instructor.image}
//           alt={instructor.name}
//           className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500'
//         />

//         {/* Hover Overlay with Stats */}
//         <div
//           className={`
//             absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/80 to-transparent
//             transition-opacity duration-300
//             ${isHovered ? "opacity-100" : "opacity-0"}
//           `}
//         >
//           <div className='absolute bottom-20 left-0 right-0 p-4 space-y-3'>
//             <div className='flex items-center justify-between text-white'>
//               <div className='flex items-center gap-2'>
//                 <Award className='w-5 h-5' />
//                 <span className='text-sm font-semibold'>{instructor.courses} Courses</span>
//               </div>
//               <div className='flex items-center gap-1'>
//                 <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
//                 <span className='text-sm font-semibold'>{instructor.rating}</span>
//               </div>
//             </div>
//             <div className='text-white text-sm font-semibold'>
//               {instructor.students.toLocaleString()}+ Students
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Instructor Info Card */}
//       <div className='absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg'>
//         <div className='flex items-center justify-between'>
//           <div className='flex-1'>
//             <h3 className='text-lg font-bold text-gray-900 mb-1'>{instructor.name}</h3>
//             <p className='text-sm text-gray-500 font-medium'>{instructor.title}</p>
//           </div>
//           <div className='flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg'>
//             <svg
//               className='w-6 h-6 text-purple-400'
//               fill='none'
//               stroke='currentColor'
//               viewBox='0 0 24 24'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth={2}
//                 d='M14 5l7 7m0 0l-7 7m7-7H3'
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default InstructorCard;
