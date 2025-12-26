/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AlertCircle,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import React, { type Dispatch, type SetStateAction, useReducer, useState } from "react";

interface FormData {
  displayName: string;
  DOB: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  address: string;
  city: string;
  qualifications: string;
  experience: number;
  expertise: string;
  currentOrg: string;
  proposedCourse: string;
  courseLevel: string;
  courseType: string;
  courseInfo: string;
  duration: string;
  proposedPrice: string;
  teachingExperience: number;
  prevTeachingApproach: string;
  language: string;
  demoVideo: string;
  bio: string;
  skills: string[];
  website: string;
  socialAccounts: { platform: string; url: string }[];
}

interface FormContextType {
  formData: FormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  submitStatus: any;
  setSubmitStatus: (status: any) => void;
  updateField: (field: string, value: any) => void;
  addSkill: (skill: string) => boolean;
  removeSkill: (index: number) => void;
  addSocialAccount: (account: { platform: string; url: string }) => boolean;
  removeSocialAccount: (index: number) => void;
}

const initialFormState: FormData = {
  displayName: "",
  DOB: "",
  gender: "",
  nationality: "",
  phoneNumber: "",
  address: "",
  city: "",
  qualifications: "",
  experience: 0,
  expertise: "",
  currentOrg: "",
  proposedCourse: "",
  courseLevel: "",
  courseType: "",
  courseInfo: "",
  duration: "",
  proposedPrice: "",
  teachingExperience: 0,
  prevTeachingApproach: "",
  language: "",
  demoVideo: "",
  bio: "",
  skills: [],
  website: "",
  socialAccounts: [],
};

const formReducer = (state: FormData, action: any) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.skill] };
    case "REMOVE_SKILL":
      return { ...state, skills: state.skills.filter((_, i) => i !== action.index) };
    case "ADD_SOCIAL":
      return { ...state, socialAccounts: [...state.socialAccounts, action.account] };
    case "REMOVE_SOCIAL":
      return {
        ...state,
        socialAccounts: state.socialAccounts.filter((_, i) => i !== action.index),
      };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

const validationRules = {
  1: {
    displayName: { minLength: 3, message: "Display name must be at least 3 characters" },
    DOB: { required: true, message: "Date of Birth is required" },
    gender: { required: true, message: "Gender is required" },
    nationality: { minLength: 2, message: "Nationality is required" },
    phoneNumber: { minLength: 11, message: "Phone number must be at least 11 digits" },
    address: { minLength: 5, message: "Address is required" },
    city: { minLength: 2, message: "City is required" },
  },
  2: {
    qualifications: { minLength: 5, message: "Qualifications are required" },
  },
  3: {
    proposedCourse: { minLength: 5, message: "Course title is required" },
    courseLevel: { required: true, message: "Course level is required" },
    courseType: { required: true, message: "Course type is required" },
    courseInfo: { minLength: 20, message: "Detailed course information is required" },
    duration: { minLength: 5, message: "Course duration is required" },
    proposedPrice: { min: 0, required: true, message: "Valid price is required" },
    prevTeachingApproach: { required: true, message: "Teaching approach is required" },
    language: { minLength: 2, message: "Teaching language is required" },
  },
};

const validateStep = (step: number, formData: FormData) => {
  const rules = validationRules[step as keyof typeof validationRules];
  if (!rules) return {};

  const errors = { field: "" };

  Object.entries(rules).forEach(([field, rule]) => {
    const value = formData[field as keyof typeof formData];

    if ("required" in rule && rule.required && !value) {
      errors.field = rule.message;
    } else if ("minLength" in rule && rule.minLength && value.length < rule.minLength) {
      errors.field = rule.message;
    } else if (rule.min !== undefined && (value === "" || parseFloat(value) < rule.min)) {
      errors.field = rule.message;
    }
  });

  return errors;
};

const STEPS = [
  { number: 1, title: "Personal Info", icon: User },
  { number: 2, title: "Professional", icon: Briefcase },
  { number: 3, title: "Course Details", icon: BookOpen },
  { number: 4, title: "Additional", icon: Award },
];

const TOTAL_STEPS = STEPS.length;

