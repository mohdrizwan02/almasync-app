import { NextResponse } from "next/server";

import UserModel from "@/models/user.model";

import dbConnect from "@/lib/dbConnect";

await dbConnect();
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const batch = searchParams.get("batch");
    let sortBy = searchParams.get("sortBy");

    if (!sortBy) {
      sortBy = "recent";
    }

    const match = {
      isProfileComplete: true,
    };

    if (department) {
      match["studentProfile.department"] = department;
    }

    if (batch) {
      match["studentProfile.passoutYear"] = batch;
    }

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
        $match: match,
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
        $sort:
          sortBy === "batch"
            ? { "alumniProfile.admissionYear": -1 }
            : { createdAt: -1 },
      },
    ]);

    const totalStudents = await UserModel.countDocuments({ role: "student" });

    return NextResponse.json({
      message: "successfully fetched student data",
      success: true,
      studentData: studentData,
      totalStudents: totalStudents,
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
