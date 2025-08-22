"use client";

import { Post } from "@/types/posts";
import Link from "next/link";
import { Button } from "../ui/button";
import { SquarePenIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface PostTableProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostTable = ({ posts, onDelete }: PostTableProps) => {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          All Posts ({posts.length})
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your blog posts and articles
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500 text-lg mb-4">No posts found</p>
          <Link
            href="/admin/posts/create"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="px-4 py-6 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-indigo-600 truncate">
                      {post.title || "Untitled Post"}
                    </h4>
                    <div className="ml-2 flex-shrink-0 flex space-x-2">
                      {post.category && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {post.category}
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.title && post.content
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.title && post.content ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:items-center space-y-1 sm:space-y-0 sm:space-x-6">
                      <p className="flex items-center text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        By {post.author || "Unknown"}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {post.views || 0} views
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Created: {formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  {post.summary && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button className="bg-yellow-300 text-black hover:bg-yellow-400">
                      <SquarePenIcon />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => onDelete(post.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostTable;
