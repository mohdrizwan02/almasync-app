import dbConnect from "@/lib/dbConnect";
import InternshipModel from "@/models/internship.model";
import { NextResponse } from "next/server";

await dbConnect();
export async function GET(request) {
  try {
    const filter = {
      isInternshipVerified: true,
    };

    const internships = await InternshipModel.find(filter).sort({
      createdAt: -1,
    }).limit(8);

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

    return NextResponse.json({
      message: "successfullt fetched internship data",
      success: true,
      internshipData: formattedInternships,
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
