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

  const studentData = [
    {
      fullName: "Aarav Sharma",
      profileHeadline: "Aspiring Software Engineer",
      profileImageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?coding,laptop",
      department: "Computer Science",
      batch: 2022,
    },
    {
      fullName: "Meera Patel",
      profileHeadline: "Machine Learning Enthusiast",
      profileImageUrl: "https://randomuser.me/api/portraits/women/21.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?artificial-intelligence,technology",
      department: "Information Technology",
      batch: 2023,
    },
    {
      fullName: "Rohan Mehta",
      profileHeadline: "Backend Development Nerd",
      profileImageUrl: "https://randomuser.me/api/portraits/men/31.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?backend,server",
      department: "Electronics",
      batch: 2021,
    },
    {
      fullName: "Isha Singh",
      profileHeadline: "Creative UI/UX Designer",
      profileImageUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      profileCoverImageUrl: "https://source.unsplash.com/1600x400/?design,ui",
      department: "Computer Science",
      batch: 2024,
    },
    {
      fullName: "Karan Verma",
      profileHeadline: "Full-Stack Developer in the Making",
      profileImageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?webdevelopment,code",
      department: "Mechanical",
      batch: 2022,
    },
    {
      fullName: "Neha Gupta",
      profileHeadline: "AI and Data Science Learner",
      profileImageUrl: "https://randomuser.me/api/portraits/women/54.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?datascience,charts",
      department: "Information Technology",
      batch: 2021,
    },
    {
      fullName: "Arjun Nair",
      profileHeadline: "Cybersecurity Explorer",
      profileImageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?cybersecurity,hacker",
      department: "Computer Science",
      batch: 2023,
    },
    {
      fullName: "Tanya Roy",
      profileHeadline: "Mobile App Developer",
      profileImageUrl: "https://randomuser.me/api/portraits/women/70.jpg",
      profileCoverImageUrl: "https://source.unsplash.com/1600x400/?mobile,apps",
      department: "Electronics",
      batch: 2024,
    },
    {
      fullName: "Vivaan Joshi",
      profileHeadline: "Cloud Computing Explorer",
      profileImageUrl: "https://randomuser.me/api/portraits/men/82.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?cloudcomputing,aws",
      department: "Electrical",
      batch: 2022,
    },
    {
      fullName: "Pooja Deshmukh",
      profileHeadline: "Passionate Web Developer",
      profileImageUrl: "https://randomuser.me/api/portraits/women/91.jpg",
      profileCoverImageUrl:
        "https://source.unsplash.com/1600x400/?frontend,html",
      department: "Computer Science",
      batch: 2023,
    },
  ];

  const internshipData = [
    {
      role: "Frontend Developer Intern",
      company: "TechNova Solutions",
      type: "Remote",
      duration: "3 months",
      stipend: "₹10,000/month",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      postedDaysAgo: 2,
      isActive: true,
    },
    {
      role: "Data Science Intern",
      company: "DataWiz Analytics",
      type: "Onsite",
      duration: "6 months",
      stipend: "₹15,000/month",
      skills: ["Python", "Pandas", "Machine Learning", "SQL"],
      postedDaysAgo: 5,
      isActive: true,
    },
    {
      role: "Backend Developer Intern",
      company: "CodeCrafter Labs",
      type: "Hybrid",
      duration: "4 months",
      stipend: "₹12,000/month",
      skills: ["Node.js", "Express", "MongoDB", "REST API"],
      postedDaysAgo: 12,
      isActive: false,
    },
    {
      role: "UI/UX Designer Intern",
      company: "PixelWorks Studio",
      type: "Remote",
      duration: "2 months",
      stipend: "₹8,000/month",
      skills: ["Figma", "Adobe XD", "User Research", "Wireframing"],
      postedDaysAgo: 1,
      isActive: true,
    },
    {
      role: "Cybersecurity Intern",
      company: "SecureNet Pvt Ltd",
      type: "Onsite",
      duration: "3 months",
      stipend: "₹10,000/month",
      skills: ["Network Security", "Linux", "Ethical Hacking", "Nmap"],
      postedDaysAgo: 20,
      isActive: false,
    },
    {
      role: "Cloud Engineering Intern",
      company: "CloudMorph Technologies",
      type: "Remote",
      duration: "5 months",
      stipend: "₹18,000/month",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      postedDaysAgo: 3,
      isActive: true,
    },
    {
      role: "Digital Marketing Intern",
      company: "BuzzReach Media",
      type: "Hybrid",
      duration: "3 months",
      stipend: "₹7,000/month",
      skills: ["SEO", "Google Ads", "Content Writing", "Analytics"],
      postedDaysAgo: 7,
      isActive: true,
    },
    {
      role: "Mobile App Developer Intern",
      company: "Appify Inc.",
      type: "Onsite",
      duration: "4 months",
      stipend: "₹14,000/month",
      skills: ["Flutter", "Dart", "Firebase", "UI Design"],
      postedDaysAgo: 10,
      isActive: true,
    },
    {
      role: "Business Analyst Intern",
      company: "InnoConsult Global",
      type: "Remote",
      duration: "2 months",
      stipend: "₹9,000/month",
      skills: ["Excel", "Power BI", "SQL", "Communication"],
      postedDaysAgo: 15,
      isActive: false,
    },
    {
      role: "Machine Learning Intern",
      company: "AIBridge Tech",
      type: "Hybrid",
      duration: "6 months",
      stipend: "₹20,000/month",
      skills: ["Python", "Scikit-learn", "Deep Learning", "TensorFlow"],
      postedDaysAgo: 4,
      isActive: true,
    },
  ];

  const jobData = [
    {
      role: "Software Engineer",
      company: "Innovatech Systems",
      type: "Remote",
      experience: "1-3 years",
      salary: "₹8-12 LPA",
      location: "Bengaluru",
      skills: ["JavaScript", "React", "Node.js", "REST API"],
      postedDaysAgo: 3,
      isActive: true,
    },
    {
      role: "Data Analyst",
      company: "Insight Analytics",
      type: "Onsite",
      experience: "0-2 years",
      salary: "₹6-9 LPA",
      location: "Mumbai",
      skills: ["SQL", "Excel", "Tableau", "Python"],
      postedDaysAgo: 5,
      isActive: true,
    },
    {
      role: "DevOps Engineer",
      company: "CloudSphere Solutions",
      type: "Hybrid",
      experience: "2-4 years",
      salary: "₹10-15 LPA",
      location: "Hyderabad",
      skills: ["AWS", "Docker", "CI/CD", "Linux"],
      postedDaysAgo: 12,
      isActive: false,
    },
    {
      role: "UI/UX Designer",
      company: "DesignHive",
      type: "Remote",
      experience: "1-3 years",
      salary: "₹5-8 LPA",
      location: "Pune",
      skills: ["Figma", "Adobe XD", "User Flows", "Prototyping"],
      postedDaysAgo: 1,
      isActive: true,
    },
    {
      role: "Backend Developer",
      company: "StackBuilt Tech",
      type: "Onsite",
      experience: "3-5 years",
      salary: "₹12-18 LPA",
      location: "Chennai",
      skills: ["Java", "Spring Boot", "SQL", "Microservices"],
      postedDaysAgo: 7,
      isActive: true,
    },
    {
      role: "Cybersecurity Analyst",
      company: "SecureNet Corp",
      type: "Hybrid",
      experience: "2-4 years",
      salary: "₹10-14 LPA",
      location: "Delhi",
      skills: ["Network Security", "Firewalls", "SIEM", "Python"],
      postedDaysAgo: 15,
      isActive: false,
    },
    {
      role: "AI/ML Engineer",
      company: "NeuronX Labs",
      type: "Remote",
      experience: "1-2 years",
      salary: "₹14-20 LPA",
      location: "Remote",
      skills: ["Machine Learning", "TensorFlow", "Python", "NLP"],
      postedDaysAgo: 2,
      isActive: true,
    },
    {
      role: "Product Manager",
      company: "BrightBridge Tech",
      type: "Onsite",
      experience: "3-6 years",
      salary: "₹18-25 LPA",
      location: "Bengaluru",
      skills: ["Agile", "JIRA", "Roadmapping", "Stakeholder Management"],
      postedDaysAgo: 10,
      isActive: true,
    },
    {
      role: "Business Development Associate",
      company: "SalesSprint",
      type: "Remote",
      experience: "0-1 year",
      salary: "₹4-6 LPA + incentives",
      location: "Remote",
      skills: ["Communication", "CRM", "Sales", "Negotiation"],
      postedDaysAgo: 4,
      isActive: true,
    },
    {
      role: "Quality Assurance Engineer",
      company: "TestHive Pvt Ltd",
      type: "Onsite",
      experience: "1-2 years",
      salary: "₹6-10 LPA",
      location: "Kolkata",
      skills: ["Manual Testing", "Selenium", "Test Cases", "Bug Tracking"],
      postedDaysAgo: 9,
      isActive: false,
    },
  ];

  const alumniData = [
    {
      fullName: "Aarav Sharma",
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
      role: "Senior Software Engineer",
      company: "Google",
      skills: ["Java", "System Design", "Cloud", "Kubernetes"],
      location: "Bengaluru",
      experience: "5 years",
      department: "Computer Science",
      passoutBatch: 2018,
    },
    {
      fullName: "Riya Mehta",
      profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
      role: "Data Scientist",
      company: "Microsoft",
      skills: ["Python", "Machine Learning", "NLP", "TensorFlow"],
      location: "Hyderabad",
      experience: "4 years",
      department: "Information Technology",
      passoutBatch: 2019,
    },
    {
      fullName: "Karan Verma",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "DevOps Engineer",
      company: "Amazon",
      skills: ["AWS", "Docker", "CI/CD", "Linux"],
      location: "Delhi",
      experience: "3.5 years",
      department: "Electronics and Communication",
      passoutBatch: 2020,
    },
    {
      fullName: "Sneha Roy",
      profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "UI/UX Designer",
      company: "Adobe",
      skills: ["Figma", "User Research", "Prototyping", "Adobe XD"],
      location: "Pune",
      experience: "4 years",
      department: "Computer Science",
      passoutBatch: 2019,
    },
    {
      fullName: "Vikram Nair",
      profileImage: "https://randomuser.me/api/portraits/men/52.jpg",
      role: "Product Manager",
      company: "Flipkart",
      skills: ["Product Strategy", "Agile", "JIRA", "User Stories"],
      location: "Bengaluru",
      experience: "6 years",
      department: "Mechanical Engineering",
      passoutBatch: 2017,
    },
    {
      fullName: "Ananya Gupta",
      profileImage: "https://randomuser.me/api/portraits/women/54.jpg",
      role: "Cybersecurity Analyst",
      company: "Infosys",
      skills: ["Ethical Hacking", "Network Security", "SIEM", "Python"],
      location: "Mumbai",
      experience: "3 years",
      department: "Information Technology",
      passoutBatch: 2020,
    },
    {
      fullName: "Rahul Deshmukh",
      profileImage: "https://randomuser.me/api/portraits/men/71.jpg",
      role: "AI Engineer",
      company: "TCS Research",
      skills: ["Deep Learning", "Computer Vision", "PyTorch", "Data Science"],
      location: "Chennai",
      experience: "5 years",
      department: "Artificial Intelligence",
      passoutBatch: 2018,
    },
    {
      fullName: "Nisha Sen",
      profileImage: "https://randomuser.me/api/portraits/women/78.jpg",
      role: "Full Stack Developer",
      company: "Zoho",
      skills: ["React", "Node.js", "MongoDB", "REST APIs"],
      location: "Coimbatore",
      experience: "4 years",
      department: "Computer Science",
      passoutBatch: 2019,
    },
    {
      fullName: "Aditya Rathi",
      profileImage: "https://randomuser.me/api/portraits/men/87.jpg",
      role: "Business Analyst",
      company: "Accenture",
      skills: ["Excel", "Power BI", "SQL", "Communication"],
      location: "Noida",
      experience: "3 years",
      department: "Electrical Engineering",
      passoutBatch: 2020,
    },
    {
      fullName: "Ishita Kapoor",
      profileImage: "https://randomuser.me/api/portraits/women/90.jpg",
      role: "Cloud Solutions Architect",
      company: "IBM",
      skills: ["Azure", "Terraform", "DevOps", "Networking"],
      location: "Gurgaon",
      experience: "6 years",
      department: "Information Technology",
      passoutBatch: 2017,
    },
  ];

  const mentorData = [
    {
      fullName: "Siddharth Malhotra",
      rating: 4.8,
      profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      profileHeadline:
        "Senior Software Engineer @ Google | System Design Mentor",
      isAvailable: true,
    },
    {
      fullName: "Ayesha Raza",
      rating: 4.6,
      profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
      profileHeadline: "Data Scientist @ Amazon | ML, AI Guide",
      isAvailable: true,
    },
    {
      fullName: "Nikhil Raj",
      rating: 4.9,
      profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      profileHeadline: "DevOps Engineer @ Microsoft | AWS & CI/CD Mentor",
      isAvailable: false,
    },
    {
      fullName: "Ira Chopra",
      rating: 4.7,
      profileImage: "https://randomuser.me/api/portraits/women/50.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1485217988980-11786ced9454",
      profileHeadline: "UI/UX Designer @ Adobe | Portfolio & Design Thinking",
      isAvailable: true,
    },
    {
      fullName: "Tushar Meena",
      rating: 4.5,
      profileImage: "https://randomuser.me/api/portraits/men/60.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702",
      profileHeadline: "Product Manager @ Swiggy | Agile & PM Career Coach",
      isAvailable: false,
    },
    {
      fullName: "Divya Shetty",
      rating: 4.9,
      profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
      profileHeadline: "Cloud Architect @ IBM | Azure & DevSecOps",
      isAvailable: true,
    },
    {
      fullName: "Arjun Desai",
      rating: 4.4,
      profileImage: "https://randomuser.me/api/portraits/men/73.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      profileHeadline:
        "Cybersecurity Analyst @ Infosys | Ethical Hacking Mentor",
      isAvailable: true,
    },
    {
      fullName: "Pooja Bhatt",
      rating: 4.6,
      profileImage: "https://randomuser.me/api/portraits/women/76.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      profileHeadline: "Full Stack Developer @ Zoho | MERN Stack Guide",
      isAvailable: false,
    },
    {
      fullName: "Vivek Chauhan",
      rating: 4.8,
      profileImage: "https://randomuser.me/api/portraits/men/88.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      profileHeadline: "AI/ML Engineer @ TCS Research | Deep Learning Mentor",
      isAvailable: true,
    },
    {
      fullName: "Meghna Singh",
      rating: 4.7,
      profileImage: "https://randomuser.me/api/portraits/women/81.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1519340333755-56e9cbbc3b40",
      profileHeadline: "Business Analyst @ Deloitte | Interview Prep Coach",
      isAvailable: true,
    },
  ];

  const features = [
    {
      icon: <Users2 className="h-8 w-8 text-white" />,
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

  const eventData = [
    {
      coverImage: "https://images.unsplash.com/photo-1503424886308-418b7248ec19",
      title: "AI in Modern Healthcare",
      subtitle: "Explore the impact of AI in diagnostics & treatment",
      seatsLeft: 45,
      date: "April 12th, 2025",
      time: "3:15",
      status: "future"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1551836022-4c4c79ecde72",
      title: "Startup Pitch Fest 2025",
      subtitle: "Pitch your startup idea to top investors",
      seatsLeft: 0,
      date: "April 2nd, 2025",
      time: "10:00",
      status: "expired"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      title: "Web Dev Bootcamp",
      subtitle: "Frontend to Backend in one intense weekend",
      seatsLeft: 12,
      date: "April 6th, 2025",
      time: "9:30",
      status: "ongoing"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1515165562835-c6fb3f6110ad",
      title: "Resume Building & Career Hacks",
      subtitle: "Learn how to build an ATS-friendly resume",
      seatsLeft: 87,
      date: "May 1st, 2025",
      time: "2:00",
      status: "future"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      title: "Hackathon: CodeSprint 2.0",
      subtitle: "24hr challenge to solve real-world problems",
      seatsLeft: 5,
      date: "March 28th, 2025",
      time: "6:00",
      status: "expired"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Data Science for All",
      subtitle: "Master data wrangling, visualization, and models",
      seatsLeft: 30,
      date: "April 7th, 2025",
      time: "11:00",
      status: "ongoing"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
      title: "Cloud Computing Summit",
      subtitle: "Learn from industry leaders at this 1-day event",
      seatsLeft: 60,
      date: "May 10th, 2025",
      time: "4:30",
      status: "future"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      title: "Women in Tech Conference",
      subtitle: "Celebrate diversity & innovation in tech",
      seatsLeft: 0,
      date: "March 14th, 2025",
      time: "1:00",
      status: "expired"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      title: "LinkedIn Optimization Workshop",
      subtitle: "Boost your professional brand online",
      seatsLeft: 22,
      date: "April 6th, 2025",
      time: "5:45",
      status: "ongoing"
    },
    {
      coverImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
      title: "Entrepreneurship 101",
      subtitle: "From ideation to execution",
      seatsLeft: 18,
      date: "May 15th, 2025",
      time: "3:00",
      status: "future"
    }
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
            data={features}
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
          <Carousel type={"internship"} data={internshipData} />
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
          <Carousel type={"job"} data={jobData} />
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
          <Carousel type={"alumni"} data={alumniData} />
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
          <Carousel type={"mentor"} data={mentorData} />
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
          <Carousel type={"webinar"} data={eventData} />
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
