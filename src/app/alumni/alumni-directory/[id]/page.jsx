"use client";

import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Share2,
  Globe,
  MessageSquare,
  Code,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Calendar,
  Shield,
  Clock,
  FileText,
  Briefcase,
  Award,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useEffect } from "react";

export default function ProfilePage() {
  const { id } = useParams();

  console.log(id)

  // useEffect(() => {
  //   axios
  //     .post("/api/analyse-profile" , userId)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2023 - Present",
      description:
        "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      period: "2021 - 2023",
      description:
        "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
      technologies: ["React", "Express.js", "PostgreSQL", "Docker", "Redis"],
    },
    {
      title: "Frontend Developer",
      company: "WebTech Studios",
      period: "2018 - 2021",
      description:
        "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.",
      technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"],
    },
  ];
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const timelineAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.8 },
    },
  };

  const skills = [
    "ReactJS",
    "NodeJS",
    "MongoDB",
    "Canva",
    "Figma",
    "ExpressJS",
    "Adobe",
    "Tailwind",
    "Material UI",
    "Next JS",
    "C",
    "C++",
    "Java",
    "Python",
    "Git",
    "Github",
    "Vercel",
    "kafka",
    "c#",
    "php",
    "mysql",
    "firebase",
    "supabase",
    "apache",
  ];

  const certificates = [
    {
      _id: "65f3e9c2c0a5b43a7a8d1f12",
      certificationName: "Meta Front-End Developer",
      certificationOrganization: "Meta",
      certificationIssueDate: "2024-05-01T00:00:00.000Z",
      certificationExpirationDate: "2027-05-01T00:00:00.000Z",
      certificationId: "META123456",
      certificationUrl:
        "https://www.coursera.org/account/accomplishments/meta-certification",
      certificationAssociatedSkills: [
        {
          _id: "65f3e9c2c0a5b43a7a8d1f13",
          type: "HTML",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f14",
          type: "CSS",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f15",
          type: "JavaScript",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f16",
          type: "React",
        },
      ],
      __v: 0,
    },
    {
      _id: "65f3e9c2c0a5b43a7a8d1f17",
      certificationName: "IBM Data Science Professional Certificate",
      certificationOrganization: "IBM",
      certificationIssueDate: "2024-03-15T00:00:00.000Z",
      certificationExpirationDate: "2027-03-15T00:00:00.000Z",
      certificationId: "IBM789012",
      certificationUrl:
        "https://www.coursera.org/account/accomplishments/ibm-certification",
      certificationAssociatedSkills: [
        {
          _id: "65f3e9c2c0a5b43a7a8d1f18",
          type: "Python",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f19",
          type: "Data Analysis",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f1a",
          type: "Machine Learning",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f1b",
          type: "SQL",
        },
      ],
      __v: 0,
    },
    {
      _id: "65f3e9c2c0a5b43a7a8d1f1c",
      certificationName:
        "Java Programming and Software Engineering Fundamentals",
      certificationOrganization: "Duke University",
      certificationIssueDate: "2024-02-10T00:00:00.000Z",
      certificationExpirationDate: "2027-02-10T00:00:00.000Z",
      certificationId: "DUKE345678",
      certificationUrl:
        "https://www.coursera.org/account/accomplishments/java-certification",
      certificationAssociatedSkills: [
        {
          _id: "65f3e9c2c0a5b43a7a8d1f1d",
          type: "Java",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f1e",
          type: "Object-Oriented Programming",
        },
        {
          _id: "65f3e9c2c0a5b43a7a8d1f1f",
          type: "Software Development",
        },
      ],
      __v: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <motion.div
        className="max-w-7xl container mx-auto h-48 bg-teal-700/80 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 -mt-24">
          {/* Left Column */}
          <motion.div
            className="md:w-1/3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Card */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={fadeIn}
            >
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="/bvrit-admin.png"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-2 border-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-bold mt-4">Alumni Name</h1>

                <div className="mt-4 text-sm text-gray-500">
                  ID: Adminssion number
                </div>
                <div className="flex items-center justify-between w-full mt-6 text-sm text-gray-500">
                  <div className="flex flex-col items-center">
                    <span>Degree</span>
                  </div>
                  <div className="text-gray-300">•</div>
                  <div className="flex flex-col items-center">
                    <span>Department</span>
                  </div>
                  <div className="text-gray-300">•</div>
                  <div className="flex flex-col items-center">
                    <span>Passout year</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Globe className="w-5 h-5" />
                  </button>
                </div>

                <motion.button
                  className="w-full bg-blue-600 text-white py-3 text-sm rounded-md mt-4 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Message
                </motion.button>

                <motion.button
                  className="w-full bg-blue-600 text-white py-3 text-sm rounded-md mt-3 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Code className="w-5 h-5 mr-2" />
                  Analyze Profile Compatibility
                </motion.button>

                <div className="flex justify-between w-full mt-6">
                  <div className="text-gray-500">Experience</div>
                  <div className="font-medium">1 years, 8 months</div>
                </div>

                <div className="flex justify-between w-full mt-3">
                  <div className="text-gray-500">Companies</div>
                  <div className="font-medium">3</div>
                </div>

                <div className="flex justify-between w-full mt-3">
                  <div className="text-gray-500">Skills</div>
                  <div className="font-medium">24</div>
                </div>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

              <div className="space-y-4">
                <div className="flex items-start flex-wrap">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Primary Email</div>
                    <div className="text-blue-500">alumi@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone Number</div>
                    <div>alumni phone number</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Academic Background */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold mb-4">
                Academic Background
              </h2>

              <div className="flex items-start mb-4">
                <div className="bg-gray-100 p-2 rounded-md mr-3">
                  <Building2 className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">BVRIT</div>
                  <div className="text-sm text-gray-500">Narsapur</div>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Degree</div>
                  <div className="font-medium">Alumni Degree</div>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Department</div>
                  <div className="font-medium">Alumni Department</div>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">Alumni Batch </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6 mb-4">College Stats</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-2xl font-bold text-blue-600">30+</div>
                  <div className="text-sm text-gray-500">Alumni Network</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-2xl font-bold text-green-600">80%</div>
                  <div className="text-sm text-gray-500">Placement Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="md:w-2/3 md:mt-30"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {/* Professional Journey */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold">Professional Journey</h2>
              <Timeline experiences={experiences} />
            </motion.div>

            {/* Skills & Expertise */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold mb-6">Skills & Expertise</h2>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold mb-6">
                Certificates and Credentials
              </h2>

              <motion.div
                className="flex flex-col gap-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {certificates.map((c, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-100 text-blue-600 p-2 text-xs  rounded-md flex items-center"
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex gap-2">
                      <div className="bg-blue-200 size-10 justify-center items-center flex rounded-xl">
                        <Award className="h-9 w-9 p-1" />
                      </div>
                      <div className="">
                        <h2 className="text-xl font-semibold mb-1">
                          {c.certificationName}
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-700 ">
                          {c.certificationOrganization}
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-700 ">
                          Issued {c.certificationIssueDate.slice(0, 10)}
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-700 ">
                          {c.certificationId}
                        </h2>
                        <div className="flex gap-1 flex-wrap">
                          {c.certificationAssociatedSkills.map(
                            (skill, index) => (
                              <motion.div
                                key={index}
                                className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                                variants={fadeIn}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Code className="w-4 h-4 mr-2" />
                                {skill.type}
                              </motion.div>
                            )
                          )}
                        </div>
                        <Button
                          variant={"secondary"}
                          className="flex flex-row w-20 mt-2 rounded-xl bg-white justify-center p-0 items-center"
                        >
                          show
                          <ExternalLink className="text-gray-600 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-blue-50 text-blue-600 px-2 text-xs py-1 rounded-md flex items-center"
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    {skill}
                  </motion.div>
                ))} */}
              </motion.div>
            </motion.div>

            {/* Current Overview */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold mb-6">Current Overview</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg flex items-start">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-green-600 font-medium">
                      Currently Employed
                    </div>
                    <div className="text-gray-600">Twitter</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-blue-600 font-medium">
                      Verified Alumni
                    </div>
                    <div className="text-gray-600">
                      Profile verified by institution
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-gray-500">Enrollment Number</div>
                    <div className="font-medium">21BEIT30035</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <div className="bg-purple-100 p-2 rounded-md mr-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-gray-500">Member Since</div>
                    <div className="font-medium">December 2024</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
