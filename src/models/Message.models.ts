import mongoose,{Schema,Document} from "mongoose";

// export interface Message{
//     input : {
//         text : string,
//         imageUrl? : string
//     },
//     output : {
//         component : string,
//         props : any
//     }[]
// }

export interface Messages extends Document{
    userId : string,
    messages : any
}

export const messagesSchema : Schema<Messages>=new Schema({
    userId : {
        type : String,
        required : true
    },
    messages : {
        type : [Schema.Types.Mixed],
        default : []
    }
})

const MessagesModel=(mongoose.models.Messages) || (mongoose.model<Messages>("Messages",messagesSchema))
export default MessagesModel