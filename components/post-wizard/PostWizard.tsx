"use client";

import { useState } from "react";
import { PostFormData } from "@/types/posts";
import WizardNavbar from "./WizardNavbar";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { formSchema } from "@/lib/validation";
import z from "zod";
import BasicInformationStep from "./BasicInformationStep";
import PostDetailStep from "./PostDetailStep";
import ContentStep from "./ContentStep";
import ReviewStep from "./ReviewStep";

interface PostWizardProps {
  initialData?: Partial<PostFormData | null>;
  isEdit?: boolean;
  id?: string;
}

export default function PostWizard({
  initialData = {},
  isEdit = false,
  id,
}: PostWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
    image: initialData?.image || null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { toast } = useToast();

  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await formSchema.parseAsync(formData);

      const url = isEdit ? `/api/posts/${id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: `Post ${isEdit ? "updated" : "created"} successfully!`,
        });
        router.push("/admin");
      } else {
        toast({
          title: "Error",
          description:
            "Failed to create post: " + (responseData.error || "Unknown error"),
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as keyof PostFormData;
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
        toast({
          title: "Validation Error",
          description: "Please check the input fields.",
        });
      } else {
        console.error("Error creating post:", error);
        toast({
          title: "Network Error",
          description: "Network error occurred. Please try again.",
        });
      }
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All changes will be lost.")) {
      router.push("/admin");
    }
  };

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.author.trim();
      case 2:
        return formData.summary.trim() && formData.category.trim();
      case 3:
        return formData.content.trim();
      default:
        return true;
    }
  };

  const steps = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Details" },
    { id: 3, title: "Content" },
    { id: 4, title: "Review & Submit" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{`${
            isEdit ? "Updating" : "Creating"
          } post...`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <WizardNavbar steps={steps} currentStep={currentStep} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Post" : "Create New Post"}
          </h2>
          <p className="text-gray-600 mt-2">
            Step {currentStep}: {steps.find((s) => s.id === currentStep)?.title}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {currentStep === 1 && (
          <BasicInformationStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <PostDetailStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <ContentStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}

        {currentStep === 4 && <ReviewStep formData={formData} />}
      </div>

      <div className="flex justify-between mt-8">
        <div>
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
            >
              Previous
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>

        <div>
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {loading ? "Submitting..." : isEdit ? "Update" : "Create"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
