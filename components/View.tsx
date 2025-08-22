"use client";

import Ping from "@/components/Ping";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useRef } from "react";

const View = ({ id }: { id: string }) => {
  const { getPostViews, increasePostViews } = usePosts();

  const hasIncremented = useRef(false);

  const totalViews = getPostViews(id);

  useEffect(() => {
    if (!hasIncremented.current) {
      increasePostViews(id);
      hasIncremented.current = true;
    }
  }, [id, increasePostViews]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};
export default View;
