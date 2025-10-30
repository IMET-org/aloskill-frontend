"use client";

import { FileText, Globe, Layers, PlaySquare } from "lucide-react";
import React, { useState } from "react";
import Step1 from "./Step1.tsx";
import Step2 from "./Step2.tsx";
import Step3 from "./Step3.tsx";
import Step4 from "./Step4.tsx";

export default function CourseCreationForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: "Basic Information", icon: Layers, progress: "7/12" },
    { id: 2, name: "Advance Information", icon: FileText, progress: null },
    { id: 3, name: "Curriculum", icon: PlaySquare, progress: null },
    { id: 4, name: "Publish Course", icon: Globe, progress: null },
  ];

  return (
    <div className='bg-white w-full overflow-y-auto overflow-x-hidden'>
      {/* Step Navigation */}
      <div className='bg-white border-b border-gray-200'>
        <div className='w-full flex items-center justify-between'>
          {steps.map(step => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-5 py-4 border-b-1 transition-colors relative cursor-pointer ${
                    isActive
                      ? "border-orange-light text-gray-900"
                      : isCompleted
                        ? "border-transparent text-gray-600 hover:text-gray-900"
                        : "border-transparent text-gray-400"
                  }`}
                >
                  <Icon size={18} />
                  <span className='font-medium text-sm'>{step.name}</span>
                  {step.progress && isActive && (
                    <span className='ml-2 text-xs text-orange-600 font-semibold'>
                      {step.progress}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content Step -1*/}
      <div className='w-full'>
        {currentStep === 1 && (
          <Step1
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 2 && (
          <Step2
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 3 && (
          <Step3
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 4 && (
          <Step4
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}
