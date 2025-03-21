"use client";
import React from "react";
import { Label } from "./ui/label";

import { useRouter } from "next/navigation";

const HeroSection = ({ role }) => {
  const router = useRouter();

  return (
    <>
      <div className="w-full my-10 px-8 ">
        <div className="lg:flex justify-center">
          <div className=" grid   lg:grid-cols-2  items-center grid-cols-1 gap-5">
            <div className="hidden lg:block space-y-5">
              <Label className={"text-5xl font-bold "}>
                <span className="text-orange-500">Unlock</span>
                Your Career
              </Label>
              <Label className={"text-gray-700"}>
                Explore opportunities from across your alumni network , gain
                mentorship excel in your career
              </Label>
            </div>

            <div className="grid container mx-auto max-w-[600px] grid-cols-2 gap-y-2 gap-x-2">
              <button
                className="h-28 cursor-pointer transition transform hover:scale-105 w-full flex bg-indigo-500/50 justify-between  border-1 rounded-xl"
                onClick={() => router.push(`/${role}/student-directory`)}
              >
                <div className="mt-2 space-y-1 mx-2">
                  <Label className={"text-gray-900  text-[16px]"}>
                    Students
                  </Label>
                  <div className="">
                    <Label className={"font-normal text-[13px]"}>
                      Network{" "}
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      with your
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      College students
                    </Label>
                  </div>
                </div>
                <div className=""></div>
              </button>
              <button
                className="h-28 cursor-pointer transition transform hover:scale-105 w-full  flex bg-pink-500/50  justify-between border-1 rounded-xl  "
                onClick={() => router.push(`/${role}/alumni-directory`)}
              >
                <div className="mt-2 space-y-1 mx-2 ">
                  <Label className={"text-gray-900  text-[16px]"}>Alumni</Label>
                  <div className="">
                    <Label className={"font-normal text-[13px]"}>
                      Network{" "}
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      with your
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      College alumni
                    </Label>
                  </div>
                </div>
                <div className=""></div>
              </button>
              <button
                className="h-28 cursor-pointer transition transform hover:scale-105 w-full  flex bg-yellow-500/50 justify-between border-1 rounded-xl"
                onClick={() => router.push(`/${role}/internships`)}
              >
                <div className="mt-2 space-y-1 mx-2 ">
                  <Label className={"text-gray-900  text-[16px]"}>
                    Internships
                  </Label>
                  <div className="">
                    <Label className={"font-normal text-[13px]"}>Gain</Label>
                    <Label className={"font-normal text-[13px]"}>
                      Practical{" "}
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      Experience
                    </Label>
                  </div>
                </div>
                <div className=""></div>
              </button>
              <button
                className="h-28 cursor-pointer transition transform hover:scale-105 w-full  flex bg-cyan-500/50 justify-between border-1 rounded-xl"
                onClick={() => router.push(`/${role}/jobs`)}
              >
                <div className="mt-2 space-y-1 mx-2 ">
                  <Label className={"text-gray-900  text-[16px]"}>Jobs</Label>
                  <div className="">
                    <Label className={"font-normal text-[13px]"}>
                      Explore{" "}
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      Diverse careers
                    </Label>
                  </div>
                </div>
                <div className=""></div>
              </button>
              <button
                className="h-28 cursor-pointer transition transform hover:scale-105 w-full  bg-orange-500/60 flex justify-between border-1 rounded-xl"
                onClick={() => router.push(`/${role}/mentors`)}
              >
                <div className="mt-2 space-y-1 mx-2 ">
                  <Label className={"text-gray-900  text-[16px]"}>
                    Mentorships
                  </Label>
                  <div className="">
                    <Label className={"font-normal text-[13px]"}>
                      Guidance{" "}
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      from Alumni of
                    </Label>
                    <Label className={"font-normal text-[13px]"}>
                      your college
                    </Label>
                  </div>
                </div>
                <div className=""></div>
              </button>
              <button
                className="h-28 cursor-pointer transition transform hover:scale-105 w-full  flex justify-between bg-purple-500/50  border-1 rounded-xl"
                onClick={() => router.push(`/${role}/webinars`)}
              >
                <div className="mt-2 space-y-1 mx-2 ">
                  <Label className={"text-gray-900  text-[16px]"}>
                    Workshops
                  </Label>
                  <div className="">
                    <Label className={"font-normal text-[13px]"}>Learn </Label>
                    <Label className={"font-normal text-[13px]"}>
                      from your Alumni
                    </Label>
                  </div>
                </div>
                <div className=""></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
