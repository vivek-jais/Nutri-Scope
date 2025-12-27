import { cookies } from "next/headers";

export async function GET(req : Request){
    const cookieStore=await cookies()
    let id = cookieStore.get("anonUserId")?.value;
    
    if (!id) {
        id = crypto.randomUUID();
        cookieStore.set("anonUserId", id, {
            httpOnly: true,
            sameSite: "lax",
            maxAge : 60 * 60 * 24 * 365 * 10
        });
    }
    return Response.json({userId : id})
}