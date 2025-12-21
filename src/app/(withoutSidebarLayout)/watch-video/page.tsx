"use client";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Lock,
  Maximize,
  Menu,
  MessageSquare,
  Minimize,
  Pause,
  Play,
  PlayCircle,
  Share2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LMSVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(85);
  const [duration, setDuration] = useState(310);
  const videoContainerRef = useRef(null);

  const courseSections = [
    {
      id: 0,
      title: "Getting Started",
      lectures: 4,
      duration: "33m",
      progress: 50,
      items: [
        { id: 0, title: "What is Webflow?", duration: "5m 12s", completed: true },
        { id: 1, title: "Sign up in Webflow", duration: "4m 30s", completed: true, active: true },
        { id: 2, title: "Basics of Webflow", duration: "12m 45s", completed: false },
        { id: 3, title: "Figma Introduction", duration: "10m 33s", completed: false, locked: true },
      ],
    },
    {
      id: 1,
      title: "Secrets of Great Design",
      lectures: 8,
      duration: "1h 23m",
      progress: 0,
      items: [
        { id: 4, title: "Design Principles", duration: "15m 20s", completed: false, locked: true },
        { id: 5, title: "Color Theory", duration: "12m 45s", completed: false, locked: true },
      ],
    },
    {
      id: 2,
      title: "Practice: Design Like an Artist",
      lectures: 12,
      duration: "2h 15m",
      progress: 0,
      items: [],
    },
    {
      id: 3,
      title: "Web Development (webflow)",
      lectures: 15,
      duration: "3h 45m",
      progress: 0,
      items: [],
    },
    {
      id: 4,
      title: "Secrets of Making Money Freelancing",
      lectures: 6,
      duration: "1h 12m",
      progress: 0,
      items: [],
    },
  ];

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / duration) * 100;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const tabs = [
    { id: "description", label: "Description", icon: BookOpen },
    { id: "notes", label: "Lecture Notes", icon: FileText },
    { id: "attachments", label: "Attachments", icon: Download, badge: 1 },
    { id: "comments", label: "Comments", icon: MessageSquare, badge: 354 },
  ];

  return (
    <div className='flex h-screen max-w-[1420px] mx-auto bg-gray-50 overflow-hidden py-12 px-10'>
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-w-0 '>
        {/* Top Navigation */}
        <div className='bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2 md:gap-4 min-w-0 flex-1'>
              <button
                className='text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0'
                aria-label='Go back'
              >
                <ChevronLeft
                  size={20}
                  className='md:w-6 md:h-6'
                />
              </button>
              <div className='min-w-0 flex-1'>
                <h1 className='text-sm md:text-lg font-semibold text-[var(--color-text-dark)] truncate'>
                  Complete Website Responsive Design: Figma to Webflow
                </h1>
                <div className='flex items-center gap-3 md:gap-4 mt-1  text-sm text-gray-500'>
                  <span className='flex items-center gap-1'>
                    <PlayCircle
                      size={14}
                      className='md:w-4 md:h-4'
                    />
                    <span className='hidden sm:inline'>285 lectures</span>
                    <span className='sm:hidden'>285</span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <Clock
                      size={14}
                      className='md:w-4 md:h-4'
                    />
                    16h 34m
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 flex-shrink-0'>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className='lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                aria-label='Toggle course contents'
              >
                <Menu size={20} />
              </button>
              <button className='hidden sm:flex items-center gap-2 px-3 md:px-4 py-2  text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                <Share2
                  size={14}
                  className='md:w-4 md:h-4'
                />
                <span className='hidden md:inline'>Share</span>
              </button>
              <button className='px-3 md:px-4 py-2  text-sm font-medium text-white bg-[var(--color-orange)] rounded-lg hover:bg-[var(--color-orange-dark)] transition-colors'>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div
          ref={videoContainerRef}
          className='relative bg-black flex-1 flex items-center justify-center group'
        >
          {/* Video Placeholder */}
          <div className='relative w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center'>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
            <div className='absolute inset-0 bg-black/30' />

            {/* Play/Pause Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className='absolute inset-0 flex items-center justify-center z-10'
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {!isPlaying && (
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl'>
                  <Play
                    size={28}
                    className='md:w-8 md:h-8 text-gray-900 ml-1'
                    fill='currentColor'
                  />
                </div>
              )}
            </button>

            {/* Video Controls */}
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20'>
              {/* Progress Bar - Full Width on Top */}
              <div className='mb-3 md:mb-4'>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={progress}
                  onChange={e => setCurrentTime((e.target.value / 100) * duration)}
                  className='w-full h-1 md:h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer'
                  style={{
                    background: `linear-gradient(to right, var(--color-orange) 0%, var(--color-orange) ${progress}%, rgba(255,255,255,0.3) ${progress}%, rgba(255,255,255,0.3) 100%)`,
                  }}
                  aria-label='Video progress'
                />
              </div>

              <div className='flex items-center gap-2 md:gap-4'>
                {/* Left Controls */}
                <div className='flex items-center gap-2 md:gap-3'>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className='text-white hover:text-gray-300 transition-colors'
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause
                        size={18}
                        className='md:w-5 md:h-5'
                      />
                    ) : (
                      <Play
                        size={18}
                        className='md:w-5 md:h-5'
                      />
                    )}
                  </button>
                  <button
                    className='text-white hover:text-gray-300 transition-colors hidden sm:block'
                    aria-label='Previous lecture'
                  >
                    <ChevronLeft
                      size={18}
                      className='md:w-5 md:h-5'
                    />
                  </button>
                  <button
                    className='text-white hover:text-gray-300 transition-colors hidden sm:block'
                    aria-label='Next lecture'
                  >
                    <ChevronRight
                      size={18}
                      className='md:w-5 md:h-5'
                    />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className='text-white hover:text-gray-300 transition-colors'
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX
                        size={18}
                        className='md:w-5 md:h-5'
                      />
                    ) : (
                      <Volume2
                        size={18}
                        className='md:w-5 md:h-5'
                      />
                    )}
                  </button>
                </div>

                {/* Time Display */}
                <div className='flex items-center gap-2 text-white  text-sm flex-1'>
                  <span>{formatTime(currentTime)}</span>
                  <span className='text-gray-400'>/</span>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Right Controls */}
                <button
                  onClick={toggleFullscreen}
                  className='text-white hover:text-gray-300 transition-colors'
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize
                      size={18}
                      className='md:w-5 md:h-5'
                    />
                  ) : (
                    <Maximize
                      size={18}
                      className='md:w-5 md:h-5'
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='bg-white border-t border-gray-200'>
          {/* Tab Navigation */}
          <div className='flex gap-4 md:gap-6 px-4 md:px-6 pt-3 md:pt-4 overflow-x-auto scrollbar-hide'>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 md:pb-3  text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 md:gap-2 ${
                    activeTab === tab.id
                      ? "text-[var(--color-text-dark)] border-[var(--color-orange)]"
                      : "text-gray-500 border-transparent hover:text-gray-900"
                  }`}
                >
                  <Icon
                    size={14}
                    className='md:w-4 md:h-4'
                  />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className='px-1.5 py-0.5  rounded bg-[var(--color-orange)] text-white font-medium'>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className='px-4 md:px-6 py-3 md:py-4 max-h-32 md:max-h-48 overflow-y-auto'>
            {activeTab === "description" && (
              <div>
                <h3 className='font-semibold text-[var(--color-text-dark)] mb-2 text-sm md:text-base'>
                  2. Sign up in Webflow
                </h3>
                <div className='flex flex-wrap items-center gap-2 md:gap-3  text-sm text-gray-500 mb-3 md:mb-4'>
                  <span>Last updated: Oct 26, 2020</span>
                  <span className='hidden sm:inline'>•</span>
                  <span>Comments: 354</span>
                </div>
                <p className=' text-sm text-gray-600 leading-relaxed'>
                  We can interactively package your idea into your first website. From creating your
                  first page through to uploading your website to the internet. For the first time,
                  you can build amazing, bespoke websites. There are reasons this you can do
                  whatever task Sketch OR Photoshop can do them work doing with me. At the end of
                  each video I have a downloadable version of where we are in the process so that
                  you can compare your progress and ensure you're on the right track.
                </p>
              </div>
            )}
            {activeTab === "notes" && (
              <div className=' text-sm text-gray-600'>
                <p className='mb-3'>Lecture notes will appear here...</p>
                <ul className='list-disc list-inside space-y-1'>
                  <li>Key point about Webflow signup process</li>
                  <li>Important account configuration steps</li>
                  <li>Best practices for getting started</li>
                </ul>
              </div>
            )}
            {activeTab === "attachments" && (
              <div className=' text-sm text-gray-600'>
                <div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                  <Download
                    size={20}
                    className='text-[var(--color-orange)]'
                  />
                  <div className='flex-1'>
                    <p className='font-medium text-gray-900'>Webflow Signup Guide.pdf</p>
                    <p className=' text-gray-500'>2.4 MB</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "comments" && (
              <div className=' text-sm text-gray-600'>
                <p>Comments section will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar - Course Contents (Desktop) */}
      <div className='hidden lg:flex w-80 xl:w-96 border-l border-gray-200 bg-white flex-col'>
        <SidebarContent
          courseSections={courseSections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/50 z-50'
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className='absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200'>
              <h2 className='font-semibold text-[var(--color-text-dark)]'>Course Contents</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className='p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                aria-label='Close sidebar'
              >
                <X size={20} />
              </button>
            </div>
            <SidebarContent
              courseSections={courseSections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Sidebar Content Component (Reusable)
const SidebarContent = ({ courseSections, activeSection, setActiveSection }) => {
  const totalLectures = courseSections.reduce((acc, section) => acc + section.lectures, 0);
  const completedLectures = courseSections.reduce(
    (acc, section) => acc + section.items.filter(item => item.completed).length,
    0
  );
  const overallProgress = Math.round((completedLectures / totalLectures) * 100) || 18;

  return (
    <>
      <div className='flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200'>
        <h2 className='font-semibold text-[var(--color-text-dark)] text-sm md:text-base'>
          Course Contents
        </h2>
        <span className=' text-sm font-medium text-[var(--color-orange)]'>
          {overallProgress}% Complete
        </span>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {courseSections.map((section, idx) => (
          <div
            key={section.id}
            className='border-b border-gray-200'
          >
            <button
              onClick={() => setActiveSection(activeSection === idx ? -1 : idx)}
              className='w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
            >
              <div className='flex items-center gap-2 md:gap-3 flex-1 min-w-0'>
                <ChevronRight
                  size={16}
                  className={`text-gray-400 transition-transform flex-shrink-0 ${
                    activeSection === idx ? "rotate-90" : ""
                  }`}
                />
                <div className='text-left flex-1 min-w-0'>
                  <div className=' text-sm font-medium text-[var(--color-text-dark)] truncate'>
                    {section.title}
                  </div>
                  <div className=' text-gray-500 mt-0.5'>
                    {section.lectures} lectures • {section.duration}
                  </div>
                </div>
              </div>
              {section.progress > 0 && (
                <div className='flex items-center gap-2 flex-shrink-0'>
                  <div className='hidden md:block w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-[var(--color-orange)] rounded-full transition-all'
                      style={{ width: `${section.progress}%` }}
                    />
                  </div>
                  <span className=' font-medium text-[var(--color-orange)]'>
                    {section.progress}%
                  </span>
                </div>
              )}
            </button>

            {/* Lecture Items */}
            {activeSection === idx && section.items.length > 0 && (
              <div className='bg-gray-50'>
                {section.items.map(item => (
                  <button
                    key={item.id}
                    disabled={item.locked}
                    className={`w-full px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 md:gap-3 transition-colors ${
                      item.locked ? "cursor-not-allowed opacity-60" : "hover:bg-gray-100"
                    } ${item.active ? "bg-orange-50" : ""}`}
                  >
                    <div className='flex-shrink-0'>
                      {item.completed ? (
                        <CheckCircle
                          size={16}
                          className='text-[var(--color-orange)]'
                        />
                      ) : item.active ? (
                        <PlayCircle
                          size={16}
                          className='text-[var(--color-orange)]'
                        />
                      ) : (
                        <Lock
                          size={16}
                          className='text-gray-400'
                        />
                      )}
                    </div>
                    <div className='flex-1 text-left min-w-0'>
                      <div
                        className={` text-sm truncate ${
                          item.active
                            ? "font-medium text-[var(--color-text-dark)]"
                            : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </div>
                    </div>
                    <div className=' text-gray-500 flex-shrink-0'>{item.duration}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LMSVideoPlayer;
