"use client";

import { Award, BookOpen, Briefcase, CheckCircle2, User } from "lucide-react";
import React, { useState } from "react";
import InstructorStep1 from "./InstructorStep1.tsx";
import InstructorStep2 from "./InstructorStep2.tsx";

export interface FormData {
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

const InstructorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [instructorData, setInstructorData] = useState<FormData>({
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
  });

  const STEPS = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Professional", icon: Briefcase },
    { number: 3, title: "Course Details", icon: BookOpen },
    { number: 4, title: "Additional", icon: Award },
  ];

  return (
    <section className='w-screen h-screen overflow-y-auto overflow-x-hidden'>
      <main className='w-4/6 mx-auto mt-10 rounded-t'>
        <div className='text-center py-5'>
          <h2 className='mb-2'>Instructor Application</h2>
          <p className=''>Join our platform and share your expertise with students worldwide</p>
        </div>
        <div className='shadow'>
          <div className='px-5 py-4 bg-[#0F172A]'>
            <div className='flex items-center justify-between'>
              {STEPS.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep > step.number
                          ? "bg-green-400 text-white"
                          : currentStep === step.number
                            ? "bg-orange-400 text-white ring-4 ring-orange-300"
                            : "bg-white text-gray-600"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle2 className='w-4 h-4' />
                      ) : (
                        <step.icon className='w-4 h-4' />
                      )}
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        currentStep > step.number
                          ? "text-green-400"
                          : currentStep === step.number
                            ? "text-orange-400"
                            : "text-white"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all ${
                        currentStep > step.number
                          ? "bg-green-500"
                          : currentStep === step.number
                            ? "bg-orange-400"
                            : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Form Content Step -1*/}
          <div className='w-full flex flex-col gap-3 p-5'>
            {currentStep === 1 && (
              <InstructorStep1
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                instructorData={instructorData}
                setInstructorData={setInstructorData}
              />
            )}

            {currentStep === 2 && (
              <InstructorStep2
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                instructorData={instructorData}
                setInstructorData={setInstructorData}
              />
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default InstructorRegistrationForm;
