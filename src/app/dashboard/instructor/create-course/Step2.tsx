/* eslint-disable jsx-a11y/alt-text */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image,
  Play,
  Plus,
  Trash,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import CourseFooter from "./CourseFooter.tsx";
import { type CreateCourseData } from "./page.tsx";
import StepHeader from "./StepHeader.tsx";

type CourseDescriptionForm = {
  description: string;
  whatYouTeach: string[];
  targetAudience: string[];
  requirements: string[];
};

const CourseDescriptionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters long')
    .regex(/^[^<>]*$/, 'Description must not contain any opening or closing HTML tags'),
  whatYouTeach: z
    .array(z.string()
      .trim()
      .min(10, 'Must be at least 10 characters long.')
      .max(120, 'Cannot exceed 120 characters.'),)
    .min(1, 'You must define at least one teaching objective.')
    .max(5, 'You can define a maximum of 5 teaching objectives.'),
  targetAudience: z
    .array(z.string()
      .trim()
      .min(10, 'Must be at least 10 characters long.')
      .max(120, 'Cannot exceed 120 characters.'),)
    .min(1, 'You must define at least one teaching objective.')
    .max(5, 'You can define a maximum of 5 teaching objectives.'),
  requirements: z
    .array(z.string()
      .trim()
      .min(10, 'Must be at least 10 characters long.')
      .max(120, 'Cannot exceed 120 characters.'),)
    .min(1, 'You must define at least one requirement.')
    .max(5, 'You can define a maximum of 5 requirements.'),
});

