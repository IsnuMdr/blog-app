import { Post } from "@/types/posts";

interface PostStatsProps {
  posts: Post[];
}

const PostStats = ({ posts }: PostStatsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {posts.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Views</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {posts.reduce((total, post) => total + (post.views || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {new Set(posts.map((post) => post.category).filter(Boolean)).size}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Published</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {posts.filter((post) => post.title && post.content).length}
          </p>
        </div>
      </div>
      ;
    </>
  );
};

export default PostStats;
