import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";

async function PostList() {
  await connection(); // forces request-time rendering, so the build never touches the DB
  await dbConnect();

  const allPosts = await Post.find().sort({ date: -1 }).lean();

  if (allPosts.length === 0) {
    return <Link href="/post">No blogs yet, create one here!</Link>;
  }

  return (
    <>
      {allPosts.map((post) => {
        const id = post._id.toString();
        return (
          <Link href={`/blogs/${id}`} key={id}>
            <h2>{post.title}</h2>
            <div>{new Date(post.date).toLocaleDateString("en-GB")}</div>
          </Link>
        );
      })}
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading posts...</p>}>
      <PostList />
    </Suspense>
  );
}