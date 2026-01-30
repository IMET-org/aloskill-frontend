// "use client";

// import Image from "next/image";
// import { useState } from "react";

// export default function DashboardPage() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const courses = [
//     {
//       id: 1,
//       image: "/api/placeholder/400/300",
//       title: "Roiki Level I, II and Master/Teacher Program",
//       subtitle: "1. Intorductions",
//       progress: 0,
//     },
//     {
//       id: 2,
//       image: "/api/placeholder/400/300",
//       title: "The Complete 2021 Web Development Bootcamp",
//       subtitle: "167. What You'll Need to Get Started - Se...",
//       progress: 61,
//     },
//     {
//       id: 3,
//       image: "/api/placeholder/400/300",
//       title: "Copywriting - Become a Freelance Copywriter...",
//       subtitle: "1. How to get started with figma",
//       progress: 0,
//     },
//     {
//       id: 4,
//       image: "/api/placeholder/400/300",
//       title: "2021 Complete Python Bootcamp From Zero to...",
//       subtitle: "9. Advanced CSS - Selector Priority",
//       progress: 12,
//     },
//   ];

//   const stats = [
//     {
//       icon: "🕐",
//       value: "957",
//       label: "Enrolled Courses",
//       bgColor: "bg-orange-100",
//     },
//     {
//       icon: "📚",
//       value: "6",
//       label: "Active Courses",
//       bgColor: "bg-blue-200",
//     },
//     {
//       icon: "✓",
//       value: "951",
//       label: "Completed Courses",
//       bgColor: "bg-green-200",
//     },
//     {
//       icon: "👥",
//       value: "241",
//       label: "Course Instructors",
//       bgColor: "bg-orange-200",
//     },
//   ];

//   return (
//     <div>
//       {/* Stats Grid */}
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className={`${stat.bgColor} rounded-lg p-6`}
//           >
//             <div className='flex items-center gap-4'>
//               <div className='text-3xl'>{stat.icon}</div>
//               <div>
//                 <div className='text-3xl font-bold text-gray-900'>{stat.value}</div>
//                 <div className='text-sm text-gray-600'>{stat.label}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Course Section */}
//       <div>
//         <div className='flex items-center justify-between mb-4'>
//           <h3 className='text-xl font-semibold text-gray-900'>Let &apos;s start learning, Kevin</h3>
//           <div className='flex gap-2'>
//             <button className='w-10 h-10 rounded-lg border border-orange-300 text-orange-500'>
//               ←
//             </button>
//             <button className='w-10 h-10 rounded-lg border border-orange-300 text-orange-500'>
//               →
//             </button>
//           </div>
//         </div>

