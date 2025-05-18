
import mongoose from 'mongoose'
import { DB_NAME } from '../constants/constants'

export const connectDB = async() => {
    try {
        const response = await mongoose.connect(`${ process.env.MONGODB_URI }/${ DB_NAME }`);
        console.log(`DATABASE CONNECTED HOST NAME ! ${response.connection.host}`);
    } catch (error) {
        console.log(`Error Occured While connecting with database ${ error } `);
    }
}