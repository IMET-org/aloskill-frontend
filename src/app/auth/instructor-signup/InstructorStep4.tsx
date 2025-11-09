import { Plus, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import InstructorRegistrationFooterAction from "./InstructorRegistrationFooterAction.tsx";
import type { FormData } from "./page.tsx";

type Inputs = {
  bio: string;
  website: string;
  socialAccounts: { platform: string; url: string }[];
};

const InstructorStep4 = ({
  currentStep,
  setCurrentStep,
  instructorData,
  setInstructorData,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  instructorData: FormData;
  setInstructorData: Dispatch<SetStateAction<FormData>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      socialAccounts: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
    setInstructorData({
      ...instructorData,
      ...data,
    });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const [currentSocial, setCurrentSocial] = useState({ platform: "", url: "" });
  const { fields, append, remove } = useFieldArray<Inputs, "socialAccounts", "id">({
    control,
    name: "socialAccounts",
  });
  const handleAddSocial = () => {
    if (currentSocial.platform && currentSocial.url) {
      append(currentSocial);
      setCurrentSocial({ platform: "", url: "" });
    }
  };

  return (
    <div className='space-y-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <h2 className='mb-4'>Additional Information</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {/* Tell us about yourself */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Tell us about yourself *</span>
            </label>
            <input
              {...register("bio", {
                required: "Tell us about yourself",
                maxLength: 400,
              })}
              type='text'
              defaultValue={instructorData.bio}
              placeholder='Tell us about yourself, your teaching philosophy, and what makes you unique...'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.bio ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.bio && <span className='text-xs text-red-500 mt-1'>{errors.bio.message}</span>}
          </div>
          {/* Website */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Website</span>
            </label>
            <input
              {...register("website")}
              type='url'
              defaultValue={instructorData.website}
              placeholder='https://yourwebsite.com'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.website ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.website && (
              <span className='text-xs text-red-500 mt-1'>{errors.website.message}</span>
            )}
          </div>

          {/* Social Accounts */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Social Accounts
            </label>

            {/* Inputs for adding a new one */}
            <div className='flex gap-2 mb-3'>
              <input
                type='text'
                value={currentSocial.platform}
                onChange={e =>
                  setCurrentSocial(prev => ({
                    ...prev,
                    platform: e.target.value,
                  }))
                }
                className='flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                placeholder='Platform (e.g., LinkedIn)'
              />
              <input
                type='url'
                value={currentSocial.url}
                onChange={e =>
                  setCurrentSocial(prev => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
                className='flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                placeholder='Profile URL'
              />
              <button
                type='button'
                onClick={handleAddSocial}
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2'
              >
                <Plus className='w-4 h-4' />
                Add
              </button>
            </div>

            {/* --- Display Added Accounts --- */}
            <div className='space-y-2'>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className='flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2'
                >
                  <div className='flex flex-col sm:flex-row gap-2 w-full'>
                    <div className='flex-1'>
                      <input
                        {...register(`socialAccounts.${index}.platform` as const, {
                          required: "Platform is required",
                        })}
                        defaultValue={field.platform}
                        className='w-full font-medium text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500'
                        placeholder='Platform name'
                      />
                      {errors.socialAccounts?.[index]?.platform && (
                        <p className='text-red-600 text-sm mt-1'>
                          {errors.socialAccounts[index]?.platform?.message}
                        </p>
                      )}
                    </div>

                    <div className='flex-1'>
                      <input
                        {...register(`socialAccounts.${index}.url` as const, {
                          required: "URL is required",
                          pattern: {
                            value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                            message: "Enter a valid URL",
                          },
                        })}
                        defaultValue={field.url}
                        className='w-full text-gray-600 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500'
                        placeholder='Profile URL'
                      />
                      {errors.socialAccounts?.[index]?.url && (
                        <p className='text-red-600 text-sm mt-1'>
                          {errors.socialAccounts[index]?.url?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='text-red-600 hover:text-red-700 self-start sm:self-auto'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer Actions */}
        <InstructorRegistrationFooterAction
          handlePrevious={handlePrevious}
          isSubmitting={isSubmitting}
          currentStep={currentStep}
        />
      </form>
    </div>
  );
};

export default InstructorStep4;
