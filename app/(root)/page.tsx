"use client";

import PostCard from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import SearchForm from "@/components/SearchForm";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

function HomeContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { posts, loading, error } = usePosts(query);

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
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post?.id} post={post} />)
          ) : (
            <p className="no-results">No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}
