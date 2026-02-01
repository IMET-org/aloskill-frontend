"use client";

import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Circle,
  Clock,
  FileText,
  Loader,
  Pause,
  Play,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiClient } from "../../../../lib/api/client";
import { getFileIdFromUrl } from "../../../../lib/course/utils";
import type { CourseDetailsPrivate, PrivateLesson } from "../../courses/allCourses.types";
import AttachFileTab from "./AttachFileTab";
import CommentsTab from "./CommentsTab";
import DescriptionTab from "./DescriptionTab";
import LectureNotesTab from "./LectureNotesTab";

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("description");
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<CourseDetailsPrivate | undefined>(undefined);
  const [activeContent, setActiveContent] = useState<PrivateLesson | null>(null);
  const [videoData, setVideoData] = useState<{
    libraryId: string;
    token: string;
    expiresAt: number;
    videoId: string;
  } | null>(null);
  const { id } = useParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<CourseDetailsPrivate>(
          `/course/private/viewCourse/${id}`
        );
        console.log("response", response);
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch Course", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [id]);

  // const markLessonComplete = (vidoeId: string | undefined) => {
  //   console.log("Mark lesson Completed");
  // };

  // useEffect(() => {
  //   const handleMessage = event => {
  //     console.log("Received origin:", event.origin);
  //     console.log("Received data:", event.data);
  //     // if (event.origin !== "https://iframe.mediadelivery.net") return;

  //     let data;
  //     try {
  //       data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
  //     } catch (e) {
  //       return;
  //     }
  //     console.log("data : ", data);

  //     // if (data.event === "ready") {
  //     //   const eventsToSubscribe = ["play", "pause", "ended", "timeupdate"];

  //     //   eventsToSubscribe.forEach(eventName => {
  //     //     iframeRef.current?.contentWindow?.postMessage(
  //     //       JSON.stringify({ method: "addEventListener", value: eventName }),
  //     //       "*"
  //     //     );
  //     //   });
  //     // }

  //     // 2. Now these will actually trigger!
  //     if (data.event === "play") console.log("Video Playing");
  //     if (data.event === "pause") console.log("Video Paused");
  //     if (data.event === "ended") markLessonComplete(videoData?.videoId);
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, [videoData]);

  // useEffect(() => {
  //   const handleMessage = event => {
  //     // 1. Security check
  //     if (!event.origin.includes("mediadelivery.net")) return;

  //     try {
  //       // Bunny sends stringified JSON
  //       const data = JSON.parse(event.data);

  //       // LOG EVERYTHING: This will show us the real structure
  //       console.log("FULL DATA RECEIVED:", data);

  //       // Some versions of Bunny use 'event', others use 'method'
  //       const eventName = data.event || data.method;

  //       if (eventName === "ready") {
  //         console.log("Player is ready, attempting to subscribe...");
  //         // Use the event source to send the ping back directly
  //         event.source.postMessage('{"command": "ping"}', event.origin);
  //       }

  //       if (eventName === "play" || eventName === "playing") {
  //         console.log("🔥 SUCCESS: The video is playing!");
  //       }
  //     } catch (err) {
  //       // Not JSON, ignore
  //     }
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, []);

  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerReadyRef = useRef(false);
  const COMPLETION_THRESHOLD = 0.9;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 1. Security & Type Check
      if (!event.origin.includes("mediadelivery.net")) return;

      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch (e) {
        return;
      }

      const eventName = data.event || data.method;

      // 2. The Subscription Logic
      if (eventName === "ready") {
        console.log("✅ Bunny Player Ready");

        // Grab the duration from the ready event if available
        if (data.duration) setDuration(data.duration);

        const playerWindow = iframeRef.current?.contentWindow;
        if (playerWindow) {
          const events = ["play", "pause", "timeupdate", "ended"];
          events.forEach(ev => {
            playerWindow.postMessage(
              JSON.stringify({ method: "addEventListener", value: ev }),
              "*"
            );
          });
          console.log("📡 Subscriptions Active");
        }
      }

      // 3. The Progress Tracking Logic
      if (eventName === "timeupdate") {
        const currentTime = data.value;
        setCurrentTime(currentTime);

        // Calculate progress percentage
        // If duration isn't in state yet, use a fallback or the data object
        const totalTime = duration || data.duration || 0;

        if (totalTime > 0) {
          const percentDone = (currentTime / totalTime) * 100;

          // Log progress every few seconds (to avoid console spam)
          if (Math.floor(currentTime) % 5 === 0) {
            console.log(`📊 Progress: ${percentDone.toFixed(2)}%`);
          }

          // 4. TRIGGER: 20% Milestone
          if (percentDone >= 20 && !isCompleted) {
            console.log("🎯 20% Milestone Reached! Pinging Backend...");
            // markLessonComplete(activeContent?.id);
            // (We'll build this function next)
          }
        }
      }

      if (eventName === "ended") {
        console.log("🎬 Video Finished");
        setIsCompleted(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [duration, isCompleted, activeContent]); // Dependencies are key!

  const handleSetActiveContents = useCallback(
    (moduleId = 1, lessonId = 1) => {
      const lessonContent = course?.modules
        .find(m => m.position === moduleId)
        ?.lessons.find(l => l.position === lessonId);
      if (lessonContent) {
        setActiveContent(lessonContent);
        return;
      }
      setActiveContent(null);
    },
    [course]
  );

  useEffect(() => {
    handleSetActiveContents(1, 1);
  }, [course, handleSetActiveContents]);

  useEffect(() => {
    if (!activeContent?.contentUrl) {
      return;
    }
    try {
      const getVideoData = async () => {
        const getVideoFromBunny = await apiClient.post<{
          libraryId: string;
          token: string;
          videoId: string;
          expiresAt: number;
        }>("/course/get-video-url", {
          filePath: getFileIdFromUrl(activeContent?.contentUrl as string),
          duration: 20,
        });
        if (!getVideoFromBunny.success) {
          return;
        }
        if (getVideoFromBunny.data) {
          setVideoData(getVideoFromBunny.data);
        }
      };
      getVideoData();
    } catch (_error: unknown) {}
  }, [activeContent?.contentUrl]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const tabs = [
    { id: "description", label: "Description", component: DescriptionTab },
    { id: "lectures", label: "Lectures Notes", component: LectureNotesTab },
    { id: "attach", label: "Attach File", component: AttachFileTab, badge: "01" },
    { id: "comments", label: "Comments", component: CommentsTab },
  ];

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

  if (isLoading) {
    return (
      <div className='min-h-screen flex gap-3 items-center justify-center'>
        <Loader className='w-8 h-8 text-gray-500 animate-spin' />
        <p className='text-gray-500'>Loading course details...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50'>
      {/* Header */}
      <header className='bg-transparent shadow-md'>
        <div className='max-w-8xl mx-auto px-3 sm:px-4 lg:px-6 py-2.5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <button className='cursor-pointer'>
                <ChevronLeft className='w-5 h-5 text-gray-700' />
              </button>
              <div>
                <h1 className='text-md sm:text-lg mb-2 font-semibold text-gray-900'>
                  {course?.title || "Loading Course Title..."}
                </h1>
                <div className='flex items-center space-x-4 mt-1 text-sm text-gray-600'>
                  <span className='flex items-center space-x-1'>
                    <FileText className='w-4 h-4' />
                    <span>{course?.modules.length} Modules</span>
                  </span>
                  <span className='flex items-center space-x-1'>
                    <Play className='w-4 h-4' />
                    <span>{course?.content.totalLessons} Lectures</span>
                  </span>
                  <span className='flex items-center space-x-1'>
                    <Clock className='w-4 h-4' />
                    <span>{course?.content.totalDuration}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <button className='px-3 py-1.5 text-orange font-medium hover:bg-orange-100 rounded transition-colors duration-750'>
                Write A Review
              </button>
              <button className='px-3 py-1.5 bg-orange text-white font-medium rounded hover:bg-orange-500 transition-colors duration-500 cursor-pointer'>
                Next Lecture
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-8xl mx-auto px-3 sm:px-4 lg:px-6 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Video/Image Player */}
            <div className='bg-white overflow-hidden'>
              <div className='aspect-video bg-linear-to-br from-teal-400 to-teal-500'>
                {videoData ? (
                  <>
                    <iframe
                      ref={iframeRef}
                      className='w-full h-full'
                      src={`https://iframe.mediadelivery.net/embed/${videoData.libraryId}/${videoData.videoId}?token=${videoData.token}&expires=${videoData.expiresAt}&autoplay=false&api=true`}
                      allow='encrypted-media;'
                      allowFullScreen
                    />
                  </>
                ) : (
                  <div className='min-h-screen flex gap-3 items-center justify-center'>
                    <Loader className='w-8 h-8 text-gray-500 animate-spin' />
                    <p className='text-gray-500'>Loading Lesson Video.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lecture Title */}
            <div className='bg-transparent border-b border-gray-300 mt-4 pb-4'>
              <h2 className='text-lg font-bold text-gray-900'>2. Sign up in Webflow</h2>
              <div className='flex items-end space-x-2 mt-3'>
                <div className='flex items-center -space-x-2'>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className='w-7 h-7 rounded-full bg-linear-to-br from-orange to-orange-dark border-2 border-white'
                    />
                  ))}
                </div>
                <span className='text-sm! text-gray-600'>512 Students watching</span>
                <div className='flex-1' />
                <span className='text-sm text-gray-500'>Last updated: Oct 26, 2020</span>
                <span className='text-sm text-gray-500'>Comments: 154</span>
              </div>
            </div>

            {/* Tabs */}
            <div className='bg-transparent overflow-hidden'>
              <div className='border-b border-gray-300'>
                <div className='flex space-x-8'>
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`p-4 font-medium text-sm relative ${
                        activeTab === tab.id
                          ? "text-orange-500"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span className='flex items-center space-x-2'>
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span className='px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full'>
                            {tab.badge}
                          </span>
                        )}
                      </span>
                      {activeTab === tab.id && (
                        <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500' />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className='py-6'>
                {ActiveTabComponent && <ActiveTabComponent content={activeContent} />}
              </div>
            </div>
          </div>

          {/* Sidebar - Course Contents */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded py-6 pb-0 sticky top-22'>
              <div className='pb-6 mb-3 border-b border-gray-200'>
                <div className='px-4 flex items-center justify-between mb-3'>
                  <h3 className='text-md font-semibold text-gray-900'>Course Contents</h3>
                  <span className='text-sm font-semibold text-green-600'>15% Completed</span>
                </div>
                <div className='px-4'>
                  <div className='w-full h-1 bg-gray-200 rounded-full'>
                    <div className='h-full w-[15%] bg-orange rounded-full' />
                  </div>
                </div>
              </div>

              <div className='max-h-[calc(100vh-250px)] overflow-y-auto'>
                {course?.modules.map(section => (
                  <div
                    key={section.position}
                    className='border border-gray-200 overflow-hidden'
                  >
                    <button
                      onClick={() => toggleSection(section.position)}
                      className='w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors'
                    >
                      <div className='flex items-center space-x-3'>
                        {expandedSections.includes(section.position) ? (
                          <ChevronUp className='w-5 h-5 text-orange-500' />
                        ) : (
                          <ChevronDown className='w-5 h-5 text-gray-400' />
                        )}
                        <div className='text-left'>
                          <h4 className='font-semibold text-gray-900 text-sm'>{section.title}</h4>
                          <div className='flex items-center space-x-3 mt-1 text-xs text-gray-500'>
                            <span className='flex items-center space-x-1'>
                              <Play className='w-3 h-3' />
                              <span>{section.lessons.length} lectures</span>
                            </span>
                            <span className='flex items-center space-x-1'>
                              <Clock className='w-3 h-3' />
                              <span>{section.moduleDuration}</span>
                            </span>
                            <span className='flex items-center space-x-1'>
                              <CheckCircle2 className='w-3 h-3 text-green-500' />
                              <span>25% finish (1/{section.lessons.length})</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>

                    {expandedSections.includes(section.position) && section.lessons.length > 0 && (
                      <div className='border-t border-gray-200'>
                        {section.lessons.map(lesson => (
                          <div
                            key={lesson.position}
                            onClick={() =>
                              handleSetActiveContents(section.position, lesson.position)
                            }
                            className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                              lesson.current ? "bg-orange-50" : ""
                            }`}
                          >
                            <div className='flex items-center space-x-3'>
                              {lesson.completed ? (
                                <CheckCircle2 className='w-4 h-4 text-orange-500' />
                              ) : (
                                <Circle className='w-4 h-4 text-gray-300' />
                              )}
                              <span className='text-sm text-gray-700'>{lesson.title}</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <span className='text-xs text-gray-500'>{lesson.duration}</span>
                              {lesson.current ? (
                                <Pause className='w-4 h-4 text-gray-700' />
                              ) : (
                                <Play className='w-4 h-4 text-gray-400' />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
