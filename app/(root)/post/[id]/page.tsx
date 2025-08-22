"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/posts";
import PostNotFound from "@/components/PostNotFound";
import { useParams } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import PostDetail from "@/components/PostDetail";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();

  const { loading, getPostById, getRelatedPosts } = usePosts();

  const post = getPostById(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return <PostNotFound link="/" />;
  }

  const relatedPost: Post[] = getRelatedPosts(post.category);

  return (
    <>
      <PostDetail post={post} />
      <hr className="divider" />

      <section className="section_container">
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          {relatedPost?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Related Posts</p>

              <ul className="mt-8 card_grid-sm">
                {relatedPost.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </ul>
            </div>
          )}

          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
