import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import StudentProfileModel from "@/models/studentProfile.model";

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

    const reqBody = await request.json();

    const { studentId } = reqBody;

    console.log(studentId);

    let studentProfileData = await StudentProfileModel.findOne({
      student: studentId,
    });

    if (!studentProfileData) {
      return NextResponse.json(
        {
          message: "unauthorized token",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    console.log(studentProfileData);

    const user = await UserModel.findById(studentProfileData.student).select(
      "-password -role -verifyOtp"
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "unauthorized token",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    studentProfileData = {
      ...studentProfileData.toObject(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isOnline: user.isOnline,
    };

    return NextResponse.json(
      {
        message: "successfully fetched the student data",
        success: true,
        studentProfileData: studentProfileData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "error occured by the server",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
