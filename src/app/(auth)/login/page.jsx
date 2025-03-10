"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/login.schema";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const studentForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const alumniForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleStudentLogin(values) {
    setLoading((prev) => true);
    console.log(values);

    axios
      .post("/api/auth/login", values)
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        if (response.data.success) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          console.log(error.response.data.error);
        }
      });
  }

  function handleAlumniLogin(values) {
    setLoading((prev) => true);
    console.log(values);

    axios
      .post("/api/auth/login", values)
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        if (response.data.success) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          console.log(error.response.data.error);
        }
      });
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden py-8">
        <div className="inset-0 z-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="container flex justify-center mx-auto">
                <img src="/almasync.png" className="h-16" alt="logo image" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg  max-w-4xl mx-auto">
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
                        <div className="transition-opacity duration-500 opacity-0 hidden">
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
                        <div className="transition-opacity duration-500 opacity-100">
                          <div className="aspect-w-16 aspect-h-9 mb-4">
                            <img
                              src="https://d8it4huxumps7.cloudfront.net/uploads/images/un-pro/upgrade-banner-image.png?d=813x639"
                              alt="Stay Updated"
                              className="w-full h-72 object-cover rounded-lg"
                            />
                          </div>
                          <div className="mt-4 text-gray-900">
                            <h3 className="text-lg font-bold">Stay Updated</h3>
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
                <div className="w-full md:w-7/12 bg-white flex flex-col">
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
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
                            Welcome back to Alma-Sync!
                            <span className="ml-2 inline-block animate-wave">
                              👋
                            </span>
                          </h2>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            Sign in to your account to continue your journey
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
                      <Tabs defaultValue="student">
                        <TabsList className={"w-full"}>
                          <TabsTrigger value="student">Student</TabsTrigger>
                          <TabsTrigger value="alumni">Alumni</TabsTrigger>
                        </TabsList>
                        <TabsContent value="student">
                          <Form {...studentForm}>
                            <form
                              className="space-y-5 mt-2"
                              onSubmit={studentForm.handleSubmit(
                                handleStudentLogin
                              )}
                            >
                              <div className="flex justify-center">
                                <div className="">
                                  <Label
                                    className={
                                      "text-2xl w-full font-serif text-center "
                                    }
                                  >
                                    Student Login
                                  </Label>
                                </div>
                              </div>
                              <FormField
                                control={studentForm.control}
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
                              <FormField
                                control={studentForm.control}
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
                                control={studentForm.control}
                                name="rememberMe"
                                render={({ field }) => (
                                  <FormItem className={"flex "}>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>

                                    <FormLabel>Remember me</FormLabel>
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-between">
                                <Button type="submit" className="">
                                  Sign in
                                </Button>
                                <Button
                                  type="button"
                                  variant="link"
                                  onClick={() => router.push("forgot-password")}
                                >
                                  forgot password
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </TabsContent>
                        <TabsContent value="alumni">
                          <Form {...alumniForm}>
                            <form
                              className="space-y-5 mt-2"
                              onSubmit={alumniForm.handleSubmit(
                                handleAlumniLogin
                              )}
                            >
                              <div className="flex justify-center">
                                <div className="">
                                  <Label
                                    className={
                                      "text-2xl w-full font-serif text-center "
                                    }
                                  >
                                    Alumni Login
                                  </Label>
                                </div>
                              </div>
                              <FormField
                                control={alumniForm.control}
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
                              <FormField
                                control={alumniForm.control}
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
                                control={studentForm.control}
                                name="rememberMe"
                                render={({ field }) => (
                                  <FormItem className={"flex "}>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>

                                    <FormLabel>Remember me</FormLabel>
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-between">
                                <Button type="submit" className="">
                                  Sign in
                                </Button>
                                <Button
                                  type="button"
                                  variant="link"
                                  onClick={() => router.push("forgot-password")}
                                >
                                  forgot password
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </TabsContent>
                      </Tabs>

                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-600">
                              New to Alma-Sync ?
                            </span>{" "}
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => router.push("/signup")}
                            >
                              Register
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
    </>
  );
};

export default LoginPage;
