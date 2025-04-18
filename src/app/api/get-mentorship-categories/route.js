import MentorshipCategoriesModel from "@/models/mentorshipCategories.model";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await MentorshipCategoriesModel.find();

    return NextResponse.json(
      {
        message: "successfully fetched skills",
        success: true,
        mentorshipCategoriesData: categories[0]?.mentorshipCategories,
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
