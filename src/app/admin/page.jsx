"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PieChartComponent from "@/components/pie-chart";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Award,
  Briefcase,
  BriefcaseBusinessIcon,
  CheckCheck,
  Circle,
  CircleCheck,
  CircleCheckBig,
  GraduationCap,
  Users,
  Verified,
} from "lucide-react";
import React from "react";
import BarChartComponent from "@/components/bar-chart";
import PieChartComponent2 from "@/components/pie-chart2";

const AdminPage = () => {
  const [collegeData, setCollegeData] = useState();
  useEffect(() => {
    axios
      .get("/api/colleges/get-colleges")
      .then((response) => {
        console.log(response.data.data[0]);

        setCollegeData((prev) => response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className=" items-center grid grid-cols-6 gap-3 col-span-3 bg-muted/50 p-3">
          <div className="col-span-4 space-y-2">
            <Label className={"text-2xl"}>Analytics Dashboard</Label>
            <Label className={"text-gray-700"}>
              A comprehensive overview of Alumni and Student Network
            </Label>
          </div>

          <div className="col-span-2">
            <div className="flex justify-end">
              <Select>
                <SelectTrigger className="max-w-30">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1days">Last 1 day</SelectItem>
                    <SelectItem value="7days">last 7 days</SelectItem>
                    <SelectItem value="30days">last 1 month</SelectItem>
                    <SelectItem value="90days">Last 3 months</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1">
        <div className="p-4">
          <Label>Alumni Insights</Label>
          <div className=" grid lg:grid-cols-4 gap-4 mt-5 sm:grid-cols-2 grid-cols-1">
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-blue-500/30 size-10 items-center justify-center rounded-lg flex ">
                <Users />
              </div>

              <Label className={"text-3xl font-bold text-blue-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Total Alumni
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                Overall registered alumni
              </Label>
            </div>
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-green-500/30 size-10 items-center justify-center rounded-lg flex ">
                <CircleCheckBig />
              </div>

              <Label className={"text-3xl font-bold text-green-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Verified Alumni
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                Verified percentage
              </Label>
            </div>
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-purple-500/30 size-10 items-center justify-center rounded-lg flex ">
                <Award />
              </div>

              <Label className={"text-3xl font-bold text-purple-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Profile Completion
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                No of completed profiles
              </Label>
            </div>
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-orange-500/30 size-10 items-center justify-center rounded-lg flex ">
                <Briefcase />
              </div>

              <Label className={"text-3xl font-bold text-orange-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Employment Rate
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                No of currently employed
              </Label>
            </div>
          </div>
          <div className=" grid bg-muted/70 shadow-lg gap-4 p-5 mt-5 md:grid-cols-2 sm:grid-cols-1">
            <PieChartComponent
              chartConfig={{
                CSE: { label: "CSE", color: "hsl(var(--color-chart-1))" },
                IT: { label: "IT", color: "hsl(var(--color-chart-2))" },
                CHE: { label: "CHE", color: "hsl(var(--color-chart-3))" },
                PHE: { label: "PHE", color: "hsl(var(--color-chart-4))" },
                CIVIL: {
                  label: "CIVIL",
                  color: "hsl(var(--color-chart-5))",
                },
                MECH: {
                  label: "MECH",
                  color: "hsl(var(--color-chart-6))",
                },
                CSD: { label: "CSD", color: "hsl(var(--color-chart-7))" },
                CSM: { label: "CSM", color: "hsl(var(--color-chart-8))" },
                CSBS: {
                  label: "CSBS",
                  color: "hsl(var(--color-chart-9))",
                },
                AIDS: {
                  label: "AIDS",
                  color: "hsl(var(--color-chart-10))",
                },
                ECE: {
                  label: "ECE",
                  color: "hsl(var(--color-chart-11))",
                },
                EEE: {
                  label: "EEE",
                  color: "hsl(var(--color-chart-12))",
                },
              }}
              chartData={[
                {
                  department: "CSE",
                  alumni: 320,
                  fill: "var(--color-chart-1)",
                },
                {
                  department: "IT",
                  alumni: 290,
                  fill: "var(--color-chart-2)",
                },
                {
                  department: "CHE",
                  alumni: 150,
                  fill: "var(--color-chart-3)",
                },
                {
                  department: "PHE",
                  alumni: 180,
                  fill: "var(--color-chart-4)",
                },
                {
                  department: "CIVIL",
                  alumni: 210,
                  fill: "var(--color-chart-5)",
                },
                {
                  department: "MECH",
                  alumni: 260,
                  fill: "var(--color-chart-6)",
                },
                {
                  department: "CSD",
                  alumni: 240,
                  fill: "var(--color-chart-7)",
                },
                {
                  department: "CSM",
                  alumni: 230,
                  fill: "var(--color-chart-8)",
                },
                {
                  department: "CSBS",
                  alumni: 190,
                  fill: "var(--color-chart-9)",
                },
                {
                  department: "AIDS",
                  alumni: 280,
                  fill: "var(--color-chart-10)",
                },
                {
                  department: "ECE",
                  alumni: 310,
                  fill: "var(--color-chart-11)",
                },
                {
                  department: "EEE",
                  alumni: 270,
                  fill: "var(--color-chart-12)",
                },
              ]}
              dataKey={"alumni"}
              nameKey={"department"}
              title={"Alumni Distribution"}
              description={"Alumni distribution across departments"}
              total={2390}
            />

            <PieChartComponent
              chartConfig={{
                CSE: { label: "CSE", color: "hsl(var(--color-chart-1))" },
                IT: { label: "IT", color: "hsl(var(--color-chart-2))" },
                CHE: { label: "CHE", color: "hsl(var(--color-chart-3))" },
                PHE: { label: "PHE", color: "hsl(var(--color-chart-4))" },
                CIVIL: {
                  label: "CIVIL",
                  color: "hsl(var(--color-chart-5))",
                },
                MECH: {
                  label: "MECH",
                  color: "hsl(var(--color-chart-6))",
                },
                CSD: { label: "CSD", color: "hsl(var(--color-chart-7))" },
                CSM: { label: "CSM", color: "hsl(var(--color-chart-8))" },
                CSBS: {
                  label: "CSBS",
                  color: "hsl(var(--color-chart-9))",
                },
                AIDS: {
                  label: "AIDS",
                  color: "hsl(var(--color-chart-10))",
                },
                ECE: {
                  label: "ECE",
                  color: "hsl(var(--color-chart-11))",
                },
                EEE: {
                  label: "EEE",
                  color: "hsl(var(--color-chart-12))",
                },
              }}
              chartData={[
                {
                  department: "CSE",
                  alumni: 320,
                  fill: "var(--color-chart-1)",
                },
                {
                  department: "IT",
                  alumni: 290,
                  fill: "var(--color-chart-2)",
                },
                {
                  department: "CHE",
                  alumni: 150,
                  fill: "var(--color-chart-3)",
                },
                {
                  department: "PHE",
                  alumni: 180,
                  fill: "var(--color-chart-4)",
                },
                {
                  department: "CIVIL",
                  alumni: 210,
                  fill: "var(--color-chart-5)",
                },
                {
                  department: "MECH",
                  alumni: 260,
                  fill: "var(--color-chart-6)",
                },
                {
                  department: "CSD",
                  alumni: 240,
                  fill: "var(--color-chart-7)",
                },
                {
                  department: "CSM",
                  alumni: 230,
                  fill: "var(--color-chart-8)",
                },
                {
                  department: "CSBS",
                  alumni: 190,
                  fill: "var(--color-chart-9)",
                },
                {
                  department: "AIDS",
                  alumni: 280,
                  fill: "var(--color-chart-10)",
                },
                {
                  department: "ECE",
                  alumni: 310,
                  fill: "var(--color-chart-11)",
                },
                {
                  department: "EEE",
                  alumni: 270,
                  fill: "var(--color-chart-12)",
                },
              ]}
              dataKey={"alumni"}
              nameKey={"department"}
              title={"Alumni Profile Completion"}
              description={"Alumni Profile Completion across departments"}
              total={2390}
            />
          </div>
        </div>
        <div className="p-4">
          <Label>Student Insights</Label>
          <div className=" grid lg:grid-cols-4 gap-4 mt-5 sm:grid-cols-2 grid-cols-1">
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-blue-500/30 size-10 items-center justify-center rounded-lg flex ">
                <Users />
              </div>

              <Label className={"text-3xl font-bold text-blue-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Total Students
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                Overall registered Students
              </Label>
            </div>
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-green-500/30 size-10 items-center justify-center rounded-lg flex ">
                <CircleCheckBig />
              </div>

              <Label className={"text-3xl font-bold text-green-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Verified Students
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                Verified percentage
              </Label>
            </div>
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-purple-500/30 size-10 items-center justify-center rounded-lg flex ">
                <GraduationCap />
              </div>

              <Label className={"text-3xl font-bold text-purple-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Students having mentors
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                percentage of students
              </Label>
            </div>
            <div className="bg-muted/70 p-5 space-y-3 shadow-lg rounded-xl">
              <div className=" p-1 bg-orange-500/30 size-10 items-center justify-center rounded-lg flex ">
                <Briefcase />
              </div>

              <Label className={"text-3xl font-bold text-orange-600"}>30</Label>

              <Label className={"text-gray-700 font-semibold"}>
                Applied for internship
              </Label>
              <Label className={"text-gray-500 font-medium"}>
                students applied for internship
              </Label>
            </div>
          </div>
          <div className=" grid gap-4 mt-5 p-5 bg-muted/70 lg:grid-cols-2 shadow-lg grid-cols-1">
            <BarChartComponent
              title="Student Distribution"
              description="Student distribution across departments"
              data={[
                { department: "CSE", students: 450 },
                { department: "IT", students: 300 },
                { department: "CHE", students: 200 },
                { department: "PHE", students: 150 },
                { department: "CIVIL", students: 180 },
                { department: "MECH", students: 220 },
                { department: "CSD", students: 280 },
                { department: "CSM", students: 270 },
                { department: "CSBS", students: 260 },
                { department: "AIDS", students: 240 },
                { department: "ECE", students: 400 },
                { department: "EEE", students: 350 },
              ]}
              dataKeyX="department"
              dataKeyY="students"
              config={{
                color: "var(--color-chart-1)", // Change this dynamically
              }}
            />

            <PieChartComponent2
              id="alumni-chart"
              title="Student Mentorship Distribution"
              description="Mentors across departments"
              chartConfig={{
                CSE: { label: "CSE", color: "var(--color-chart-1)" },
                IT: { label: "IT", color: "var(--color-chart-2)" },
                CHE: { label: "CHE", color: "var(--color-chart-3)" },
                PHE: { label: "PHE", color: "var(--color-chart-4)" },
                CIVIL: { label: "CIVIL", color: "var(--color-chart-5)" },
                MECH: { label: "MECH", color: "var(--color-chart-6)" },
                CSD: { label: "CSD", color: "var(--color-chart-7)" },
                CSM: { label: "CSM", color: "var(--color-chart-8)" },
                CSBS: { label: "CSBS", color: "var(--color-chart-9)" },
                AIDS: { label: "AIDS", color: "var(--color-chart-10)" },
                ECE: { label: "ECE", color: "var(--color-chart-11)" },
                EEE: { label: "EEE", color: "var(--color-chart-12)" },
              }}
              chartData={[
                { department: "CSE", students: 320 },
                { department: "IT", students: 290 },
                { department: "CHE", students: 150 },
                { department: "PHE", students: 180 },
                { department: "CIVIL", students: 210 },
                { department: "MECH", students: 260 },
                { department: "CSD", students: 240 },
                { department: "CSM", students: 230 },
                { department: "CSBS", students: 190 },
                { department: "AIDS", students: 280 },
                { department: "ECE", students: 310 },
                { department: "EEE", students: 270 },
              ]}
              dataKey="students"
              nameKey="department"
              labelText="Students"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