const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className='p-4 border-b border-gray-200'>
      <div className='flex items-center justify-between'>
        {STEPS.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className='flex items-center gap-3'>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep > step.number
                    ? "bg-green-500 text-white"
                    : currentStep === step.number
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle2 className='w-4 h-4' />
                ) : (
                  <step.icon className='w-4 h-4' />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-all ${
                  currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const StatusMessage = ({ submitStatus }: { submitStatus: string }) => {
  if (!submitStatus) return null;

  return submitStatus === "success" ? (
    <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3'>
      <CheckCircle2 className='text-green-600 w-5 h-5 shrink-0' />
      <p className='text-green-800 font-medium'>Application submitted successfully!</p>
    </div>
  ) : (
    <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3'>
      <AlertCircle className='text-red-600 w-5 h-5 shrink-0' />
      <p className='text-red-800 font-medium'>Please fix the errors before proceeding</p>
    </div>
  );
};

const FormField = ({
  label,
  name,
  type = "text",
  required = false,
  error,
  placeholder,
  max,
  rows,
  children,
  formData,
  updateField,
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  max?: number | string;
  rows?: number;
  children?: React.ReactNode;
  formData: FormData;
  updateField: any;
}) => {
  const handleChange = (e: any) => {
    const value = type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    updateField(name, value);
  };

  const inputClasses = `w-full px-3 py-1.5 rounded border ${error ? "border-red-200 bg-red-50" : "border-gray-200"} focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none`;

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData.displayName}
          placeholder={placeholder}
          rows={rows}
          onChange={handleChange}
          className={inputClasses}
          {...props}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={formData.displayName}
          onChange={handleChange}
          className={inputClasses}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData.displayName}
          placeholder={placeholder}
          onChange={handleChange}
          max={max}
          className={inputClasses}
          {...props}
        />
      )}
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

const Step1PersonalInfo = ({
  errors,
  formData,
  updateField,
}: {
  errors: any;
  formData: any;
  updateField: any;
}) => {
  return (
    <div className='space-y-4'>
      <h2 className='mb-4'>Personal Information</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField
          label='Display Name'
          name='displayName'
          required
          error={errors.displayName}
          placeholder='John Doe'
          formData={formData}
          updateField={updateField}
        />

        <FormField
          label='Date of Birth'
          name='DOB'
          type='date'
          required
          error={errors.DOB}
          max={new Date().toISOString().split("T")[0]}
          formData={formData}
          updateField={updateField}
        />

        <FormField
          label='Gender'
          name='gender'
          type='select'
          required
          error={errors.gender}
          formData={formData}
          updateField={updateField}
        >
          <option value=''>Select Gender</option>
          <option value='MALE'>Male</option>
          <option value='FEMALE'>Female</option>
        </FormField>

        <FormField
          label='Nationality'
          name='nationality'
          required
          error={errors.nationality}
          formData={formData}
          placeholder='e.g., American, British'
          updateField={updateField}
        />

        <FormField
          label='Phone Number'
          name='phoneNumber'
          type='tel'
          required
          formData={formData}
          error={errors.phoneNumber}
          placeholder='+1 234 567 8900'
          updateField={updateField}
        />

        <FormField
          label='City'
          name='city'
          required
          formData={formData}
          error={errors.city}
          placeholder='New York'
          updateField={updateField}
        />

        <div className='md:col-span-2'>
          <FormField
            label='Address'
            name='address'
            type='textarea'
            required
            error={errors.address}
            formData={formData}
            rows={2}
            placeholder='123 Main Street, Apt 4B'
            updateField={updateField}
          />
        </div>
      </div>
    </div>
  );
};

const Step2Professional = () => {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Professional Background</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='md:col-span-2'>
          <FormField
            label='Qualifications'
            name='qualifications'
            type='textarea'
            required
            error={errors.qualifications}
            rows='3'
            placeholder='Ph.D. in Computer Science, MIT; M.Sc. in AI...'
          />
        </div>

        <FormField
          label='Years of Experience'
          name='experience'
          type='number'
          required
          min='0'
          max='50'
          placeholder='10'
        />

        <FormField
          label='Years of Teaching Experience'
          name='teachingExperience'
          type='number'
          min='0'
          max='50'
          placeholder='5'
        />

        <FormField
          label='Area of Expertise'
          name='expertise'
          placeholder='Machine Learning, Data Science'
        />

        <FormField
          label='Current Organization'
          name='currentOrg'
          placeholder='Tech University'
        />
      </div>
    </div>
  );
};

