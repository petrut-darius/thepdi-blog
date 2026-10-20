import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Post from "@/lib/PostModel";
import mongoose from "mongoose";

async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  await dbConnect();

  const query = mongoose.isValidObjectId(id)
    ? { $or: [{ id: id }, { _id: id }] }
    : { id: id };

  const post = await Post.findOne(query).lean();

  if (!post) redirect("/");

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{new Date(post.date).toLocaleDateString("en-GB")}</div>
      <div>
        {post.content.map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading post...</p>}>
      <PostDetails params={params} />
    </Suspense>
  );
}
