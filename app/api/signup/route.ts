import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req:NextRequest){
    const {email,password,confirmPassword}= await req.json();

    const isValidEmail= (email:string) =>{
        const emailRegex= /^[^\s@]+@[^\s@]+[^\s@]+$/;
        return emailRegex.test(email);
    }

    if(!email || !password || !confirmPassword){
        return NextResponse.json({message: "All Fields are required!"},{status:400})
    }

    if(!isValidEmail(email)){
        return NextResponse.json({message: "Invalid Email!"})
    }

    if(confirmPassword != password){
        return NextResponse.json({message: "Passwords do not match!"})
    }
}