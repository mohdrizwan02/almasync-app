import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import alumniProfileModel from "@/models/alumniProfile.model";
import { uploadOnCloudinary } from "@/helpers/uploadOnCloudinary";
import StudentProfileModel from "@/models/studentProfile.model";

dbConnect();

const bufferFromFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

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
          message: "unauthorized request :: Student profile not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const formData = await request.formData();

    const profileImage = formData.get("profileImage");

    let profileImageUrl;
    if (profileImage) {
      const profileImageBuffer = await bufferFromFile(profileImage);
      profileImageUrl = await uploadOnCloudinary(profileImageBuffer);

      if (!profileImageUrl) {
        return NextResponse.json(
          {
            message: "failed to upload profile image :: please try again",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
    } else {
      profileImageUrl = studentProfile.profileImage || "";
    }

    const updatedStudentProfile = await StudentProfileModel.findOneAndUpdate(
      { student: userId },
      {
        profileImage: profileImageUrl,
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        message: "cover image has been successfully updated",
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
