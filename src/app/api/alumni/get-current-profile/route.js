import alumniProfileModel from "@/models/alumniProfile.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";

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

    let alumniProfileData = await alumniProfileModel.findOne({
      alumni: userId,
    });

    if (!alumniProfileData) {
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

    const user = await UserModel.findById(userId).select(
      "-password -role -isOnline -verifyOtp"
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

    alumniProfileData = {
      ...alumniProfileData.toObject(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return NextResponse.json(
      {
        message: "successfully fetched the alumni data",
        success: true,
        alumniProfileData: alumniProfileData,
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
