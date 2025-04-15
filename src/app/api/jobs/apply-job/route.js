import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import JobModel from "@/models/job.model";

import UserModel from "@/models/user.model";

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
    const { jobId } = reqBody;

    const job = await JobModel.findById(jobId);

    const applied = job.applied;

    applied.push(userId);

    const newJob = await JobModel.findByIdAndUpdate(
      jobId,
      {
        applied: applied,
      },
      {
        new: true,
      }
    );

    console.log(newJob);

    return NextResponse.json(
      {
        message: "job has been successfully applied",
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
