import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch posts " +
          (error instanceof Error ? `: ${error.message}` : ""),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPost = await createPost(body);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to create post " +
          (error instanceof Error ? `: ${error.message}` : ""),
      },
      { status: 500 }
    );
  }
}
