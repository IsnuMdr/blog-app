"use client";

import React, { useReducer, useEffect, ReactNode } from "react";
import { Post, PostFormData } from "@/types/posts";
import {
  getPostsFromStorage,
  createPost as createPostInStorage,
  updatePost as updatePostInStorage,
  deletePost as deletePostInStorage,
  getPostViews as getPostViewsInStorage,
  increasePostViews as increasePostViewsInStorage,
  initializeSampleData,
} from "@/lib/posts";
import { PostsContext, postsReducer } from "@/context/PostContext";

export function PostsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Initialize data on mount
    try {
      initializeSampleData();
      const posts = getPostsFromStorage();
      dispatch({ type: "SET_POSTS", payload: posts });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load posts" });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const createPost = async (postData: PostFormData): Promise<Post> => {
    try {
      const newPost = createPostInStorage(postData);
      dispatch({ type: "ADD_POST", payload: newPost });
      return newPost;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create post" });
      throw error;
    }
  };

  const updatePost = async (
    id: string,
    postData: Partial<PostFormData>
  ): Promise<Post | null> => {
    try {
      const updatedPost = updatePostInStorage(id, postData);
      if (updatedPost) {
        dispatch({ type: "UPDATE_POST", payload: updatedPost });
      }
      return updatedPost;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update post" });
      throw error;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const success = deletePostInStorage(id);
      if (success) {
        dispatch({ type: "DELETE_POST", payload: id });
      }
      return success;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete post" });
      throw error;
    }
  };

  const getPostById = (id: string): Post | null => {
    return state.posts.find((post) => post.id === id) || null;
  };

  const getRelatedPosts = (category: string): Post[] => {
    return state.posts.filter((post) => post.category === category);
  };

  const getPostViews = (id: string): number => {
    return getPostViewsInStorage(id);
  };

  const increasePostViews = (id: string): Post | null => {
    return increasePostViewsInStorage(id);
  };

  return (
    <PostsContext.Provider
      value={{
        state,
        createPost,
        updatePost,
        deletePost,
        getPostById,
        getRelatedPosts,
        getPostViews,
        increasePostViews,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
