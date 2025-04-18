import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import alumniProfileModel from "@/models/alumniProfile.model";
import { uploadOnCloudinary } from "@/helpers/uploadOnCloudinary";
import UserModel from "@/models/user.model";

export const config = {
  api: {
    bodyParser: false,
  },
};

await dbConnect();

export async function POST(req) {
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
    const alumniProfile = await alumniProfileModel.findOne({
      alumni: userId,
    });
    if (!alumniProfile) {
      return NextResponse.json(
        {
          message: "unauthorized request :: Alumni profile not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const formData = await req.formData();

    const getJson = (key) => {
      const raw = formData.get(key);
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    };

    const about = getJson("about");
    const address = getJson("address");
    const availableForMentorship =
      formData.get("availableForMentorship") === "true";
    const certifications = getJson("certifications");
    const communicationLanguages = getJson("communicationLanguages");
    const coverImage = formData.get("coverImage"); // This is a File object
    const currentExperience = formData.get("currentExperience");
    const currentlyWorkingAs = formData.get("currentlyWorkingAs");
    const currentlyWorkingAt = formData.get("currentlyWorkingAt");
    const currentlyWorkingIn = formData.get("currentlyWorkingIn");
    const dateOfBirth = formData.get("dateOfBirth");
    const education = getJson("education");
    const experience = getJson("experience");
    const gender = formData.get("gender");
    const hobbies = getJson("hobbies");
    const mentorshipExperience = formData.get("mentorshipExperience");
    const mentorshipTopics = getJson("mentorshipTopics");
    const mobileNumber = formData.get("mobileNumber");
    const profileHeadline = formData.get("profileHeadline");
    const profileImage = formData.get("profileImage"); // This is a File object
    const skills = getJson("skills");
    const socials = getJson("socials");

    const bufferFromFile = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    };

    let profileImageUrl;
    let coverImageUrl;

    if (profileImage) {
      console.log("profile Image is not empty");
      const profileImageBuffer = await bufferFromFile(profileImage);
      const profileImageUrl = await uploadOnCloudinary(profileImageBuffer);
      if (!profileImageUrl) {
        return NextResponse.json(
          {
            message: "failed to upload Profile image :: please try again",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
      console.log(profileImageUrl);
    } else {
      console.log("profile Image is empty");
      profileImageUrl = alumniProfile.profileImage || "";
    }

    if (coverImage) {
      console.log("cover Image is not empty");
      const coverImageBuffer = await bufferFromFile(coverImage);
      const coverImageUrl = await uploadOnCloudinary(coverImageBuffer);
      if (!coverImageUrl) {
        return NextResponse.json(
          {
            message: "failed to upload cover image :: please try again",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
    } else {
      console.log("cover Image is empty");
      coverImageUrl = alumniProfile.coverImage || "";
    }

    const updatedAlumniProfile = await alumniProfileModel.findOneAndUpdate(
      { alumni: userId },
      {
        about,
        address,
        availableForMentorship,
        certifications,
        communicationLanguages,
        coverImage: coverImageUrl,
        currentExperience,
        currentlyWorkingAs,
        currentlyWorkingAt,
        currentlyWorkingIn,
        dateOfBirth,
        education,
        experience,
        gender,
        hobbies,
        mentorshipExperience,
        mentorshipTopics,
        mobileNumber,
        profileHeadline,
        profileImage: profileImageUrl,
        skills,
        socials,
      },
      { new: true, upsert: true }
    );

    console.log(updatedAlumniProfile);

    const alumni = await UserModel.findByIdAndUpdate(
      updatedAlumniProfile.alumni,
      {
        isProfileComplete: true,
      },
      {
        new: true,
      }
    );

    console.log(alumni);

    return NextResponse.json(
      {
        message: "alumni profile has been successfully updated",
        success: true,
      },
      {
        status: 200,
      }
    );
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
