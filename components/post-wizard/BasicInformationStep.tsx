import { PostFormData } from "@/types/posts";
import { Input } from "../ui/input";

interface BasicInformationStepProps {
  formData: PostFormData;
  handleInputChange: (field: keyof PostFormData, value: string) => void;
  errors: {
    title?: string;
    author?: string;
  };
}

const BasicInformationStep = ({
  formData,
  handleInputChange,
  errors,
}: BasicInformationStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Basic Information</h3>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Blog Title *
        </label>
        <Input
          type="text"
          id="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your blog title..."
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          autoComplete="title"
          required
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Author Name *
        </label>
        <input
          type="text"
          id="author"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter author name..."
          value={formData.author}
          onChange={(e) => handleInputChange("author", e.target.value)}
          autoComplete="author"
          required
        />
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationStep;
