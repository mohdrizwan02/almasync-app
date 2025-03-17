"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import React from "react";

import { useState, useEffect } from "react";
import {
  Search,
  GraduationCap,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
  const sampleData = [
    {
      id: 1,
      email: "collegpt@gmail.com",
      degree: "Bachelor of Engineering",
      department: "Computer Engineering",
      graduation: "2024",
      enrollment: "21bece311",
      status: "Verified",
    },
    {
      id: 2,
      email: "ps5696@gmail.com",
      degree: "Bachelor of Engineering",
      department: "Computer Engineering",
      graduation: "2025",
      enrollment: "21BECE30125",
      status: "Verified",
    },
    {
      id: 3,
      email: "kushirgandhi2314@gmail.com",
      degree: "Bachelor of Engineering",
      department: "Computer Engineering",
      graduation: "2024",
      enrollment: "21BEIT20030",
      status: "Verified",
    },
    {
      id: 4,
      email: "prpriyanshi8@gmail.com",
      degree: "Bachelor of Engineering",
      department: "Computer Engineering",
      graduation: "2024",
      enrollment: "22SEBECE3001",
      status: "Verified",
    },
    {
      id: 5,
      email: "johndoe@gmail.com",
      degree: "Master of Science",
      department: "Information Technology",
      graduation: "2023",
      enrollment: "21MSIT4501",
      status: "Pending",
    },
    {
      id: 6,
      email: "janedoe@gmail.com",
      degree: "Bachelor of Technology",
      department: "Electrical Engineering",
      graduation: "2025",
      enrollment: "22BTEE1234",
      status: "Verified",
    },
  ];
  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
  };
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [filteredData, setFilteredData] = useState(sampleData);

  const degrees = getUniqueValues(sampleData, "degree");
  const departments = getUniqueValues(sampleData, "department");
  const batches = getUniqueValues(sampleData, "graduation");

  return (
    <>
      <div className="p-4 pt-0 space-y-3">
        <div className="bg-muted/70 p-4 rounded-lg flex justify-between items-center">
          <div className="space-y-3">
            <Label className={"text-xl font-bold"}>Alumni Directory</Label>
            <Label className={"text-gray-600 font-medium"}>
              Manage and track alumni network
            </Label>
          </div>
          <div className="flex ">
            <Button className={"flex cursor-pointer"}>
              <Upload />
              Upload CSV
            </Button>
          </div>
        </div>
        <div className="p-4 rounded-lg shadow items-center">
          <Accordion
            type="single"
            collapsible
            defaultValue="filters"
            className=" "
          >
            <AccordionItem value="filters" className="">
              <AccordionTrigger>Filters</AccordionTrigger>

              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-4 gap-4">
                  <div className="relative p-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search alumni..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={selectedDegree}
                    onValueChange={setSelectedDegree}
                    className={"p-1"}
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="All Degrees" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hello">All Degrees</SelectItem>
                      {degrees.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                    className={"p-1"}
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="All Departments" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">
                        All Departments
                      </SelectItem>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedBatch}
                    onValueChange={setSelectedBatch}
                    className={"p-1"}
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="All Batches" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="batches">All Batches</SelectItem>
                      {batches.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(searchTerm ||
                  selectedDegree ||
                  selectedDepartment ||
                  selectedBatch) && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* <div className="w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-500 font-medium">
                  EMAIL
                </TableHead>
                <TableHead className="text-gray-500 font-medium">
                  DEGREE
                </TableHead>
                <TableHead className="text-gray-500 font-medium">
                  DEPARTMENT
                </TableHead>
                <TableHead className="text-gray-500 font-medium">
                  GRADUATION
                </TableHead>
                <TableHead className="text-gray-500 font-medium">
                  ENROLLMENT
                </TableHead>
                <TableHead className="text-gray-500 font-medium">
                  STATUS
                </TableHead>
                <TableHead className="text-gray-500 font-medium">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <TableCell className="font-medium">{row.email}</TableCell>
                    <TableCell>{row.degree}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.graduation}</TableCell>
                    <TableCell>{row.enrollment}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {row.status === "Verified" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {row.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div> */}
      </div>
    </>
  );
};

export default page;
