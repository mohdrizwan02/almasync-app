import { NextResponse } from "next/server";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import jwt from "jsonwebtoken";

import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST (request){
    const reqBody = await request.json()

    const {email , verifyOtp  } = reqBody
    try {
       const response =  await User.find({email:email})
       
       const user = response[0]

       if(!user){
        throw new Error("Invalid email or User please check your email")
       }

       const isVerifyOtpCorrect = user.verifyOtp === verifyOtp

       if(!isVerifyOtpCorrect){
        throw new Error("invalid otp please enter correct one")
       }

       await User.findByIdAndUpdate(user._id,{
        $set:{
            verifyOtp:""
        }
       })

       return NextResponse.json({
        message:"user email and otp has been successfully verified",
        success:true
       },{
        status:200
       })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error:error.message || "error verifying the otp try again",
            success:false
        },{
            status:500
        })
    }

}