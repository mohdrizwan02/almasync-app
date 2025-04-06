"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AlumniCard from "@/components/Alumni-Card";
import JobCard from "@/components/Job-Card";

// Sample alumni data
const alumniData = [
  {
    id: 1,
    name: "Ajudiya Keyur",
    classOf: "2024",
    degree: "Bachelor of Engineering",
    field: "Information Technology",
    verified: true,
  },
  {
    id: 2,
    name: "Arpit Dhameliya",
    classOf: "2025",
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    verified: true,
  },
  {
    id: 3,
    name: "Dhaval A",
    classOf: "2025",
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    verified: true,
  },
  {
    id: 4,
    name: "Dhyey Ladani",
    classOf: "2025",
    degree: "Bachelor of Engineering",
    field: "Information Technology",
    verified: true,
  },
  {
    id: 5,
    name: "Dipesh Mali",
    classOf: "2025",
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    verified: true,
  },
  {
    id: 6,
    name: "Divya Kaurani",
    classOf: "2025",
    degree: "Bachelor of Engineering",
    field: "Information Technology",
    verified: true,
  },
];

export default function JobsPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  return (
    <>
      <div className="container mx-auto max-w-7xl md:px-5">
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Hero Section */}
          <motion.section
            className="relative w-full bg-gradient-to-br from-indigo-950 to-indigo-800 text-white py-12 md:py-16 lg:py-20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full grid grid-cols-12 grid-rows-12">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-white/10"></div>
                ))}
              </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              {/* View Insights Button */}
              <div className="flex justify-end mb-6">
                <Button
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full"
                >
                  <motion.span
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    View Insights
                  </motion.span>
                </Button>
              </div>

              {/* Main Content */}
              <div className="text-center max-w-4xl mx-auto">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Job Opportunities
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/80 mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Explore number active opportunities across number active
                  companies
                </motion.p>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div>
                    <div className="text-4xl md:text-5xl font-bold">29</div>
                    <div className="text-white/70 text-sm md:text-base">
                      Total Alumni
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold">6</div>
                    <div className="text-white/70 text-sm md:text-base">
                      Companies
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold">13</div>
                    <div className="text-white/70 text-sm md:text-base">
                      Cities
                    </div>
                  </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                  className="relative max-w-2xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search alumni by name, skills, company..."
                      className="pl-10 pr-10 py-6 rounded-full bg-white/90 text-gray-800 w-full focus:ring-2 focus:ring-white"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Advanced Filters */}
            <motion.div
              className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="filters" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center text-gray-700">
                      <Filter className="h-5 w-5 mr-2 text-indigo-600" />
                      <span className="font-medium">Advanced Filters</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      <div className="max-w-80">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <Select className={"w-full"}>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="be">
                              Bachelor of Engineering
                            </SelectItem>
                            <SelectItem value="btech">
                              Bachelor of Technology
                            </SelectItem>
                            <SelectItem value="mtech">
                              Master of Technology
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="max-w-80">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Graduation Year
                        </label>
                        <Select>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="max-w-80">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Degree
                        </label>
                        <Select>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">BTECH</SelectItem>
                            <SelectItem value="it">MTECH</SelectItem>
                            <SelectItem value="ce">MBA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="max-w-80">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Company
                        </label>
                        <Select className={"w-full"}>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025">company 1</SelectItem>
                            <SelectItem value="2024">company 2</SelectItem>
                            <SelectItem value="2023">company 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="max-w-80">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Select className={"w-full"}>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025">location 1</SelectItem>
                            <SelectItem value="2024">location 2</SelectItem>
                            <SelectItem value="2023">location 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="mr-2">
                        Reset
                      </Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Results Header */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-gray-600 mb-4 sm:mb-0">
                Showing <span className="font-medium text-gray-900">29</span>{" "}
                alumni
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by</span>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="year">Graduation Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div
              className="container mx-auto"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Alumni Cards Grid */}
              <div className="grid grid-cols-1 container sm:px-0 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumniData.map((alumni, index) => (
                  <div key={index} className="flex justify-center">
                    <JobCard />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pagination */}
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-indigo-50 text-indigo-600"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </nav>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
