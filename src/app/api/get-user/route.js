import jwt from "jsonwebtoken";

import { cookies } from "next/headers";

import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "unauthorized request",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const userId = decodedToken._id;

    const user = await UserModel.findById(userId).select(
      "-password -email  -role -createdAt -updatedAt"
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "unauthorized request",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: user._id,
        name: user.firstName + " " + user.lastName,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "error occurred",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
