import { Post, PostFormData } from "@/types/posts";
import fs from "fs/promises";
import path from "path";

const POSTS_FILE_PATH = path.join(process.cwd(), "data", "posts.json");

export async function getPosts(params?: { search: string }): Promise<Post[]> {
  const data = await fs.readFile(POSTS_FILE_PATH, "utf8");
  let posts: Post[] = JSON.parse(data);

  if (posts.length === 0) {
    return [];
  }

  if (params && params.search) {
    posts = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(params?.search.toLowerCase()) ||
        post.summary?.toLowerCase().includes(params?.search.toLowerCase()) ||
        post.content?.toLowerCase().includes(params?.search.toLowerCase())
    );
  }

  posts.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  return posts;
}

export async function getRelatedPosts(category: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.category === category);
}

export async function createPost(postData: PostFormData): Promise<Post> {
  const posts = await getPosts();

  const newPost: Post = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: postData.title,
    author: postData.author,
    summary: postData.summary,
    content: postData.content,
    category: postData.category,
    image: postData.image || "",
    views: 0,
  };

  posts.push(newPost);
  await savePosts(posts);
  return newPost;
}

export async function updatePost(
  id: string,
  postData: Partial<PostFormData>
): Promise<Post | null> {
  const posts = await getPosts();
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
  await savePosts(posts);
  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) {
    return false;
  }

  await savePosts(filteredPosts);
  return true;
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.id === id) || null;
}

async function savePosts(posts: Post[]): Promise<void> {
  const dirPath = path.dirname(POSTS_FILE_PATH);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(POSTS_FILE_PATH, JSON.stringify(posts, null, 2));
}

export async function getPostViews(id: string): Promise<number> {
  const post = await getPostById(id);
  return post?.views || 0;
}

export async function incrementPostViews(id: string): Promise<number> {
  const posts = await getPosts();
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return 0;
  }

  post.views = (post.views || 0) + 1;

  await savePosts(posts);
  return post.views;
}

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}
