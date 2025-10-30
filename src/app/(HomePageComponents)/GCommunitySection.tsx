import Image from "next/image";

// You can replace these with actual image URLs
const members = [
  {
    id: 1,
    size: "w-28 h-28",
    top: "top-[15%]",
    bottom: "bottom-[10%]",
    left: "left-[22%]",
    bgColor: null,
    animDelay: "0s",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 2,
    size: "w-16 h-16",
    top: "top-[35%]",
    left: "left-[5%]",
    bgColor: null,
    animDelay: "0.5s",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 3,
    size: "w-24 h-24",
    top: "top-[60%]",
    left: "left-[10%]",
    bgColor: "bg-pink-200",
    animDelay: "1s",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 4,
    size: "w-20 h-20",
    top: "top-[5%]",
    left: "left-[45%]",
    bgColor: null,
    animDelay: "0.2s",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 5,
    size: "w-32 h-32",
    top: "top-[65%]",
    left: "left-[30%]",
    bgColor: null,
    animDelay: "0.8s",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
  },
  {
    id: 6,
    size: "w-16 h-16",
    top: "top-[60%]",
    left: "left-[52%]",
    bgColor: null,
    animDelay: "1.2s",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 7,
    size: "w-24 h-24",
    top: "top-[20%]",
    left: "left-[60%]",
    bgColor: null,
    animDelay: "0.4s",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 8,
    size: "w-28 h-28",
    top: "top-[45%]",
    left: "left-[70%]",
    bgColor: "bg-rose-200",
    animDelay: "0.7s",
    img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop",
  },
  {
    id: 9,
    size: "w-20 h-20",
    top: "top-[75%]",
    left: "left-[65%]",
    bgColor: null,
    animDelay: "1.5s",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
  },
  {
    id: 10,
    size: "w-24 h-24",
    top: "top-[5%]",
    right: "right-[5%]",
    bgColor: null,
    animDelay: "0.3s",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 11,
    size: "w-20 h-20",
    top: "top-[30%]",
    right: "right-[2%]",
    bgColor: "bg-teal-100",
    animDelay: "0.9s",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 12,
    size: "w-24 h-24",
    top: "top-[60%]",
    right: "right-[8%]",
    bgColor: null,
    animDelay: "0.6s",
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop",
  },
];

const GCommunitySection = () => {
  return (
    <>
      {/* This style block contains the keyframe animation. In a real Next.js app, you'd put this in your global CSS file. */}
      <style
        jsx
        global
      >{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      <section className='bg-[#FFFBF5] py-20 sm:py-32'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4'>
              Learn Together, Grow Together
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Join the Aloskill Community to connect with other learners, ask questions, share
              ideas, and build your network.
            </p>
            <button className='bg-[#F97316] text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105'>
              Join the Community
            </button>
          </div>

          <div className='relative h-96 w-full max-w-6xl mx-auto mt-16'>
            {members.map(member => (
              <div
                key={member.id}
                className={`absolute ${member.size} ${member.top} ${member.left} ${member.right || ""} ${member.bottom || ""} animate-[float_6s_ease-in-out_infinite]`}
                style={{ animationDelay: member.animDelay }}
              >
                <div
                  className={`relative ${member.size} p-1 rounded-full ${member.bgColor ? member.bgColor : ""}`}
                >
                  <Image
                    width={300}
                    height={300}
                    className='w-full h-full object-cover rounded-full'
                    src={member.img}
                    alt={`Community member ${member.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GCommunitySection;
