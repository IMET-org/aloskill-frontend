import { Plus, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import InstructorRegistrationFooterAction from "./InstructorRegistrationFooterAction.tsx";
import type { FormData } from "./page.tsx";
import { apiClient } from "@/lib/api/client.ts";
import type { InstructorResponse } from "@/lib/api/auth.service.ts";
import { useRouter } from "next/navigation";
import Toast from "@/components/toast/successToast.tsx";

type Inputs = {
  bio: string;
  website: string;
  terms: boolean;
  demoVideo: string;
};

const InstructorStep4 = ({
  currentStep,
  setCurrentStep,
  instructorData,
  setInstructorData,
  setApiResponse
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  instructorData: FormData;
  setInstructorData: Dispatch<SetStateAction<FormData>>;
  setApiResponse: Dispatch<SetStateAction<{status: "" |"Success" | "Error", message: string}>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [error, setError] = useState<{ skillError: string, socialError: string }>({ skillError: '', socialError: '' });
  const [currentSocial, setCurrentSocial] = useState<{ platform: string, url: string }>({ platform: '', url: '' });
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Router for redirecting after successful submission
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (instructorData.skills.length === 0) {
      setError({ ...error, skillError: 'Atleast one skill is required' });
    }
    if (instructorData.socialAccount.length === 0) {
      setError({ ...error, socialError: 'Atleast one social media account is required' });
    }
    setInstructorData({
      ...instructorData,
      bio: data.bio,
      website: data.website,
      demoVideo: data.demoVideo,
    });

    const response = await apiClient.post<InstructorResponse>('/auth/register-instructor', {
      ...instructorData,
      bio: data.bio,
      website: data.website,
      demoVideo: data.demoVideo ? data.demoVideo : undefined,
    });

    if (!response.success) {
      setApiResponse({ status: "Error", message: response.message ?? "Something went wrong" });
      setToast({ message: "Error During Submission", type: "error" });
    } else {
      setApiResponse({ status: "Success", message: response.message ?? "Application Submitted Successfully" });
      setToast({ message: "sent a verification !", type: "success" });

      if (response?.data?.redirectToVerificationPage) {
        router.push("/auth/verification-sent");
      } else {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
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
    if (!instructorData.socialAccount.some(account => account.platform === currentSocial.platform)) {
      setInstructorData(prevData => ({
        ...prevData,
        socialAccount: [...prevData.socialAccount, currentSocial]
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
      socialAccount: prevData.socialAccount.filter((_, i) => i !== index)
    }))
  };

  const validateUrlFormat = (value:string) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch (_e) {
      return "Please enter a valid URL, including http:// or https://.";
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

          {/* Course Demo Video */}
          <div className="md:col-span-2">
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Course Demo Video Link </span>
            </label>
            <input
              {...register("demoVideo", {
                validate: validateUrlFormat,
              })}
              type="url"
              defaultValue={instructorData.demoVideo}
              placeholder='Course demo video link'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.demoVideo ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.demoVideo && <span className='text-xs text-red-500 mt-1'>{errors.demoVideo.message}</span>}
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
                <option value="FACEBOOK">Facebook</option>
                <option value="TWITTER">Twitter</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="INSTAGRAM">Instagram</option>
                <option value="YOUTUBE">YouTube</option>
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
              {instructorData.socialAccount.map((account, index) => (
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
              {...register("website", {
                validate: validateUrlFormat
              })}
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

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </form>
    </div>
  );
};

export default InstructorStep4;
