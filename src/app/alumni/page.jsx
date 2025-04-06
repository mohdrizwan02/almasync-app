"use client";

import React from "react";
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
  UserMinus,
  User,
  Users2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import FAQSection from "@/components/Faq-Section";

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

const StudentPage = () => {
  const items = [
    {
      title: "Rose",
      description: "Symbol of love and passion",
      action: () => addToast("Roses symbolize love and passion", "flower"),
    },
    {
      title: "St. Francis",
      description: "Patron saint of animals and nature",
      action: () =>
        addToast("St. Francis is known for his love of nature", "saint"),
    },
    {
      title: "Sunflower",
      description: "Symbol of adoration and loyalty",
      action: () => addToast("Sunflowers always face the sun", "flower"),
    },
    {
      title: "St. Clare",
      description: "Patron saint of television",
      action: () =>
        addToast("St. Clare is the patron saint of television", "saint"),
    },
    {
      title: "Lily",
      description: "Symbol of purity and refined beauty",
      action: () =>
        addToast("Lilies represent purity and refined beauty", "flower"),
    },
    {
      title: "St. Patrick",
      description: "Patron saint of Ireland",
      action: () =>
        addToast(
          "St. Patrick is famous for banishing snakes from Ireland",
          "saint"
        ),
    },
    {
      title: "Dandelion",
      description: "Symbol of wishes and dreams",
      action: () =>
        addToast("Dandelions are known for granting wishes", "flower"),
    },
    {
      title: "St. Nicholas",
      description: "Patron saint of children",
      action: () =>
        addToast("St. Nicholas is the inspiration for Santa Claus", "saint"),
    },
    {
      title: "Iris",
      description: "Symbol of hope and wisdom",
      action: () => addToast("Irises represent hope and wisdom", "flower"),
    },
    {
      title: "St. Barbara",
      description: "Patron saint against lightning",
      action: () =>
        addToast("St. Barbara is invoked against lightning and fire", "saint"),
    },
    {
      title: "Forget-me-not",
      description: "Symbol of true love and memories",
      action: () =>
        addToast("Forget-me-nots symbolize true love and memories", "flower"),
    },
    {
      title: "St. Dominic",
      description: "Patron saint of astronomers",
      action: () =>
        addToast("St. Dominic is often depicted with a star", "saint"),
    },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Alumni Network",
      description:
        "Connect with a diverse community of successful graduates across industries.",
      color: "bg-purple-500",
      learnMoreColor: "text-purple-500",
    },
    {
      icon: <Users2 className="h-8 w-8 text-white" />,
      title: "Student Network",
      description:
        "Connect with a diverse community of peers across your college.",
      color: "bg-rose-500",
      learnMoreColor: "text-rose-500",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-white" />,
      title: "Job Opportunities",
      description: "Access exclusive job and career opportunities.",
      color: "bg-blue-500",
      learnMoreColor: "text-blue-500",
    },
    {
      icon: <Building2 className="h-8 w-8 text-white" />,
      title: "Internship Opportunities",
      description: "Access exclusive internship and career opportunities.",
      color: "bg-orange-500",
      learnMoreColor: "text-orange-500",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      title: "Mentorship",
      description:
        "Get guidance from experienced professionals in your field of interest.",
      color: "bg-green-500",
      learnMoreColor: "text-green-500",
    },
  ];
  const router = useRouter();
  return (
    <>
      {/* Hero Section */}
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
            Discover powerful tools and resources designed to accelerate your
            career growth.
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
            items={features}
            itemAnimation={carouselItem}
          />
        </motion.div>
      </motion.div>

      {/* Internship Section */}
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
            Kickstart your career with top internships that match your skills
            and ambitions.
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
            items={features}
            itemAnimation={carouselItem}
          />
        </motion.div>
        <motion.button
          className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
          whileHover="hover"
          whileTap="tap"
          variants={buttonHover}
          onClick={() => router.push("/student/internships")}
        >
          <Building2 /> View All Internships
        </motion.button>
      </motion.div>

      {/* Job Opportunities Section */}
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
          <Carousel
            type={"job"}
            items={features}
            itemAnimation={carouselItem}
          />
        </motion.div>
        <motion.button
          className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
          whileHover="hover"
          whileTap="tap"
          variants={buttonHover}
          onClick={() => router.push("/student/jobs")}
        >
          <LucideBriefcaseBusiness /> View All Jobs
        </motion.button>
      </motion.div>

      {/* Alumni Section */}
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
          <Carousel
            type={"alumni"}
            items={features}
            itemAnimation={carouselItem}
          />
        </motion.div>
        <motion.button
          className="flex items-center gap-2 justify-center px-8 py-3 cursor-pointer bg-orange-500 text-white rounded-full font-medium"
          whileHover="hover"
          whileTap="tap"
          variants={buttonHover}
          onClick={() => router.push("/student/alumni-directory")}
        >
          <Users /> View All Alumni
        </motion.button>
      </motion.div>

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
          <Label className={"md:text-3xl lg:text-5xl"}>Explore Mentors</Label>
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
          <Carousel type={"mentor"} items={items} />
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
            onClick={() => router.push("/student/mentors")}
          >
            <GraduationCap /> View All Mentors
          </motion.button>
        </motion.div>
      </motion.div>

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
          <Label className={"md:text-3xl lg:text-5xl"}>Upcoming Events</Label>
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
          <Carousel type={"webinar"} items={items} />
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
            onClick={() => router.push("/student/webinars")}
          >
            <MonitorPlay /> View All Webinars
          </motion.button>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="w-full bg-gray-100 py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <FAQSection />
      </motion.div>
    </>
  );
};

export default StudentPage;
