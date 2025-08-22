import { formatDate } from "@/lib/utils";
import { EyeIcon, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Post } from "@/types/posts";

const PostCard = ({ post }: { post: Post }) => {
  const { createdAt, views, author, title, category, summary, id, image } =
    post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(createdAt)}</p>
        <div className="flex gap-1 5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <p className="text-16-medium line-clamp-1">{author}</p>
          <Link href={`/post/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <UserCircle2Icon className="size-6 text-primary" />
      </div>
      <Link href={`/post/${id}`}>
        <p className="startup-card_desc">{summary}</p>

        {image ? (
          <img src={image} alt={title} className="startup-card_img" />
        ) : (
          <img
            src="/default-image.jpg"
            alt={title}
            className="startup-card_img"
          />
        )}
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
      </div>
      <Button className="startup-card_btn" asChild>
        <Link href={`/post/${id}`}>Details</Link>
      </Button>
    </li>
  );
};

export default PostCard;
