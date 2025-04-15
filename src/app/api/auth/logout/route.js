import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "user has been successfully logged out",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(),
      secure: true,
    });
    response.cookies.set("userRole", "", {
      httpOnly: true,
      expires: new Date(),
      secure: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