function Step2({
  currentStep,
  setCurrentStep,
  courseData,
  setCourseData,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  courseData: CreateCourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CreateCourseData>>;
}) {
  const courseDescriptionParsed: {description:string, whatYouTeach:string[], targetAudience:string[], requirements:string[]} = (() => {
    try {
      const parsedData = JSON.parse(courseData.description || '{}');
      return {
        description: parsedData.description || '',
        whatYouTeach: parsedData.whatYouTeach ? parsedData.whatYouTeach.split("||") : [""],
        targetAudience: parsedData.targetAudience ? parsedData.targetAudience.split("||") : [""],
        requirements: parsedData.requirements ? parsedData.requirements.split("||") : [""],
      };
    } catch {
      return {
        description: '',
        whatYouTeach: [""],
        targetAudience: [""],
        requirements: [""],
      };
    }
  })();
  const [whatYouTeach, setWhatYouTeach] = useState<string[]>(courseDescriptionParsed.whatYouTeach|| [""]);
  const [targetAudience, setTargetAudience] = useState<string[]>(courseDescriptionParsed.targetAudience|| [""]);
  const [requirements, setRequirements] = useState<string[]>(courseDescriptionParsed.requirements|| [""]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseDescriptionForm>({ resolver: zodResolver(CourseDescriptionSchema) });

  const onSubmit = (data: CourseDescriptionForm) => {
    const { description, whatYouTeach, targetAudience, requirements } = data;
    setCourseData(prev => ({
      ...prev,
      description: JSON.stringify({description, whatYouTeach: whatYouTeach.join("||"), targetAudience: targetAudience.join("||"), requirements: requirements.join("||")}),
    }));
    setCurrentStep(currentStep + 1);
  };

  const addNewItem = (field: string) => {
    if (field === "whatYouTeach") {
      if(whatYouTeach.length >=5) return;
      setWhatYouTeach(prev => [...prev, ""]);
    }
    if (field === "targetAudience") {
      if(targetAudience.length >=5) return;
      setTargetAudience(prev => [...prev, ""]);
    }
    if (field === "requirements") {
      if(requirements.length >=5) return;
      setRequirements(prev => [...prev, ""]);
    }
  };

  const deleteItem = (field: string, index: number) => {
    if (field === "whatYouTeach") {
      const updatedArray = [...whatYouTeach];
      updatedArray.splice(index, 1);
      setWhatYouTeach(updatedArray);
    }
    if (field === "targetAudience") {
      const updatedArray = [...targetAudience];
      updatedArray.splice(index, 1);
      setTargetAudience(updatedArray);
    }
    if (field === "requirements") {
      const updatedArray = [...requirements];
      updatedArray.splice(index, 1);
      setRequirements(updatedArray);
    }
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    if (field === "whatYouTeach") {
      const updatedArray = [...whatYouTeach];
      updatedArray[index] = value;
      setWhatYouTeach(updatedArray);
    }
    if (field === "targetAudience") {
      const updatedArray = [...targetAudience];
      updatedArray[index] = value;
      setTargetAudience(updatedArray);
    }
    if (field === "requirements") {
      const updatedArray = [...requirements];
      updatedArray[index] = value;
      setRequirements(updatedArray);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };


  return (
    <div className='w-full bg-white'>
      {/* Header */}
      <StepHeader
        headingText='Advance Information'
      />
      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className=''>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={courseDescriptionParsed.description || ''}
                placeholder='Enter you course descriptions'
                rows={4}
                className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm resize-none ${errors.description ? "border-red-200 bg-red-50" : "border-gray-200"}`}
              />
              {errors.description && (
                <span className='text-xs! text-red-500 mt-1'>{errors.description.message}</span>
              )}
            </div>
          </div>

          {/* What you will teach */}
          <div className='p-6 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-semibold text-gray-900'>
                What you will teach in this course ({whatYouTeach.length}/5)
              </h4>
              <button
                type="button"
                onClick={() => addNewItem("whatYouTeach")}
                className='flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange transition-colors cursor-pointer'
              >
                <Plus size={16} />
                Add new
              </button>
            </div>
            <div className='space-y-4'>
              {whatYouTeach?.map((item, index) => (
                <div key={index}>
                  <div className='flex items-center justify-between mb-1'>
                    <label className='block text-xs text-gray-600'>0{index + 1}</label>
                    <span onClick={() => deleteItem("whatYouTeach", index)} className="p-2 rounded-full hover:bg-gray-50 cursor-pointer"><Trash className="w-4 h-4" /></span>
                  </div>
                  <div className='relative'>
                    <input
                      {...register(`whatYouTeach.${index}`)}
                      type='text'
                      placeholder='What you will teach in this course...'
                      defaultValue={item}
                      onChange={e => handleArrayInputChange("whatYouTeach", index, e.target.value)}
                      maxLength={120}
                      className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm resize-none ${errors.whatYouTeach?.[index] ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.whatYouTeach?.[index] && (
                      <p className="text-sm text-red-600">
                        {errors.whatYouTeach[index].message}
                      </p>
                    )}
                    <span className={`absolute right-4 ${errors.whatYouTeach?.[index] ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}>
                      {item.length}/120
                    </span>
                  </div>
                </div>
              ))}
              {errors.whatYouTeach?.message && (
                <p className="text-sm text-red-600">
                  {errors.whatYouTeach.message}
                </p>
              )}
            </div>
          </div>

          {/* Target Audience */}
          <div className='p-6 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-semibold text-gray-900'>Target Audience ({targetAudience.length}/5)</h4>
              <button
                type="button"
                onClick={() => addNewItem("targetAudience")}
                className='flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange transition-colors cursor-pointer'
              >
                <Plus size={16} />
                Add new
              </button>
            </div>
            <div className='space-y-4'>
              {targetAudience?.map((item, index) => (
                <div key={index}>
                  <div className='flex items-center justify-between mb-1'>
                    <label className='block text-xs text-gray-600'>0{index + 1}</label>
                    <span onClick={() => deleteItem("targetAudience", index)} className="p-2 rounded-full hover:bg-gray-50 cursor-pointer"><Trash className="w-4 h-4" /></span>
                  </div>
                  <div className='relative'>
                    <input
                      {...register(`targetAudience.${index}`)}
                      type='text'
                      placeholder='Who this course is for...'
                      value={item}
                      onChange={e => handleArrayInputChange("targetAudience", index, e.target.value)}
                      maxLength={120}
                      className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm resize-none ${errors.targetAudience?.[index] ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.targetAudience?.[index] && (
                      <p className="text-sm text-red-600">
                        {errors.targetAudience[index].message}
                      </p>
                    )}
                    <span className={`absolute right-4 ${errors.targetAudience?.[index] ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}>
                      {item.length}/120
                    </span>
                  </div>
                </div>
              ))}
              {errors.targetAudience?.message && (
                <p className="text-sm text-red-600">
                  {errors.targetAudience.message}
                </p>
              )}
            </div>
          </div>

          {/* Course requirements */}
          <div className='p-6 pb-0'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-semibold text-gray-900'>Course requirements ({requirements.length}/5)</h4>
              <button
                type="button"
                onClick={() => addNewItem("requirements")}
                className='flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange transition-colors cursor-pointer'
              >
                <Plus size={16} />
                Add new
              </button>
            </div>
            <div className='space-y-4'>
              {requirements?.map((item, index) => (
                <div key={index}>
                  <div className='flex items-center justify-between mb-1'>
                    <label className='block text-xs text-gray-600'>0{index + 1}</label>
                    <span onClick={() => deleteItem("requirements", index)} className="p-2 rounded-full hover:bg-gray-50 cursor-pointer"><Trash className="w-4 h-4" /></span>
                  </div>
                  <div className='relative'>
                    <input
                      {...register(`requirements.${index}`)}
                      type='text'
                      placeholder='What is you course requirements...'
                      value={item}
                      onChange={e => handleArrayInputChange("requirements", index, e.target.value)}
                      maxLength={120}
                      className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm resize-none ${errors.requirements?.[index] ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.requirements?.[index] && (
                      <p className="text-sm text-red-600">
                        {errors.requirements[index].message}
                      </p>
                    )}
                    <span className={`absolute right-4 ${errors.requirements?.[index] ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}>
                      {item.length}/120
                    </span>
                  </div>
                </div>
              ))}
              {errors.requirements?.message && (
                <p className="text-sm text-red-600">
                  {errors.requirements.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6">
            <CourseFooter
              handlePrevious={handlePrevious}
              isSubmitting={isSubmitting}
              currentStep={currentStep}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Step2;
