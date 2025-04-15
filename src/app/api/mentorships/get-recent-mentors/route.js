import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import AlumniProfileModel from "@/models/alumniProfile.model";
import { LetterText } from "lucide-react";

await dbConnect();
export async function GET() {
  try {
    const MentorsData = await UserModel.aggregate([
      {
        $match: {
          role: "alumni",
          isProfileComplete: true,
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
        $match: {
          "alumniProfile.availableForMentorship": true,
        },
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
      {
        $limit: 8,
      },
    ]);

    console.log(MentorsData);

    return NextResponse.json({
      message: "successfully fetch mentors data",
      success: true,
      mentorData: MentorsData,
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
