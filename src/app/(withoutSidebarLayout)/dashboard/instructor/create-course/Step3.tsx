import { ChevronDown, ChevronUp, Menu, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CourseModal from "./CourseModal.tsx";
import StepHeader from "./StepHeader.tsx";

export default function Step3({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
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
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Section name",
      lectures: [
        { id: 1, name: "Lecture name", expanded: false },
        { id: 2, name: "Lecture name", expanded: false },
      ],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length + 1,
        name: "Section name",
        lectures: [],
      },
    ]);
  };

  const addLecture = (sectionId: number) => {
    setSections(
      sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: [
              ...section.lectures,
              {
                id: section.lectures.length + 1,
                name: "Lecture name",
                expanded: false,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const toggleLecture = (sectionId: number, lectureId: number) => {
    setSections(
      sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.map(lecture => {
              if (lecture.id === lectureId) {
                return { ...lecture, expanded: !lecture.expanded };
              }
              return lecture;
            }),
          };
        }
        return section;
      })
    );
  };

  const deleteSection = (sectionId: number) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const deleteLecture = (sectionId: number, lectureId: number) => {
    setSections(
      sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.filter(lecture => lecture.id !== lectureId),
          };
        }
        return section;
      })
    );
  };

  const handleSave = () => {
    alert("Curriculum saved!");
  };

  const handleSaveAndPreview = () => {
    alert("Saved! Opening preview...");
  };

  const handleSaveAndNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
      <StepHeader
        headingText='Course Curriculum'
        handleSave={handleSave}
        handleSaveAndPreview={handleSaveAndPreview}
      />
      {/* Form Content */}
      <div className='p-6'>
        {/* Sections */}
        <div className='space-y-4'>
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
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
                    Sections 0{sectionIndex + 1} :
                  </span>
                  <span className='text-gray-800 text-sm'>{section.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => addLecture(section.id)}
                    className='p-1.5 hover:bg-gray-200 rounded transition-colors'
                  >
                    <Plus
                      size={18}
                      className='text-gray-600'
                    />
                  </button>
                  <button
                    onClick={() => setOpeModal({ type: "sectionName", sectionId: section.id })}
                    className='p-1.5 hover:bg-gray-200 rounded transition-colors'
                  >
                    <Pencil
                      size={18}
                      className='text-gray-600'
                    />
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
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
                {section.lectures.map(lecture => (
                  <div
                    key={lecture.id}
                    className='relative'
                  >
                    <div className='flex items-center justify-between px-4 py-2 bg-white'>
                      <div className='flex items-center gap-3'>
                        <Menu
                          size={16}
                          className='text-gray-500'
                        />
                        <span className='text-gray-800 text-sm'>{lecture.name}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => toggleLecture(section.id, lecture.id)}
                          className='flex items-center gap-2 px-2 py-1.5 bg-orange-50 text-orange-500 rounded text-sm hover:bg-orange-100 transition-colors'
                        >
                          Contents
                          {lecture.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <button className='p-1.5 hover:bg-gray-100 rounded transition-colors'>
                          <Pencil
                            size={16}
                            className='text-gray-500'
                          />
                        </button>
                        <button
                          onClick={() => deleteLecture(section.id, lecture.id)}
                          className='p-1.5 hover:bg-gray-100 rounded transition-colors'
                        >
                          <Trash2
                            size={16}
                            className='text-gray-500'
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content Menu */}
                    {lecture.expanded && (
                      <div className='bg-white rounded w-[20%] z-100 absolute right-[10%] p-2'>
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Sections Button */}
        <button
          onClick={addSection}
          className='w-full py-2 bg-orange-50 text-orange-500 rounded font-medium hover:bg-orange-100 transition-colors mt-4 cursor-pointer'
        >
          Add Sections
        </button>

        {/* Footer Actions */}
        <div className='flex items-center justify-between pt-6 mt-4 border-t border-gray-200'>
          <button
            onClick={handlePrevious}
            className='px-4 py-1.5 text-gray-800 font-medium hover:bg-gray-100 transition-colors bg-gray-50 rounded cursor-pointer'
          >
            Previous
          </button>
          <button
            onClick={handleSaveAndNext}
            className='px-4 py-1.5 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 transition-colors cursor-pointer'
          >
            Save & Next
          </button>
        </div>
      </div>

      {(() => {
        switch (openModal.type) {
          case "sectionName":
            return loadModalComponent("sectionName");
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
