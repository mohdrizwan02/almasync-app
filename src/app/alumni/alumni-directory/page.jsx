"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, Search } from "lucide-react";
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

export default function AlumniDirectoryPage() {
  const [companies, setCompanies] = useState();
  const [cities, setCities] = useState();
  const [locations, setLocations] = useState([]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [totalAlumni, setTotalAlumni] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [sortOption, setSortOption] = useState("");
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

  const graduationYearsData = [
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];
  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/alumni/get-all-alumni", {
        params: {
          department: selectedDepartment,
          batch: selectedBatch,

          location: selectedLocation,
          sortBy: sortOption,
        },
      })
      .then((response) => {
        console.log(response);
        setAlumniData((prev) => response.data.alumniData);
        setCompanies(
          (prev) => response.data.companiesData[0]?.uniqueCompaniesCount
        );
        setCities((prev) => response.data.citiesData[0]?.uniqueCitiesCount);
        setTotalAlumni((prev) => response.data.totalAlumni);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedBatch, selectedDepartment, selectedLocation, sortOption]);

  useEffect(() => {
    axios
      .get("/api/get-locations")
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setLocations((prev) => response.data.locationData);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  const resetFilters = () => {
    setSelectedDepartment("");
    setSelectedBatch("");
    setSelectedLocation("");
  };

  return (
    <>
      {alumniData ? (
        <div className="container mx-auto max-w-7xl md:px-5">
          <div className="flex flex-col min-h-screen bg-gray-50">
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
                      <div className="text-4xl md:text-5xl font-bold">
                        {totalAlumni}
                      </div>
                      <div className="text-white/70 text-sm md:text-base">
                        Total Alumni
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
                  <AccordionItem value="alumni-filters" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center text-gray-700">
                        <Filter className="h-5 w-5 mr-2 text-indigo-600" />
                        <span className="font-medium">Advanced Filters</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium">
                            Department
                          </label>
                          <Select
                            value={selectedDepartment || undefined}
                            onValueChange={setSelectedDepartment}
                          >
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
                          <Select
                            value={selectedBatch || undefined}
                            onValueChange={setSelectedBatch}
                          >
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
                                          if (
                                            selectedLocation === currentValue
                                          ) {
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
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-gray-600 mb-4 sm:mb-0">
                  Showing{" "}
                  <span className="font-medium text-gray-900">
                    {alumniData.length}
                  </span>{" "}
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
                  {alumniData && alumniData.length > 0 ? (
                    alumniData.map((alumni, index) => (
                      <div key={index} className="flex justify-center">
                        <AlumniCard alumni={alumni} action={"alumni"} />
                      </div>
                    ))
                  ) : (
                    <div>No alumni to display</div>
                  )}
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
      ) : (
        <div className="container mx-auto max-w-7xl md:px-5">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
}
