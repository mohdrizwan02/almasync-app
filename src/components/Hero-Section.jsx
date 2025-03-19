import React from "react";
import { Label } from "./ui/label";

const HeroSection = () => {
  return (
    <>
      <div className="w-full ">
        <div className="flex-justify-center">
          <div className="grid lg:grid-cols-2 lg:mx-5 md:mx-40  items-center grid-cols-1 gap-5">
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

            <div className="grid lg:grid-cols-3 max-w-[600px] grid-cols-2  gap-3">
              <div className="h-28 w-full flex bg-indigo-500/50 justify-between border-1 rounded-lg p-">
                <div className="mt-2 space-y-3 mx-2">
                  <Label className={"text-gray-900  text-[20px]"}>
                    Students
                  </Label>
                  <div className="space-y-1">
                    <Label className={"font-normal"}>Network </Label>
                    <Label className={"font-normal"}>with your</Label>
                    <Label className={"font-normal"}>College students</Label>
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="h-28 w-full flex bg-pink-500/50  justify-between border-1 rounded-lg p-">
                <div className="mt-2 space-y-2 mx-2 ">
                  <Label className={"text-gray-900  text-[20px]"}>Alumni</Label>
                  <div className="space-y-1">
                    <Label className={"font-normal"}>Network </Label>
                    <Label className={"font-normal"}>with your</Label>
                    <Label className={"font-normal"}>College alumni</Label>
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="h-28 w-full flex bg-yellow-500/50 justify-between border-1 rounded-lg p-">
                <div className="mt-2 space-y-2 mx-2 ">
                  <Label className={"text-gray-900  text-[20px]"}>
                    Internships
                  </Label>
                  <div className="space-y-1">
                    <Label className={"font-normal"}>Gain</Label>
                    <Label className={"font-normal"}>Practical </Label>
                    <Label className={"font-normal"}>Experience</Label>
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="h-28 w-full flex bg-cyan-500/50 justify-between border-1 rounded-lg p-">
                <div className="mt-2 space-y-2 mx-2 ">
                  <Label className={"text-gray-900  text-[20px]"}>Jobs</Label>
                  <div className="space-y-1">
                    <Label className={"font-normal"}>Explore </Label>
                    <Label className={"font-normal"}>Diverse careers</Label>
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="h-28 w-full bg-orange-500/60 flex justify-between border-1 rounded-lg p-">
                <div className="mt-2 space-y-2 mx-2 ">
                  <Label className={"text-gray-900  text-[20px]"}>
                    Mentorships
                  </Label>
                  <div className="space-y-1">
                    <Label className={"font-normal"}>Guidance </Label>
                    <Label className={"font-normal"}>from Alumni of</Label>
                    <Label className={"font-normal"}>your college</Label>
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="h-28 w-full flex justify-between bg-purple-500/50  border-1 rounded-lg p-">
                <div className="mt-2 space-y-2 mx-2 ">
                  <Label className={"text-gray-900  text-[20px]"}>
                    Workshops
                  </Label>
                  <div className="space-y-1">
                    <Label className={"font-normal"}>Learn </Label>
                    <Label className={"font-normal"}>from your Alumni</Label>
                  </div>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
