import Link from "next/link";
import { Post } from "@/types/posts";
import { getPosts } from "@/lib/posts";
import PostStats from "@/components/admin/PostStats";
import PostTable from "@/components/admin/PostTable";
import { PlusIcon } from "lucide-react";

export default async function AdminPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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

      <PostTable posts={posts} />
    </div>
  );
}
