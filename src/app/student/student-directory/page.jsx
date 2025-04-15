"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

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

import StudentCard from "@/components/Student-Card";

// Sample alumni data
const studentData = [
  {
    fullName: "Aarav Sharma",
    profileHeadline: "Aspiring Software Engineer",
    profileImageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    profileCoverImageUrl: "https://source.unsplash.com/1600x400/?coding,laptop",
    department: "Computer Science",
    batch: 2022,
  },
  {
    fullName: "Meera Patel",
    profileHeadline: "Machine Learning Enthusiast",
    profileImageUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    profileCoverImageUrl:
      "https://source.unsplash.com/1600x400/?artificial-intelligence,technology",
    department: "Information Technology",
    batch: 2023,
  },
  {
    fullName: "Rohan Mehta",
    profileHeadline: "Backend Development Nerd",
    profileImageUrl: "https://randomuser.me/api/portraits/men/31.jpg",
    profileCoverImageUrl:
      "https://source.unsplash.com/1600x400/?backend,server",
    department: "Electronics",
    batch: 2021,
  },
  {
    fullName: "Isha Singh",
    profileHeadline: "Creative UI/UX Designer",
    profileImageUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    profileCoverImageUrl: "https://source.unsplash.com/1600x400/?design,ui",
    department: "Computer Science",
    batch: 2024,
  },
  {
    fullName: "Karan Verma",
    profileHeadline: "Full-Stack Developer in the Making",
    profileImageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    profileCoverImageUrl:
      "https://source.unsplash.com/1600x400/?webdevelopment,code",
    department: "Mechanical",
    batch: 2022,
  },
  {
    fullName: "Neha Gupta",
    profileHeadline: "AI and Data Science Learner",
    profileImageUrl: "https://randomuser.me/api/portraits/women/54.jpg",
    profileCoverImageUrl:
      "https://source.unsplash.com/1600x400/?datascience,charts",
    department: "Information Technology",
    batch: 2021,
  },
  {
    fullName: "Arjun Nair",
    profileHeadline: "Cybersecurity Explorer",
    profileImageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    profileCoverImageUrl:
      "https://source.unsplash.com/1600x400/?cybersecurity,hacker",
    department: "Computer Science",
    batch: 2023,
  },
  {
    fullName: "Tanya Roy",
    profileHeadline: "Mobile App Developer",
    profileImageUrl: "https://randomuser.me/api/portraits/women/70.jpg",
    profileCoverImageUrl: "https://source.unsplash.com/1600x400/?mobile,apps",
    department: "Electronics",
    batch: 2024,
  },
  {
    fullName: "Vivaan Joshi",
    profileHeadline: "Cloud Computing Explorer",
    profileImageUrl: "https://randomuser.me/api/portraits/men/82.jpg",
    profileCoverImageUrl:
      "https://source.unsplash.com/1600x400/?cloudcomputing,aws",
    department: "Electrical",
    batch: 2022,
  },
  {
    fullName: "Pooja Deshmukh",
    profileHeadline: "Passionate Web Developer",
    profileImageUrl: "https://randomuser.me/api/portraits/women/91.jpg",
    profileCoverImageUrl: "https://source.unsplash.com/1600x400/?frontend,html",
    department: "Computer Science",
    batch: 2023,
  },
];

const departmentsData = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Finance" },
  { id: 4, name: "HR" },
];

const graduationYearsData = [
  { id: 1, name: "2020" },
  { id: 2, name: "2021" },
  { id: 3, name: "2022" },
  { id: 4, name: "2023" },
  { id: 5, name: "2024" },
];

function FilterDropdown({
  label,
  data,
  selected,
  setSelected,
  search,
  setSearch,
}) {
  const handleCheckboxChange = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((val) => val !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-80">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selected.length > 0
              ? `${selected.length} selected`
              : `Select ${label}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full p-4 space-y-3">
          <Input
            placeholder={`Search ${label.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea className="h-48 pr-2">
            {filtered.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 py-1">
                <Checkbox
                  id={`${label}-${item.id}`}
                  checked={selected.includes(item.name)}
                  onCheckedChange={() => handleCheckboxChange(item.name)}
                />
                <label htmlFor={`${label}-${item.id}`} className="text-sm">
                  {item.name}
                </label>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground text-sm mt-4">
                No {label.toLowerCase()} found.
              </div>
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function StudentDirectoryPage() {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [searchDept, setSearchDept] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedYears([]);
    setSearchDept("");
    setSearchYear("");
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
                  Student Directory
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/80 mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Connect with your growing community of college mates across in
                  our college.
                </motion.p>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div>
                    <div className="text-4xl md:text-5xl font-bold">29</div>
                    <div className="text-white/70 text-sm md:text-base">
                      Total Student
                    </div>
                  </div>

                  <div>
                    <div className="text-4xl md:text-5xl font-bold">13</div>
                    <div className="text-white/70 text-sm md:text-base">
                      Departments
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
                      placeholder="Search studnets by name, batch number, department.."
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
                <AccordionItem
                  value="dept-batch-filters"
                  className="border-none"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center text-gray-700">
                      <Filter className="h-5 w-5 mr-2 text-indigo-600" />
                      <span className="font-medium">
                        Department & Batch Filters
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FilterDropdown
                        label="Department"
                        data={departmentsData}
                        selected={selectedDepartments}
                        setSelected={setSelectedDepartments}
                        search={searchDept}
                        setSearch={setSearchDept}
                      />
                      <FilterDropdown
                        label="Graduation Year"
                        data={graduationYearsData}
                        selected={selectedYears}
                        setSelected={setSelectedYears}
                        search={searchYear}
                        setSearch={setSearchYear}
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={resetFilters}
                      >
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
                {studentData.map((student, index) => (
                  <div key={index} className="flex justify-center">
                    <StudentCard student={student} />
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
