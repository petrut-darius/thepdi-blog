import { initAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { postBlog } from "./actions";
import PostForm from "../components/PostForm";

async function Page() {
    const auth = await initAuth();
    const session = await auth.api.getSession({ headers: await headers() });

    if(!session || session.user.email !== "eminoviciidarius@gmail.com") redirect("/");

    return (
        <div>
            <h1>Create Blog</h1>
            <PostForm postBlog={postBlog} />
        </div>
    )
}

export default Page;