import dbConnect from "@/lib/dbConnect";
import College from "@/models/college.model";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
  const reqBody = await request.json();

  console.log(reqBody);

  const { collegeName, collegeCode, collegeLogo, collegeDegrees } = reqBody;

  try {
    const response = await College.create({
      collegeName,
      collegeCode,
      collegeLogo,
      collegeDegrees,
    });

    if (response) {
      return NextResponse.json(
        {
          message: "successfully added the college",
        },
        {
          status: 200,
        }
      );
    } else {
      throw new Error("error occurred while adding college");
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "error occured by the server try again",
      },
      {
        status: 500,
      }
    );
  }
}
