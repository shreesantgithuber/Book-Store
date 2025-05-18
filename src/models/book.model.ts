
import { Schema, models, model, Document } from 'mongoose' 

interface IBook extends Document {
    name: string,
    description: string,
    price: number
}

const bookSchema = new Schema<IBook>({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true  
    },
    price: {
        type: Number,
        required: true 
    }
},
{
    timestamps: true 
}
)


export const Book = models.Book || model('Book', bookSchema);