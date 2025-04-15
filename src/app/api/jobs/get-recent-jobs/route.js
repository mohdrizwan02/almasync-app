import dbConnect from "@/lib/dbConnect";
import JobModel from "@/models/job.model";
import { NextResponse } from "next/server";

await dbConnect();
export async function GET(request) {
  try {
    const filter = {
      isJobVerified: true,
    };

    const jobs = await JobModel.find(filter).sort({ createdAt: -1 }).limit(8);

    const formattedJobs = jobs.map((job) => {
      const now = new Date();

      const postedDate = new Date(job.createdAt);
      const timeDiff = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));

      return {
        id: job._id,
        title: job.jobTitle,
        company: job.jobCompany,
        location: job.jobLocation,
        experience: job.jobExperienceRequired + " yrs",
        jobType: job.jobType,
        workType: job.jobWorkType,
        skills: job.jobSkills,
        salary: job.jobSalary,
        postedDaysAgo: timeDiff, // Now just a number (e.g., 0, 1, 5, etc.)
        isActive: job.jobDeadline ? new Date(job.jobDeadline) > now : true,
      };
    });

    return NextResponse.json({
      message: "successfully fetched job data",
      success: true,
      jobData: formattedJobs,
    });
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
