"use client";

import { apiClient } from "@/lib/api/client.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import CourseFooter from "./CourseFooter.tsx";
import StepHeader from "./StepHeader.tsx";
import type { CreateCourseData } from "./page.tsx";

type BasicInfoForm = {
  title: string;
  slug: string;
  subCategory: string;
  language: "ENGLISH" | "BANGLA";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  originalPrice: string;
};
type Categories = {
  id: string;
  name: string;
  parentId: string | null;
  children: {
    id: string;
    name: string;
  }[];
}[];

const BasicInfoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title cannot exceed 100 characters')
    .regex(
      /^[\w\s\p{P}&\-]+$/u,
      'Title contains invalid characters. Only letters, numbers, spaces, and common punctuation are allowed.'
    ),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters long')
    .max(50, 'Slug cannot exceed 50 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase, use hyphens instead of spaces, and contain no special characters.'
    ),
  subCategory: z.string("SubCategory is required").min(1, "SubCategory is required"),
  language: z.enum(["ENGLISH", "BANGLA"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  originalPrice: z.string()
    .refine(value => !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 9999.99, {
      message: 'Original price must be a number between 0 and 9999.99',
    }),
});

const Step1 = ({
  currentStep,
  setCurrentStep,
  courseData,
  setCourseData,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  courseData: CreateCourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CreateCourseData>>;
}) => {
  const [category, setCategory] = useState<Categories>([{
    id: "",
    name: "",
    parentId: null,
    children: [
      {
        id: "",
        name: "",
      },
    ],
  }]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [slugError, setSlugError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string>("");

  const checkUniqueSlug = useCallback(async (slug: string) => {
    if (!slug) return;
    try {
      const response = await apiClient.get(`/course/slug-check/${slug}`);
      if (response.success && response.data) {
        const userData = response.data as { result: { canProceed: boolean } };
        if (!userData?.result?.canProceed) {
          setSlugError("This slug is already registered. Please enter a new slug");
          return;
        } else {
          setSlugError("");
        }
      }
    } catch (error) {
      console.error("Error checking slug uniqueness:", error);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BasicInfoForm>({ resolver: zodResolver(BasicInfoSchema) });

  const onSubmit = useCallback((data: BasicInfoForm) => {
    const { subCategory, originalPrice, slug, ...rest } = data;
    checkUniqueSlug(slug);
    const selectedCat = category.find(cat => cat.name === selectedCategory);
    const subCat = selectedCat?.children?.find(sub => sub.name === subCategory);
    setCourseData(prev => ({
      ...prev,
      ...rest,
      categoryId: subCat ? subCat.id : "",
      originalPrice: Number(originalPrice),
    }));
    setCurrentStep(currentStep + 1);
  }, [category, selectedCategory, setCourseData, setCurrentStep, currentStep, checkUniqueSlug]);

  const handleGetCategories = useCallback(async () => {
    setIsLoading(true);
    setCategoryError("");
    try {
      const response = await apiClient.get<Categories>("/course/category");
      if (response.success && response.data) {
        setCategory(response.data);
        setCategoryError("");
        return;
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryError("Failed to load categories. Please try again.");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData(prev => ({ ...prev, title: e.target.value }));
  }, [setCourseData]);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSubCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
  }, []);

  const handleCancel = useCallback(() => {
    // Logic to handle cancellation (e.g., reset form, navigate away, etc.)
  }, []);

  const mainCategories = useMemo(() => {
    return category.filter(cat => cat.parentId === null);
  }, [category]);

  const subCategories = useMemo(() => {
    return category.filter(cat => cat.name === selectedCategory);
  }, [category, selectedCategory]);

  return (
    <div className='bg-white w-full'>
      {/* Header */}
      <StepHeader
        headingText='Basic Information'
      />

      <div className='p-6 w-full flex flex-col gap-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Form Fields */}
          <div className='space-y-4'>
            {/* Title */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Tittle</label>
              <div className='relative'>
                <input
                  {...register("title", {
                    required: "Title is required",
                  })}
                  onChange={handleTitleChange}
                  type='text'
                  defaultValue={courseData.title}
                  placeholder='You course tittle'
                  maxLength={100}
                  className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm ${errors.title ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                />
                <span className={`absolute right-4 ${errors.title ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}>
                  {courseData?.title?.length}/100
                </span>
                {errors.title && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.title.message}</span>
                )}
              </div>
            </div>

            {/* Slug */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Slug</label>
              <div className='relative'>
                <input
                  {...register("slug", {
                    required: "Slug is required",
                  })}
                  type='text'
                  defaultValue={courseData.slug}
                  placeholder='Your course slug'
                  maxLength={50}
                  className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm ${errors.slug ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                />
                <span className={`absolute right-4 ${errors.slug ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}>
                  {courseData?.slug?.length}/50
                </span>
                {slugError && !errors.slug && (
                  <span className='text-xs! text-red-500 mt-1'>{slugError}</span>
                )}
                {errors.slug && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.slug.message}</span>
                )}
              </div>
            </div>

            {/* Category and Sub-category */}
            <div className='flex items-center gap-4'>
              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>
                  Course Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className='w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option
                    className='text-base'
                    value=''
                  >
                    Select Category...
                  </option>
                  {isLoading ? <option>Loading...</option> : mainCategories.map(value => (
                    <option
                      key={value.id}
                      value={value.name}
                    >
                      {value.name}
                    </option>
                  ))}
                </select>
                {categoryError && (
                  <span className='text-xs! text-red-500 mt-1'>{categoryError}</span>
                )}
              </div>

              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>
                  Course Sub-category
                </label>
                <select
                  {...register("subCategory", { required: "SubCategory is required" })}
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  className={`w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400 ${errors.subCategory ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value=''>Select Subcategory...</option>
                  {
                    subCategories.map(cat => cat.children.map(sub => (
                      <option
                        key={sub.id}
                        value={sub.name}
                      >
                        {sub.name}
                      </option>
                    )))
                  }
                </select>
                {errors.subCategory && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.subCategory.message}</span>
                )}
              </div>
            </div>

            {/* Language, Subtitle Language, Level, Duration */}
            <div className='flex items-center gap-4'>
              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>
                  Course Language
                </label>
                <select
                  {...register("language", { required: "Language is required" })}
                  defaultValue={courseData.language}
                  className={`w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400 ${errors.language ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value=''>Select...</option>
                  <option value='ENGLISH'>English</option>
                  <option value='BANGLA'>Bangla</option>
                </select>
                {errors.language && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.language.message}</span>
                )}
              </div>

              {/* <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>
                  Subtitle Language <span className='text-gray-400 font-normal'>(Optional)</span>
                </label>
                <select
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
              </div> */}

              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>Course Level</label>
                <select
                  {...register("level", { required: "Level is required" })}
                  defaultValue={courseData.level}
                  className={`w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400 ${errors.level ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value=''>Select...</option>
                  <option value='BEGINNER'>Beginner</option>
                  <option value='INTERMEDIATE'>Intermediate</option>
                  <option value='ADVANCED'>Advanced</option>
                  <option value='EXPERT'>Expert</option>
                </select>
                {errors.level && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.level.message}</span>
                )}
              </div>

              {/* <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>Durations</label>
                <select
                  {...register("duration", { required: "Duration is required" })}
                  className={`w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent bg-white appearance-none cursor-pointer text-sm text-gray-400 ${errors.duration ? "border-red-200 bg-red-50" : "border-gray-200"}`}
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
              </div> */}
            </div>

            {/* Price */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Price</label>
              <div className='relative'>
                <input
                  {...register("originalPrice", {
                    required: "Price is required",
                  })}
                  type='number'
                  defaultValue={courseData.originalPrice}
                  placeholder='Your course price'
                  min={0}
                  className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm ${errors.originalPrice ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                />
                {errors.originalPrice && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.originalPrice.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {/* <div className='flex items-center justify-between'>
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
              {
                isSubmitting ? <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Saving...
                </span> : "Save & Next"
              }
            </button>
          </div> */}
          <CourseFooter
            handleCancel={handleCancel}
            isSubmitting={isSubmitting}
            currentStep={currentStep}
          />
        </form>
      </div>
    </div>
  );
};

export default Step1;
