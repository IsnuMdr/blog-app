"use client";

import Link from "next/link";
import PostStats from "@/components/admin/PostStats";
import PostTable from "@/components/admin/PostTable";
import { PlusIcon } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { useToast } from "@/hooks/useToast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminPage() {
  const { posts, loading, error, deletePost, refreshPosts } = usePosts();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const success = deletePost(id);
      if (!success) {
        toast({
          title: "Error",
          description: "Failed to delete post",
        });
      }
      refreshPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the post",
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {error && <p className="my-2 text-red-500">Error: {error}</p>}

      <PostStats posts={posts} />

      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/admin/posts/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 inline-flex items-center font-medium"
        >
          <PlusIcon className="mr-2" />
          Create New Post
        </Link>
      </div>

      <PostTable posts={posts} onDelete={handleDelete} />
    </div>
  );
}
