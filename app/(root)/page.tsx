import SearchForm from "@/components/SearchForm";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";
import { Post } from "@/types/posts";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query };

  const posts: Post[] = await getPosts(params);

  return (
    <>
      <section className="heading_container">
        <h1 className="heading">
          Pick Your Startup <br /> Connect with Enterpreuneurs{" "}
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for ${query}` : "All Posts"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post?.id} post={post} />)
          ) : (
            <p className="no-results">No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}
