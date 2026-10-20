import { betterAuth } from "better-auth";
import dbConnect from "./mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export async function initAuth() {
    const mongooseInsantce = await dbConnect();
    const client = mongooseInsantce!.connection.getClient();
    const instance = betterAuth({
        database: mongodbAdapter(client.db()),
        emailAndPassword: { enabled:true },
    });

    return instance;
}