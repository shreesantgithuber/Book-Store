
import { connectDB } from '@/dbConfig/connect';
import { Book } from '@/models/book.model'
import { NextRequest, NextResponse } from 'next/server' 

connectDB();

export async function GET(req:NextRequest) {
    try {
        const books = await Book.find({});
        if(
            !books
        ) {
            return NextResponse.json(
                {
                    "error": "No Books found "
                },
                {
                    status: 404
                }
            )
        }


        return NextResponse.json(
            {
                books 
            },
            {
                status: 200 
            }
        )

    } catch (error) {
        console.log(`Error occured while fetching books from database ${ error }`)
    }
}

