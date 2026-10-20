import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { initAuth } from "@/lib/auth";
import { postBlog } from "./actions";
import PostForm from "../components/PostForm";

async function AuthedContent() {
    const auth = await initAuth();
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.email !== process.env.ADMIN_EMAIL) redirect("/");

    return (
        <div>
            <h1>Create Blog</h1>
            <PostForm postBlog={postBlog} />
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AuthedContent />
        </Suspense>
    );
}