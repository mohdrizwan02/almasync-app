import dbConnect from "@/lib/dbConnect";
import College from "@/models/college.model";
import { NextResponse } from "next/server";

dbConnect()


export async function GET(request){
    try {
        const colleges = await College.find({})
        if(colleges){
            return NextResponse.json({
                message:"colleges fetched successsfully",
                data:colleges,
                success:true
            },{
                status:200
            })
        }
        else{
            throw new Error("server error occurred while fetching the college data please refresh the page")
        }
    } catch (error) {
        return NextResponse.json({
            error:error.message || "error occurred while getting the college data refresh the page",
            success:false
        },{
            status:500
        })
    }


}