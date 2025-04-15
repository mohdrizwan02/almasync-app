"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Globe,
  MapPin,
  Building,
  Briefcase,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock job data - in a real app, you would fetch this from an API
const jobData = {
  id: "job-123",
  title: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  logo: "/placeholder.svg?height=80&width=80",
  location: "San Francisco, CA (Remote Option)",
  salary: "$120,000 - $150,000",
  jobType: "Full-time",
  experience: "5+ years",
  postedDate: "2 days ago",
  applicationDeadline: "April 30, 2025",
  applicants: 42,
  description:
    "We're looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building responsive web applications, collaborating with designers, and mentoring junior developers.",
  responsibilities: [
    "Develop and maintain responsive web applications using React and Next.js",
    "Collaborate with designers to implement UI/UX designs",
    "Write clean, maintainable, and efficient code",
    "Perform code reviews and mentor junior developers",
    "Optimize applications for maximum speed and scalability",
  ],
  requirements: [
    "5+ years of experience in frontend development",
    "Strong proficiency in JavaScript, TypeScript, React, and Next.js",
    "Experience with responsive design and CSS frameworks like Tailwind",
    "Knowledge of frontend build tools and package managers",
    "Excellent problem-solving and communication skills",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Flexible remote work options",
    "Health, dental, and vision insurance",
    "401(k) matching",
    "Professional development budget",
    "Unlimited PTO policy",
  ],
};

export default function JobPostingPage({ params }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  const [isApplying, setIsApplying] = useState(false);
  console.log(params);

  const handleApply = () => {
    setIsApplying(true);

    setTimeout(() => {
      setIsApplying(false);
    }, 1500);
  };

  return (
    <div className=" ">
      {/* Banner Section */}
      <motion.div
        className=" h-64 bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="z-10"
          ></motion.div>
        </div>
      </motion.div>

      {/* Job Details Card */}
      <div className="container mx-auto px-4 -mt-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="shadow-xl container mx-auto  max-w-7xl mb-8">
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-shrink-0 bg-white rounded-lg p-2 shadow-sm">
                <img
                  src={jobData.logo || "/placeholder.svg"}
                  alt={`${jobData.company} logo`}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex-grow">
                <CardTitle className="text-2xl">{jobData.title}</CardTitle>
                <CardDescription className="text-lg">
                  {jobData.company}
                </CardDescription>
              </div>
              <motion.div
                className="mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" onClick={handleApply} disabled={isApplying}>
                  {isApplying ? "Applying..." : "Apply Now"}
                </Button>
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{jobData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span>{jobData.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <span>{jobData.jobType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{jobData.experience}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-medium">{jobData.postedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Apply by</p>
                    <p className="font-medium">{jobData.applicationDeadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Applicants</p>
                    <p className="font-medium">{jobData.applicants} applied</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-3">
                    Job Description
                  </h2>
                  <p className="text-gray-700">{jobData.description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-3">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap">
                    <motion.div
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      java
                    </motion.div>
                    <motion.div
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      java
                    </motion.div>
                    <motion.div
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      java
                    </motion.div>
                    <motion.div
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      java
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-3">
                    Responsibilities
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {jobData.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {jobData.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {jobData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center border-t pt-6">
              <div className="flex gap-2 mb-4 sm:mb-0">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Save Job</Button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={handleApply} disabled={isApplying}>
                    {isApplying ? "Applying..." : "Apply Now"}
                  </Button>
                </motion.div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Company Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">About {jobData.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <img
                      src={jobData.logo || "/placeholder.svg"}
                      alt={`${jobData.company} logo`}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 mb-4">
                    TechCorp Solutions is a leading technology company
                    specializing in building innovative web and mobile
                    applications. With a team of over 200 talented
                    professionals, we've been helping businesses transform their
                    digital presence since 2010.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-gray-500" />
                      <span>200+ employees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <span>techcorpsolutions.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Similar Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="cursor-pointer"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-lg p-1 shadow-sm">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Company logo"
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          Frontend Developer
                        </CardTitle>
                        <CardDescription>InnoTech Inc.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Remote</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>$90k-$120k</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      We're looking for a talented Frontend Developer to join
                      our team and help build amazing user experiences.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Badge variant="outline" className="text-xs">
                      Posted 3 days ago
                    </Badge>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
