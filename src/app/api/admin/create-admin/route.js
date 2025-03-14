import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(request) {
  const reqBody = await request.json();

  console.log(reqBody);

  const { email, password } = reqBody;

  try {
    const adminData = await Admin.find({ email: email });

    const existedAdmin = adminData[0];

    if (existedAdmin) {
      throw new Error("admin already exists with this email");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    if (!newAdmin) {
      throw new Error("server error occurred Unable to create admin");
    }

    return NextResponse.json(
      {
        message: "successfully created an admin",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "error occured by the server try again",
      },
      {
        status: 500,
      }
    );
  }
}
