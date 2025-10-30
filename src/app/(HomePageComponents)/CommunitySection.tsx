// "use client";

// import { Users } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const communityMembers = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     position: "top-left",
//     delay: 0,
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     position: "top-center",
//     delay: 100,
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
//     position: "top-right",
//     delay: 200,
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     position: "middle-left-1",
//     delay: 300,
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     position: "middle-left-2",
//     delay: 400,
//   },
//   {
//     id: 6,
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
//     position: "middle-center",
//     delay: 500,
//   },
//   {
//     id: 7,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     position: "middle-right-1",
//     delay: 600,
//   },
//   {
//     id: 8,
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
//     position: "middle-right-2",
//     delay: 700,
//   },
//   {
//     id: 9,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     position: "middle-right-3",
//     delay: 800,
//   },
//   {
//     id: 10,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     position: "bottom-left",
//     delay: 900,
//   },
//   {
//     id: 11,
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
//     position: "bottom-center-1",
//     delay: 1000,
//   },
//   {
//     id: 12,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     position: "bottom-center-2",
//     delay: 1100,
//   },
//   {
//     id: 13,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     position: "bottom-center-3",
//     delay: 1200,
//   },
//   {
//     id: 14,
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
//     position: "bottom-right",
//     delay: 1300,
//   },
// ];

// const getPositionClasses = (position: string) => {
//   const positions: Record<string, string> = {
//     "top-left": "absolute top-0 left-[15%] md:left-[20%]",
//     "top-center": "absolute top-4 left-1/2 -translate-x-1/2",
//     "top-right": "absolute top-0 right-[15%] md:right-[20%]",
//     "middle-left-1": "absolute top-[25%] left-[5%] md:left-[10%]",
//     "middle-left-2": "absolute top-[40%] left-[8%] md:left-[15%]",
//     "middle-center": "absolute top-[35%] left-1/2 -translate-x-1/2",
//     "middle-right-1": "absolute top-[25%] right-[15%] md:right-[20%]",
//     "middle-right-2": "absolute top-[35%] right-[5%] md:right-[10%]",
//     "middle-right-3": "absolute top-[50%] right-[12%] md:right-[15%]",
//     "bottom-left": "absolute bottom-[10%] left-[10%] md:left-[15%]",
//     "bottom-center-1": "absolute bottom-[5%] left-[30%] md:left-[35%]",
//     "bottom-center-2": "absolute bottom-[15%] left-1/2 -translate-x-1/2",
//     "bottom-center-3": "absolute bottom-[8%] right-[30%] md:right-[35%]",
//     "bottom-right": "absolute bottom-[12%] right-[8%] md:right-[12%]",
//   };
//   return positions[position] || "";
// };

// export default function CommunitySection() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <section className='bg-gradient-to-br from-gray-50 to-white py-16 md:py-24 overflow-hidden'>
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//         {/* Header */}
//         <div className='text-center mb-12 md:mb-16 animate-fade-in'>
//           <h2 className='text-gray-900 font-black mb-4'>Learn Together, Grow Together</h2>
//           <p className='text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8'>
//             Join the Aloskill Community to connect with other learners,
//             <br className='hidden sm:block' />
//             ask questions, share ideas, and build your network.
//           </p>
//           <button className='px-8 py-4 bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-dark)] text-white rounded-full hover:from-[var(--color-orange-dark)] hover:to-[var(--color-orange)] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold hover:scale-105'>
//             Join the Community
//           </button>
//         </div>

//         {/* Community Members Circle */}
//         <div className='relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] mt-16'>
//           {/* Center Circle - Desktop Only */}
//           <div className='hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[var(--color-orange)] to-[var(--color-orange-dark)] rounded-full items-center justify-center shadow-2xl z-10'>
//             <Users className='w-16 h-16 text-white' />
//           </div>

//           {/* Member Avatars */}
//           {communityMembers.map((member, index) => (
//             <div
//               key={member.id}
//               className={`${getPositionClasses(member.position)} transition-all duration-500`}
//               style={{
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible ? "scale(1)" : "scale(0)",
//                 transitionDelay: `${member.delay}ms`,
//               }}
//             >
//               <div className='relative group'>
//                 <div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:border-[var(--color-orange)] cursor-pointer'>
//                   <Image
//                     width={100}
//                     height={100}
//                     src={member.image}
//                     alt={`Community member ${member.id}`}
//                     className='w-full h-full object-cover'
//                   />
//                 </div>

