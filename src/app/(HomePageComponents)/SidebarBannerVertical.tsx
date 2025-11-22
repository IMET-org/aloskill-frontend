import Slider from "@/components/slider/Slider.tsx";

export function SidebarAdBanner() {
  const ads = [
    { title: "50% OFF", subtitle: "Summer Sale!", bg: "bg-red-500" },
    { title: "NEW", subtitle: "Course Launch", bg: "bg-green-500" },
    { title: "FREE", subtitle: "Trial Week", bg: "bg-blue-500" },
  ];

  return (
    <div className='w-80 mx-auto'>
      <Slider
        slides={ads.map((ad, i) => (
          <div
            key={i}
            className={`${ad.bg} text-black w-full rounded-lg p-6 h-32 flex flex-col justify-center`}
          >
            <h3 className='text-3xl font-bold'>{ad.title}</h3>
            <p className='text-lg'>{ad.subtitle}</p>
          </div>
        ))}
        visibleCount={1}
        autoplay
        autoplayInterval={3000}
        loop
        showArrows={false}
        showDots={true}
      />
    </div>
  );
}
