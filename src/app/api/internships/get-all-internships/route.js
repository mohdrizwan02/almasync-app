import dbConnect from "@/lib/dbConnect";
import InternshipModel from "@/models/internship.model";
import { NextResponse } from "next/server";

await dbConnect();
export async function GET(request) {
  console.log("api request");
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location")?.toLowerCase();
    const internshipType = searchParams.get("internshipType")?.toLowerCase();
    const workType = searchParams.get("workType")?.toLowerCase();
    const filter = {
      isInternshipVerified: true,
    };

    if (location) filter.internshipLocation = location;
    if (internshipType) filter.internshipType = internshipType;
    if (workType) filter.internshipWorkType = workType;

    const internships = await InternshipModel.find(filter).sort({
      createdAt: -1,
    });

    const formattedInternships = internships.map((internship) => {
      const now = new Date();

      const postedDate = new Date(internship.createdAt);
      const timeDiff = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));

      return {
        id: internship._id,
        title: internship.internshipTitle,
        company: internship.internshipCompany,

        duration: internship.internshipDuration,
        internshipType: internship.internshipType,

        skills: internship.internshipSkills,
        stipend: internship.internshipSalary,
        postedDaysAgo: timeDiff, // Now just a number (e.g., 0, 1, 5, etc.)
        isActive: internship.internshipDeadline
          ? new Date(internship.internshipDeadline) > now
          : true,
      };
    });

    console.log(formattedInternships);

    const uniqueCompaniesCount = await InternshipModel.aggregate([
      {
        $match: {
          isInternshipVerified:true,
          internshipCompany: { $ne: null },
          
        },
      },
      {
        $group: {
          _id: "$internshipCompany",
        },
      },
      {
        $count: "uniqueCompaniesCount",
      },
    ]);

    const uniqueCitiesCount = await InternshipModel.aggregate([
      {
        $match: {
          isInternshipVerified:true,
          internshipLocation: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$internshipLocation",
        },
      },
      {
        $count: "uniqueCitiesCount",
      },
    ]);

    console.log(uniqueCitiesCount);
    console.log(uniqueCompaniesCount);

    const totalInternships = await InternshipModel.countDocuments({
      isInternshipVerified: true,
    });

    return NextResponse.json({
      message: "successfullt fetched internship data",
      success: true,
      internshipData: formattedInternships,
      totalInternships: totalInternships,
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
