import PostWizard from "@/components/post-wizard/PostWizard";
import { getPostById } from "@/lib/posts";
import { PostFormData } from "@/types/posts";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPostById(id);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        <PostWizard
          initialData={post as Partial<PostFormData>}
          id={id}
          isEdit
        />
      </div>
    </div>
  );
}
