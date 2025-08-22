import { PostFormData } from "@/types/posts";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ReviewStepProps {
  formData: PostFormData;
}

const ReviewStep = ({ formData }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Review & Submit</h3>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div>
          <h4 className="font-medium text-lg text-gray-900">Title:</h4>
          <p className="text-gray-700">{formData.title}</p>
        </div>

        <div>
          <h4 className="font-medium text-lg text-gray-900">Author:</h4>
          <p className="text-gray-700">{formData.author}</p>
        </div>

        <div>
          <h4 className="font-medium text-lg text-gray-900">Category:</h4>
          <p className="text-gray-700">{formData.category}</p>
        </div>

        <div>
          <h4 className="font-medium text-lg text-gray-900">Summary:</h4>
          <p className="text-gray-700">{formData.summary}</p>
        </div>

        {formData.image && (
          <div>
            <h4 className="font-medium text-lg text-gray-900">
              Featured Image:
            </h4>
            <div className="w-full h-96 relative">
              <Image
                src={formData.image}
                alt={formData.title}
                className="object-cover rounded-xl"
                fill
              />
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium text-lg text-gray-900">
            Content Preview:
          </h4>
          <article className="bg-gray-200 rounded-lg p-4 prose max-w-4xl font-work-sans break-all">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {formData.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
