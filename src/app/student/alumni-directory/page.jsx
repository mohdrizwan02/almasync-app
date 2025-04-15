"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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

import AlumniCard from "@/components/Alumni-Card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Filter } from "lucide-react";
import axios from "axios";

const alumniData = [
  {
    fullName: "Aarav Sharma",
    profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    role: "Senior Software Engineer",
    company: "Google",
    skills: ["Java", "System Design", "Cloud", "Kubernetes"],
    location: "Bengaluru",
    experience: "5 years",
    department: "Computer Science",
    passoutBatch: 2018,
  },
  {
    fullName: "Riya Mehta",
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    role: "Data Scientist",
    company: "Microsoft",
    skills: ["Python", "Machine Learning", "NLP", "TensorFlow"],
    location: "Hyderabad",
    experience: "4 years",
    department: "Information Technology",
    passoutBatch: 2019,
  },
  {
    fullName: "Karan Verma",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "DevOps Engineer",
    company: "Amazon",
    skills: ["AWS", "Docker", "CI/CD", "Linux"],
    location: "Delhi",
    experience: "3.5 years",
    department: "Electronics and Communication",
    passoutBatch: 2020,
  },
  {
    fullName: "Sneha Roy",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "UI/UX Designer",
    company: "Adobe",
    skills: ["Figma", "User Research", "Prototyping", "Adobe XD"],
    location: "Pune",
    experience: "4 years",
    department: "Computer Science",
    passoutBatch: 2019,
  },
  {
    fullName: "Vikram Nair",
    profileImage: "https://randomuser.me/api/portraits/men/52.jpg",
    role: "Product Manager",
    company: "Flipkart",
    skills: ["Product Strategy", "Agile", "JIRA", "User Stories"],
    location: "Bengaluru",
    experience: "6 years",
    department: "Mechanical Engineering",
    passoutBatch: 2017,
  },
  {
    fullName: "Ananya Gupta",
    profileImage: "https://randomuser.me/api/portraits/women/54.jpg",
    role: "Cybersecurity Analyst",
    company: "Infosys",
    skills: ["Ethical Hacking", "Network Security", "SIEM", "Python"],
    location: "Mumbai",
    experience: "3 years",
    department: "Information Technology",
    passoutBatch: 2020,
  },
  {
    fullName: "Rahul Deshmukh",
    profileImage: "https://randomuser.me/api/portraits/men/71.jpg",
    role: "AI Engineer",
    company: "TCS Research",
    skills: ["Deep Learning", "Computer Vision", "PyTorch", "Data Science"],
    location: "Chennai",
    experience: "5 years",
    department: "Artificial Intelligence",
    passoutBatch: 2018,
  },
  {
    fullName: "Nisha Sen",
    profileImage: "https://randomuser.me/api/portraits/women/78.jpg",
    role: "Full Stack Developer",
    company: "Zoho",
    skills: ["React", "Node.js", "MongoDB", "REST APIs"],
    location: "Coimbatore",
    experience: "4 years",
    department: "Computer Science",
    passoutBatch: 2019,
  },
  {
    fullName: "Aditya Rathi",
    profileImage: "https://randomuser.me/api/portraits/men/87.jpg",
    role: "Business Analyst",
    company: "Accenture",
    skills: ["Excel", "Power BI", "SQL", "Communication"],
    location: "Noida",
    experience: "3 years",
    department: "Electrical Engineering",
    passoutBatch: 2020,
  },
  {
    fullName: "Ishita Kapoor",
    profileImage: "https://randomuser.me/api/portraits/women/90.jpg",
    role: "Cloud Solutions Architect",
    company: "IBM",
    skills: ["Azure", "Terraform", "DevOps", "Networking"],
    location: "Gurgaon",
    experience: "6 years",
    department: "Information Technology",
    passoutBatch: 2017,
  },
];

const departmentsData = [
  "CSE",
  "CSD",
  "ECE",
  "EEE",
  "CIVIL",
  "PHE",
  "CHE",
  "CSBS",
];

const graduationYearsData = ["2020", "2021", "2022", "2023", "2024", "2025"];

const locationsData = ["Bangalore", "Delhi", "Mumbai", "Hyderabad", "Chennai"];

const companiesData = ["Google", "Microsoft", "Amazon", "Infosys", "TCS"];

export default function AlumniDirectoryPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [alumniData, setAlumniData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/alumni/get-all-alumni", {
        params: {
          department: selectedDepartment,
          batch: selectedBatch,
          company: selectedCompany,
          location: selectedLocation,
          sortBy: sortOption,
        },
      })
      .then((response) => {
        console.log(response);
        setAlumniData((prev) => response.data.alumniData);
      })
      .catch((error) => {});
  }, [
    selectedBatch,
    selectedCompany,
    selectedDepartment,
    selectedLocation,
    sortOption,
  ]);

  const resetFilters = () => {
    setSelectedDepartment("");
    setSelectedBatch("");
    setSelectedLocation("");
    setSelectedCompany("");
  };

  const applyFilters = () => {
    console.log({
      department: selectedDepartment,
      batch: selectedBatch,
      location: selectedLocation,
      company: selectedCompany,
    });
  };

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
                  Alumni Directory
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/80 mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Connect with our growing community of alumni across in our
                  college.
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
                <AccordionItem value="alumni-filters" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center text-gray-700">
                      <Filter className="h-5 w-5 mr-2 text-indigo-600" />
                      <span className="font-medium">Advanced Filters</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Department Filter */}
                      <div>
                        <label className="block mb-1 text-sm font-medium">
                          Department
                        </label>
                        <Select onValueChange={setSelectedDepartment}>
                          <SelectTrigger className={"w-full max-w-72"}>
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentsData.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Graduation Year Filter */}
                      <div>
                        <label className="block mb-1 text-sm font-medium">
                          Graduation Year
                        </label>
                        <Select onValueChange={setSelectedBatch}>
                          <SelectTrigger className={"w-full max-w-72"}>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {graduationYearsData.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Location Filter */}
                      <div>
                        <label className="block mb-1 text-sm font-medium">
                          Location
                        </label>
                        <Select onValueChange={setSelectedLocation}>
                          <SelectTrigger className={"w-full max-w-72"}>
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locationsData.map((loc) => (
                              <SelectItem key={loc} value={loc}>
                                {loc}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Company Filter */}
                      <div>
                        <label className="block mb-1 text-sm font-medium">
                          Company
                        </label>
                        <Select onValueChange={setSelectedCompany}>
                          <SelectTrigger className={"w-full max-w-72"}>
                            <SelectValue placeholder="Select Company" />
                          </SelectTrigger>
                          <SelectContent>
                            {companiesData.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                      <Button onClick={applyFilters}>Apply Filters</Button>
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
                <Select onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>

                    <SelectItem value="batch">Graduation Year</SelectItem>
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
                    <AlumniCard alumni={alumni} />
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