//                 {/* Hover Ring Animation */}
//                 <div className='absolute inset-0 rounded-full border-2 border-[var(--color-orange)] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500'></div>

//                 {/* Pulse Animation */}
//                 <div className='absolute inset-0 rounded-full bg-[var(--color-orange)]/20 animate-ping opacity-0 group-hover:opacity-75'></div>
//               </div>
//             </div>
//           ))}

//           {/* Connecting Lines - Desktop Only */}
//           <svg
//             className='hidden md:block absolute inset-0 w-full h-full pointer-events-none'
//             style={{ zIndex: 0 }}
//           >
//             <defs>
//               <linearGradient
//                 id='lineGradient'
//                 x1='0%'
//                 y1='0%'
//                 x2='100%'
//                 y2='0%'
//               >
//                 <stop
//                   offset='0%'
//                   style={{ stopColor: "var(--color-orange)", stopOpacity: 0.1 }}
//                 />
//                 <stop
//                   offset='100%'
//                   style={{ stopColor: "var(--color-orange)", stopOpacity: 0.3 }}
//                 />
//               </linearGradient>
//             </defs>
//             {/* Example connecting lines - you can add more */}
//             <line
//               x1='50%'
//               y1='50%'
//               x2='20%'
//               y2='10%'
//               stroke='url(#lineGradient)'
//               strokeWidth='1'
//               strokeDasharray='5,5'
//               className='animate-draw'
//             />
//             <line
//               x1='50%'
//               y1='50%'
//               x2='80%'
//               y2='15%'
//               stroke='url(#lineGradient)'
//               strokeWidth='1'
//               strokeDasharray='5,5'
//               className='animate-draw'
//             />
//             <line
//               x1='50%'
//               y1='50%'
//               x2='15%'
//               y2='60%'
//               stroke='url(#lineGradient)'
//               strokeWidth='1'
//               strokeDasharray='5,5'
//               className='animate-draw'
//             />
//             <line
//               x1='50%'
//               y1='50%'
//               x2='85%'
//               y2='55%'
//               stroke='url(#lineGradient)'
//               strokeWidth='1'
//               strokeDasharray='5,5'
//               className='animate-draw'
//             />
//           </svg>
//         </div>

//         {/* Stats */}
//         <div className='grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16'>
//           <div className='text-center'>
//             <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)] mb-2'>10K+</p>
//             <p className='text-sm text-gray-600 font-medium'>Active Members</p>
//           </div>
//           <div className='text-center border-x border-gray-200'>
//             <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)] mb-2'>500+</p>
//             <p className='text-sm text-gray-600 font-medium'>Study Groups</p>
//           </div>
//           <div className='text-center'>
//             <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)] mb-2'>24/7</p>
//             <p className='text-sm text-gray-600 font-medium'>Support</p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes draw {
//           from {
//             stroke-dashoffset: 1000;
//           }
//           to {
//             stroke-dashoffset: 0;
//           }
//         }

//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out;
//         }

//         .animate-draw {
//           animation: draw 2s ease-in-out infinite;
//         }

//         @keyframes ping {
//           75%,
//           100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }

//         .animate-ping {
//           animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

// ============================================
// // FILE: components/CommunitySection.tsx
// // ============================================
"use client";

import { Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const communityMembers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "pink",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "blue",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    color: "purple",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "orange",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "green",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    color: "yellow",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "red",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "indigo",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    color: "teal",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "pink",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "purple",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    color: "blue",
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "orange",
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "green",
  },
];

const getBgColor = (color: string) => {
  const colors: Record<string, string> = {
    pink: "bg-pink-100",
    blue: "bg-blue-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
    green: "bg-green-100",
    yellow: "bg-yellow-100",
    red: "bg-red-100",
    indigo: "bg-indigo-100",
    teal: "bg-teal-100",
  };
  return colors[color] || "bg-gray-100";
};

