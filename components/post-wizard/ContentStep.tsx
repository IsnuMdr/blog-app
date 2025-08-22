import { PostFormData } from "@/types/posts";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../ui/input";

interface ContentStepProps {
  formData: PostFormData;
  handleInputChange: (field: keyof PostFormData, value: string) => void;
  errors: {
    image?: string;
    content?: string;
  };
}

const ContentStep = ({
  formData,
  handleInputChange,
  errors,
}: ContentStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Content</h3>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Featured Image URL (Optional)
        </label>
        <Input
          type="url"
          id="image"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://example.com/image.jpg"
          value={formData.image || ""}
          onChange={(e) => handleInputChange("image", e.target.value)}
        />
        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
      </div>

      <div data-color-mode="light">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Main Content *
        </label>
        <MDEditor
          value={formData.content}
          onChange={(value) => handleInputChange("content", value as string)}
          id="content"
          preview="edit"
          height={300}
          style={{ overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content}</p>
        )}
      </div>
    </div>
  );
};

export default ContentStep;
