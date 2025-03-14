import dbConnect from "@/lib/dbConnect";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import AlumniProfile from "@/models/alumniProfile.model";

await dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      
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
      role:"alumni",
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
    console.log("creating alumni profile");

    const alumniProfile = await AlumniProfile.create({
      alumni: createdUser._id,
      enrollmentNumber,
      college,
      degree,
      department,
      admissionYear,
      passoutYear,
    });

    if (!alumniProfile) {
      await User.findByIdAndDelete(createdUser._id);

      throw new Error("error occurred while making alumni profile! try again");
    }

    return NextResponse.json(
      {
        message: "alumni profile has been created successfully",
      },
      {
        status: 201,
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
