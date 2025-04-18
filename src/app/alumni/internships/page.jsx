"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, PlusIcon, ChevronsUpDown, Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InternshipCard from "@/components/Internship-Card";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const locations = [
  { id: 1, name: "Delhi" },
  { id: 2, name: "Bangalore" },
  { id: 3, name: "Chennai" },
  { id: 4, name: "Pune" },
  { id: 5, name: "remote" },
];

export default function InternshipsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [locationOpen, setLocationOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [internshipData, setInternshipData] = useState();
  const [pageLoad, setPageLoad] = useState(true);
  const [totalInternships, setTotalInternships] = useState();
  const [cities, setCities] = useState();
  const [companies, setCompanies] = useState();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");

  useEffect(() => {
    axios
      .get("/api/get-locations")
      .then((response) => {
        if (response.data.success) {
          setLocations((prev) => response.data.locationData);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/internships/get-all-internships", {
        params: {
          location: selectedLocation,
          workType: selectedWorkType,
          internshipType: selectedTiming,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setInternshipData((prev) => response.data.internshipData);
          setCities(
            (prev) => response.data.uniqueCities[0]?.uniqueCitiesCount || 0
          );
          setCompanies(
            (prev) =>
              response.data.uniqueCompanies[0]?.uniqueCompaniesCount || 0
          );
          setTotalInternships((prev) => response.data.totalInternships);
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
        <div className="container mx-auto max-w-7xl md:px-5">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
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
                    Internship Opportunities
                  </motion.h1>

                  <motion.p
                    className="text-lg md:text-xl text-white/80 mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Explore {totalInternships} active opportunities across{" "}
                    {companies} active companies
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
                        {totalInternships}
                      </div>
                      <div className="text-white/70 text-sm md:text-base">
                        Total Interships
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

                  <motion.div
                    className="relative max-w-2xl mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="secondary"
                        className="bg-white/10 text-xl flex items-center cursor-pointer hover:bg-white/20 text-white w-50 rounded-full"
                        onClick={() =>
                          router.push(`${pathname}/add-internship`)
                        }
                      >
                        <PlusIcon />
                        <motion.span
                          initial={{ x: -5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className=""
                        >
                          Post Internship
                        </motion.span>
                      </Button>
                    </div>
                  </motion.div>
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
                  <AccordionItem value="job-filters" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center text-gray-700">
                        <Filter className="h-5 w-5 mr-2 text-indigo-600" />
                        <span className="font-medium">Advanced Filters</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Location Filter */}
                        <div className="space-y-1">
                          <label className="block mb-1 text-sm font-medium">
                            Location
                          </label>
                          <Popover
                            open={locationOpen}
                            onOpenChange={setLocationOpen}
                          >
                            <PopoverTrigger className="" asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={locationOpen}
                                className="w-full max-w-72  justify-between"
                              >
                                {selectedLocation !== ""
                                  ? locations.find(
                                      (location) =>
                                        location === selectedLocation
                                    )
                                  : "Select location"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command className={"w-full"}>
                                <CommandInput
                                  placeholder="Search locaion"
                                  className="h-9"
                                />
                                <CommandList className={""}>
                                  <CommandEmpty>
                                    No locations found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {locations.map((location, index) => (
                                      <CommandItem
                                        key={index}
                                        value={location}
                                        onSelect={(currentValue) => {
                                          if (selectedLocation !== "") {
                                            setSelectedLocation((prev) => "");
                                          } else {
                                            setSelectedLocation(
                                              (prev) => currentValue
                                            );
                                          }
                                          setLocationOpen(false);
                                        }}
                                      >
                                        {location}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            selectedLocation === location
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

                        {/* Work Type Filter */}
                        <div className="space-y-1">
                          <label className="block mb-1 text-sm font-medium">
                            Internship type
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
                            Internship timing
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
                    {internshipData.length}
                  </span>{" "}
                  internships
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
                  {internshipData.map((internship, index) => (
                    <div key={index} className="flex justify-center">
                      <InternshipCard
                        internship={internship}
                        action={"alumni"}
                      />
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
