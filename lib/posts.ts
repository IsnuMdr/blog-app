import { Post, PostFormData } from "@/types/posts";
import initialPosts from "@/data/posts.json";

const POSTS_STORAGE_KEY = "posts_data";

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function getPostsFromStorage(): Post[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(POSTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialPosts));
      return initialPosts;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading posts from localStorage:", error);
    return [];
  }
}

export function savePostsToStorage(posts: Post[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving posts to localStorage:", error);
    throw new Error("Failed to save posts");
  }
}

export function createPost(postData: PostFormData): Post {
  const posts = getPostsFromStorage();

  const newPost: Post = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: postData.title,
    author: postData.author,
    summary: postData.summary,
    category: postData.category,
    content: postData.content,
    image: postData.image,
    views: 0,
  };

  posts.push(newPost);
  savePostsToStorage(posts);
  return newPost;
}

export function updatePost(
  id: string,
  postData: Partial<PostFormData>
): Post | null {
  const posts = getPostsFromStorage();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return null;
  }

  const updatedPost = {
    ...posts[postIndex],
    ...postData,
    updatedAt: new Date().toISOString(),
  };

  posts[postIndex] = updatedPost;
  savePostsToStorage(posts);
  return updatedPost;
}

export function deletePost(id: string): boolean {
  const posts = getPostsFromStorage();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) {
    return false;
  }

  savePostsToStorage(filteredPosts);
  return true;
}

export function getPostById(id: string): Post | null {
  const posts = getPostsFromStorage();
  return posts.find((post) => post.id === id) || null;
}

export function getRelatedPosts(category: string): Post[] {
  const posts = getPostsFromStorage();
  return posts.filter((post) => post.category === category);
}

export function getPostViews(id: string): number {
  const posts = getPostsFromStorage();
  const post = posts.find((post) => post.id === id);
  return post ? post.views : 0;
}

export function increasePostViews(id: string): Post | null {
  const posts = getPostsFromStorage();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return null;
  }

  posts[postIndex].views += 1;
  savePostsToStorage(posts);
  return posts[postIndex];
}

export function initializeSampleData(): void {
  const existingPosts = getPostsFromStorage();

  if (existingPosts.length === 0) {
    savePostsToStorage(initialPosts);
  }
}
