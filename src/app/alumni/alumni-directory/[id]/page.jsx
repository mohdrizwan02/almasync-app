"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  MessageSquare,
  UserPlus,
  BarChart2,
  X,
  ChevronLeft,
} from "lucide-react";
import ViewProfileHeader from "@/components/view-profile/view-profile-header";
import ViewAboutSection from "@/components/view-profile/view-about-section";
import ViewExperienceSection from "@/components/view-profile/view-experience-section";
import ViewEducationSection from "@/components/view-profile/view-education-section";
import ViewCertificationsSection from "@/components/view-profile/view-certifications-section";
import CompatibilityModal from "@/components/view-profile/compatibility-modal";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";

// Mock data based on the schema (same as before)
const mockProfile = {
  fullName: "Mohammad Rizwan",
  _id: "123456789",
  alumni: "user123",
  enrollmentNumber: "EN12345",
  dateOfBirth: new Date("1995-05-15"),
  mobileNumber: "+91 9876543210",
  college: "Delhi Technological University",
  admissionYear: "2015",
  passoutYear: "2019",
  degree: "B.Tech",
  department: "Computer Science",
  gender: "male",
  about: [
    "Passionate software developer with expertise in web technologies",
    "Open source contributor",
  ],
  skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
  communicationLanguages: ["English", "Hindi"],
  profileImage: "/placeholder.svg?height=150&width=150",
  coverImage: "/placeholder.svg?height=300&width=1200",
  currentlyWorkingIn: "Technology",
  currentlyWorkingAt: "Google",
  currentlyWorkingAs: "Senior Software Engineer",
  currentExperience: "5 years",
  profileHeadline: "Senior Software Engineer at Google | DTU Alumni",
  availableForMentorship: true,
  mentorshipExperience: 3,
  mentorshipTopics: [
    "Web Development",
    "Career Guidance",
    "Interview Preparation",
  ],
  education: [
    {
      educationInstitution: "Delhi Technological University",
      educationDegree: "B.Tech",
      educationFieldOfStudy: "Computer Science",
      educationStartYear: 2015,
      educationEndYear: 2019,
      educationGrade: "9.2 CGPA",
      educationDescription: "Graduated with honors",
      educationAssociatedSkills: [
        "Data Structures",
        "Algorithms",
        "Database Management",
      ],
    },
  ],
  experience: [
    {
      employmentCompany: "Google",
      employmentPosition: "Senior Software Engineer",
      employmentLocation: "Bangalore",
      currentlyWorking: true,
      employmentType: "Full-time",
      employmentWorkType: "Hybrid",
      employmentStartDate: new Date("2021-01-10"),
      employmentEndDate: null,
      employmentDescription: "Working on Google Cloud Platform",
    },
    {
      employmentCompany: "Microsoft",
      employmentPosition: "Software Engineer",
      employmentLocation: "Hyderabad",
      currentlyWorking: false,
      employmentType: "Full-time",
      employmentWorkType: "On-site",
      employmentStartDate: new Date("2019-06-15"),
      employmentEndDate: new Date("2020-12-31"),
      employmentDescription: "Worked on Azure services",
    },
  ],
  certifications: [
    {
      certificationName: "AWS Certified Solutions Architect",
      certificationOrganization: "Amazon Web Services",
      certificationIssueDate: new Date("2020-03-15"),
      certificationExpirationDate: new Date("2023-03-15"),
      certificationId: "AWS-123456",
      certificationUrl: "https://aws.amazon.com/certification/",
      certificationAssociatedSkills: [
        "AWS",
        "Cloud Architecture",
        "Serverless",
      ],
    },
  ],
  socials: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    portfolio: "https://johndoe.dev",
  },
  address: {
    country: "India",
    pincode: "110001",
    landmark: "Near Central Park",
    city: "New Delhi",
    houseNumber: "123",
  },
  hobbies: ["Reading", "Traveling", "Photography"],
};

export default function ViewProfilePage() {
  const { id } = useParams();
  const [pageLoad, setPageLoad] = useState(true);

  const [error, setError] = useState(false);

  const [profile, setProfile] = useState(mockProfile);
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] =
    useState(false);

  useEffect(() => {
    console.log(`Fetching profile for ID: ${id}`);

    axios
      .post("/api/alumni/get-alumni-profile", { alumniId: id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setProfile((prev) => response.data.alumniProfileData);
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        toast.error("error fetching the profile data");
        setError((prev) => true);
      });
  }, [id]);

  if (pageLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-2">{error}</p>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const handleConnect = () => {
    setIsPending(true);
    toast.success("Connection request sent", {
      description: `Your connection request has been sent to ${profile.fullName}.`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message feature",
      description: "Opening chat with this connection...",
    });
  };

  const handleCancelRequest = () => {
    setIsPending(false);
    toast.message("Connection request cancelled", {
      description: "Your connection request has been cancelled.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6 px-4 md:px-6"
    >
      <div className="relative">
        <ViewProfileHeader profile={profile} />

        <div className="flex flex-wrap gap-3 mt-4 md:absolute md:top-4 md:right-4">
          <Button
            variant="outline"
            onClick={() => setIsCompatibilityModalOpen(true)}
            className="bg-white/80 hover:bg-white/90"
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Profile Compatibility
          </Button>

          {isConnected ? (
            <Button onClick={handleMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          ) : isPending ? (
            <Button
              variant="outline"
              onClick={handleCancelRequest}
              className="bg-white/80 hover:bg-white/90"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Request
            </Button>
          ) : (
            <Button onClick={handleConnect}>
              <UserPlus className="h-4 w-4 mr-2" />
              Connect
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="about" className="mt-6">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <ViewAboutSection profile={profile} />
        </TabsContent>

        <TabsContent value="experience">
          <ViewExperienceSection experience={profile.experience} />
        </TabsContent>

        <TabsContent value="education">
          <ViewEducationSection education={profile.education} />
        </TabsContent>

        <TabsContent value="certifications">
          <ViewCertificationsSection certifications={profile.certifications} />
        </TabsContent>
      </Tabs>

      <CompatibilityModal
        isOpen={isCompatibilityModalOpen}
        onClose={() => setIsCompatibilityModalOpen(false)}
        profile={profile}
      />
    </motion.div>
  );
}
