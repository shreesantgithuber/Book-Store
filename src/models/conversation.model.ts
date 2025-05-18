
import { Schema, models, model, Document, Types } from 'mongoose'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

interface IConversation extends Document {
    participants: Types.ObjectId[],
    lastMessage?: Types.ObjectId,
    updatedAt: Date,
}

const conversationSchema = new Schema<IConversation>(
    {
        participants: [
            {
                type: Types.ObjectId, ref: 'User', required: true 
            }
        ],
        lastMessage : {
            type: Types.ObjectId,
            ref: 'ChatMessage' 
        }
    },

    {
        timestamps: true 
    }
)


export const Conversation = models.Conversation || model('Conversation', conversationSchema);