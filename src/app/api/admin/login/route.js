import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import Admin from "@/models/admin.model";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          error: "admin not found invalid email address",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          error: "unauthorized request incorrect password",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const adminData = await Admin.findById(admin._id).select("-password");

    const tokenData = {
      _id: adminData._id,
      role: "admin",
      email: adminData.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    const response = NextResponse.json(
      {
        message: "admin has been logged in successfully",
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

    response.cookies.set("userRole", "admin", {
      httpOnly: true,
      expires: cookieExpiry,
      secure: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "server error has occurred try again",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
