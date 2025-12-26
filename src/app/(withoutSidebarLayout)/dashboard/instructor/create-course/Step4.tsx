import { Search, Users, X } from "lucide-react";
import StepHeader from "./StepHeader.tsx";

const Step4 = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  const handleSubmit = () => {
    alert("Course Submitted for review!");
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    alert("Curriculum saved!");
  };

  const handleSaveAndPreview = () => {
    alert("Saved! Opening preview...");
  };
  return (
    <div className='w-full bg-white'>
      <StepHeader
        headingText='Publish Course'
        handleSave={handleSave}
        handleSaveAndPreview={handleSaveAndPreview}
      />
      <div className='p-6'>
        <div className='space-y-4'>
          <h5 className='font-medium text-gray-800'>Message</h5>
          {/* Add Message here */}
          <div className='flex items-center gap-4'>
            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Welcome Message
              </label>
              <textarea
                rows={4}
                cols={50}
                maxLength={200}
                placeholder='Enter Course Starting Message here...'
                className='w-full px-3 py-1.5 border border-gray-200 text-sm rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm resize-none'
              />
            </div>
            <div className='w-full'>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Congratulations Message
              </label>
              <textarea
                rows={4}
                cols={50}
                maxLength={200}
                placeholder='Enter Your Course Complete Message here...'
                className='w-full px-3 py-1.5 border border-gray-200 text-sm rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm resize-none'
              />
            </div>
          </div>
          {/* Add Instructor here */}
          <div className='space-y-4 w-full'>
            <h5 className='font-medium text-gray-800'>Add Instructors</h5>
            <div className='flex flex-col gap-4 items-start'>
              <div className='relative rounded w-full'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search...'
                  className='w-1/2 pl-10 pr-4 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light'
                />
              </div>
              <div className='w-full h-auto flex items-center gap-2'>
                {/* Instructor List Here */}
                <div className='w-1/4 flex items-center justify-between p-2 bg-gray-100'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center`}
                    >
                      <Users className={`w-6 h-6 text-orange-500`} />
                    </div>
                    <div>
                      <div className='text-sm text-gray-800 mb-1'>UserName</div>
                      <div className='text-xs text-gray-500'>UI/UX designer</div>
                    </div>
                  </div>
                  <X
                    size={20}
                    className='text-gray-600 cursor-pointer'
                  />
                </div>

                <div className='w-1/4 flex items-center justify-between p-2 bg-gray-100'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center`}
                    >
                      <Users className={`w-6 h-6 text-orange-500`} />
                    </div>
                    <div>
                      <div className='text-sm text-gray-800 mb-1'>UserName</div>
                      <div className='text-xs text-gray-500'>UI/UX designer</div>
                    </div>
                  </div>
                  <X
                    size={20}
                    className='text-gray-600 cursor-pointer'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-between pt-4'>
            <button
              onClick={handlePrevious}
              className='px-4 py-1.5 text-gray-800 font-medium hover:bg-gray-100 transition-colors bg-gray-50 rounded cursor-pointer'
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className='px-4 py-1.5 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 transition-colors cursor-pointer'
            >
              Submit For Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
