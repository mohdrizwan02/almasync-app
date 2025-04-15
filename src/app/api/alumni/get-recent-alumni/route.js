import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import AlumniProfileModel from "@/models/alumniProfile.model";

await dbConnect();
export async function GET(request) {
  try {
    const alumniData = await UserModel.aggregate([
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
        $match: {
          isProfileComplete: true,
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          batch: "$alumniProfile.passoutYear",
          department: "$alumniProfile.department",
          skills: "$alumniProfile.skills",
          profileImage: "$alumniProfile.profileImage",
          location: "$alumniProfile.currentlyWorkingIn",
          company: "$alumniProfile.currentlyWorkingAt",
          role: "$alumniProfile.currentlyWorkingAs",
          experience: "$alumniProfile.currentExperience",
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

    return NextResponse.json({
      message: "successfully fetch data",
      success: true,
      alumniData: alumniData,
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
