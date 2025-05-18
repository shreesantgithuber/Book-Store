
import { connectDB } from '@/dbConfig/connect';
import { Book } from '@/models/book.model';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const { name, description, price } : { name:string; description:string; price: number } = body;
        if(
            [name, description, price].some((field)=>{
                return field==""
            })
        ) {
            return NextResponse.json({
                "error": "all fileds are required ! "
            })
        }

        const newBook = new Book(
            {
                name, description, price 
            }
        )

        const book = await newBook.save(); 

        return NextResponse.json(
            {
                "message ": "Book created Successfully ",
                book
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log(
            ` Error occured while creating book ${ error }`
        )
    }
}