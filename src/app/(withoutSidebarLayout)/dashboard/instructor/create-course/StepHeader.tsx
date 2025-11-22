import React from "react";

const StepHeader = ({
  headingText,
  handleSave,
  handleSaveAndPreview,
}: {
  headingText: string;
  handleSave: () => void;
  handleSaveAndPreview: () => void;
}) => {
  return (
    <div className='flex items-center justify-between border-b p-4 border-gray-200'>
      <h2 className='font-semibold text-gray-900'>{headingText}</h2>
      <div className='flex items-center gap-3'>
        <button
          onClick={handleSave}
          className='px-4 py-1 border border-orange-light text-orange-500 rounded font-medium hover:bg-orange-50 transition-colors cursor-pointer'
        >
          Save
        </button>
        <button
          onClick={handleSaveAndPreview}
          className='px-4 py-1 bg-orange text-white rounded font-medium hover:bg-orange-600 transition-colors cursor-pointer'
        >
          Save & Preview
        </button>
      </div>
    </div>
  );
};

export default StepHeader;
