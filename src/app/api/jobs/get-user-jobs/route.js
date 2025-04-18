import JobModel from "@/models/job.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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

    const pipeline = [
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        // Lookup jobs posted by this user
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "postedBy",
          as: "postedJobs",
        },
      },
      {
        // Unwind the postedJobs array to process each job
        $unwind: {
          path: "$postedJobs",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        // Lookup applications for each job
        $lookup: {
          from: "jobapplications",
          localField: "postedJobs._id",
          foreignField: "job",
          as: "jobApplications",
        },
      },
      {
        // Lookup details of each applicant
        $lookup: {
          from: "users",
          localField: "jobApplications.appliedBy",
          foreignField: "_id",
          as: "applicants",
        },
      },
      {
        // Group back jobs with applicant count and details
        $group: {
          _id: "$_id", // user _id
          username: { $first: "$username" },
          email: { $first: "$email" },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          jobs: {
            $push: {
              jobId: "$postedJobs._id",
              title: "$postedJobs.jobTitle",
              company: "$postedJobs.jobCompany",
              location: "$postedJobs.jobLocation",
              type: "$postedJobs.jobType",
              workType: "$postedJobs.jobWorkType",
              deadline: "$postedJobs.jobDeadline",
              numApplicants: { $size: "$jobApplications" },
              applicants: {
                $map: {
                  input: "$jobApplications",
                  as: "application",
                  in: "$$application.appliedBy",
                },
              },
              applicantDetails: "$applicants",
            },
          },
        },
      },
    ];

    const data = await UserModel.aggregate(pipeline);

    console.log(data);
    

  } catch (error) {
    console.log(error);
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
