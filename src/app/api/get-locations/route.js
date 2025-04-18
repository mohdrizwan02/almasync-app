import LocationModel from "@/models/location.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locations = await LocationModel.find();

    return NextResponse.json(
      {
        message: "successfully fetched skills",
        success: true,
        locationData: locations[0]?.locations,
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
