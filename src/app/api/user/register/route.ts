
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"; 

export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = body;
        if(
            [ username, email, password ].some((field)=>{
                return field == ""
            })
        ) {
            return NextResponse.json(
                { "error": "all fields are required" },
                {
                    status: 402
                }
            )
        }
        const isUserExist = await User.find({email});

        const newUser = new User(
            {
                username, email, password 
            }
        )
        
        const user = await newUser.save();

        return NextResponse.json(
            {
                "message ": " User registered Successfully "
            },
            {
                status: 200 
            }
        )

    } catch (error) {   
        console.log("Error occured while registering user ", error);
    }
}

