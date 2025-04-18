"use client";
import { Check, ChevronsUpDown, LucideVerified, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { IoSparkles } from "react-icons/io5";

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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import MentorCard from "@/components/Mentor-Card";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

// Sample alumni data

const departmentsData = [
  "CSE",
  "CSD",
  "ECE",
  "EEE",
  "CIVIL",
  "PHE",
  "CHE",
  "CSBS",
  "CSM",
  "AIDS",
  "IT",
  "MECH",
];

export default function MentorsPage() {
  const [pageLoad, setPageLoad] = useState(true);
  const [isMentor, setIsMentor] = useState(false);
  const [totalMentors, setTotalMentors] = useState();
  const [skills, setSkills] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [mentorshipCategoriesData, setMentorshipCategoriesData] = useState([]);

  const [open, setOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const router = useRouter();

  const pathname = usePathname();
  useEffect(() => {
    axios
      .get("/api/get-skills")
      .then((response) => {
        if (response.data.success) {
          setSkills((prev) => response.data.skillData);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
    axios
      .get("/api/get-mentorship-categories")
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setMentorshipCategoriesData(
            (prev) => response.data.mentorshipCategoriesData
          );
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/mentorships/check-is-a-mentor")
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setIsMentor((prev) => response.data.isMentor);
        }
      })
      .catch((error) => {
        console.log("error occurred while checking mentorship");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/mentorships/get-all-mentors", {
        params: {
          category: selectedCategory,
          skill: selectedSkill,
          department: selectedDepartment,
          experience: selectedExperience,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setMentorData((prev) => response.data.mentorsData);
          setTotalMentors((prev) => response.data.totalMentors);
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        console.log("error occurred");
        router.push("/alumni");
      });
  }, [selectedCategory, selectedSkill, selectedDepartment, selectedExperience]);

  const resetFilters = () => {
    setSelectedDepartment("");
    setSelectedSkill("");
    setSelectedExperience("");
    setSelectedCategory("");
  };

  return (
    <>
      {pageLoad ? (
        <div className="container mx-auto max-w-7xl md:px-5">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-7xl md:px-5">
          <div className="flex flex-col min-h-screen bg-gray-50">
            <motion.section
              className="relative  w-full bg-gradient-to-br from-indigo-950 to-indigo-800 text-white py-12 md:py-16 lg:py-20 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full grid grid-cols-12 grid-rows-12">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border border-white/10"></div>
                  ))}
                </div>
              </div>

              <div className="container mx-auto px-4 relative z-10">
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
                    Top Mentors
                  </motion.h1>

                  <motion.p
                    className="text-lg md:text-xl text-white/80 mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Explore top mentors from your alumni network and seek
                    guidance and mentorship
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div>
                      <div className="text-4xl md:text-5xl font-bold">
                        {totalMentors || 0}
                      </div>
                      <div className="text-white/70 text-sm md:text-base">
                        Total Mentors
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold">50+</div>
                      <div className="text-white/70 text-sm md:text-base">
                        Skills
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold">13</div>
                      <div className="text-white/70 text-sm md:text-base">
                        Topics
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="flex justify-center mt-4">
                  {isMentor ? (
                    <Button
                      variant="secondary"
                      className="bg-white/10 text-xl flex items-center cursor-pointer hover:bg-white/20 text-white w-50 rounded-full"
                    >
                      <LucideVerified />
                      <motion.span
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className=""
                      >
                        Already a Mentor
                      </motion.span>
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="bg-white/10 text-xl flex items-center cursor-pointer hover:bg-white/20 text-white w-50 rounded-full"
                    >
                      <PlusIcon />
                      <motion.span
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className=""
                      >
                        Be a Mentor
                      </motion.span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.section>

            <div className="container mx-auto px-4 py-8">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Department Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <Select
                            onValueChange={(value) =>
                              setSelectedDepartment(value)
                            }
                            value={selectedDepartment}
                          >
                            <SelectTrigger className={"w-full max-w-72"}>
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departmentsData.map((dept, index) => (
                                <SelectItem key={index} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skills
                          </label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger className={""} asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full max-w-72 justify-between"
                              >
                                {selectedSkill
                                  ? skills.find(
                                      (skill) => skill === selectedSkill
                                    )
                                  : "Select skill"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full max-w-72 p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search skill.."
                                  className="h-9"
                                />
                                <CommandList className={"w-full max-w-72"}>
                                  <CommandEmpty>No skills found.</CommandEmpty>
                                  <CommandGroup>
                                    {skills.map((skill, index) => (
                                      <CommandItem
                                        key={index}
                                        value={skill}
                                        onSelect={(currentValue) => {
                                          setSelectedSkill(
                                            currentValue === selectedSkill
                                              ? ""
                                              : currentValue
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        {skill}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            selectedSkill === skill
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Experience Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience
                          </label>
                          <Select
                            onValueChange={(value) =>
                              setSelectedExperience(value)
                            }
                            value={selectedExperience}
                          >
                            <SelectTrigger className={"w-full max-w-72"}>
                              <SelectValue placeholder="Select Experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1+ years</SelectItem>
                              <SelectItem value="2">2+ years</SelectItem>
                              <SelectItem value="5">5+ years</SelectItem>
                              <SelectItem value="8">8+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categories
                          </label>
                          <Popover
                            open={categoryOpen}
                            onOpenChange={setCategoryOpen}
                          >
                            <PopoverTrigger className={""} asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={categoryOpen}
                                className="w-full max-w-72 justify-between"
                              >
                                {selectedCategory
                                  ? mentorshipCategoriesData.find(
                                      (category) =>
                                        category === selectedCategory
                                    )
                                  : "Select category"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full max-w-72 p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search mentorship categories.."
                                  className="h-9"
                                />
                                <CommandList className={"w-full max-w-72"}>
                                  <CommandEmpty>
                                    No categories found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {mentorshipCategoriesData.map(
                                      (category, index) => (
                                        <CommandItem
                                          key={index}
                                          value={category}
                                          onSelect={(currentValue) => {
                                            setSelectedCategory(
                                              currentValue === selectedCategory
                                                ? ""
                                                : currentValue
                                            );
                                            setCategoryOpen(false);
                                          }}
                                        >
                                          {category}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              selectedCategory === category
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      )
                                    )}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
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
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>

              {/* Results Header */}
              <motion.div
                className="flex  justify-between items-center  mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-gray-600 ">
                  Showing{" "}
                  <span className="font-medium text-gray-900">
                    {mentorData.length}
                  </span>{" "}
                  mentors
                </div>
                <div className="flex items-center">
                  <button className="p-4 text-white hover:bg-orange-400 cursor-pointer bg-orange-500 items-center rounded-full flex gap-1">
                    <IoSparkles className="text-2xl" />
                    Mentor Match
                  </button>
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
                  {mentorData.map((mentor, index) => (
                    <div key={index} className="flex justify-center">
                      <MentorCard mentor={mentor} />
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
