"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import JobCard from "@/components/Job-Card";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

// Sample data
const locations = [
  { id: 1, name: "Delhi" },
  { id: 2, name: "Mumbai" },
  { id: 3, name: "Bangalore" },
  { id: 4, name: "Hyderabad" },
  {
    id: 4,
    name: "remote",
  },
];

// Sample alumni data
const jobData = [
  {
    role: "Software Engineer",
    company: "Innovatech Systems",
    type: "Remote",
    experience: "1-3 years",
    salary: "₹8-12 LPA",
    location: "Bengaluru",
    skills: ["JavaScript", "React", "Node.js", "REST API"],
    postedDaysAgo: 3,
    isActive: true,
  },
  {
    role: "Data Analyst",
    company: "Insight Analytics",
    type: "Onsite",
    experience: "0-2 years",
    salary: "₹6-9 LPA",
    location: "Mumbai",
    skills: ["SQL", "Excel", "Tableau", "Python"],
    postedDaysAgo: 5,
    isActive: true,
  },
  {
    role: "DevOps Engineer",
    company: "CloudSphere Solutions",
    type: "Hybrid",
    experience: "2-4 years",
    salary: "₹10-15 LPA",
    location: "Hyderabad",
    skills: ["AWS", "Docker", "CI/CD", "Linux"],
    postedDaysAgo: 12,
    isActive: false,
  },
  {
    role: "UI/UX Designer",
    company: "DesignHive",
    type: "Remote",
    experience: "1-3 years",
    salary: "₹5-8 LPA",
    location: "Pune",
    skills: ["Figma", "Adobe XD", "User Flows", "Prototyping"],
    postedDaysAgo: 1,
    isActive: true,
  },
  {
    role: "Backend Developer",
    company: "StackBuilt Tech",
    type: "Onsite",
    experience: "3-5 years",
    salary: "₹12-18 LPA",
    location: "Chennai",
    skills: ["Java", "Spring Boot", "SQL", "Microservices"],
    postedDaysAgo: 7,
    isActive: true,
  },
  {
    role: "Cybersecurity Analyst",
    company: "SecureNet Corp",
    type: "Hybrid",
    experience: "2-4 years",
    salary: "₹10-14 LPA",
    location: "Delhi",
    skills: ["Network Security", "Firewalls", "SIEM", "Python"],
    postedDaysAgo: 15,
    isActive: false,
  },
  {
    role: "AI/ML Engineer",
    company: "NeuronX Labs",
    type: "Remote",
    experience: "1-2 years",
    salary: "₹14-20 LPA",
    location: "Remote",
    skills: ["Machine Learning", "TensorFlow", "Python", "NLP"],
    postedDaysAgo: 2,
    isActive: true,
  },
  {
    role: "Product Manager",
    company: "BrightBridge Tech",
    type: "Onsite",
    experience: "3-6 years",
    salary: "₹18-25 LPA",
    location: "Bengaluru",
    skills: ["Agile", "JIRA", "Roadmapping", "Stakeholder Management"],
    postedDaysAgo: 10,
    isActive: true,
  },
  {
    role: "Business Development Associate",
    company: "SalesSprint",
    type: "Remote",
    experience: "0-1 year",
    salary: "₹4-6 LPA + incentives",
    location: "Remote",
    skills: ["Communication", "CRM", "Sales", "Negotiation"],
    postedDaysAgo: 4,
    isActive: true,
  },
  {
    role: "Quality Assurance Engineer",
    company: "TestHive Pvt Ltd",
    type: "Onsite",
    experience: "1-2 years",
    salary: "₹6-10 LPA",
    location: "Kolkata",
    skills: ["Manual Testing", "Selenium", "Test Cases", "Bug Tracking"],
    postedDaysAgo: 9,
    isActive: false,
  },
];

