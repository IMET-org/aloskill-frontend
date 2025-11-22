"use client";

import React, { useState } from "react";
import StepHeader from "./StepHeader.tsx";

const Step1 = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
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
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
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

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? Unsaved changes will be lost.")) {
      setFormData({
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
      });
    }
  };

  return (
    <div className='bg-white w-full'>
      {/* Header */}
      <StepHeader
        headingText='Basic Information'
        handleSave={handleSave}
        handleSaveAndPreview={handleSaveAndPreview}
      />

      <div className='p-6 w-full flex flex-col gap-6'>
        {/* Form Fields */}
        <div className='space-y-4'>
          {/* Title */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-2'>Tittle</label>
            <div className='relative'>
              <input
                type='text'
                placeholder='You course tittle'
                value={formData.title}
                onChange={e => handleInputChange("title", e.target.value)}
                maxLength={80}
                className='w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm'
              />
              <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400'>
                {formData.title.length}/80
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-2'>Subtitle</label>
            <div className='relative'>
              <input
                type='text'
                placeholder='You course subtitle'
                value={formData.subtitle}
                onChange={e => handleInputChange("subtitle", e.target.value)}
                maxLength={120}
                className='w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm'
              />
              <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400'>
                {formData.subtitle.length}/120
              </span>
            </div>
          </div>

          {/* Category and Sub-category */}
          <div className='flex items-center gap-4'>
            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-2'>
                Course Category
              </label>
              <select
                value={formData.category}
                onChange={e => handleInputChange("category", e.target.value)}
                className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option
                  className='text-sm'
                  value=''
                >
                  Select...
                </option>
                <option value='development'>Development</option>
                <option value='business'>Business</option>
                <option value='design'>Design</option>
                <option value='marketing'>Marketing</option>
              </select>
            </div>

            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-2'>
                Course Sub-category
              </label>
              <select
                value={formData.subCategory}
                onChange={e => handleInputChange("subCategory", e.target.value)}
                className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value=''>Select...</option>
                <option value='web'>Web Development</option>
                <option value='mobile'>Mobile Development</option>
                <option value='data'>Data Science</option>
              </select>
            </div>
          </div>

          {/* Course Topic */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-2'>Course Topic</label>
            <input
              type='text'
              placeholder='What is primarily taught in your course?'
              value={formData.topic}
              onChange={e => handleInputChange("topic", e.target.value)}
              className='w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm'
            />
          </div>

          {/* Language, Subtitle Language, Level, Duration */}
          <div className='flex items-center gap-4'>
            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-2'>
                Course Language
              </label>
              <select
                value={formData.language}
                onChange={e => handleInputChange("language", e.target.value)}
                className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value=''>Select...</option>
                <option value='english'>English</option>
                <option value='spanish'>Spanish</option>
                <option value='french'>French</option>
              </select>
            </div>

            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-2'>
                Subtitle Language <span className='text-gray-400 font-normal'>(Optional)</span>
              </label>
              <select
                value={formData.subtitleLanguage}
                onChange={e => handleInputChange("subtitleLanguage", e.target.value)}
                className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value=''>Select...</option>
                <option value='english'>English</option>
                <option value='spanish'>Spanish</option>
              </select>
            </div>

            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Course Level</label>
              <select
                value={formData.level}
                onChange={e => handleInputChange("level", e.target.value)}
                className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value=''>Select...</option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
              </select>
            </div>

            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Durations</label>
              <select
                value={formData.durationType}
                onChange={e => handleInputChange("durationType", e.target.value)}
                className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  paddingRight: "2rem",
                }}
              >
                <option value='Course Durations'>Course Durations</option>
                <option value='1 Week'>1 Week</option>
                <option value='2 Week'>2 Week</option>
                <option value='3 Week'>3 Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex items-center justify-between'>
          <button
            onClick={handleCancel}
            className='px-4 py-1.5 text-gray-700 rounded bg-gray-100 font-medium hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer'
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAndNext}
            className='px-4 py-1.5 bg-orange text-white rounded font-medium hover:bg-orange-light transition-colors cursor-pointer'
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
