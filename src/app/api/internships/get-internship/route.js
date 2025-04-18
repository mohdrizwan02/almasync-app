import InternshipModel from "@/models/internship.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  console.log(reqBody);

  const { internshipId } = reqBody;

  try {
    const internship = await InternshipModel.findById(internshipId);

    if (!internship) {
      return NextResponse.json(
        {
          message: "error occurred",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    console.log(internship);

    return NextResponse.json(
      {
        message: "successfully fetched internship",
        success: true,
        internship: internship,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "error occurred",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
