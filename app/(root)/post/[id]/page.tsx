import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import PostCard from "@/components/PostCard";
import { getPostById, getRelatedPosts } from "@/lib/posts";
import { Post } from "@/types/posts";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const experimental_ppr = true;

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post: Post | null = await getPostById(id);

  if (!post) {
    return notFound();
  }

  const relatedPost: Post[] = await getRelatedPosts(post?.category);

  return (
    <>
      <section className="heading_container !min-h-[230px]">
        <p className="tag">{formatDate(post?.createdAt)}</p>

        <h1 className="text-3xl">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.summary}</p>
      </section>

      <section className="section_container">
        <div className="w-full h-96 relative">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover rounded-xl"
              fill
            />
          ) : (
            <Image
              src="/default-image.jpg"
              alt={post.title}
              className="object-cover rounded-xl"
              fill
            />
          )}
        </div>

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <div className="flex gap-2 items-center mb-3">
              <UserCircle2 className="w-8 h-8" />

              <div>
                <p className="text-20-medium">{post.author}</p>
                <p className="text-sm !text-black-300">@{post.author}</p>
              </div>
            </div>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Post Detail</h3>

          <article className="prose max-w-4xl font-work-sans break-all">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
        </div>

        <hr className="divider" />

        {relatedPost?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Related Posts</p>

            <ul className="mt-8 card_grid-sm">
              {relatedPost.map((post, index: number) => (
                <PostCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default PostPage;
