import dbConnect from "@/lib/dbConnect";
import JobModel from "@/models/job.model";
import { NextResponse } from "next/server";

await dbConnect();
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location")?.toLowerCase();
    const jobType = searchParams.get("jobType")?.toLowerCase();
    const workType = searchParams.get("workType")?.toLowerCase();
    const filter = {
      isJobVerified: true,
    };

    if (location) filter.jobLocation = location;
    if (jobType) filter.jobType = jobType;
    if (workType) filter.jobWorkType = workType;

    const jobs = await JobModel.find(filter).sort({ createdAt: -1 });

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

    

    const uniqueCompaniesCount = await JobModel.aggregate([
      {
        $match: {
          jobCompany: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$jobCompany",
        },
      },
      {
        $count: "uniqueCompaniesCount",
      },
    ]);

    const uniqueCitiesCount = await JobModel.aggregate([
      {
        $match: {
          jobLocation: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$jobLocation",
        },
      },
      {
        $count: "uniqueCitiesCount",
      },
    ]);

    console.log(uniqueCitiesCount);
    console.log(uniqueCompaniesCount);

    const totalJobs = await JobModel.countDocuments({
      isJobVerified: true,
    });

    

    return NextResponse.json({
      message: "successfullt fetched job data",
      success: true,
      jobData: formattedJobs,
      totalJobs: totalJobs,
      uniqueCompanies: uniqueCompaniesCount,
      uniqueCities: uniqueCitiesCount,
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
