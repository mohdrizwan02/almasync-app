import SkillModel from "@/models/skill.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const skills = await SkillModel.find();

    return NextResponse.json(
      {
        message: "successfully fetched skills",
        success: true,
        skillData: skills[0]?.skills,
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
