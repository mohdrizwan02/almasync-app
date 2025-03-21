"use client";
import HeroSection from "@/components/Hero-Section";

import React from "react";

import OpportunityCard from "@/components/Opportunity-Card";

import Carousel from "@/components/Opportunity-Carousel";

import MentorCarousel from "@/components/Mentor-Carousel";

const internships = [
  {
    id: 1,
    title: "Digital Marketing Internship",
    company: "Thinkcloudly",
    logo: "/placeholder.svg?height=60&width=60",
    type: "In Office",
    bgColor: "bg-green-400",
    applied: 4,
    daysLeft: 29,
  },
  {
    id: 2,
    title: "Video Editing Internship",
    company: "Whruts Writing LLP",
    logo: "/placeholder.svg?height=60&width=60",
    type: "WFH",
    bgColor: "bg-yellow-400",
    applied: 9,
    daysLeft: 11,
  },
  {
    id: 3,
    title: "Campus Ambassador",
    company: "Mindeniouss",
    logo: "/placeholder.svg?height=60&width=60",
    type: "WFH",
    bgColor: "bg-blue-400",
    applied: 25,
    daysLeft: 6,
  },
  {
    id: 4,
    title: "Social Media Specialist",
    company: "Whruts Writing LLP",
    logo: "/placeholder.svg?height=60&width=60",
    type: "WFH",
    bgColor: "bg-pink-400",
    applied: 11,
    daysLeft: 29,
  },
  {
    id: 5,
    title: "Content Writing Intern",
    company: "ContentCraft",
    logo: "/placeholder.svg?height=60&width=60",
    type: "WFH",
    bgColor: "bg-purple-400",
    applied: 18,
    daysLeft: 15,
  },
];

// Sample data for jobs
const jobs = [
  {
    id: 1,
    title: "Process Engineer",
    company: "Anivarti Ventures Private Limited",
    logo: "/placeholder.svg?height=60&width=60",
    type: "In Office",
    bgColor: "bg-purple-500",
    applied: 13,
    daysLeft: 29,
    views: null,
  },
  {
    id: 2,
    title: "Senior Sales Executive",
    company: "Thinkcloudly",
    logo: "/placeholder.svg?height=60&width=60",
    type: "In Office",
    bgColor: "bg-pink-500",
    views: 855,
    daysLeft: 29,
  },
  {
    id: 3,
    title: "Video Content Researcher",
    company: "Assessli",
    logo: "/placeholder.svg?height=60&width=60",
    type: "In Office",
    bgColor: "bg-blue-500",
    views: 1992,
    daysLeft: 11,
  },
  {
    id: 4,
    title: "Executive Administrative Assistant",
    company: "Intel",
    logo: "/placeholder.svg?height=60&width=60",
    type: "In Office",
    bgColor: "bg-yellow-500",
    views: 289,
    daysLeft: 13,
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "TechSolutions",
    logo: "/placeholder.svg?height=60&width=60",
    type: "WFH",
    bgColor: "bg-green-500",
    views: 732,
    daysLeft: 8,
  },
];

const mentors = [
  {
    id: 1,
    name: "Vedansh Dubey",
    rating: 4.9,
    photo: "/placeholder.svg?height=120&width=120",
    bgColor: "bg-purple-300",
    credentials:
      "HRBP @ Wipro | Unstop Top Mentor | 150+ Case Competitions | Unstop Top 1%",
    available: true,
  },
  {
    id: 2,
    name: "Dnyaneshwar Shinde",
    rating: 4.9,
    photo: "/placeholder.svg?height=120&width=120",
    bgColor: "bg-orange-200",
    credentials:
      "AIR 15 MBA CET 2024 |CAT 2023 96.53 |CMAT 2024 99.47| MAT FEB 2024 99.9%",
    available: true,
  },
  {
    id: 3,
    name: "Shiri Agarwal",
    rating: 4.9,
    photo: "/placeholder.svg?height=120&width=120",
    bgColor: "bg-purple-300",
    credentials:
      "Product @Telstra | AFBP Consumer Intern @Amazon | MBA @MDI Gurgaon'24 | 34 LPA",
    available: true,
  },
  {
    id: 4,
    name: "Yash Patel",
    rating: 4.8,
    photo: "/placeholder.svg?height=120&width=120",
    bgColor: "bg-purple-300",
    credentials:
      "Strategy @CEO's Office | Mentored 500+ Students | MDI Gurgaon , ESCP Europe | 30 LPA",
    available: true,
  },
  {
    id: 5,
    name: "Priya Sharma",
    rating: 4.9,
    photo: "/placeholder.svg?height=120&width=120",
    bgColor: "bg-orange-200",
    credentials:
      "Data Scientist @ Google | Stanford MBA | 10+ Years Experience | AI Specialist",
    available: true,
  },
];

const AlumniPage = () => {
  return (
    <>
      <div className="w-full px-2 flex justify-center">
        <div className="container max-w-6xl mx-auto">
          <HeroSection role ={"alumni"} />

          <div className="container mx-auto px-4 py-8">
            <Carousel
              title="Internships"
              subtitle="Find the Internships that fits your career aspirations."
              items={internships}
              itemLink={"alumni/internships"}
              renderItem={(item) => <OpportunityCard item={item} />}
            />
          </div>
          <div className="container mx-auto px-4 py-8">
            <Carousel
              title="Jobs"
              subtitle="Find the Jobs that fits your career aspirations."
              items={jobs}
              itemLink={"alumni/jobs"}
              renderItem={(item) => (
                <OpportunityCard item={item} isJob={true} />
              )}
            />
          </div>
          <div className="container mx-auto px-4 py-8">
            <MentorCarousel
              title="Top Mentors"
              subtitle="In search of excellence? Explore the highest-rated mentors as recognized by the learner community."
              mentors={mentors}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AlumniPage;