const Step3CourseDetails = () => {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Course Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='md:col-span-2'>
          <FormField
            label='Proposed Course Title'
            name='proposedCourse'
            required
            error={errors.proposedCourse}
            placeholder='Advanced Machine Learning Techniques'
          />
        </div>

        <FormField
          label='Course Level'
          name='courseLevel'
          type='select'
          required
          error={errors.courseLevel}
        >
          <option value=''>Select Level</option>
          <option value='BEGINNER'>Beginner</option>
          <option value='INTERMEDIATE'>Intermediate</option>
          <option value='ADVANCED'>Advanced</option>
          <option value='EXPERT'>Expert</option>
        </FormField>

        <FormField
          label='Course Type'
          name='courseType'
          type='select'
          required
          error={errors.courseType}
        >
          <option value=''>Select Type</option>
          <option value='LIVE'>Live</option>
          <option value='PRE_RECORDED'>Pre-Recorded</option>
          <option value='HYBRID'>Hybrid</option>
          <option value='SELF_STUDY'>Self-Study</option>
        </FormField>

        <FormField
          label='Teaching Approach'
          name='prevTeachingApproach'
          type='select'
          required
          error={errors.prevTeachingApproach}
        >
          <option value=''>Select Approach</option>
          <option value='ACTIVITY_BASED'>Activity Based</option>
          <option value='LECTURE_BASED'>Lecture Based</option>
          <option value='FLIPPED_CLASSROOM'>Flipped Classroom</option>
          <option value='PROJECT_BASED'>Project Based</option>
        </FormField>

        <FormField
          label='Teaching Language'
          name='language'
          required
          error={errors.language}
          placeholder='English'
        />

        <FormField
          label='Duration'
          name='duration'
          required
          error={errors.duration}
          placeholder='8 weeks, 40 hours'
        />

        <FormField
          label='Proposed Price (USD)'
          name='proposedPrice'
          type='number'
          required
          error={errors.proposedPrice}
          min='0'
          max='9999.99'
          step='0.01'
          placeholder='299.99'
        />

        <div className='md:col-span-2'>
          <FormField
            label='Course Information'
            name='courseInfo'
            type='textarea'
            required
            error={errors.courseInfo}
            rows='4'
            placeholder='Provide detailed information about the course content, objectives, and what students will learn...'
          />
        </div>

        <div className='md:col-span-2'>
          <FormField
            label='Demo Video URL'
            name='demoVideo'
            type='url'
            placeholder='https://youtube.com/watch?v=...'
          />
          <p className='mt-1 text-xs text-gray-500'>
            Optional: Share a video demonstrating your teaching style
          </p>
        </div>
      </div>
    </div>
  );
};

