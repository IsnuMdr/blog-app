import { formatDate } from "@/lib/utils";
import { Post } from "@/types/posts";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostDetail = ({ post }: { post: Post }) => {
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
      </section>
    </>
  );
};

export default PostDetail;
