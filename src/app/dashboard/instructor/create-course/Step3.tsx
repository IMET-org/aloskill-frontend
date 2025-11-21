import { ChevronDown, ChevronUp, Menu, Pencil, Plus, Trash, Trash2, Upload } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import CourseFooter from "./CourseFooter.tsx";
import CourseModal from "./CourseModal.tsx";
import StepHeader from "./StepHeader.tsx";
import { type CourseLesson, type CourseModule, type CreateCourseData } from "./page.tsx";

type ExtendedCourseLesson = CourseLesson & {
  expanded?: boolean;
  lessonTypeSelection?: boolean;
};

type ExtendedCourseModule = CourseModule & {
  lessons: ExtendedCourseLesson[];
};
export default function Step3({
  currentStep,
  setCurrentStep,
  courseData: _courseData,
  setCourseData: _setCourseData,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  courseData: CreateCourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CreateCourseData>>;
}) {
  const [openModal, setOpeModal] = useState<{
    type: string;
    sectionId?: number;
    lectureId?: number;
  }>({
    type: "",
    sectionId: undefined,
    lectureId: undefined,
  });

  const [sections, setSections] = useState<ExtendedCourseModule[]>([
    {
      position: 1,
      title: "Module name",
      lessons: [
        {
          position: 1,
          title: "Lecture name",
          description: "",
          notes: "",
          type: null,
          contentUrl: "",
          files: [] as string[],
          duration: null,
          expanded: false,
          lessonTypeSelection: true,
        },
      ],
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const addSection = () => {
    setSections([
      ...sections,
      {
        position: sections.length + 1,
        title: "Section name",
        lessons: [
          {
            position: 1,
            title: "Lecture name",
            description: "",
            notes: "",
            type: null,
            contentUrl: "",
            files: [] as string[],
            duration: null,
            expanded: false,
            lessonTypeSelection: true,
          },
        ],
      },
    ]);
  };

  const addLesson = (sectionId: number) => {
    setSections(
      sections.map(section => {
        if (section.position === sectionId) {
          return {
            ...section,
            lessons: [
              ...section.lessons,
              {
                position: section.lessons.length + 1,
                title: "Lecture name",
                description: "",
                notes: "",
                type: null,
                contentUrl: "",
                files: [] as string[],
                duration: null,
                expanded: false,
                lessonTypeSelection: true,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const toggleLectureAndType = (
    sectionId: number,
    lectureId: number,
    field: "expanded" | "lessonTypeSelection",
    lectureType?: "VIDEO" | "ARTICLE" | "QUIZ" | "ASSIGNMENT"
  ) => {
    setSections(
      sections.map(section => {
        if (section.position === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map((lecture: ExtendedCourseLesson) => {
              if (lecture.position === lectureId) {
                if (lectureType) {
                  return {
                    ...lecture,
                    type: lectureType,
                    [field]: !lecture[field as keyof ExtendedCourseLesson],
                  };
                }
                if (field) {
                  return { ...lecture, [field]: !lecture[field as keyof ExtendedCourseLesson] };
                }
              }
              return lecture;
            }),
          };
        }
        return section;
      })
    );
  };

  const deleteSection = (moduleId: number) => {
    const confirmPrompt = window.confirm(
      "Are you sure you want to delete this section? All lectures within this section will also be deleted."
    );
    if (confirmPrompt) {
      setSections(sections.filter(section => section.position !== moduleId));
    }
  };

  const handleTextValueChange = (
    sectionId: number,
    lectureId: number,
    type: string,
    value: string
  ) => {
    setSections(
      sections.map(section => {
        if (section.position === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map(lesson => {
              if (lesson.position === lectureId) {
                if (type === "notes") {
                  return { ...lesson, notes: value };
                }
                if (type === "description") {
                  return { ...lesson, description: value };
                }
              }
              return lesson;
            }),
          };
        }
        return section;
      })
    );
  };

  const deleteLecture = (moduleId: number, lessonId: number) => {
    const confirmPrompt = window.confirm("Are you sure you want to delete this Lesson?");
    if (!confirmPrompt) {
      return;
    }
    setSections(
      sections.map(section => {
        if (section.position === moduleId) {
          return {
            ...section,
            lessons: section.lessons.filter(lesson => lesson.position !== lessonId),
          };
        }
        return section;
      })
    );
  };

  const handleFileSelect = (
    e: ChangeEvent<HTMLInputElement>,
    sectionId: number,
    lectureId: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file) {
        const isVideo = file.type.startsWith("video/");
        const isPDF = file.type.startsWith("application/pdf");

        if (isVideo) {
          setSections(sections =>
            sections.map(section => {
              if (section.position === sectionId) {
                return {
                  ...section,
                  lessons: section.lessons.map(lesson => {
                    if (lesson.position === lectureId) {
                      return { ...lesson, video: file.name };
                    }
                    return lesson;
                  }),
                };
              }
              return section;
            })
          );
          return;
        }

        if (isPDF) {
          const fileNames = Array.from(e.target.files ?? []).map(f => f.name);
          setSections(sections =>
            sections.map(section => {
              if (section.position === sectionId) {
                return {
                  ...section,
                  lessons: section.lessons.map(lesson => {
                    if (lesson.position === lectureId) {
                      return { ...lesson, files: fileNames };
                    }
                    return lesson;
                  }),
                };
              }
              return section;
            })
          );
          return;
        }
      }
    }
  };

  const deleteLectureFile = (
    sectionId: number,
    lectureId: number,
    fileName?: string,
    type?: string
  ) => {
    setSections(
      sections.map(section => {
        if (section.position === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map(lesson => {
              if (lesson.position === lectureId) {
                if (type === "video") {
                  return { ...lesson, video: "" };
                }
                if (type === "description") {
                  return { ...lesson, description: "" };
                }
                if (type === "notes") {
                  return { ...lesson, notes: "" };
                }
                return {
                  ...lesson,
                  files: lesson.files && lesson.files.filter(file => file !== fileName),
                };
              }
              return lesson;
            }),
          };
        }
        return section;
      })
    );
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (_data: any) => {
    // Proceed to the next step or handle form submission
    console.log("Lecture and module data : ", sections);
  };

  const loadModalComponent = (type: string) => {
    return (
      <CourseModal
        modalType={type}
        sections={sections}
        setSections={setSections}
        setOpeModal={setOpeModal}
        sectionId={openModal.sectionId}
        lectureId={openModal.lectureId}
      />
    );
  };

  return (
    <div className='w-full bg-white'>
      {/* Header */}
      <StepHeader headingText='Course Curriculum' />
      {/* Form Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-6'
      >
        {/* Sections */}
        <div className='space-y-4'>
          {sections.map((section, sectionIndex) => (
            <div
              key={section.position}
              className='bg-gray-50 rounded p-4'
            >
              {/* Section Header */}
              <div className='flex items-center justify-between pb-4'>
                <div className='flex items-center gap-3'>
                  <Menu
                    size={16}
                    className='text-gray-500'
                  />
                  <span className='text-sm font-medium text-gray-800'>
                    Module 0{sectionIndex + 1} :
                  </span>
                  <span className='text-gray-800 text-sm'>{section.title}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => addLesson(section.position)}
                    className='p-1.5 hover:bg-gray-200 rounded transition-colors'
                  >
                    <Plus
                      size={18}
                      className='text-gray-600'
                    />
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      setOpeModal({ type: "sectionName", sectionId: section.position })
                    }
                    className='p-1.5 hover:bg-gray-200 rounded transition-colors'
                  >
                    <Pencil
                      size={18}
                      className='text-gray-600'
                    />
                  </button>
                  <button
                    type='button'
                    onClick={() => deleteSection(section.position)}
                    className='p-1.5 hover:bg-gray-200 rounded transition-colors'
                  >
                    <Trash2
                      size={18}
                      className='text-gray-600'
                    />
                  </button>
                </div>
              </div>

              {/* Lectures */}
              <div className='flex flex-col gap-4'>
                {section.lessons.map((lesson: ExtendedCourseLesson) => (
                  <div key={lesson.position}>
                    <div className='flex items-center justify-between px-4 py-2 bg-white relative'>
                      <div className='flex items-center gap-3'>
                        <Menu
                          size={16}
                          className='text-gray-500'
                        />
                        <span className='text-gray-800 text-sm'>{lesson.title}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button
                          type='button'
                          onClick={() =>
                            toggleLectureAndType(section.position, lesson.position, "expanded")
                          }
                          className='flex items-center gap-2 px-2 py-1.5 bg-orange-50 text-orange-500 rounded text-sm hover:bg-orange-100 transition-colors'
                        >
                          Contents
                          {lesson.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            setOpeModal({
                              type: "lectureName",
                              sectionId: section.position,
                              lectureId: lesson.position,
                            })
                          }
                          className='p-1.5 hover:bg-gray-100 rounded transition-colors'
                        >
                          <Pencil
                            size={16}
                            className='text-gray-500'
                          />
                        </button>
                        <button
                          type='button'
                          onClick={() => deleteLecture(section.position, lesson.position)}
                          className='p-1.5 hover:bg-gray-100 rounded transition-colors'
                        >
                          <Trash2
                            size={16}
                            className='text-gray-500'
                          />
                        </button>
                        {/* Expanded Content Menu */}
                        {/* {lecture.expanded && (
                          <div className='bg-white rounded w-[20%] z-100 absolute right-[9.7%] top-full p-2'>
                            <button
                              onClick={() =>
                                setOpeModal({
                                  type: "videoUpload",
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                })
                              }
                              className='w-full px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors'
                            >
                              Video
                            </button>
                            <button
                              onClick={() =>
                                setOpeModal({
                                  type: "fileUpload",
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                })
                              }
                              className='w-full px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors'
                            >
                              Attach File
                            </button>
                            <button
                              onClick={() =>
                                setOpeModal({
                                  type: "caption",
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                })
                              }
                              className='w-full px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors'
                            >
                              Captions
                            </button>
                            <button
                              onClick={() =>
                                setOpeModal({
                                  type: "description",
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                })
                              }
                              className='w-full px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors'
                            >
                              Description
                            </button>
                            <button
                              onClick={() =>
                                setOpeModal({
                                  type: "notes",
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                })
                              }
                              className='w-full px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors'
                            >
                              Lecture Notes
                            </button>
                          </div>
                        )} */}
                      </div>
                    </div>
                    {/* Expanded Content */}
                    {lesson.expanded && (
                      <div className='h-auto bg-white p-4 pt-0'>
                        {/* Contents Type Selection */}
                        {lesson.lessonTypeSelection && (
                          <div>
                            <span className='text-sm text-gray-600 mb-1'>
                              Select a content type :
                            </span>
                            <div className='flex items-center justify-center gap-10 border border-dashed border-gray-200 p-2'>
                              <button
                                type='button'
                                onClick={() =>
                                  toggleLectureAndType(
                                    section.position,
                                    lesson.position,
                                    "lessonTypeSelection",
                                    "VIDEO"
                                  )
                                }
                                className='px-3 py-1.5 border border-gray-100 text-gray-800 rounded text-sm hover:bg-gray-100 transition-colors duration-500 cursor-pointer'
                              >
                                Video
                              </button>
                              <button
                                type='button'
                                onClick={() =>
                                  toggleLectureAndType(
                                    section.position,
                                    lesson.position,
                                    "lessonTypeSelection",
                                    "ARTICLE"
                                  )
                                }
                                className='px-3 py-1.5 border border-gray-100 text-gray-800 rounded text-sm hover:bg-gray-100 transition-colors duration-500 cursor-pointer'
                              >
                                Article
                              </button>
                              <button
                                type='button'
                                onClick={() =>
                                  toggleLectureAndType(
                                    section.position,
                                    lesson.position,
                                    "lessonTypeSelection",
                                    "QUIZ"
                                  )
                                }
                                className='px-3 py-1.5 border border-gray-100 text-gray-800 rounded text-sm hover:bg-gray-100 transition-colors duration-500 cursor-pointer'
                              >
                                Quiz
                              </button>
                              <button
                                type='button'
                                onClick={() =>
                                  toggleLectureAndType(
                                    section.position,
                                    lesson.position,
                                    "lessonTypeSelection",
                                    "ASSIGNMENT"
                                  )
                                }
                                className='px-3 py-1.5 border border-gray-100 text-gray-800 rounded text-sm hover:bg-gray-100 transition-colors duration-500 cursor-pointer'
                              >
                                Assignment
                              </button>
                            </div>
                          </div>
                        )}
                        {/* Contents Details */}
                        {lesson.type === "VIDEO" && (
                          <div className='bg-gray-100/20 w-full h-full p-2 pb-0 flex flex-col gap-1 rounded'>
                            {/* Video and Files */}
                            <div className='flex items-center justify-center gap-3'>
                              {/* Add Video For Lessons */}
                              {lesson.contentUrl ? (
                                <>
                                  <div className='w-full rounded border border-dashed border-gray-200 p-3 flex items-center justify-start hover:bg-gray-100/40 transition-colors relative'>
                                    <span className='text-sm w-[95%]'>{lesson.contentUrl}</span>
                                    <span
                                      onClick={() =>
                                        deleteLectureFile(
                                          section.position,
                                          lesson.position,
                                          undefined,
                                          "video"
                                        )
                                      }
                                      className='absolute right-2 h-full w-fit flex items-center cursor-pointer'
                                    >
                                      <Trash className='w-4 h-4' />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className='w-full rounded border border-dashed border-gray-200 p-3 flex items-center justify-center hover:bg-gray-100/40 transition-colors'>
                                    <label
                                      htmlFor='lessonVideo'
                                      className='flex items-center justify-center gap-2 text-sm w-full cursor-pointer'
                                    >
                                      <Upload className='w-3 h-3' /> Add Video
                                    </label>
                                    <input
                                      onChange={e =>
                                        handleFileSelect(e, section.position, lesson.position)
                                      }
                                      id='lessonVideo'
                                      type='file'
                                      accept='.mp4,.mov'
                                      className='hidden'
                                    />
                                  </div>
                                </>
                              )}

                              {/* Add File For Lessons */}
                              {lesson.files && lesson.files.length > 0 ? (
                                <>
                                  <div className='w-full rounded border border-dashed border-gray-200 p-2 flex flex-col items-center justify-start hover:bg-gray-100/40 transition-colors'>
                                    {lesson.files.map((fileName, index) => (
                                      <div
                                        key={index}
                                        className='w-full p-1 flex items-center'
                                      >
                                        <span className='text-sm w-[95%]'>{fileName}</span>
                                        <span
                                          onClick={() =>
                                            deleteLectureFile(
                                              section.position,
                                              lesson.position,
                                              fileName
                                            )
                                          }
                                          className='h-full w-fit flex items-center cursor-pointer'
                                        >
                                          <Trash className='w-4 h-4' />
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className='w-full rounded border border-dashed border-gray-200 p-3 flex items-center justify-center cursor-pointer hover:bg-gray-100/40 transition-colors'>
                                    <label
                                      htmlFor='lessonfile'
                                      className='flex items-center justify-center gap-2 text-sm w-full cursor-pointer'
                                    >
                                      <Upload className='w-3 h-3' /> Attach File
                                    </label>
                                    <input
                                      onChange={e =>
                                        handleFileSelect(e, section.position, lesson.position)
                                      }
                                      id='lessonfile'
                                      multiple={true}
                                      type='file'
                                      accept='.pdf,.doc,.docx,.ppt,.pptx'
                                      className='hidden'
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                            {/* Notes for Lesson */}
                            <div>
                              <span className='text-sm text-gray-600 mb-1'>Lecture Note:</span>
                              <textarea
                                {...register(
                                  `section_${section.position}_lecture_${lesson.position}_notes`,
                                  {
                                    required: "Lecture notes are required",
                                    maxLength: {
                                      value: 1000,
                                      message: "Lecture notes cannot exceed 1000 characters",
                                    },
                                    pattern: {
                                      value: /^[a-zA-Z0-9\s.,!?'"()-]*$/,
                                      message: "Lecture notes contain invalid characters",
                                    },
                                  }
                                )}
                                onChange={e =>
                                  handleTextValueChange(
                                    section.position,
                                    lesson.position,
                                    "notes",
                                    e.target.value
                                  )
                                }
                                defaultValue={lesson.notes}
                                className={`w-full p-2 border border-dashed border-gray-200 rounded resize-none focus:outline-none focus:border-orange ${
                                  errors[
                                    `section_${section.position}_lecture_${lesson.position}_notes`
                                  ] && "border-red-400 bg-red-50"
                                }`}
                                placeholder='Add lecture notes here...'
                                rows={5}
                                maxLength={1000}
                              ></textarea>
                              {errors[
                                `section_${section.position}_lecture_${lesson.position}_notes`
                              ] && (
                                <p className='text-red-500 text-sm mt-1'>
                                  {
                                    errors[
                                      `section_${section.position}_lecture_${lesson.position}_notes`
                                    ]?.message as string
                                  }
                                </p>
                              )}
                            </div>
                            {/* Description for Lesson */}
                            <div>
                              <span className='text-sm text-gray-600 mb-1'>
                                Lecture Description:
                              </span>
                              <textarea
                                {...register(
                                  `section_${section.position}_lecture_${lesson.position}_description`,
                                  {
                                    required: "Lecture description is required",
                                    maxLength: {
                                      value: 1000,
                                      message: "Lecture description cannot exceed 1000 characters",
                                    },
                                    pattern: {
                                      value: /^[a-zA-Z0-9\s.,!?'"()-]*$/,
                                      message: "Lecture description contain invalid characters",
                                    },
                                  }
                                )}
                                onChange={e =>
                                  handleTextValueChange(
                                    section.position,
                                    lesson.position,
                                    "description",
                                    e.target.value
                                  )
                                }
                                defaultValue={lesson.description}
                                className={`w-full p-2 border border-dashed border-gray-200 rounded resize-none focus:outline-none focus:border-orange ${
                                  errors[
                                    `section_${section.position}_lecture_${lesson.position}_description`
                                  ] && "border-red-400 bg-red-50"
                                }`}
                                placeholder='Add lecture Description here...'
                                rows={5}
                                maxLength={1000}
                              ></textarea>
                              {errors[
                                `section_${section.position}_lecture_${lesson.position}_description`
                              ] && (
                                <p className='text-red-500 text-sm mt-1'>
                                  {
                                    errors[
                                      `section_${section.position}_lecture_${lesson.position}_description`
                                    ]?.message as string
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        {lesson.type === "ARTICLE" && (
                          <div className='bg-gray-100/20 w-full h-full p-2 pb-0 flex flex-col gap-1 rounded'>
                            {/* Add File For Lessons */}
                            {lesson.files && lesson.files.length > 0 ? (
                              <>
                                <div className='w-full rounded border border-dashed border-gray-200 p-2 flex flex-col items-center justify-start hover:bg-gray-100/40 transition-colors'>
                                  {lesson.files.map((fileName, index) => (
                                    <div
                                      key={index}
                                      className='p-1 flex items-center w-full border-b border-gray-200 last:border-0'
                                    >
                                      <span className='text-sm w-[98%]'>{fileName}</span>
                                      <span
                                        onClick={() =>
                                          deleteLectureFile(
                                            section.position,
                                            lesson.position,
                                            fileName
                                          )
                                        }
                                        className='h-full w-fit flex items-center cursor-pointer'
                                      >
                                        <Trash className='w-4 h-4' />
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='w-full rounded border border-dashed border-gray-200 p-3 flex items-center justify-center cursor-pointer hover:bg-gray-100/40 transition-colors'>
                                  <label
                                    htmlFor='lessonfile'
                                    className='flex items-center justify-center gap-2 text-sm w-full cursor-pointer'
                                  >
                                    <Upload className='w-3 h-3' /> Attach File
                                  </label>
                                  <input
                                    onChange={e =>
                                      handleFileSelect(e, section.position, lesson.position)
                                    }
                                    id='lessonfile'
                                    multiple={true}
                                    type='file'
                                    accept='.pdf,.doc,.docx,.ppt,.pptx'
                                    className='hidden'
                                  />
                                </div>
                              </>
                            )}
                            <div className='mt-2'>
                              <span className='text-sm text-gray-600 mb-1'>Article Content:</span>
                              <textarea
                                onChange={e =>
                                  handleTextValueChange(
                                    section.position,
                                    lesson.position,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className='w-full p-2 border border-dashed border-gray-200 rounded resize-none focus:outline-none focus:border-orange'
                                placeholder='Add article content here...'
                                rows={8}
                              ></textarea>
                            </div>
                          </div>
                        )}
                        {lesson.type === "QUIZ" && (
                          <div className='bg-gray-100/20 w-full h-full p-4 rounded'>
                            <span className='text-gray-600'>Quiz content goes here...</span>
                          </div>
                        )}
                        {lesson.type === "ASSIGNMENT" && (
                          <div className='bg-gray-100/20 w-full h-full p-4 rounded'>
                            <span className='text-gray-600'>Assignment content goes here...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Sections Button */}
        <button
          type='button'
          onClick={addSection}
          className='w-full py-2 bg-orange-50 text-orange-500 rounded font-medium hover:bg-orange-100 transition-colors mt-4 cursor-pointer'
        >
          Add Sections
        </button>

        {/* Footer Actions */}
        <div className='p-6'>
          <CourseFooter
            handlePrevious={handlePrevious}
            isSubmitting={isSubmitting}
            currentStep={currentStep}
          />
        </div>
      </form>

      {(() => {
        switch (openModal.type) {
          case "sectionName":
            return loadModalComponent("sectionName");
          case "lectureName":
            return loadModalComponent("lectureName");
          case "videoUpload":
            return loadModalComponent("videoUpload");
          case "fileUpload":
            return loadModalComponent("fileUpload");
          case "caption":
            return loadModalComponent("caption");
          case "description":
            return loadModalComponent("description");
          case "notes":
            return loadModalComponent("notes");
          default:
            return null;
        }
      })()}
    </div>
  );
}
