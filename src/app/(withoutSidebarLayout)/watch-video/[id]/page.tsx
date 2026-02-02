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
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../../../lib/api/client";
import { getFileIdFromUrl } from "../../../../lib/course/utils";
import { useSessionContext } from "../../../contexts/SessionContext";
import type { CourseDetailsPrivate, PrivateLesson } from "../../courses/allCourses.types";
import AttachFileTab from "./AttachFileTab";
import BunnyVideoPlayer from "./BunnyVideoPlayer";
import CommentsTab from "./CommentsTab";
import DescriptionTab from "./DescriptionTab";
import LectureNotesTab from "./LectureNotesTab";

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("description");
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<CourseDetailsPrivate | undefined>(undefined);
  const [activeContent, setActiveContent] = useState<PrivateLesson | null>(null);
  const [isCompleted, setIsCompleted] = useState<{
    progressValue: number;
    isFinished: boolean;
  } | null>(null);
  const [videoData, setVideoData] = useState<{
    libraryId: string;
    token: string;
    expiresAt: number;
    videoId: string;
  } | null>(null);
  const { id } = useParams();
  const { user } = useSessionContext();

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
    [course?.modules]
  );

  useEffect(() => {
    if (!id) return;
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<CourseDetailsPrivate>(
          `/course/private/viewCourse/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch Course", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [id]);

  const markLessonAsDone = (lessonId: string) => {
    setCourse(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        modules: prev.modules.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(less => {
            if (less.id === lessonId) {
              return {
                ...less,
                lessonProgress: [
                  {
                    ...(less.lessonProgress[0] || {
                      progressValue: 0,
                      lastViewedAt: null,
                      completedAt: null,
                    }),
                    completed: true,
                    completedAt: new Date().toISOString(),
                    progressValue: 100,
                  },
                ],
              };
            }
            return less;
          }),
        })),
      };
    });
  };

  const handleUpdateProgress = useCallback(async () => {
    if (isCompleted) {
      if (activeContent?.lessonProgress[0]?.completed) return;
      const updateLesson = await apiClient.patch(`/course/update-lesson/${user?.id}`, {
        courseId: course?.id,
        lessonId: activeContent?.id,
        progressValue: isCompleted.progressValue,
        isFinished: isCompleted.isFinished,
      });

      if (updateLesson.success) {
        markLessonAsDone(updateLesson?.data as string);
      }
      setIsCompleted(null);
    }
  }, [activeContent?.id, activeContent?.lessonProgress, user?.id, course?.id, isCompleted]);

  useEffect(() => {
    handleUpdateProgress();
  }, [course, handleUpdateProgress]);

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

  useEffect(() => {
    if (activeContent) return;
    handleSetActiveContents(1, 1);
  }, [handleSetActiveContents, activeContent]);

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
                    <BunnyVideoPlayer
                      videoUrl={`https://iframe.mediadelivery.net/embed/${videoData.libraryId}/${videoData.videoId}?token=${videoData.token}&expires=${videoData.expiresAt}&autoplay=false&api=true&enableStats=true`}
                      setIsCompleted={setIsCompleted}
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
            {/* <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Progress: {progress.toFixed(1)}%</span>
                {isCompleted && (
                  <span className='text-green-600 font-medium'>✔ Lesson Completed</span>
                )}
              </div>

              <div className='h-2 w-full rounded bg-gray-200'>
                <div
                  className='h-full rounded bg-blue-600 transition-all'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div> */}
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
                              {(() => {
                                const completedCount =
                                  section?.lessons.reduce(
                                    (acc, lesson) =>
                                      lesson.lessonProgress[0]?.completed ? acc + 1 : acc,
                                    0
                                  ) || 0;

                                const totalLessons = section?.lessons.length || 0;
                                const percentage =
                                  totalLessons > 0
                                    ? Math.floor((completedCount / totalLessons) * 100)
                                    : 0;

                                return (
                                  <span>
                                    {percentage}% finished ({completedCount}/{totalLessons})
                                  </span>
                                );
                              })()}
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
                              activeContent?.id === lesson.id ? "bg-orange-50" : ""
                            }`}
                          >
                            <div className='flex items-center space-x-3'>
                              {lesson.lessonProgress[0]?.completed ? (
                                <CheckCircle2 className='w-4 h-4 text-orange-500' />
                              ) : (
                                <Circle className='w-4 h-4 text-gray-300' />
                              )}
                              <span className='text-sm text-gray-700'>{lesson.title}</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <span className='text-xs text-gray-500'>{lesson.duration}</span>
                              {activeContent?.id === lesson.id ? (
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
