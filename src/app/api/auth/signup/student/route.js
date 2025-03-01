import dbConnect from "@/lib/dbConnect";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import StudentProfile from "@/models/studentProfile.model";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

await dbConnect();

export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const {
      role,
      email,
      firstName,
      lastName,
      password,
      college,
      enrollmentNumber,
      admissionYear,
      passoutYear,
      degree,
      department,
    } = reqBody;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return NextResponse.json(
        {
          error: "user already exists",
        },
        {
          status: 401,
        }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });

    if (!user) {
      throw new Error("error occured while creating the user");
    }

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new Error("error occurred by the server");
    }

    const studentProfile = await StudentProfile.create({
      student: createdUser._id,
      enrollmentNumber,
      college,
      degree,
      department,
      admissionYear,
      passoutYear,
    });

    if (!studentProfile) {
      await User.findByIdAndDelete(createdUser._id);

      throw new Error("error occurred while making student profile! try again");
    }

    let otp = 123456;

    const emailResponse = await sendVerificationEmail(
      "almasyncapp@gmail.com",
      otp
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          message:
            "student profile has been created successfully but failed to send email please manually verfify your email after login",
        },

        {
          status: 201,
        }
      );
    }
    return NextResponse.json(
      {
        message: "student profile has been created successfully",
      },
      {
        status: 200,
      }
    );
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
