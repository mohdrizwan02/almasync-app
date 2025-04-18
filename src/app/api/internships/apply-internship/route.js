import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import JobModel from "@/models/job.model";

import UserModel from "@/models/user.model";
import InternshipModel from "@/models/internship.model";

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

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "unauthorized request ::user not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    const reqBody = await request.json();
    const { internshipId } = reqBody;

    const internship = await InternshipModel.findById(internshipId);

    const applied = internship.applied;

    applied.push(userId);

    const newInternship = await InternshipModel.findByIdAndUpdate(
      internshipId,
      {
        applied: applied,
      },
      {
        new: true,
      }
    );

    console.log(newInternship);

    return NextResponse.json(
      {
        message: "internship has been successfully applied",
        success: true,
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
