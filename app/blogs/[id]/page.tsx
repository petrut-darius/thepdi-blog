import { PostType } from "@/app/post/actions";
import dbConnect from "@/lib/mongoose";
import Post from "@/lib/PostModel";
import { redirect } from "next/navigation";

async function  Page({ params }: { params: Promise<{ id: string}>}) {
    const {id} = await params;
    await dbConnect();
    const post = (await Post.findOne({id: id})) as PostType;

    if(!post) redirect("/");

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.date.toLocaleDateString()}</div>
      <div>
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default Page;