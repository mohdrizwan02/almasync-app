import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const studentRoutes = [
    "/student",
    "/student/alumni-directory",
    "/student/student-directory",
    "/student/jobs",
    "/student/internships",
    "/student/mentors",
    "/student/webinars",
    "/student/internship-portal",
    "/demo",
  ];
  const adminRoutes = [
    "/admin",
    "/admin/alumni",
    "/admin/alumni-analytics",
    "/admin/students",
    "/admin/student-analytics",
    "/admin/jobs",
    "/admin/job-analytics",
    "/admin/internships",
    "/admin/internship-analytics",
    "/admin/mentorships",
    "/admin/mentorship-analytics",
  ];
  const alumniRoutes = ["/alumni"];

  const token = request.cookies.get("token")?.value || "";

  const userRole = request.cookies.get("userRole")?.value || "";

  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/login/admin" ||
    path === "/" ||
    path === "/forgot-password";

  if (token) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    } else {
      if (userRole === "student" && !studentRoutes.includes(path)) {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
      }
      if (userRole === "admin" && !adminRoutes.includes(path)) {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
      }
      if (userRole === "alumni" && !alumniRoutes.includes(path)) {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
      }
    }
  } else {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/signup",
    "/admin/:path*",
    "/student/:path*",
    "/alumni/:path*",
    "/forgot-password",
    "/demo",
  ],
};
