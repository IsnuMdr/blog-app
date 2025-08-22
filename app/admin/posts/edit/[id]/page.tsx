"use client";

import PostWizard from "@/components/post-wizard/PostWizard";
import PostNotFound from "@/components/PostNotFound";
import { usePosts } from "@/hooks/usePosts";
import { PostFormData } from "@/types/posts";
import { useParams } from "next/navigation";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();

  const { loading, getPostById } = usePosts();

  const post = getPostById(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return <PostNotFound link="/admin" />;
  }

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
