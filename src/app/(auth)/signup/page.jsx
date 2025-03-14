"use client";

import React, { useEffect } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/signup.schema";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [colleges, setColleges] = useState();
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    try {
      axios.get("/api/colleges/get-colleges").then((response) => {
        setColleges((prev) => response.data.data);
        setPageLoad((prev) => false);
      });
    } catch (error) {
      setPageLoad((prev) => false);
    }
  }, []);

  const admissionCurrentYear = new Date().getFullYear();
  const [admissionStartYear, setAdmissionStartYear] = useState(
    Math.floor(admissionCurrentYear / 10) * 10
  ); // Start of current decade

  const admissionYears = Array.from(
    { length: 10 },
    (_, i) => admissionStartYear + i
  );

  const passoutCurrentYear = new Date().getFullYear();
  const [passoutStartYear, setPassoutStartYear] = useState(
    Math.floor(passoutCurrentYear / 10) * 10
  ); // Start of current decade

  const passoutYears = Array.from(
    { length: 10 },
    (_, i) => passoutStartYear + i
  );

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      college: "",
      enrollmentNumber: "",
      admissionYear: "",
      passoutYear: "",
      degree: "",
      department: "",
      email: "",
      password: "",
    },
  });

  const passoutYear = form.watch("passoutYear");
  const admissionYear = form.watch("admissionYear");

  const collegeName = form.watch("college");
  const degreeName = form.watch("degree");

  function handleRegister(values) {
    console.log(values);
    const numberPassoutYear = Number(passoutYear);
    const numberAdmissionYear = Number(admissionYear);

    if (numberAdmissionYear > numberPassoutYear) {
      form.setError("passoutYear", {
        type: "manual",
        message: "Invalid passout year",
      });
      return;
    }

    let role;
    if (passoutYear >= currentYear) {
      role = "student";
    } else {
      role = "alumni";
    }

    console.log(role);

    if (role === "student") {
      console.log("creating profile for student");
      axios
        .post("/api/auth/signup/student", values)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("creating profile for alumni");
      axios
        .post("/api/auth/signup/alumni", values)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      {!pageLoad ? (
        <div className="min-h-screen relative overflow-hidden py-8">
          <div className="inset-0 z-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-center mb-6">
                <div className="container flex justify-center mx-auto">
                  <img src="/almasync.png" className="h-16" alt="logo image" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="hidden md:block md:w-5/12 bg-orange-500 relative overflow-hidden">
                    <div
                      className="absolute inset-0 z-0 opacity-10"
                      style={{
                        backgroundImage:
                          "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/border-vector-image.png?d=943x2825')",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                    ></div>
                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div className="p-8 flex-grow">
                        <div className="h-full flex flex-col">
                          <div className="transition-opacity duration-500 opacity-0 hidden">
                            <div className="aspect-w-16 aspect-h-9 mb-4">
                              <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/65799bf7b8ae5_frame_1000013237.png?d=700x700"
                                alt="Connect with Alumni"
                                className="w-full h-72 object-cover rounded-lg"
                              />
                            </div>
                            <div className="mt-4 text-gray-900">
                              <h3 className="text-lg font-bold">
                                Connect with Alumni
                              </h3>
                              <p className="mt-2 text-sm text-gray-800">
                                Join a vibrant community of graduates and expand
                                your professional network
                              </p>
                            </div>
                          </div>
                          <div className="transition-opacity duration-500 opacity-0 hidden ">
                            <div className="aspect-w-16 aspect-h-9 mb-4">
                              <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/66a3829b1d2da_jobs_internships.png?d=996x803"
                                alt="Access Opportunities"
                                className="w-full h-72 object-cover rounded-lg"
                              />
                            </div>
                            <div className="mt-4 text-gray-900">
                              <h3 className="text-lg font-bold">
                                Access Opportunities
                              </h3>
                              <p className="mt-2 text-sm text-gray-800">
                                Discover exclusive job postings and career
                                advancement opportunities
                              </p>
                            </div>
                          </div>
                          <div className="transition-opacity duration-500 opacity-100 ">
                            <div className="aspect-w-16 aspect-h-9 mb-4">
                              <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/un-pro/upgrade-banner-image.png?d=813x639"
                                alt="Stay Updated"
                                className="w-full h-72 object-cover rounded-lg"
                              />
                            </div>
                            <div className="mt-4 text-gray-900">
                              <h3 className="text-lg font-bold">
                                Stay Updated
                              </h3>
                              <p className="mt-2 text-sm text-gray-800">
                                Get the latest news and updates from your alma
                                mater
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/90 p-6 backdrop-blur-md mt-auto border-t border-amber-100/50 shadow-lg">
                        <div className="text-center space-y-4">
                          <div className="pt-2 border-t border-amber-100">
                            <p className="text-sm text-gray-600 mb-2">
                              By joining alma-sync, you agree to our
                            </p>
                            <div className="flex justify-center items-center space-x-4 text-sm font-medium">
                              <Button variant="link">Terms</Button>
                              <div className="w-1 h-1 rounded-full bg-amber-300"></div>
                              <Button variant="link">Privacy</Button>
                              <div className="w-1 h-1 rounded-full bg-amber-300"></div>
                              <Button variant="link">Guidelines</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-7/12 bg-white">
                    <div className="p-6 md:p-8">
                      <div
                        className="overflow-y-auto px-2 max-h-[70vh] space-y-6 pr-4"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "hsl(24.6, 95%, 53.1%)  transparent",
                        }}
                      >
                        <div className="mb-8">
                          <div className="flex items-start space-x-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                              Join Alma-Sync!
                              <span className="ml-2 inline-block animate-wave">
                                👋
                              </span>
                            </h2>
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600">
                              Create your account and unlock a world of
                              opportunities
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-amber-50 text-xs font-medium text-amber-700">
                                🎓 Alumni Network
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700">
                                💼 Job Opportunities
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-xs font-medium text-green-700">
                                🤝 Mentorship
                              </span>
                            </div>
                          </div>
                        </div>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(handleRegister)}
                            className="space-y-5"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div className="">
                                <FormField
                                  control={form.control}
                                  name="firstName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>First Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="">
                                <FormField
                                  control={form.control}
                                  name="lastName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Last Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            {/* Email */}
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder=""
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Password */}
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder=""
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="college"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>College</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your college" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="">
                                      {colleges.map((col, index) => (
                                        <SelectItem
                                          value={col.collegeName}
                                          key={index}
                                        >
                                          {col.collegeName}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Enrollment Number */}
                            <FormField
                              control={form.control}
                              name="enrollmentNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Enrollment Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-1">
                                {" "}
                                <FormField
                                  control={form.control}
                                  name="admissionYear"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Admission Year</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a year" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="">
                                          <div className="flex items-center justify-between p-1">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                if (
                                                  admissionStartYear + 9 >
                                                  2000
                                                ) {
                                                  setAdmissionStartYear(
                                                    (prev) => prev - 10
                                                  );
                                                }
                                              }}
                                            >
                                              <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <span className="font-semibold">
                                              {admissionStartYear} -{" "}
                                              {admissionStartYear + 9}
                                            </span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                if (
                                                  admissionStartYear + 9 <
                                                  admissionCurrentYear
                                                ) {
                                                  setAdmissionStartYear(
                                                    (prev) => prev + 10
                                                  );
                                                }
                                              }}
                                            >
                                              <ChevronRight className="w-4 h-4" />
                                            </Button>
                                          </div>

                                          <div className="grid grid-cols-3 gap-1 p-2">
                                            {admissionYears.map((year) => (
                                              <SelectItem
                                                key={year}
                                                value={year.toString()}
                                                className={
                                                  cn(
                                                    year >
                                                      admissionCurrentYear &&
                                                      "opacity-50 cursor-not-allowed"
                                                  ) +
                                                  "flex items-center justify-center p-2 rounded-md hover:bg-accent cursor-pointer"
                                                }
                                                disabled={
                                                  year > admissionCurrentYear
                                                }
                                              >
                                                {year}
                                              </SelectItem>
                                            ))}
                                          </div>
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="">
                                {" "}
                                <FormField
                                  control={form.control}
                                  name="passoutYear"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Passout Year</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a year" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="">
                                          <div className="flex items-center justify-between p-1">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                if (
                                                  passoutStartYear + 9 >
                                                  2000
                                                ) {
                                                  setPassoutStartYear(
                                                    (prev) => prev - 10
                                                  );
                                                }
                                              }}
                                            >
                                              <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <span className="font-semibold">
                                              {passoutStartYear} -{" "}
                                              {passoutStartYear + 9}
                                            </span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                if (
                                                  passoutStartYear + 9 <
                                                  passoutCurrentYear
                                                ) {
                                                  setPassoutStartYear(
                                                    (prev) => prev + 10
                                                  );
                                                }
                                              }}
                                            >
                                              <ChevronRight className="w-4 h-4" />
                                            </Button>
                                          </div>

                                          <div className="grid grid-cols-3 gap-1 p-2">
                                            {passoutYears.map((year) => (
                                              <SelectItem
                                                key={year}
                                                value={year.toString()}
                                                className={
                                                  cn(
                                                    year >
                                                      passoutCurrentYear + 4 &&
                                                      "opacity-50 cursor-not-allowed"
                                                  ) +
                                                  "flex items-center justify-center p-2 rounded-md hover:bg-accent cursor-pointer"
                                                }
                                                disabled={
                                                  year > passoutCurrentYear + 4
                                                }
                                              >
                                                {year}
                                              </SelectItem>
                                            ))}
                                          </div>
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="degree"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Degree</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your degree" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="">
                                      {colleges.map(
                                        (col) =>
                                          col.collegeName == collegeName &&
                                          col.collegeDegrees.map((deg) => (
                                            <SelectItem
                                              key={deg.degreeName}
                                              value={deg.degreeName}
                                            >
                                              {deg.degreeName}
                                            </SelectItem>
                                          ))
                                      )}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="department"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Department</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your department" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="">
                                      {colleges.map(
                                        (col) =>
                                          col.collegeName == collegeName &&
                                          col.collegeDegrees.map(
                                            (deg) =>
                                              deg.degreeName == degreeName &&
                                              deg.degreeDepartments.map(
                                                (dep) => (
                                                  <SelectItem
                                                    key={dep.departmentName}
                                                    value={dep.departmentName}
                                                  >
                                                    {dep.departmentName}
                                                  </SelectItem>
                                                )
                                              )
                                          )
                                      )}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button type="submit" className={"w-full h-10"}>
                              Submit
                            </Button>
                          </form>
                        </Form>
                        <div className="space-y-6">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-sm">
                              <span className="text-gray-600">
                                Already have an account?
                              </span>{" "}
                              <Button
                                variant="link"
                                onClick={() => router.push("/login")}
                              >
                                Login
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex py-8 justify-center">
          Loading ....
        </div>
      )}
    </>
  );
};

export default SignupPage;