export default function JobsPage() {
  const [pageLoad, setPageLoad] = useState(true);
  const [jobData, setJobData] = useState();
  const [cities, setCities] = useState();
  const [companies, setCompanies] = useState();
  const [totalJobs, setTotalJobs] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");

  useEffect(() => {
    axios
      .get("/api/jobs/get-all-jobs", {
        params: {
          location: selectedLocation,
          workType: selectedWorkType,
          jobType: selectedTiming,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setJobData((prev) => response.data.jobData);
          setCities((prev) => response.data.uniqueCities[0]?.uniqueCitiesCount);
          setCompanies(
            (prev) => response.data.uniqueCompanies[0]?.uniqueCompaniesCount
          );
          setTotalJobs((prev) => response.data.totalJobs);
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        console.log(error);
        setPageLoad((prev) => false);
      });
  }, [selectedLocation, selectedTiming, selectedWorkType]);

  const resetAll = () => {
    setSelectedLocation("");
    setSelectedWorkType("");
    setSelectedTiming("");
  };

  return (
    <>
      {pageLoad ? (
        <div className="container mx-auto max-w-7xl md:px-5">loading..</div>
      ) : (
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
                      <div className="text-4xl md:text-5xl font-bold">
                        {totalJobs}
                      </div>
                      <div className="text-white/70 text-sm md:text-base">
                        Total Jobs
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold">
                        {companies}
                      </div>
                      <div className="text-white/70 text-sm md:text-base">
                        Companies
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold">
                        {cities}
                      </div>
                      <div className="text-white/70 text-sm md:text-base">
                        Cities
                      </div>
                    </div>
                  </motion.div>

                
                 
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    variant="secondary"
                    className="bg-white/10 text-xl flex items-center cursor-pointer hover:bg-white/20 text-white w-50 rounded-full"
                    onClick={() => router.push(`${pathname}/add-job`)}
                  >
                    <PlusIcon />
                    <motion.span
                      initial={{ x: -5, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className=""
                    >
                      Post Job
                    </motion.span>
                  </Button>
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
                  <AccordionItem value="job-filters" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center text-gray-700">
                        <Filter className="h-5 w-5 mr-2 text-indigo-600" />
                        <span className="font-medium">Job Filters</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Location Filter */}
                        <div className="space-y-1">
                          <label className="block mb-1 text-sm font-medium">
                            Location
                          </label>
                          <Select
                            value={selectedLocation}
                            onValueChange={(value) =>
                              setSelectedLocation(value)
                            }
                          >
                            <SelectTrigger className={"w-full max-w-72"}>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location, idx) => (
                                <SelectItem key={idx} value={location.name}>
                                  {location.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Work Type Filter */}
                        <div className="space-y-1">
                          <label className="block mb-1 text-sm font-medium">
                            Work type
                          </label>
                          <Select
                            value={selectedWorkType}
                            onValueChange={(value) =>
                              setSelectedWorkType(value)
                            }
                          >
                            <SelectTrigger className={"w-full max-w-72"}>
                              <SelectValue placeholder="Select work type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="onsite">On-site</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Job Timing Filter */}
                        <div className="space-y-1">
                          <label className="block mb-1 text-sm font-medium">
                            Job timing
                          </label>
                          <Select
                            value={selectedTiming}
                            onValueChange={(value) => setSelectedTiming(value)}
                          >
                            <SelectTrigger className={"w-full max-w-72"}>
                              <SelectValue placeholder="Select timing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fulltime">
                                Full-time
                              </SelectItem>
                              <SelectItem value="parttime">
                                Part-time
                              </SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="internship">
                                Internship
                              </SelectItem>
                              <SelectItem value="freelance">
                                Freelance
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={resetAll}
                        >
                          Reset
                        </Button>
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
                  Showing{" "}
                  <span className="font-medium text-gray-900">
                    {jobData.length}
                  </span>{" "}
                  jobs
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
                  {jobData.map((job, index) => (
                    <div key={index} className="flex justify-center">
                      <JobCard job={job} />
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
      )}
    </>
  );
}
