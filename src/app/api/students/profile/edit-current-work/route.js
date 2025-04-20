import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import alumniProfileModel from "@/models/alumniProfile.model";

dbConnect();

export async function POST(request) {
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

    const alumniProfile = await alumniProfileModel.findOne({
      alumni: userId,
    });
    if (!alumniProfile) {
      return NextResponse.json(
        {
          message: "unauthorized request :: Alumni profile not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const formData = await request.formData();

    const currentExperience = formData.get("currentExperience");
    const currentlyWorkingAs = formData.get("currentlyWorkingAs");
    const currentlyWorkingAt = formData.get("currentlyWorkingAt");
    const currentlyWorkingIn = formData.get("currentlyWorkingIn");

    const updatedAlumniProfile = await alumniProfileModel.findOneAndUpdate(
      { alumni: userId },
      {
        currentExperience,
        currentlyWorkingAs,
        currentlyWorkingAt,
        currentlyWorkingIn,
      },
      {
        new: true,
      }
    );

    console.log(updatedAlumniProfile);

    if (!updatedAlumniProfile) {
      return NextResponse.json(
        {
          message: "error occurred unable to process the request",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "basic profile has been successfully updated",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "error occurred unable to process the request",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
