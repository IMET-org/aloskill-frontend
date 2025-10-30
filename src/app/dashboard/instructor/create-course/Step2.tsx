/* eslint-disable jsx-a11y/alt-text */
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Play,
  Plus,
  Underline,
  Upload,
  Image,
} from "lucide-react";
import { useState } from "react";
import StepHeader from "./StepHeader.tsx";

function Step2({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    subCategory: "",
    topic: "",
    language: "",
    subtitleLanguage: "",
    level: "",
    duration: "",
    durationType: "Day",
    thumbnail: null,
    trailer: null,
    description: "",
    whatYouTeach: ["", "", "", ""],
    targetAudience: ["", "", "", ""],
    requirements: ["", "", "", ""],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof formData] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addNewItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof formData] as string[]), ""],
    }));
  };

  const handleSave = () => {
    alert("Form saved!");
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

  return (
    <div className='w-full bg-white'>
      {/* Header */}
      <StepHeader
        headingText='Advance Information'
        handleSave={handleSave}
        handleSaveAndPreview={handleSaveAndPreview}
      />
      {/* Form Content */}
      <div>
        {/* Course Thumbnail and Trailer */}
        <div className='p-6 flex items-center gap-4 w-full h-[220px] border-b border-gray-200'>
          {/* Course Thumbnail */}
          <div className='w-full flex flex-col gap-3 h-full'>
            <h4 className='font-semibold text-gray-900'>Course Thumbnail</h4>
            <div className='flex items-center gap-2 h-full'>
              <div className='w-[35%] h-full p-4 rounded bg-gray-100 flex items-center justify-center'>
                <Image
                  size={90}
                  strokeWidth={1}
                  className='text-gray-500'
                />
              </div>
              <div className='flex-1 h-full flex flex-col items-start justify-between'>
                <p className='text-sm text-gray-600'>
                  Upload your course Thumbnail here.{" "}
                  <span className='font-semibold'>Important</span>
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>guidelines:</span> 1200x800 pixels or 12:8 Ratio.
                  Supported format: <span className='font-semibold'>.jpg, .jpeg, or .png</span>
                </p>
                <button className='flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange rounded font-medium hover:bg-orange-100 transition-colors'>
                  <Upload size={16} />
                  Upload Image
                </button>
              </div>
            </div>
          </div>

          {/* Course Trailer */}
          <div className='w-full flex flex-col gap-3 h-full'>
            <h4 className='font-semibold text-gray-900'>Course Trailer</h4>
            <div className='flex items-center gap-2 h-full'>
              <div className='w-[35%] h-full p-4 rounded bg-gray-100 flex items-center justify-center'>
                <Play
                  size={90}
                  strokeWidth={1}
                  className='text-gray-500'
                />
              </div>
              <div className='flex-1'>
                <p className='text-sm text-gray-600 mb-3'>
                  Students who watch a well-made promo video are 5X more likely to enroll in your
                  course. We&apos;ve seen that statistic go up to 10X for exceptionally awesome
                  videos.
                </p>
                <button className='flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange rounded font-medium hover:bg-orange-100 transition-colors'>
                  <Upload size={16} />
                  Upload Video
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Descriptions */}
        <div className='p-6 border-b border-gray-200'>
          <h4 className='font-semibold text-gray-900 mb-4'>Course Descriptions</h4>
          <div className='border border-gray-200 rounded'>
            <textarea
              placeholder='Enter you course descriptions'
              value={formData.description}
              onChange={e => handleInputChange("description", e.target.value)}
              rows={4}
              className='w-full px-4 py-2 rounded-t focus:outline-none resize-none text-sm'
            />
            <div className='border-t border-gray-200 px-4 bg-gray-50 flex items-center gap-2 rounded-b'>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <Bold
                  size={18}
                  className='text-gray-600'
                />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <Italic
                  size={18}
                  className='text-gray-600'
                />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <Underline
                  size={18}
                  className='text-gray-600'
                />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <span className='text-gray-600 font-bold'>S</span>
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <Link
                  size={18}
                  className='text-gray-600'
                />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <List
                  size={18}
                  className='text-gray-600'
                />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition-colors'>
                <ListOrdered
                  size={18}
                  className='text-gray-600'
                />
              </button>
            </div>
          </div>
        </div>

        {/* What you will teach */}
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='font-semibold text-gray-900'>
              What you will teach in this course (4/8)
            </h4>
            <button
              onClick={() => addNewItem("whatYouTeach")}
              className='flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange transition-colors cursor-pointer'
            >
              <Plus size={16} />
              Add new
            </button>
          </div>
          <div className='space-y-4'>
            {formData.whatYouTeach.map((item, index) => (
              <div key={index}>
                <label className='block text-xs text-gray-600 mb-1'>0{index + 1}</label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='What you will teach in this course...'
                    value={item}
                    onChange={e => handleArrayInputChange("whatYouTeach", index, e.target.value)}
                    maxLength={120}
                    className='w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm'
                  />
                  <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400'>
                    {item.length}/120
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='font-semibold text-gray-900'>Target Audience (4/8)</h4>
            <button
              onClick={() => addNewItem("targetAudience")}
              className='flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange transition-colors cursor-pointer'
            >
              <Plus size={16} />
              Add new
            </button>
          </div>
          <div className='space-y-4'>
            {formData.targetAudience.map((item, index) => (
              <div key={index}>
                <label className='block text-xs text-gray-600 mb-1'>0{index + 1}</label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Who this course is for...'
                    value={item}
                    onChange={e => handleArrayInputChange("targetAudience", index, e.target.value)}
                    maxLength={120}
                    className='w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm'
                  />
                  <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400'>
                    {item.length}/120
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course requirements */}
        <div className='p-6 pb-0'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='font-semibold text-gray-900'>Course requirements (4/8)</h4>
            <button
              onClick={() => addNewItem("requirements")}
              className='flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange transition-colors cursor-pointer'
            >
              <Plus size={16} />
              Add new
            </button>
          </div>
          <div className='space-y-4'>
            {formData.requirements.map((item, index) => (
              <div key={index}>
                <label className='block text-xs text-gray-600 mb-1'>0{index + 1}</label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='What is you course requirements...'
                    value={item}
                    onChange={e => handleArrayInputChange("requirements", index, e.target.value)}
                    maxLength={120}
                    className='w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm'
                  />
                  <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400'>
                    {item.length}/120
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className='p-6 flex items-center justify-between'>
          <button
            onClick={handlePrevious}
            className='px-4 py-1.5 text-gray-700 font-medium hover:bg-gray-100 bg-gray-50 rounded transition-colors cursor-pointer'
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
    </div>
  );
}

export default Step2;
