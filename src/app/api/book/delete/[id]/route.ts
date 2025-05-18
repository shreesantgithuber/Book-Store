
import { connectDB } from '@/dbConfig/connect';
import { Book } from '@/models/book.model';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server' 

connectDB();

export async function DELETE(req: NextRequest) {
    try {
        const pathnameParts = req.nextUrl.pathname.split("/");
        const id = pathnameParts[pathnameParts.length - 1];
        console.log("delete book id ", id)
        if(
            !id 
        ) {
            return NextResponse.json(
                {
                    "error ": "id is required ! "
                },
                {
                    status: 402 
                }
            )
        }

        const deleteBook = await Book.findByIdAndDelete({
            _id: id
        });
        console.log("deleted book ", deleteBook);
        if(
            !deleteBook 
        ) {
            return NextResponse.json(
                {
                    "error ": "no deleted book found "
                },
                {
                    status: 404 
                }
            )
        }

        return NextResponse.json(
            {
                "message ": "Book deleted successfully "
            },
            {
                status: 200 
            }
        )

    } catch (error) {
        console.log(`Error occured while deleting book ${error}`)
    }
}