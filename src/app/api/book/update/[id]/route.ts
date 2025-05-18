import { connectDB } from "@/dbConfig/connect";
import { Book } from "@/models/book.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const id = req.nextUrl.searchParams.get("id");
        if(
            !id 
        ) {
            return NextResponse.json(
                {
                    "error ":"id is required ! "
                }
            )
        }

        const singleBook = await Book.findByIdAndUpdate(
            {_id: id},
            {
                ...body 
            },
            {
                new: true 
            }
        );
        
        if(
            !singleBook 
        ) {
            return NextResponse.json(
                {
                    "error ": "no single book found "
                }
            )
        }

        return NextResponse.json(
            {
                "message ": "Book updated successfully ",
                singleBook 
            }
        )

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
