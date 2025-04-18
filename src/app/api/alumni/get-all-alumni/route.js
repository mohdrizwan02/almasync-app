import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import AlumniProfileModel from "@/models/alumniProfile.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

await dbConnect();
export async function GET(request) {
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

    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const batch = searchParams.get("batch");
    const company = searchParams.get("company");
    const location = searchParams.get("location");
    let sortBy = searchParams.get("sortBy"); // "recent" or "batch"

    if (!sortBy) {
      sortBy = "recent";
    }

    const match = {
      isProfileComplete: true,
      _id: { $ne: new mongoose.Types.ObjectId(userId) },
    };

    if (department) {
      match["alumniProfile.department"] = department;
    }

    if (batch) {
      match["alumniProfile.passoutYear"] = batch;
    }

    if (company) {
      match["alumniProfile.currentlyWorkingAt"] = company;
    }

    if (location) {
      match["alumniProfile.currentlyWorkingIn"] = location;
    }

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
        $match: match,
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
        $sort:
          sortBy === "batch"
            ? { "alumniProfile.admissionYear": -1 }
            : { createdAt: -1 },
      },
    ]);

    const uniqueCompaniesCount = await AlumniProfileModel.aggregate([
      {
        $match: {
          currentlyWorkingAt: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$currentlyWorkingAt",
        },
      },
      {
        $count: "uniqueCompaniesCount",
      },
    ]);

    const uniqueCitiesCount = await AlumniProfileModel.aggregate([
      {
        $match: {
          currentlyWorkingIn: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$currentlyWorkingIn",
        },
      },
      {
        $count: "uniqueCitiesCount",
      },
    ]);

    const totalAlumni = await UserModel.countDocuments({ role: "alumni" });

    return NextResponse.json({
      message: "successfully fetch data",
      success: true,
      alumniData: alumniData,
      companiesData: uniqueCompaniesCount,
      citiesData: uniqueCitiesCount,
      totalAlumni: totalAlumni,
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
