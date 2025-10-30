import {
  Award,
  BarChart2,
  Eye,
  Globe,
  Heart,
  MoreHorizontal,
  Play,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
const CourseDetailPage = () => {
  // Course Stats Data
  const stats = [
    {
      icon: Play,
      value: "1,957",
      label: "Students Enrolled",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      icon: BarChart2,
      value: "51,439",
      label: "Total Video",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: Users,
      value: "9,416,418",
      label: "Enrolled Last Week",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      icon: Award,
      value: "Beginner",
      label: "Skill level",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      icon: Globe,
      value: "Mandarin",
      label: "Language",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-700",
    },
    {
      icon: Award,
      value: "142",
      label: "Total File Size",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      icon: Heart,
      value: "19,37:51",
      label: "Time",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: Eye,
      value: "76,395,167",
      label: "View",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-700",
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Breadcrumb Navigation */}
      <div className='flex items-center text-sm text-gray-500 space-x-2 mb-4'>
        <span className='hover:text-gray-700 cursor-pointer'>Course</span>
        <span>/</span>
        <span className='hover:text-gray-700 cursor-pointer'>All Courses</span>
        <span>/</span>
        <span className='hover:text-gray-700 cursor-pointer'>Developments</span>
        <span>/</span>
        <span className='hover:text-gray-700 cursor-pointer'>Web Development</span>
        <span>/</span>
        <span className='text-gray-900 font-medium'>
          2021 Complete Python Bootcamp From Zero to Hero in Python
        </span>
      </div>

      <div className='w-full flex flex-col gap-4'>
        {/* Course Header Section */}
        <div className='bg-white rounded p-3'>
          <div className='flex gap-6 items-center'>
            {/* Course Thumbnail */}
            <div className='flex-shrink-0'>
              <Image
                width={250}
                height={200}
                src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
                alt='Course thumbnail'
                className='h-full object-cover rounded'
              />
            </div>

            {/* Course Info */}
            <div className='flex-1 flex flex-col gap-2'>
              {/* Course Creation info */}
              <div className='flex items-center gap-6'>
                <span className='text-xs text-gray-500'>Uploaded On: May 1st, 2023</span>
                <span className='text-xs text-gray-500'>Updated On: May 1st, 2023</span>
              </div>
              {/* Title */}
              <h4 className='font-bold text-gray-900'>
                2021 Complete Python Bootcamp From Zero to Hero in Python
              </h4>
              {/* Subtitle */}
              <span className='text-xs text-gray-500'>
                3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a
                living freelancing.
              </span>

              {/* Instructor Info */}
              <div className='w-full flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <Image
                    width={80}
                    height={80}
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'
                    alt='Instructor'
                    className='w-10 h-10 rounded-full'
                  />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Kevin Gilbert</p>
                    <p className='text-xs text-gray-500'>Master Vedeo • 45,653 Wishlist</p>
                  </div>
                </div>

                {/* Rating Summary */}
                <div className='flex items-center space-x-2'>
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-4 h-4 text-orange-400 fill-current'
                      />
                    ))}
                  </div>
                  <span className='text-sm font-semibold text-gray-900'>4.8</span>
                  <span className='text-sm text-gray-500'>(451,444 Rating)</span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl font-bold text-orange-light'>$13.99</span>
                    <span className='text-lg text-gray-400 line-through'>$11,605,412.02</span>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <button className='px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded hover:bg-orange transition-colors'>
                    Withdrew Money
                  </button>
                  <button className='p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors'>
                    <MoreHorizontal className='w-4 h-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course States */}
        <div className='w-full h-[380px] flex gap-4 items-center'>
          {/* States card */}
          <div className='rounded w-full h-full flex flex-wrap gap-4'>
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className='bg-white rounded p-2 flex items-center gap-3 w-[48%]'
              >
                <div className='flex items-center justify-between'>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <div>
                  <div className='text-xl font-bold text-gray-800'>{stat.value}</div>
                  <div className='text-sm text-gray-500'>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Course Rating Distribution */}
          <div className='bg-white rounded w-full h-full'>
            <div className='flex items-center justify-between p-4 border-b border-gray-200'>
              <h4 className='font-semibold'>Overall Course Ratings</h4>
              <a
                href='#'
                className='text-sm text-orange-500 hover:text-orange-600'
              >
                See more →
              </a>
            </div>
            <div>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2 px-4 py-3 border-b border-gray-200'>
                  <div className='flex flex-col gap-1 items-center justify-center bg-[#FFF2E5] w-[40%] aspect-square rounded'>
                    <div className='text-3xl font-bold text-gray-800'>4.6</div>
                    <div className='flex items-center justify-center'>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className='w-4 h-4 text-orange-400'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      ))}
                    </div>
                    <div className='text-sm text-gray-500'>Course Rating</div>
                  </div>
                  <svg
                    viewBox='0 0 200 80'
                    className='w-full h-23'
                  >
                    <polyline
                      points='0,60 20,45 40,50 60,35 80,40 100,30 120,45 140,35 160,50 180,40 200,45'
                      fill='none'
                      stroke='#fb923c'
                      strokeWidth='2'
                    />
                  </svg>
                </div>
                <div className='flex flex-col gap-2 p-4 pt-0'>
                  {[5, 4, 3, 2, 1].map((stars, idx) => (
                    <div
                      key={stars}
                      className='flex items-center space-x-3'
                    >
                      <div className='flex'>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < stars ? "text-orange-400" : "text-gray-300"}`}
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                        ))}
                      </div>
                      <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-orange-400 rounded-full'
                          style={{ width: `${[55, 27, 10, 5, 3][idx]}%` }}
                        ></div>
                      </div>
                      <span className='text-sm text-gray-600 w-10 text-right'>
                        {[55, 27, 10, 5, 3][idx]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Revenue*/}
        <div className='w-full h-[380px] flex gap-4 items-center'>
          <div className='bg-white rounded w-[45%] h-full overflow-y-auto'>
            <div className='flex items-center justify-between p-4 border-b border-gray-200'>
              <h4 className='font-semibold'>Reviews</h4>
              <a
                href='#'
                className='text-sm text-orange-500 hover:text-orange-600'
              >
                See more →
              </a>
            </div>
          </div>
          {/* Course Overview */}
          <div className='bg-white rounded w-[55%] h-full overflow-y-auto'>
            <div className='flex items-center justify-between border-b border-gray-200 p-4'>
              <h4 className='font-semibold'>Course Overview</h4>
              <a
                href='#'
                className='text-sm text-orange-500 hover:text-orange-600'
              >
                Today →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
