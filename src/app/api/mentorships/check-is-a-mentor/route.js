import dbConnect from "@/lib/dbConnect";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";
import MentorshipModel from "@/models/mentorship.model";

await dbConnect();

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
    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "unauthorized request ::user not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const mentorship = await MentorshipModel.find({ mentor: userId });

    if (mentorship[0]?.isAvailable) {
      return NextResponse.json({
        message: "fetched mentorship Status",
        success: true,
        isMentor: true,
      });
    }

    return NextResponse.json({
      message: "successfully fetched mentorship status",
      success: true,
      isMentor: false,
    });
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
