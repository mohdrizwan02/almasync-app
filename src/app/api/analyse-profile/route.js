import { profileAnalysis } from "@/helpers/profileAnalysis";
import UserModel from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import alumniProfileModel from "@/models/alumniProfile.model";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const userRole = cookieStore.get("userRole")?.value;

    console.log(token);
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

    console.log(userId);

    let currentUserProfile;

    currentUserProfile = await alumniProfileModel.findOne(
      { alumni: userId },
      "skills firstName lastName currentlyWorkingAs currentlyWorkingAt communicationLanguages"
    );

    console.log(currentUserProfile);

    const prompt = `You are an AI that analyzes two professional profiles and writes a brief comparison of:
  
    1. Skills similarity
    2. Career alignment
    3. Mentorship compatibility (can one guide the other?)
    
    Profile A:
    Name: ${currentUserProfile.firstName} ${currentUserProfile.lastName}
    Role: ${currentUserProfile.currentlyWorkingAs}
    Skills: ${currentUserProfile.skills.join(", ")}
    Career:working at ${currentUserProfile.currentlyWorkingAt} as ${currentUserProfile.currentlyWorkingAs}
    
    Profile B:
    Name: ${currentUserProfile.firstName} ${currentUserProfile.lastName}
    Role: ${currentUserProfile.currentlyWorkingAs}
    Skills: ${currentUserProfile.skills.join(", ")}
    Career:working at ${currentUserProfile.currentlyWorkingAt} as ${currentUserProfile.currentlyWorkingAs}
    
    Write your analysis in 2-3 paragraphs.
    `;

    console.log(prompt);
    const response = await profileAnalysis(prompt);
    console.log(response);

    return NextResponse.json({
      data: response,
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
