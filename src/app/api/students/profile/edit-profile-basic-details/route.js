import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import StudentProfileModel from "@/models/studentProfile.model";

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

    const studentProfile = await StudentProfileModel.findOne({
      student: userId,
    });
    if (!studentProfile) {
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

    const getJson = (key) => {
      const raw = formData.get(key);
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    };

    const about = formData.get("about");
    const address = getJson("address");

    const gender = formData.get("gender");

    const mobileNumber = formData.get("mobileNumber");
    const profileHeadline = formData.get("profileHeadline");

    const updatedStudentProfile = await StudentProfileModel.findOneAndUpdate(
      { student: userId },
      {
        address,
        about,
        profileHeadline,

        gender,
        mobileNumber,
      },
      {
        new: true,
      }
    );

    console.log(updatedStudentProfile);

    if (!updatedStudentProfile) {
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
