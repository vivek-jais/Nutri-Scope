import { uploadToCloudinary } from "@/helpers/uploadToCloudinary"

export async function POST(req : Request){
    try {
        const formData=await req.formData()
        const image=formData.get("image") as File
        const res=await uploadToCloudinary(image)
        if(!res){
            return Response.json({imageUrl : null},{status : 401})
        }
        return Response.json({imageUrl : res.secure_url},{status : 200})
    } catch (error) {
        console.log("Error in upload :",error)
        return Response.json({imageUrl : null},{status : 500})
    }
}