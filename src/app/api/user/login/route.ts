
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"; 
import bcrypt from 'bcryptjs' 

const tokenGeneration = async(userId:object) => {
    try {
        const user = await User.findById(userId);
        const token = user.generateToken();
        return { token };
    } catch (error) {
        console.log(`Error occured while token generation ${ error }`);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password }: { email: string; password: string } = body;
        if(
            [email, password].some((field)=>{
                return field == ""
            })
        ) {
            return NextResponse.json(
                {
                    "error": "email and password is required ! "
                },
                {
                    status: 402 
                }
            )
        }

        const isUserExist = await User.find({email});

        if(
            isUserExist.length <= 0
        ) {
            return NextResponse.json(
                {
                    "error": "please login first "
                },
                {
                    status: 402 
                }
            )
        }

        const comparePassword = await bcrypt.compare(password, isUserExist[0].password);

        if(
            !comparePassword 
        ) {
            return NextResponse.json(
                {
                    "error": "Wrong Password "
                },
                {
                    status: 402 
                }
            )
        }

        const tokens = await tokenGeneration(isUserExist[0]._id);
        if(
            !tokens
        ) {
            return NextResponse.json(
                {
                    "error": " Failed to generate authentication token "
                },
                {
                    status: 402  
                }
            )
        }

        const res = NextResponse.json(
            {
                "message": "Login Successfull ",
                token: tokens.token
            },
            {
                status: 200 
            }
        )

        return res.cookies.set('token', tokens.token, {
            httpOnly: true,
            secure: true 
        })

    } catch (error) {
        console.log(`Error occured while login ${ error }`)
    }

}