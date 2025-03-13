import { NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(request) {
  const reqBody = await request.json();

  const { email, password } = reqBody;

  console.log(password);

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword }
  );

  console.log(user)
  console.log(hashedPassword)

  if (!user) {
    throw new Error("error updating the user password");
  }

  return NextResponse.json(
    {
      message: "user password hase been successfully changed",
      success: true,
    },
    {
      status: 200,
    }
  );
}