export default function CommunitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const scrollStart = sectionTop - windowHeight;
      const scrollEnd = sectionTop + sectionHeight;
      const scrollRange = scrollEnd - scrollStart;
      const currentScroll = scrollY - scrollStart;

      const progress = Math.min(Math.max(currentScroll / scrollRange, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAvatarStyle = (index: number) => {
    const angle = (index / communityMembers.length) * 360;
    const radius = scrollProgress * 100;
    const scale = 0.5 + scrollProgress * 0.5;
    const opacity = scrollProgress;

    return {
      transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg) scale(${scale})`,
      opacity: opacity,
      transition: "all 0.3s ease-out",
    };
  };

  return (
    <section
      ref={sectionRef}
      className='bg-white py-16 md:py-24 overflow-hidden relative'
    >
      {/* Background Gradient Blobs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
        <div className='absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className='text-gray-900 font-black mb-4'>Learn Together, Grow Together</h2>
          <p className='text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8'>
            Join the Aloskill Community to connect with other learners,
            <br className='hidden sm:block' />
            ask questions, share ideas, and build your network.
          </p>
          <button className='px-8 py-4 bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-dark)] text-white rounded-full hover:from-[var(--color-orange-dark)] hover:to-[var(--color-orange)] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold hover:scale-105 active:scale-95'>
            Join the Community
          </button>
        </div>

        {/* Community Circle Animation */}
        <div className='relative w-full max-w-4xl mx-auto h-[500px] md:h-[1000px] flex items-center justify-center'>
          {/* Center Element */}
          <div
            className={`absolute z-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{
              transitionDelay: "500ms",
            }}
          >
            <div className='w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[var(--color-orange)] to-[var(--color-orange-dark)] rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow'>
              <Users className='w-12 h-12 md:w-16 md:h-16 text-white' />
            </div>
          </div>

          {/* Member Avatars with Scroll Animation */}
          <div className='absolute inset-0 flex items-center justify-center'>
            {communityMembers.map((member, index) => (
              <div
                key={member.id}
                className='absolute'
                style={isVisible ? getAvatarStyle(index) : { opacity: 0 }}
              >
                <div className='relative group cursor-pointer'>
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white ${getBgColor(
                      member.color
                    )} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:border-[var(--color-orange)] hover:rotate-12`}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={member.image}
                      alt={`Community member ${member.id}`}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Floating Animation */}
                  <div
                    className='absolute inset-0 rounded-full bg-[var(--color-orange)]/20 opacity-0 group-hover:opacity-100 animate-ping'
                    style={{ animationDuration: "1.5s" }}
                  ></div>

                  {/* Glow Effect */}
                  <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-orange)] to-purple-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500'></div>
                </div>
              </div>
            ))}
          </div>

          {/* Orbital Rings */}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div
              className='absolute border-2 border-dashed border-[var(--color-orange)]/20 rounded-full animate-spin-slow'
              style={{
                width: `${200 + scrollProgress * 100}px`,
                height: `${200 + scrollProgress * 100}px`,
              }}
            ></div>
            <div
              className='absolute border-2 border-dotted border-purple-300/20 rounded-full animate-spin-reverse'
              style={{
                width: `${250 + scrollProgress * 150}px`,
                height: `${250 + scrollProgress * 150}px`,
              }}
            ></div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className='text-center mt-8 opacity-50'>
          <p className='text-sm text-gray-500'>Scroll to see the magic ✨</p>
          <div className='w-32 h-1 bg-gray-200 rounded-full mx-auto mt-2 overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-[var(--color-orange)] to-purple-500 transition-all duration-300'
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 transition-all duration-1000 ${
            scrollProgress > 0.5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className='text-center'>
            <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)] mb-2'>10K+</p>
            <p className='text-sm text-gray-600 font-medium'>Active Members</p>
          </div>
          <div className='text-center border-x border-gray-200'>
            <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)] mb-2'>500+</p>
            <p className='text-sm text-gray-600 font-medium'>Study Groups</p>
          </div>
          <div className='text-center'>
            <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)] mb-2'>24/7</p>
            <p className='text-sm text-gray-600 font-medium'>Support</p>
          </div>
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
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

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