//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
//           {courses.map(course => (
//             <div
//               key={course.id}
//               className='bg-white rounded-lg shadow-sm overflow-hidden'
//             >
//               <Image
//                 width={400}
//                 height={300}
//                 src={course.image}
//                 alt={course.title}
//                 className='w-full h-48 object-cover'
//               />
//               <div className='p-4'>
//                 <p className='text-xs text-gray-500 mb-1'>{course.title}</p>
//                 <h4 className='font-medium text-gray-900 mb-3 text-sm'>{course.subtitle}</h4>
//                 <div className='flex items-center justify-between'>
//                   <button className='px-4 py-2 rounded-lg bg-orange-50 text-orange-500 text-sm font-medium'>
//                     Watch Lecture
//                   </button>
//                   {course.progress > 0 && (
//                     <span className='text-green-600 font-medium text-sm'>
//                       {course.progress}% Completed
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useSessionContext } from "@/app/contexts/SessionContext.tsx";
import { Pencil } from "lucide-react";
export default function DashboardPage() {
  const { user } = useSessionContext();
  return (
    <div className='space-y-8'>
      {/* Top Greeting Bar */}
      <div className='bg-[#f8d5ad] rounded-2xl p-4 mb-8 text-center'>
        <h1 className='text-xl font-bold text-(--color-text-dark)'>Hello, {user?.name}!</h1>
      </div>
      {/* Top Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <StatCard
          title='Your successful rating'
          value='85%'
          icon='%'
          sub='Percentage'
        />
        <StatCard
          title='Rating'
          value='8'
          icon='list'
          sub='You are in the top ten student'
        />
        <StatCard
          title='Attendance'
          value='20/20'
          icon='clock'
          sub='Done/All'
        />
        <StatCard
          title='Attendance'
          value='20/20'
          icon='clock'
          sub='Done/All'
        />
        <div className='border-orange border-4 text-(--color-orange) rounded-lg  flex items-center justify-center p-6 text-center text-lg font-medium cursor-pointer'>
          Bhodro Student go to your Class
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Calendar & Schedule Section */}
        <div className='lg:col-span-2 bg-[#EAB308]/20 rounded-[40px] p-8 flex flex-col md:flex-row gap-6'>
          {/* Simple Calendar Placeholder */}
          <div className='bg-white rounded-2xl p-4 flex-1'>
            <div className='text-center font-bold mb-4'>April</div>
            <div className='grid grid-cols-7 gap-2 text-[10px] text-gray-400 text-center'>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
                <div key={d}>{d}</div>
              ))}
              {/* Simplified Days */}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-1 ${i + 1 === 12 ? "bg-blue-500 text-white rounded-full" : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Schedule List */}
          <div className='flex-1 space-y-3'>
            <ScheduleItem
              color='bg-[#60A5FA]'
              date='12.04'
              text='Workshop with the developer'
            />
            <ScheduleItem
              color='bg-[#94A3B8]'
              date='17.04'
              text='Speaking club'
            />
            <ScheduleItem
              color='bg-[#166534]'
              date='30.04'
              text='English. Practice'
            />
            <ScheduleItem
              color='bg-[#2563EB]'
              date='4.05'
              text='Figma. Smart animate. Part 1'
            />
          </div>
        </div>

        {/* Teachers List */}
        <div className='bg-white rounded-[40px] p-8'>
          <h3 className='text-lg font-bold mb-6 text-center'>My teachers</h3>
          <div className='space-y-4'>
            <TeacherItem
              name='Andrew Todesko'
              subject='HTML, CSS'
            />
            <TeacherItem
              name='Julia Kors'
              subject='English lessons'
            />
            <TeacherItem
              name='Thomas McDowell'
              subject='Web-design'
            />
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className='bg-white rounded-[40px] p-8'>
        <h3 className='text-lg font-bold mb-6 text-center'>Upcoming events</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <EventCard
            title='"Robot Fest" - Incredible event!'
            date='24.05.2022'
            time='12.00 PM'
            img='/api/placeholder/150/100'
          />
          <EventCard
            title='Developer secrets and hacks'
            date='28.05.2022'
            time='2.00 PM'
            img='/api/placeholder/150/100'
          />
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function StatCard({ title, value, sub }: any) {
  return (
    <div className='bg-orange text-white rounded-lg p-6 relative overflow-hidden'>
      <p className='text-sm '>{title}</p>
      <h2 className='text-2xl text-(--color-text-dark) font-bold'>{value}</h2>
      <p className='text-md mt-2 opacity-70'>{sub}</p>
    </div>
  );
}

function ScheduleItem({ color, date, text }: any) {
  return (
    <div className='flex items-center gap-3'>
      <div className={`${color} text-white text-[10px] px-2 py-3 rounded-full w-12 text-center`}>
        {date}
      </div>
      <div className='bg-white/80 flex-1 py-2 px-4 rounded-xl text-xs font-medium'>{text}</div>
    </div>
  );
}

function TeacherItem({ name, subject }: any) {
  return (
    <div className='flex items-center gap-3 bg-[#F1F5F9] p-3 rounded-2xl'>
      <img
        src='/api/placeholder/40/40'
        className='w-10 h-10 rounded-full'
        alt={name}
      />
      <div className='flex-1'>
        <p className='text-xs font-bold'>{name}</p>
        <p className='text-[10px] text-gray-500'>{subject}</p>
      </div>
      <button className='p-1 border border-black rounded-md'>
        <Pencil size={12} />
      </button>
    </div>
  );
}

function EventCard({ title, date, time, img }: any) {
  return (
    <div className='flex items-center gap-4 bg-[#F1F5F9] p-4 rounded-3xl'>
      <img
        src={img}
        className='w-24 h-20 rounded-2xl object-cover'
        alt={title}
      />
      <div>
        <p className='text-xs font-bold mb-2'>{title}</p>
        <p className='text-[10px] text-gray-500'>{date}</p>
        <p className='text-[10px] text-gray-500'>{time}</p>
      </div>
    </div>
  );
}
