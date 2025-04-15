"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  GraduationCap,
  Building2,
  LucideBriefcaseBusiness,
  MonitorPlay,
  Users2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import FAQSection from "@/components/Faq-Section";
import axios from "axios";
import ProfileCompleteBanner from "@/components/ProfileCompleteBanner";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const carouselItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonHover = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const AlumniPage = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [bannerStatus, setBannerStatus] = useState();
  const [studentData, setStudentData] = useState([]);

  const [alumniData, setAlumniData] = useState([]);

  const [jobData, setjobData] = useState([]);

  const [internshipData, setInternShipData] = useState([]);

  const [mentorData, setMentorData] = useState([]);

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    try {
      axios.get("/api/check-profile-status").then((response) => {
        console.log(response);
        if (!response.data.data.isProfileComplete) {
          setBannerStatus((prev) => true);
        }
      });
    } catch (error) {
      console.error("Error checking profile:", error);
    }
    try {
      axios
        .get("/api/alumni/get-recent-alumni")
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setAlumniData((prev) => response.data.alumniData);
          }
        })
        .catch((error) => {
          console.log("error occurred");
        });

      axios
        .get("/api/students/get-recent-students")
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setStudentData((prev) => response.data.studentData);
          }
        })
        .catch((error) => {
          console.log("error occurred");
        });

      axios
        .get("/api/mentorships/get-recent-mentors")
        .then((response) => {
          if(response.data.success){
            setMentorData((prev)=>response.data.mentorData)
          }
        })
        .catch((error) => {
          console.log("error occurred");
        });

      axios
        .get("/api/jobs/get-recent-jobs")
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setjobData((prev) => response.data.jobData);
          }
        })
        .catch((error) => {
          console.log("error occurred");
        });

      axios
        .get("/api/internships/get-recent-internships")
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setInternShipData((prev) => response.data.internshipData);
          }
        })
        .catch((error) => {
          console.log("error occurred");
        });

      axios
        .get("/api/events/get-recent-events")
        .then((response) => {})
        .catch((error) => {
          console.log("error occurred");
        });
    } catch (error) {
      console.log("error occurred");
    } finally {
      setPageLoad((prev) => false);
    }
  }, []);

  const features = [
    {
      icon: <Users2 className="h-8 w-8 text-white" />,
      title: "Alumni Network",
      description:
        "Connect with a diverse community of successful graduates across industries.",
      color: "bg-purple-500",
      learnMoreColor: "text-purple-500",
      action: "alumni-directory",
    },
    {
      icon: <Users2 className="h-8 w-8 text-white" />,
      title: "Student Network",
      description:
        "Connect with a diverse community of peers across your college.",
      color: "bg-rose-500",
      learnMoreColor: "text-rose-500",
      action: "student-directory",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-white" />,
      title: "Job Opportunities",
      description: "Access exclusive job and career opportunities.",
      color: "bg-blue-500",
      learnMoreColor: "text-blue-500",
      action: "jobs",
    },
    {
      icon: <Building2 className="h-8 w-8 text-white" />,
      title: "Internship Opportunities",
      description: "Access exclusive internship and career opportunities.",
      color: "bg-orange-500",
      learnMoreColor: "text-orange-500",
      action: "internships",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      title: "Mentorship",
      description:
        "Be a Mentor and guide the student of your college and share your valuable experiences",
      color: "bg-green-500",
      learnMoreColor: "text-green-500",
      action: "mentorships",
    },
  ];

  const router = useRouter();
  return (
    <>
      {bannerStatus && (
        <ProfileCompleteBanner
          title={" Your profile is incomplete!"}
          description={
            "Completing your profile helps you get better recommendations and visibility."
          }
          bannerStatus={bannerStatus}
          buttonLink={"/alumni/profile/complete-profile"}
          buttonText={"complete Profile"}
        />
      )}

      {
        <>
          <motion.div
            className="flex flex-col items-center  sm:space-y-6 space-y-4 bg-white sm:px-6 px-2 py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <motion.div
              className="md:flex flex-col hidden justify-center mx-5 space-y-4 items-center max-w-screen-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Label className={"md:text-3xl lg:text-5xl"}>
                Empower Your Professional Journey
              </Label>
              <Label className={"text-center text-gray-700"}>
                Discover powerful tools and resources designed to accelerate
                your career growth.
              </Label>
            </motion.div>
            <motion.div
              className="md:hidden flex-start mx-5 max-w-screen-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Label className={"text-2xl text-center"}>
                Discover Features and Resouces on this Platform
              </Label>
            </motion.div>

            <motion.div
              className="w-full max-w-screen-xl overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
            >
              <Carousel
                type={"feature"}
                data={features}
                itemAnimation={carouselItem}
                action={"alumni"}
              />
            </motion.div>
          </motion.div>

          {jobData.length > 0 && (
            <motion.div
              className="flex flex-col sm:space-y-6 space-y-4 bg-white items-center justify-center sm:px-6 px-2 py-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
            >
              <motion.div
                className="md:flex flex-col hidden justify-center mx-5 space-y-4 items-center max-w-screen-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"md:text-3xl lg:text-5xl"}>
                  Latest Job Opportunities
                </Label>
                <Label className={"text-center text-gray-700"}>
                  Exclusive positions from top companies in your network.
                </Label>
              </motion.div>
              <motion.div
                className="md:hidden  flex-start mx-5 max-w-screen-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"text-2xl"}>
                  {" "}
                  Explore exciting job opportunities
                </Label>
              </motion.div>

              <motion.div
                className="w-full max-w-screen-xl overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
              >
                <Carousel type={"job"} data={jobData} action="alumni" />
              </motion.div>
              <motion.button
                className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
                onClick={() => router.push("/alumni/jobs")}
              >
                <LucideBriefcaseBusiness /> View All Jobs
              </motion.button>
            </motion.div>
          )}

          {internshipData.length > 0 && (
            <motion.div
              className="flex flex-col sm:space-y-6 space-y-4 bg-gray-100/50 items-center justify-center sm:px-6 px-2 py-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
            >
              <motion.div
                className="md:flex flex-col hidden justify-center mx-5 space-y-4 items-center max-w-screen-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"md:text-3xl lg:text-5xl"}>
                  {" "}
                  Latest Internship Opportunities
                </Label>
                <Label className={"text-center text-gray-700"}>
                  Kickstart your career with top internships that match your
                  skills and ambitions.
                </Label>
              </motion.div>
              <motion.div
                className="md:hidden flex flex-start mx-5 max-w-screen-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"text-2xl text-center"}>
                  Explore exciting internship opportunities
                </Label>
              </motion.div>

              <motion.div
                className="w-full max-w-screen-xl overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
              >
                <Carousel
                  type={"internship"}
                  data={internshipData}
                  action={"alumni"}
                />
              </motion.div>
              <motion.button
                className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
                onClick={() => router.push("/alumni/internships")}
              >
                <Building2 /> View All Internships
              </motion.button>
            </motion.div>
          )}

          {alumniData.length > 0 && (
            <motion.div
              className="flex flex-col sm:space-y-6 space-y-4 bg-white items-center justify-center  sm:px-6 px-2 py-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <motion.div
                className="md:flex flex-col hidden justify-center mx-5 space-y-4 items-center max-w-screen-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"md:text-3xl lg:text-5xl"}>
                  Explore Our Alumni Network
                </Label>
                <Label className={"text-center text-gray-700"}>
                  Connect with our vibrant college alumni.
                </Label>
              </motion.div>
              <motion.div
                className="md:hidden flex-start text-start mx-5 max-w-screen-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"text-2xl text-center"}>
                  Explore Alumni Network
                </Label>
              </motion.div>

              <motion.div
                className="w-full max-w-screen-xl overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
              >
                <Carousel type={"alumni"} data={alumniData} action="alumni" />
              </motion.div>
              <motion.button
                className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
                onClick={() => router.push("/alumni/alumni-directory")}
              >
                <Users /> View All Alumni
              </motion.button>
            </motion.div>
          )}

          {mentorData.length > 0 && (
            <motion.div
              className="flex flex-col sm:space-y-6 space-y-4 bg-white items-center justify-center sm:px-6 px-2 py-8 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="md:flex flex-col hidden justify-center mx-5 space-y-4 items-center max-w-screen-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"md:text-3xl lg:text-5xl"}>
                  Explore Mentors
                </Label>
                <Label className={"text-center text-gray-700"}>
                  Gain mentorship from the mentors for our college
                </Label>
              </motion.div>
              <motion.div
                className="md:hidden flex-start mx-5 max-w-screen-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"text-2xl"}>Explore Mentorship Network</Label>
              </motion.div>
              <motion.div
                className="w-full max-w-screen-xl overflow-hidden"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Carousel type={"mentor"} data={mentorData} action="alumni" />
              </motion.div>
              <motion.div
                className="flex justify-center max-w-screen-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button
                  className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/alumni/mentors")}
                >
                  <GraduationCap /> View All Mentors
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {eventData.length > 0 && (
            <motion.div
              className="flex flex-col sm:space-y-6 space-y-4 bg-white items-center justify-center sm:px-6 px-2 py-8 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="md:flex flex-col hidden justify-center mx-5 space-y-4 items-center max-w-screen-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"md:text-3xl lg:text-5xl"}>
                  Upcoming Events
                </Label>
                <Label className={"text-center text-gray-700"}>
                  Join webinars and masterclasses hosted by your alumni
                </Label>
              </motion.div>
              <motion.div
                className="md:hidden flex-start mx-5 max-w-screen-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label className={"text-2xl text-center"}>
                  Explore Upcoming Events
                </Label>
              </motion.div>
              <motion.div
                className="w-full max-w-screen-xl overflow-hidden"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Carousel type={"webinar"} data={eventData} action="alumni" />
              </motion.div>
              <motion.div
                className="flex justify-center max-w-screen-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button
                  className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHover}
                  onClick={() => router.push("/alumni/webinars")}
                >
                  <MonitorPlay /> View All Webinars
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          <motion.div
            className="w-full bg-gray-100 py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <FAQSection role={"alumni"} />
          </motion.div>
        </>
      }
    </>
  );
};

export default AlumniPage;
