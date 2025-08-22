"use client";
import { cn } from "@/lib/utils";

interface WizardStep {
  id: number;
  title: string;
}

interface WizardNavbarProps {
  steps: WizardStep[];
  currentStep: number;
}

export default function WizardNavbar({
  steps,
  currentStep,
}: WizardNavbarProps) {
  return (
    <nav className="w-full mb-8">
      <ol className="flex items-center justify-between max-w-3xl mx-auto relative">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <li
              key={step.id}
              className="flex-1 flex flex-col items-center relative"
            >
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-1/2 w-full h-[2px] -translate-y-1/2",
                    isCompleted ? "bg-blue-500" : "bg-gray-300"
                  )}
                />
              )}

              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all z-10 cursor-pointer",
                  isCompleted
                    ? "bg-blue-500 border-blue-500 text-white"
                    : isActive
                    ? "border-blue-500 text-blue-500 font-semibold bg-white"
                    : "border-gray-300 text-gray-400 bg-white hover:border-gray-400"
                )}
              >
                {isCompleted ? "✓" : step.id}
              </div>

              <span
                className={cn(
                  "mt-2 text-sm text-center w-max transition-colors",
                  isActive
                    ? "text-blue-600 font-medium"
                    : isCompleted
                    ? "text-gray-600"
                    : "text-gray-400"
                )}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
