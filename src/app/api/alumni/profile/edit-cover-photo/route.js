import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import alumniProfileModel from "@/models/alumniProfile.model";
import { uploadOnCloudinary } from "@/helpers/uploadOnCloudinary";

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

    const coverImage = formData.get("coverImage");

    let coverImageUrl;
    if (coverImage) {
      const coverImageBuffer = await bufferFromFile(coverImage);
      coverImageUrl = await uploadOnCloudinary(coverImageBuffer);
      if (!coverImageUrl) {
        return NextResponse.json(
          {
            message: "failed to upload cover image :: please try again",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
    } else {
      coverImageUrl = alumniProfile.coverImage || "";
    }

    const updatedAlumniProfile = await alumniProfileModel.findOneAndUpdate(
      { alumni: userId },
      {
        coverImage: coverImageUrl,
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
