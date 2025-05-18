
import { Schema, models, model, Document } from 'mongoose' 
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcryptjs'

interface user extends Document {
    username: string,
    email: string,
    password: string,
    token: string 
}

const userSchema = new Schema<user>({
    username:{
        type:String,
        required: true 
    },
    email:{
        type:String,
        required: true ,
        unique: true 
    },
    password:{
        type:String,
        required: true 
    },
    token:{
        type:String 
    }
},
    {
        timestamps: true 
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            userId: this._id,
            email: this.email 
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

export const User = models.User || model('User', userSchema);