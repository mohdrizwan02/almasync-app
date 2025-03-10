import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import AlumniProfile from "@/models/alumniProfile.model";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request) {
  const reqBody = await request.json();

  const { email, password } = reqBody;

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      {
        error: "user not found invalid email address",
        success:false
      },
      {
        status: 404,
      }
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json(
      {
        error: "unauthorized request incorrect password",
        success:false
      },
      {
        status: 401,
      }
    );
  }

  const userData = await User.findById(user._id).select("-password");
  

  const tokenData = {
    _id: userData._id,
    role: userData.role,
    email: userData.email,
  };

  const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "24h",
  });

  const response = NextResponse.json(
    {
      message: "user has been logged in successfully",
      success: true,
    },
    {
      status: 200,
    }
  );

  const cookieExpiry = new Date();
  cookieExpiry.setHours(cookieExpiry.getHours() + 24);

  response.cookies.set("token", token, {
    httpOnly: true,
    expires: cookieExpiry,
    secure: true,
  });


  response.cookies.set("userRole", userData.role, {
    httpOnly: true,
    expires: cookieExpiry,
    secure: true,
  });


  return response;
}
