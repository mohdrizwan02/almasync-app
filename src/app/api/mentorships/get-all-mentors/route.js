import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import AlumniProfileModel from "@/models/alumniProfile.model";

await dbConnect();
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const skill = searchParams.get("skill");
    const department = searchParams.get("department");
    const experience = searchParams.get("experience");

    const match = {
      isProfileComplete: true,
      "alumniProfile.availableForMentorship": true,
    };

    console.log(department);
    if (department) {
      match["alumniProfile.department"] = department;
    }

    if (skill) {
      match["alumniProfile.skills"] = { $in: [skill] };
    }

    if (experience) {
      match["alumniProfile.mentorshipExperience"] = Number(experience);
    }

    match["alumniProfile.availableForMentorship"] = true;

    const MentorsData = await UserModel.aggregate([
      {
        $match: {
          role: "alumni",
        },
      },
      {
        $lookup: {
          from: "alumniprofiles",
          localField: "_id",
          foreignField: "alumni",
          as: "alumniProfile",
        },
      },
      {
        $unwind: "$alumniProfile",
      },
      {
        $match: match,
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          fullName: { $concat: ["$firstName", " ", "$lastName"] },

          profileHeadline: "$alumniProfile.profileHeadline",
          profileImage: "$alumniProfile.profileImage",

          createdAt: "$createdAt",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    console.log(MentorsData);

    const totalMentors = await AlumniProfileModel.countDocuments({
      availableForMentorship: true,
    });

    return NextResponse.json({
      message: "successfully fetch mentors data",
      success: true,
      mentorsData: MentorsData,

      totalMentors: totalMentors,
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
