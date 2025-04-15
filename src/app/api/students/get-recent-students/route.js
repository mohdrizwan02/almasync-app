import { NextResponse } from "next/server";

import UserModel from "@/models/user.model";

import dbConnect from "@/lib/dbConnect";

await dbConnect();
export async function GET(request) {
  try {
    const studentData = await UserModel.aggregate([
      {
        $match: {
          role: "student",
        },
      },
      {
        $lookup: {
          from: "studentprofiles",
          localField: "_id",
          foreignField: "student",
          as: "studentProfile",
        },
      },
      {
        $unwind: "$studentProfile",
      },
      {
        $match: {
          isProfileComplete: false,
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id
          userId: "$_id", // Add this explicitly
          studentProfileId: "$studentProfile._id",
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          profileImage: "$studentProfile.profileImage",
          profileHeadline: "$studentProfile.profileHeadline",
          department: "$studentProfile.department",
          batch: "$studentProfile.admissionYear",
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
      message: "successfully fetched student data",
      success: true,
      studentData: studentData,
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
