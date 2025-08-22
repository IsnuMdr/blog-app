"use client";

import { useState, useEffect, useCallback } from "react";
import { Post, PostFormData } from "@/types/posts";
import {
  getPostsFromStorage,
  createPost as createPostInStorage,
  updatePost as updatePostInStorage,
  deletePost as deletePostInStorage,
  getPostById as getPostByIdFromStorage,
  getRelatedPosts as getRelatedPostsFromStorage,
  getPostViews as getPostViewsFromStorage,
  increasePostViews as increasePostViewsFromStorage,
  initializeSampleData,
} from "@/lib/posts";

export function usePosts(query?: string | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadPosts = () => {
      try {
        initializeSampleData();
        const storedPosts = getPostsFromStorage();

        const filteredPosts = query
          ? storedPosts.filter((post: Post) =>
              [post.title, post.summary, post.content].some((field) =>
                field.toLowerCase().includes(query.toLowerCase())
              )
            )
          : storedPosts;

        const sortedPosts = filteredPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sortedPosts);
      } catch (err) {
        setError("Failed to load posts from storage");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [query]);

  const createPost = useCallback((postData: PostFormData) => {
    setLoading(true);
    try {
      const newPost = createPostInStorage(postData);
      setPosts((prevPosts) =>
        [...prevPosts, newPost].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      return newPost;
    } catch (err) {
      setError("Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(
    (id: string, postData: Partial<PostFormData>) => {
      setLoading(true);
      try {
        const updatedPost = updatePostInStorage(id, postData);
        if (updatedPost) {
          setPosts((prevPosts) =>
            prevPosts
              .map((post) => (post.id === id ? updatedPost : post))
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
          );
          return updatedPost;
        }
        return null;
      } catch (err) {
        setError("Failed to update post");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deletePost = useCallback((id: string) => {
    try {
      const success = deletePostInStorage(id);
      if (success) {
        setPosts((prevPosts) =>
          prevPosts
            .filter((post) => post.id !== id)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        );
      }
      return success;
    } catch (err) {
      setError("Failed to delete post");
      throw err;
    }
  }, []);

  const getPostById = useCallback((id: string) => {
    return getPostByIdFromStorage(id);
  }, []);

  const getRelatedPosts = useCallback((category: string) => {
    return getRelatedPostsFromStorage(category);
  }, []);

  const getPostViews = useCallback((id: string) => {
    return getPostViewsFromStorage(id);
  }, []);

  const increasePostViews = useCallback((id: string) => {
    return increasePostViewsFromStorage(id);
  }, []);

  const refreshPosts = useCallback(() => {
    try {
      const storedPosts = getPostsFromStorage();
      setPosts(
        storedPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err) {
      setError("Failed to refresh posts: " + err);
    }
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getRelatedPosts,
    getPostViews,
    increasePostViews,
    refreshPosts,
    clearError: () => setError(""),
  };
}
