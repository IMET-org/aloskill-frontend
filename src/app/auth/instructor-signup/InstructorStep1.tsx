import { useSessionContext } from "@/app/contexts/SessionContext.tsx";
import { apiClient } from "@/lib/api/client.ts";
import { Loader, Upload } from "lucide-react";
import Image from "next/image";
import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import InstructorRegistrationFooterAction from "./InstructorRegistrationFooterAction.tsx";
import type { FormData } from "./page.tsx";
type Inputs = {
  displayName: string;
  profileImage: string | null;
  DOB: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  city: string;
  address: string;
};

const InstructorStep1 = ({
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
    setInstructorData({
      ...instructorData,
      ...data,
    });
  };

  const { user } = useSessionContext();
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<string>("");
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const isEighteenOrOlder = (selectedValue: string) => {
    if (!selectedValue) {
      return false;
    }
    const dob = new Date(selectedValue);
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);

    return dob.getTime() <= today.getTime();
  };

  const validateImageRatio = (file: File): Promise<{ isValid: boolean; error: string }> => {
    return new Promise(resolve => {
      const img = document.createElement("img");
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const isSquare = width === height;
        const isLargeEnough = width >= 800 && height >= 800;

        if (!isSquare) {
          resolve({
            isValid: false,
            error: "Image must be a perfect square (1:1 ratio).",
          });
        } else if (!isLargeEnough) {
          resolve({
            isValid: false,
            error: `Image is too small. Minimum size is 800x800px (Current: ${width}x${height}px).`,
          });
        } else {
          resolve({ isValid: true, error: "" });
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve({ isValid: false, error: "Failed to load image file." });
      };

      img.src = objectUrl;
    });
  };

  const uploadFileToBunny = async (file: File): Promise<{ name: string; url: string }> => {
    setImageUploadLoading(true);
    setUploadError("");
    if (!user?.id) {
      setUploadError("User not authenticated.");
      setImageUploadLoading(false);
      return { name: "", url: "" };
    }

    try {
      const isValidRatio = await validateImageRatio(file);
      if (!isValidRatio.isValid) {
        setUploadError(isValidRatio.error);
        return { name: "", url: "" };
      }
      setUploadError("");
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.postFormData<string>(
        `/course/file-upload?folder=${user.id}`,
        formData
      );

      if (!response.success || !response.data) {
        setUploadError("Upload failed: try different Image or try again");
        return { name: "", url: "" };
      }

      return {
        name: file.name,
        url: response.data,
      };
    } catch (error: unknown) {
      setUploadError(error instanceof Error ? error.message : "An unknown error occurred.");
      return { name: "", url: "" };
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file) {
        const isImage = file.type.startsWith("image/");

        if (isImage) {
          try {
            const uploadResult = await uploadFileToBunny(file);
            if (uploadResult.url) {
              setValue("profileImage", uploadResult.url, {
                shouldDirty: true,
                shouldValidate: true,
              });
              const imagePreview = URL.createObjectURL(file);
              setUploadFile(imagePreview);
            }
          } catch (_error) {
            // console.error("Error uploading file:", error);
          }
          return;
        }
      }
    }
  };

  return (
    <div className='space-y-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <h2 className='mb-4'>Personal Information</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {/* Profile Iamge */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Upload Profile Image *</span>
            </label>
            <div className='w-40 h-40'>
              {imageUploadLoading ? (
                <div className='w-full h-full p-3 flex items-center justify-center border border-gray-200 rounded'>
                  <Loader className='w-8 h-8 animate-spin' />
                </div>
              ) : uploadFile ? (
                <div className='w-full h-full relative group'>
                  <Image
                    width={160}
                    height={160}
                    src={uploadFile}
                    alt='Profile image'
                    className='w-full h-full'
                  />
                  <label
                    htmlFor='imageUpload'
                    className='h-full w-full text-white bg-black/50 items-center justify-center gap-2 p-3 border border-gray-200 rounded transition-colors cursor-pointer hidden group-hover:flex absolute top-0 left-0'
                  >
                    <Upload size={30} />
                  </label>
                  <input
                    type='file'
                    id='imageUpload'
                    onChange={e => handleFileSelect(e)}
                    hidden
                    accept='.jpg,.jpeg,.png'
                  />
                </div>
              ) : (
                <>
                  <label
                    htmlFor='imageUpload'
                    className='h-full w-full flex flex-col items-center justify-center gap-2 p-3 border border-gray-200 rounded transition-colors cursor-pointer'
                  >
                    <Upload size={16} />
                    Upload Image
                  </label>
                  <input
                    type='file'
                    id='imageUpload'
                    onChange={e => handleFileSelect(e)}
                    hidden
                    accept='.jpg,.jpeg,.png'
                  />
                </>
              )}
            </div>
            {errors.profileImage && (
              <span className='text-xs text-red-500 mt-1'>
                {errors.profileImage.message as string}
              </span>
            )}
            {uploadError && (
              <span className='text-xs text-red-500 mt-1'>{uploadError as string}</span>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Display Name *</span>
            </label>
            <input
              {...register("displayName", {
                required: "Enter your full name. Do not use pattern or numbers",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Your name can only contain letters and spaces.",
                },
                minLength: 3,
                maxLength: 40,
              })}
              type='text'
              defaultValue={instructorData.displayName}
              placeholder='Your Full Name'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.displayName ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.displayName && (
              <span className='text-xs text-red-500 mt-1'>{errors.displayName.message}</span>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Date of Birth *</span>
            </label>
            <input
              {...register("DOB", {
                required: "Enter your Date of Birth",
                validate: value => isEighteenOrOlder(value) || "You must be at least 18 years old.",
              })}
              type='date'
              defaultValue={instructorData.DOB}
              max={new Date().toISOString().split("T")[0]}
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.DOB ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.DOB && <span className='text-xs text-red-500 mt-1'>{errors.DOB.message}</span>}
          </div>

          {/* Gender */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Gender *</span>
            </label>
            <select
              {...register("gender", {
                required: "Select your gender.",
              })}
              defaultValue={instructorData.gender}
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.gender ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            >
              <option value=''>Select Gender</option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
            </select>
            {errors.gender && (
              <span className='text-xs text-red-500 mt-1'>{errors.gender.message}</span>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Nationality *</span>
            </label>
            <input
              {...register("nationality", {
                required:
                  "Enter your nationality as placeholder example: Bangladeshi, British etc...",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Nationality can only contain letters and spaces.",
                },
                minLength: 2,
                maxLength: 20,
              })}
              type='text'
              defaultValue={instructorData.nationality}
              placeholder='e.g., Bangladeshi, British'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.nationality ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.nationality && (
              <span className='text-xs text-red-500 mt-1'>{errors.nationality.message}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Phone Number *</span>
            </label>
            <input
              {...register("phoneNumber", {
                required: "Enter your Phone Number. Do not use pattern or text",
                pattern: {
                  value: /^\+?[1-9][0-9]{10,14}$/,
                  message: "Phone must be this format (+8801345678945)",
                },
                minLength: 11,
                maxLength: 14,
              })}
              type='text'
              defaultValue={instructorData.phoneNumber}
              placeholder='Your Phone Number'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.phoneNumber ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.phoneNumber && (
              <span className='text-xs text-red-500 mt-1'>{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* City */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>City *</span>
            </label>
            <input
              {...register("city", {
                required: "Enter your City",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "City name can contain letters and spaces only.",
                },
                minLength: 2,
                maxLength: 20,
              })}
              type='text'
              defaultValue={instructorData.city}
              placeholder='e.g., Chattogram, Dhaka'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.city ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.city && (
              <span className='text-xs text-red-500 mt-1'>{errors.city.message}</span>
            )}
          </div>

          {/* Address */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <span className=''>Address *</span>
            </label>
            <textarea
              {...register("address", {
                required: "Enter your Address",
                pattern: {
                  value: /^[A-Za-z0-9#\-,\s\.\/]+$/,
                  message:
                    "Address can only contain letters, numbers, commas, dots, hyphens, underscores, forwardSlash and spaces.",
                },
                minLength: 10,
                maxLength: 255,
              })}
              defaultValue={instructorData.address}
              placeholder='Your Full Address'
              className={`w-full text-sm px-3 py-2 rounded border focus:ring-1 focus:ring-orange focus:border-transparent focus:outline-none transition placeholder:text-sm resize-none ${errors.address ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            />
            {errors.address && (
              <span className='text-xs text-red-500 mt-1'>{errors.address.message}</span>
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

export default InstructorStep1;
