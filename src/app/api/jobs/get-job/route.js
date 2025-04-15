import JobModel from "@/models/job.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  console.log(reqBody);

  const { jobId } = reqBody;

  try {
    const job = await JobModel.findById(jobId);

    if (!job) {
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

    console.log(job)

    return NextResponse.json(
      {
        message: "successfully fetched job",
        success: true,
        job: job,
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
