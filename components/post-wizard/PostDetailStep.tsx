import { PostFormData } from "@/types/posts";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface PostDetailStepProps {
  formData: PostFormData;
  handleInputChange: (field: keyof PostFormData, value: string) => void;
  errors: {
    summary?: string;
    category?: string;
  };
}

const PostDetailStep = ({
  formData,
  handleInputChange,
  errors,
}: PostDetailStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Post Details</h3>

      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Summary / summary *
        </label>
        <Textarea
          id="summary"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Write a brief intro or excerpt of your post..."
          value={formData.summary}
          onChange={(e) => handleInputChange("summary", e.target.value)}
          required
        />
        {errors.summary && (
          <p className="text-sm text-red-500">{errors.summary}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category *
        </label>
        <Input
          type="text"
          id="category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          placeholder="Enter category..."
          autoComplete="category"
        />
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category}</p>
        )}
      </div>
    </div>
  );
};

export default PostDetailStep;
