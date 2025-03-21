"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Users,
  Code2,
  Megaphone,
  Settings,
  IndianRupee,
  Search,
  Briefcase,
  FileText,
  Plus,
  Award,
  Building2,
} from "lucide-react";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

const InternshipPortal = () => {
  return (
    <>
      <div className="lg:mx-10 sm:mx-5">
        <div className="container mx-auto px-4 py-6 md:py-12">
          {/* Hero Section - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-16">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-orange-500">Unlock</span> Exposure
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Apply to a plethora of hiring opportunities & work with your
                dream companies!
              </p>
              <div className="flex gap-4">
                <Button className="">Find Internships</Button>
              </div>
            </div>
            <div className="relative w-[450px] h-[300px]">
              <Image
                src="/placeholder.svg?height=300&width=450"
                alt="Internship opportunities"
                width={450}
                height={300}
                className="object-contain"
              />

              {/* Feature badges */}
              <div className="absolute top-0 right-0">
                <div className="bg-white rounded-lg shadow-md p-2 mb-3 flex items-center">
                  <div className="bg-red-100 rounded-full p-1 mr-2">
                    <Award className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm">Paid internships</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-2 mb-3 flex items-center">
                  <div className="bg-yellow-100 rounded-full p-1 mr-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                  <span className="text-sm">Certification</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-2 mb-3 flex items-center">
                  <div className="bg-blue-100 rounded-full p-1 mr-2">
                    <Building2 className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-sm">Top Companies</span>
                </div>
              </div>

              {/* Stats badge */}
              <div className="absolute bottom-0 right-0 bg-white rounded-lg shadow-md p-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                  </div>
                  <div>
                    <div className="font-bold text-green-500">11M+</div>
                    <div className="text-xs">Got hiring opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cards - Only visible on mobile */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 rounded-xl p-6 col-span-2 flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-3">
                <Briefcase className="h-6 w-6" />
              </div>
              <p className="text-center font-medium">Explore Internships</p>
              <div className="flex mt-2 bg-white rounded-full p-1 shadow-sm">
                <span className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  G
                </span>
                <span className="h-6 w-6 rounded-full bg-black flex items-center justify-center text-white text-xs ml-1">
                  A
                </span>
              </div>
            </div>
          </div>

          {/* Internship Categories */}
          <div className="mb-16">
            <div className="flex items-baseline mb-6">
              <h2 className="text-xl font-bold">Internships Category</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center md:gap-3">
                <div className="bg-red-50 p-3 rounded-full mb-2 md:mb-0">
                  <Users className="h-5 w-5 text-red-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className={`font-medium ${!isMobile ? "text-sm" : ""}`}>
                    Human resources
                  </p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center md:gap-3">
                <div className="bg-purple-50 p-3 rounded-full mb-2 md:mb-0">
                  <Code2 className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-medium">Software Development</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center md:gap-3">
                <div className="bg-blue-50 p-3 rounded-full mb-2 md:mb-0">
                  <Megaphone className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-medium">Marketing</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center md:gap-3">
                <div className="bg-green-50 p-3 rounded-full mb-2 md:mb-0">
                  <Settings className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-medium">Operations</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center md:gap-3">
                <div className="bg-orange-50 p-3 rounded-full mb-2 md:mb-0">
                  <IndianRupee className="h-5 w-5 text-orange-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-medium">Finance</p>
                </div>
              </div>

              {/* Explore all - Mobile only */}
              <div className="md:hidden bg-white border rounded-lg p-4 flex flex-col items-center">
                <div className="bg-gray-50 p-3 rounded-full mb-2">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <p className="font-medium">Explore all</p>
              </div>
            </div>
          </div>

          {/* Recommended Internships - Desktop only */}
          <div className="hidden md:block">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold mr-3">
                Recommended Internships
              </h2>
              <div className="border border-yellow-500 rounded-full px-4 py-1 text-sm">
                FOR YOU
              </div>
              <div className="ml-auto">
                <Image
                  src="/placeholder.svg?height=50&width=100"
                  alt="Decoration"
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              Looking for the best of the best? Here're the top-rated
              Internships by the learners' community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipPortal;
