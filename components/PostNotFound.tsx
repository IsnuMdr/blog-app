import Link from "next/link";

const PostNotFound = ({ link }: { link: string }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <p className="mt-2 text-2xl text-gray-600">
          The post you are looking for was not found.
        </p>
        <Link
          href={link}
          className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default PostNotFound;
