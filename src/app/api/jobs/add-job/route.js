import dbConnect from "@/lib/dbConnect";
import JobModel from "@/models/job.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

await dbConnect();

function normalizeData(obj) {
  const normalized = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      normalized[key] = value.toLowerCase();
    } else if (Array.isArray(value)) {
      normalized[key] = value.map((item) =>
        typeof item === "string" ? item.toLowerCase() : item
      );
    } else {
      normalized[key] = value;
    }
  }

  return normalized;
}

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

    const data = await request.json();

    const jobData = normalizeData(data);

    if (jobData.jobWorkDays) {
      data.jobWorkDays = Number(data.jobWorkDays);
    }

    if (jobData.jobExperienceRequired) {
      data.jobExperienceRequired = Number(data.jobExperienceRequired);
    }

    jobData.postedBy = user._id;

    console.log(jobData);

    const job = await JobModel.create(jobData);

    console.log(job);

    if (!job) {
      return NextResponse.json(
        {
          message: "error occurred while posting job",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "job has been successfully posted",
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
