"use client";

import { useDebounce } from "@/hooks/useDebounce.ts";
import { apiClient } from "@/lib/api/client.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import StepHeader from "./StepHeader.tsx";
import CourseFooter from "./CourseFooter.tsx";
import type { CreateCourseData } from "./page.tsx";

type BasicInfoForm = {
  title: string;
  slug: string;
  tags: string[];
  category: string;
  subCategory: string;
  language: "ENGLISH" | "BANGLA";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
};

const BasicInfoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is Required For the course")
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters")
    .regex(
      /^[\w\s\p{P}&\-]+$/u,
      "Title contains invalid characters. Only letters, numbers, spaces, and common punctuation are allowed."
    ),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is Required For the course")
    .min(3, "Slug must be at least 3 characters long")
    .max(50, "Slug cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
      "Slug use hyphens instead of spaces, and contain no special characters."
    ),
  tags: z
    .array(z.string("Tag is required"), "Tag is required For this Course")
    .min(1, "At least one tag is required"),
  category: z.string("Category is required").min(1, "Category is required"),
  subCategory: z.string("SubCategory is required").min(1, "SubCategory is required"),
  language: z.enum(["ENGLISH", "BANGLA"], "Language is required"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], "Level is required"),
});

const BasicInformaton = ({
  currentStep,
  setCurrentStep,
  courseData,
  setCourseData,
  loading,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  courseData: CreateCourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CreateCourseData>>;
  loading: boolean;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [slugError, setSlugError] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<
    | {
        id: string;
        name: string;
        totalCourses: number;
      }[]
    | []
  >([]);

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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BasicInfoForm>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      title: courseData.title,
      slug: courseData.slug,
      tags: courseData.tags,
      category: courseData.category,
      subCategory: courseData.subCategory,
      language: courseData.language || "ENGLISH",
      level: courseData.level || "BEGINNER",
    },
  });

  const onSubmit = useCallback(
    (data: BasicInfoForm) => {
      const { slug, ...rest } = data;
      checkUniqueSlug(slug);
      // const selectedCat = courseData.category.find(cat => cat.name === selectedCategory);
      // const subCat = selectedCat?.children?.find(sub => sub.name === subCategory);
      setCourseData(prev => ({
        ...prev,
        ...rest,
        slug,
      }));
      setCurrentStep(currentStep + 1);
    },
    [setCourseData, setCurrentStep, currentStep, checkUniqueSlug]
  );

  useEffect(() => {
    if (courseData.category) {
      setSelectedCategory(courseData.category);
      setValue("category", courseData.category);
    }

    if (courseData.subCategory) {
      setSelectedSubCategory(courseData.subCategory);
      setValue("subCategory", courseData.subCategory);
    }
  }, [courseData.category, courseData.subCategory, setValue]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCourseData(prev => ({ ...prev, title: e.target.value }));
    },
    [setCourseData]
  );

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSubCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
  }, []);

  const handleCancel = useCallback(() => {
    // Logic to handle cancellation (e.g., reset form, navigate away, etc.)
  }, []);

  const mainCategories = () => {
    return courseData.allCategory.filter(cat => cat.parentId === null);
  };

  const subCategories = () => {
    // return courseData.allCategory.filter(cat => cat.name === selectedCategory);
    return courseData.allCategory.find(cat => cat.name === selectedCategory)?.children ?? [];
  };

  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    async function fetchTags() {
      try {
        const data = await apiClient.get<
          | {
              id: string;
              name: string;
              totalCourses: number;
            }[]
          | []
        >(`/course/tags?tag=${debouncedQuery}`);
        setResults(data.data ?? []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTags();
  }, [debouncedQuery]);

  const tags = watch("tags") ?? [];

  const handleAddTags = (tag: string) => {
    if (!tag.trim()) return;

    if (!tags.includes(tag)) {
      setValue("tags", [...tags, tag], {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      console.warn("Tag already exists");
    }
  };

  const handleRemoveTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='bg-white w-full'>
      {/* Header */}
      <StepHeader headingText='Basic Information' />

      <div className='p-6 w-full flex flex-col gap-6'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          {/* Form Fields */}
          <div className='space-y-4'>
            {/* Title */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-2'>Tittle</label>
              <div className='relative'>
                <input
                  {...register("title")}
                  onChange={handleTitleChange}
                  type='text'
                  defaultValue={courseData.title}
                  placeholder='You course tittle'
                  maxLength={100}
                  className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm ${errors.title ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                />
                <span
                  className={`absolute right-4 ${errors.title ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}
                >
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
                  {...register("slug")}
                  type='text'
                  defaultValue={courseData.slug}
                  placeholder='Your course slug'
                  maxLength={50}
                  className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm ${errors.slug ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                />
                <span
                  className={`absolute right-4 ${errors.slug ? "top-[15%] bg-red-50" : "top-1/2 -translate-y-1/2 bg-white"} text-xs text-gray-400 pl-2`}
                >
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

            {/* Course Tags */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-2'>
                Course Tags / Keywords (For SEO)
              </label>
              <div className=''>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  type='text'
                  placeholder='Your course tags'
                  maxLength={50}
                  className={`w-full px-4 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-sm ${errors.tags ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                />
                {errors.tags && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.tags.message}</span>
                )}
                {query.length >= 2 && (
                  <ul className='w-1/2 border border-gray-200 rounded'>
                    <li
                      onClick={() => {
                        handleAddTags(query);
                        setQuery("");
                        setResults([]);
                      }}
                      className='w-full text-sm px-2 py-1 hover:bg-orange-50/50 cursor-pointer'
                    >
                      # {query}
                    </li>
                    {results.map((tag, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            handleAddTags(tag.name);
                            setQuery("");
                            setResults([]);
                          }}
                          className='w-full text-sm px-2 py-1 hover:bg-orange-50/50 cursor-pointer'
                        >
                          # {tag.name} ({tag.totalCourses} courses)
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div>
                  {tags?.map((tags, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleRemoveTag(index)}
                        className='text-sm px-2 py-1 mr-2 my-2 bg-orange text-white rounded cursor-pointer'
                      >
                        #{tags}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Category and Sub-category */}
            <div className='flex items-center gap-4'>
              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>
                  Course Category
                </label>
                <select
                  {...register("category")}
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
                  {mainCategories().map(value => (
                    <option
                      key={value.id}
                      value={value.name}
                    >
                      {value.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className='text-xs! text-red-500 mt-1'>{errors.category.message}</span>
                )}
              </div>

              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>
                  Course Sub-category
                </label>
                <select
                  {...register("subCategory")}
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
                  {subCategories().map(sub => (
                    <option
                      key={sub.id}
                      value={sub.name}
                    >
                      {sub.name}
                    </option>
                  ))}
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
                  {...register("language")}
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

              <div className='w-full'>
                <label className='block text-xs font-medium text-gray-700 mb-2'>Course Level</label>
                <select
                  {...register("level")}
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
            </div>
          </div>
          {/* Footer Actions */}
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

export default BasicInformaton;
