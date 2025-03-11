import { NextResponse } from "next/server";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import jwt from "jsonwebtoken";

import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(request) {
  const reqBody = await request.json();

  const { email, verifyOtp } = reqBody;

  try {
    const userData = await User.find({ email: email });
    const user = userData[0];

    if (!user) {
      return NextResponse.json(
        {
          error: "user not found Invalid email address",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    const databaseResponse = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          verifyOtp: verifyOtp,
        },
      },
      { new: true }
    );

    if (!databaseResponse) {
      throw new Error("error saving verify otp in database");
    }

    const response = await sendVerificationEmail(email, verifyOtp);

    if (!response.success) {
      return NextResponse.json(
        {
          error: "error sending verification email try again",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "successfully sent email for verification",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          " error occurred while sending the mail please try again",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
