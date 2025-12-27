"use server"
import { cookies } from "next/headers";

async function getAnonUserId(){
    const cookieStore=await cookies()
    let id = cookieStore.get("anonUserId")?.value;

    if (!id) {
        id = crypto.randomUUID();
        cookieStore.set("anonUserId", id, {
        httpOnly: true,
        sameSite: "lax"
        });
    }
    return id;
}

export {getAnonUserId}