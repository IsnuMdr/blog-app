export type Post = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  views?: number;
  summary: string;
  content: string;
  category: string;
  image?: string | null;
  author?: string;
};

export type PostFormData = {
  title: string;
  author: string;
  summary: string;
  content: string;
  category: string;
  image?: string | null;
};
