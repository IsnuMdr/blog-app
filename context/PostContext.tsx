"use client";

import { createContext, useContext } from "react";
import { Post, PostFormData } from "@/types/posts";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

type PostsAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: Post }
  | { type: "DELETE_POST"; payload: string };

export const PostsContext = createContext<{
  state: PostsState;
  createPost: (postData: PostFormData) => Promise<Post>;
  updatePost: (
    id: string,
    postData: Partial<PostFormData>
  ) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
  getPostById: (id: string) => Post | null;
  getRelatedPosts: (category: string) => Post[];
  getPostViews: (id: string) => number;
  increasePostViews: (id: string) => Post | null;
} | null>(null);

export function postsReducer(
  state: PostsState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload, loading: false };
    case "ADD_POST":
      return { ...state, posts: [...state.posts, action.payload] };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
}

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePostsContext must be used within PostsProvider");
  }
  return context;
}
