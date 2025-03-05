import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import AlumniProfile from "@/models/alumniProfile.model";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "user has been successfully logged out",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(),
      secure: true,
    });
    response.cookies.set("role", "", {
        httpOnly: true,
        expires: new Date(),
        secure: true,
      });


    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
