import {z} from "zod"

export const inputSchema=z.object({
    text : z.string().min(1,{error : 'Input is required to get your intent'}),
    image : z.string().optional()
})