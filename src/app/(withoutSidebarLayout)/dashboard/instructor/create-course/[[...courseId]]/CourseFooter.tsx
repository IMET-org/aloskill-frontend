"use client";

import { Loader2 } from "lucide-react";
import React from 'react';

const CourseFooter = ({
  handleCancel,
  isSubmitting,
  currentStep,
  handlePrevious,
  setDataSaveMode,
}: {
  handleCancel?: () => void;
  isSubmitting: boolean;
  currentStep: number;
  handlePrevious?: () => void;
  setDataSaveMode?: React.Dispatch<React.SetStateAction<"draft" | "publish">>;
}) => {
  return (
    <div className='w-full flex items-center justify-between'>
      {currentStep > 1 ? (
        <button
          onClick={handlePrevious}
          className='px-4 py-1.5 text-gray-700 rounded bg-gray-100 font-medium hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer'
        >
          Previous
        </button>
      ) : (
        <button
          onClick={handleCancel}
          className='px-4 py-1.5 text-gray-700 rounded bg-gray-100 font-medium hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer'
        >
          Cancel
        </button>
      )}
      <div>
        {currentStep === 4 ? (
          <div className='w-fit flex items-center gap-3'>
            <button
              type='submit'
              onClick={() => setDataSaveMode && setDataSaveMode("draft")}
              className='px-4 py-1.5 bg-orange text-white rounded font-medium hover:bg-orange-light transition-colors cursor-pointer'
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Saving...
                </span>
              ) : (
                "Draft Save"
              )}
            </button>
            <button
              type='submit'
              onClick={() => setDataSaveMode && setDataSaveMode("publish")}
              className='px-4 py-1.5 bg-orange text-white rounded font-medium hover:bg-orange-light transition-colors cursor-pointer'
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Submitting...
                </span>
              ) : (
                "Submit for Review"
              )}
            </button>
          </div>
        ) : (
          <button
            type='submit'
            className='px-4 py-1.5 bg-orange text-white rounded font-medium hover:bg-orange-light transition-colors cursor-pointer'
          >
            {isSubmitting ? (
              <span className='flex items-center justify-center gap-2'>
                <Loader2 className='w-5 h-5 animate-spin' />
                Saving...
              </span>
            ) : (
              "Save and Next"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseFooter;