const Step4Additional = () => {
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentSocial, setCurrentSocial] = useState({ platform: "", url: "" });

  const handleAddSkill = () => {
    if (addSkill(currentSkill)) {
      setCurrentSkill("");
    }
  };

  const handleAddSocial = () => {
    if (addSocialAccount(currentSocial)) {
      setCurrentSocial({ platform: "", url: "" });
    }
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Additional Information</h2>

      <FormField
        label='Bio'
        name='bio'
        type='textarea'
        rows='4'
        placeholder='Tell us about yourself, your teaching philosophy, and what makes you unique...'
      />

      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>Skills</label>
        <div className='flex gap-2 mb-3'>
          <input
            type='text'
            value={currentSkill}
            onChange={e => setCurrentSkill(e.target.value)}
            onKeyPress={e => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            className='flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
            placeholder='e.g., Python, TensorFlow'
          />
          <button
            type='button'
            onClick={handleAddSkill}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2'
          >
            <Plus className='w-4 h-4' />
            Add
          </button>
        </div>
        <div className='flex flex-wrap gap-2'>
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className='px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2'
            >
              {skill}
              <button
                type='button'
                onClick={() => removeSkill(index)}
                className='hover:text-blue-600'
              >
                <Trash2 className='w-3 h-3' />
              </button>
            </span>
          ))}
        </div>
      </div>

      <FormField
        label='Website'
        name='website'
        type='url'
        placeholder='https://yourwebsite.com'
      />

      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>Social Accounts</label>
        <div className='flex gap-2 mb-3'>
          <input
            type='text'
            value={currentSocial.platform}
            onChange={e => setCurrentSocial(prev => ({ ...prev, platform: e.target.value }))}
            className='flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
            placeholder='Platform (e.g., LinkedIn)'
          />
          <input
            type='url'
            value={currentSocial.url}
            onChange={e => setCurrentSocial(prev => ({ ...prev, url: e.target.value }))}
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
        <div className='space-y-2'>
          {formData.socialAccounts.map((account, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
            >
              <div>
                <span className='font-medium text-gray-700'>{account.platform}:</span>
                <span className='ml-2 text-gray-600 text-sm'>{account.url}</span>
              </div>
              <button
                type='button'
                onClick={() => removeSocialAccount(index)}
                className='text-red-600 hover:text-red-700'
              >
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NavigationButtons = ({
  currentStep,
  formData,
  setErrors,
  setCurrentStep,
  setSubmitStatus,
}: {
  currentStep: number;
  formData: FormData;
  setErrors: Dispatch<SetStateAction<any>>;
  setCurrentStep: Dispatch<SetStateAction<any>>;
  setSubmitStatus: Dispatch<SetStateAction<any>>;
}) => {
  const handleNext = () => {
    const errors = validateStep(currentStep, formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setCurrentStep((prev: number) => Math.min(prev + 1, TOTAL_STEPS));
      setSubmitStatus(null);
    } else {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));
    setSubmitStatus(null);
  };

  const handleSubmit = () => {
    const errors = validateStep(currentStep, formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmitStatus("success");
      console.log("Form submitted:", formData);
      setTimeout(() => setSubmitStatus(null), 5000);
    } else {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className='flex justify-between pt-6 border-t border-gray-200'>
      <button
        type='button'
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
          currentStep === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        <ChevronLeft className='w-4 h-4' />
        Previous
      </button>

      {currentStep === TOTAL_STEPS ? (
        <button
          type='button'
          onClick={handleSubmit}
          className='px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2'
        >
          <CheckCircle2 className='w-4 h-4' />
          Submit Application
        </button>
      ) : (
        <button
          type='button'
          onClick={handleNext}
          className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2'
        >
          Next
          <ChevronRight className='w-4 h-4' />
        </button>
      )}
    </div>
  );
};

export default function InstructorSignUpForm() {
  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const updateField = (field: string, value: any) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const addSkill = (skill: string) => {
    if (skill.trim().length >= 3) {
      dispatch({ type: "ADD_SKILL", skill: skill.trim() });
      return true;
    }
    return false;
  };

  const removeSkill = (index: number) => {
    dispatch({ type: "REMOVE_SKILL", index });
  };

  const addSocialAccount = (account: { platform: string; url: string }) => {
    if (account.platform.trim() && account.url.trim()) {
      dispatch({ type: "ADD_SOCIAL", account });
      return true;
    }
    return false;
  };

  const removeSocialAccount = (index: number) => {
    dispatch({ type: "REMOVE_SOCIAL", index });
  };

  return (
    <FormContent
      formData={formData}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      errors={errors}
      setErrors={setErrors}
      submitStatus={submitStatus}
      setSubmitStatus={setSubmitStatus}
      updateField={updateField}
      addSkill={addSkill}
      removeSkill={removeSkill}
      addSocialAccount={addSocialAccount}
      removeSocialAccount={removeSocialAccount}
    />
  );
}

const FormContent: React.FC<FormContextType> = ({
  formData,
  currentStep,
  setCurrentStep,
  errors,
  setErrors,
  submitStatus,
  setSubmitStatus,
  updateField,
  addSkill,
  removeSkill,
  addSocialAccount,
  removeSocialAccount,
}) => {
  return (
    <div className='min-h-screen w-full py-12'>
      <div className='w-4/5 mx-auto shadow'>
        <div className='bg-white rounded overflow-hidden'>
          <div className='bg-linear-to-r from-orange to-orange-light p-4 text-center'>
            <h1 className='mb-2'>Instructor Application</h1>
            <p className='text-white'>
              Join our platform and share your expertise with students worldwide
            </p>
          </div>

          <ProgressBar currentStep={currentStep} />

          <div className='p-4'>
            <StatusMessage submitStatus={submitStatus} />

            {currentStep === 1 && (
              <Step1PersonalInfo
                errors={errors}
                formData={formData}
                updateField={updateField}
              />
            )}
            {currentStep === 2 && <Step2Professional />}
            {currentStep === 3 && <Step3CourseDetails />}
            {currentStep === 4 && <Step4Additional />}

            <NavigationButtons
              currentStep={currentStep}
              formData={formData}
              setCurrentStep={setCurrentStep}
              setErrors={setErrors}
              setSubmitStatus={setSubmitStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
