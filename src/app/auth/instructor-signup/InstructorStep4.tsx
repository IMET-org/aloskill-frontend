import { Plus, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import InstructorRegistrationFooterAction from "./InstructorRegistrationFooterAction.tsx";
import type { FormData } from "./page.tsx";

type Inputs = {
  bio: string;
  website: string;
  terms: boolean;
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
  } = useForm<Inputs>();
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [error, setError] = useState<{ skillError: string, socialError: string }>({ skillError: '', socialError: '' });
  const [currentSocial, setCurrentSocial] = useState<{ platform: string, url: string }>({ platform: '', url: '' });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (instructorData.skills.length === 0) {
      setError({ ...error, skillError: 'Atleast one skill is required' });
    }
    if (instructorData.socialAccounts.length === 0) {
      setError({ ...error, socialError: 'Atleast one social media account is required' });
    }
    setInstructorData({
      ...instructorData,
      bio: data.bio,
      website: data.website,
    });

    console.log("Instructor Data : ", instructorData);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddSkill = () => {
    if (currentSkill.trim().length <= 3) {
      setError({ ...error, skillError: 'Skill must be at least 4 characters long.' });
      return;
    }
    if (!instructorData.skills.includes(currentSkill.trim().toUpperCase())) {
      setInstructorData(prevData => ({
        ...prevData,
        skills: [...prevData.skills, currentSkill.trim().toUpperCase()],
      }));
      setCurrentSkill("");
      setError({ skillError: '', socialError: '' });
    } else {
      setError({ ...error, skillError: 'This skill already exists.' });
    }
  };

  const removeSkill = (index: number) => {
    setInstructorData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleAddSocial = () => {
    if (currentSocial.platform === "" || currentSocial.url === "") {
      setError({ ...error, socialError: 'Please fill both fields' });
      return;
    }
    if (!instructorData.socialAccounts.some(account => account.platform === currentSocial.platform)) {
      setInstructorData(prevData => ({
        ...prevData,
        socialAccounts: [...prevData.socialAccounts, currentSocial]
      }))
      setCurrentSocial({ platform: "", url: "" });
      setError({ skillError: '', socialError: '' });
    } else {
      setError({ ...error, socialError: 'This social media account already exists.' })
    }
  }

  const removeSocialAccount = (index: number) => {
    setInstructorData(prevData => ({
      ...prevData,
      socialAccounts: prevData.socialAccounts.filter((_, i) => i !== index)
    }))
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
          <div className="md:col-span-2">
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Tell us about yourself *</span>
            </label>
            <textarea
              {...register("bio", {
                required: "Tell us about yourself",
                pattern: {
                  value: /^[a-zA-Z0-9!@#%&*()_=;':",. -]*$/g,
                  message: "Invalid characters found in the input.",
                },
                minLength: 10,
                maxLength: 400,
              })}
              rows={3}
              defaultValue={instructorData.bio}
              placeholder='Tell us about yourself, your teaching philosophy, and what makes you unique...'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.bio ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.bio && <span className='text-xs text-red-500 mt-1'>{errors.bio.message}</span>}
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Skills *</span>
            </label>
            <div className='flex gap-2 mb-2'>
              <input
                type='text'
                value={currentSkill}
                onChange={e => setCurrentSkill(e.target.value)}
                className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${error.skillError ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                placeholder='e.g., Python, TensorFlow'
              />
              <button
                type='button'
                onClick={handleAddSkill}
                className='px-3 py-1.5 bg-orange text-white rounded hover:bg-orange-light transition flex items-center gap-2 cursor-pointer text-sm'
              >
                <Plus className='w-4 h-4' />
                Add
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {instructorData.skills.map((skill, index) => (
                <span
                  key={index}
                  className='p-2 bg-orange text-white rounded text-xs flex items-center gap-2'
                >
                  {skill}
                  <button
                    type='button'
                    onClick={() => removeSkill(index)}
                    className='hover:text-gray-400 transition duration-200 cursor-pointer'
                  >
                    <Trash2 className='w-3 h-3' />
                  </button>
                </span>
              ))}
            </div>
            {error.skillError && (
              <span className='text-xs text-red-500'>{error.skillError}</span>
            )}
          </div>

          {/* Social Accounts */}
          <div className="md:col-span-2">
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Social Accounts *</span>
            </label>
            <div className='flex gap-2 mb-2'>
              <select
                value={currentSocial.platform}
                onChange={e => setCurrentSocial(prev => ({ ...prev, platform: e.target.value }))}
                className='flex-1 px-3 py-2 text-sm rounded border border-gray-200 focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition'
              >
                <option value="">Select Platform</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
              </select>
              <input
                type='url'
                value={currentSocial.url}
                onChange={e => setCurrentSocial(prev => ({ ...prev, url: e.target.value }))}
                className='flex-1 px-3 py-2 text-sm rounded border border-gray-200 focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition'
                placeholder='Profile URL'
              />
              <button
                type='button'
                onClick={handleAddSocial}
                className='px-3 py-1.5 bg-orange text-white rounded hover:bg-orange-light transition flex items-center gap-2 cursor-pointer text-sm'
              >
                <Plus className='w-4 h-4' />
                Add
              </button>
            </div>
            <div className='space-y-1'>
              {instructorData.socialAccounts.map((account, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between px-2 py-1.5 bg-orange text-white rounded text-sm'
                >
                  <div>
                    <span className='font-semibold'>{account.platform} : </span>
                    <span className='ml-2'>{account.url}</span>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeSocialAccount(index)}
                    className='hover:text-gray-400 transition duration-200 cursor-pointer'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>
            {error.socialError && (
              <span className='text-xs text-red-500'>{error.socialError}</span>
            )}
          </div>

          {/* Website */}
          <div className="md:col-span-2">
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Website</span>
            </label>
            <input
              {...register("website")}
              type="url"
              defaultValue={instructorData.website}
              placeholder="https://yourwebsite.com"
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.website ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.website && (
              <span className='text-xs text-red-500 mt-1'>{errors.website.message}</span>
            )}
          </div>

          {/* Terms and Condition */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Terms and Conditions</span>
            </label>
            <div className="flex items-center justify-start gap-2 text-sm mt-2">
              <input
                {...register('terms', { required: "You must agree to our terms and conditions." })}
                type="checkbox"
                className="w-4 h-4 accent-orange"
              />
              <span>Terms and Conditions</span>
            </div>
            {errors.terms && (
              <span className='text-xs text-red-500 mt-1'>{errors.terms.message}</span>
            )}
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
