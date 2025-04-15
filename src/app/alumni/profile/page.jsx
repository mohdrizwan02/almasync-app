"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/profile-header";
import AboutSection from "@/components/profile/about-section";
import ExperienceSection from "@/components/profile/experience-section";
import EducationSection from "@/components/profile/education-section";
import CertificationsSection from "@/components/profile/certifications-section";
import JobsSection from "@/components/profile/jobs-section";
import EventsSection from "@/components/profile/events-section";
import MentorshipSection from "@/components/profile/mentorship-section";
import ConnectionsSection from "@/components/profile/connections-section";
import EditProfileModal from "@/components/profile/edit-profile-modal";

import { toast } from "sonner";
import axios from "axios";

// Mock data based on the schema
const mockProfile = {
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

// Mock data for additional sections
const mockJobs = {
  posted: [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "TechCorp",
      applicants: 12,
    },
    {
      id: "job2",
      title: "Backend Engineer",
      company: "DataSystems",
      applicants: 8,
    },
  ],
  applied: [
    {
      id: "job3",
      title: "Full Stack Developer",
      company: "WebTech",
      status: "Interview",
    },
    {
      id: "job4",
      title: "DevOps Engineer",
      company: "CloudOps",
      status: "Applied",
    },
  ],
};

const mockEvents = {
  posted: [
    {
      id: "event1",
      title: "Tech Meetup 2023",
      date: "2023-12-15",
      registrations: 45,
    },
    {
      id: "event2",
      title: "Coding Workshop",
      date: "2023-11-20",
      registrations: 30,
    },
  ],
  registered: [
    {
      id: "event3",
      title: "AI Conference",
      date: "2023-12-10",
      organizer: "AI Research Group",
    },
    {
      id: "event4",
      title: "Hackathon 2023",
      date: "2023-11-25",
      organizer: "TechHub",
    },
  ],
};

const mockConnections = [
  {
    id: "user1",
    name: "Jane Smith",
    position: "Product Manager at Amazon",
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user2",
    name: "Alex Johnson",
    position: "Data Scientist at Microsoft",
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user3",
    name: "Sarah Williams",
    position: "UX Designer at Apple",
    profileImage: "/placeholder.svg?height=40&width=40",
  },
];

const mockMentees = [
  { id: "mentee1", name: "Rahul Kumar", topic: "Web Development", sessions: 5 },
  {
    id: "mentee2",
    name: "Priya Sharma",
    topic: "Career Guidance",
    sessions: 3,
  },
];

export default function ProfilePage() {
  const [pageLoad, setPageLoad] = useState(true);
  const [profile, setProfile] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState("");

  useEffect(() => {
    axios
      .get("/api/alumni/get-current-profile")
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setProfile((prev) => response.data.alumniProfileData);
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  const handleEdit = (section) => {
    setEditSection(section);
    setIsEditing(true);
  };

  const handleSave = (section, data) => {
    setProfile((prev) => ({ ...prev, ...data }));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: `Your ${section} information has been updated successfully.`,
    });
  };

  return (
    <>
      {pageLoad ? (
        <div className="container mx-auto py-6 px-4 md:px-6 max-w-screen-xl">loading ....</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-6 px-4 md:px-6 max-w-screen-xl"
        >
          <ProfileHeader profile={profile} onEdit={() => handleEdit("basic")} />

          <Tabs defaultValue="about" className="container mx-auto mt-6 w-full">
            <div className="flex w-full items-center justify-center">
              <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-9 w-full items-center h-30 lg:h-12 space-x-2 space-y-2 md:mb-6 mb-20  lg:mb-2">
                <TabsTrigger className={"max-w-40 w-full"} value="about">
                  About
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="experience">
                  Experience
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="education">
                  Education
                </TabsTrigger>
                <TabsTrigger
                  className={"max-w-40 w-full"}
                  value="certifications"
                >
                  Certifications
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="jobs">
                  Jobs
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="internships">
                  internships
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="events">
                  Events
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="mentorship">
                  Mentorship
                </TabsTrigger>
                <TabsTrigger className={"max-w-40 w-full"} value="connections">
                  Connections
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-4 space-y-6">
              <TabsContent value="about">
                <AboutSection
                  profile={profile}
                  onEdit={() => handleEdit("about")}
                />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceSection
                  experience={profile.experience}
                  onEdit={() => handleEdit("experience")}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationSection
                  education={profile.education}
                  onEdit={() => handleEdit("education")}
                />
              </TabsContent>

              <TabsContent value="certifications">
                <CertificationsSection
                  certifications={profile.certifications}
                  onEdit={() => handleEdit("certifications")}
                />
              </TabsContent>

              <TabsContent value="jobs">
                <JobsSection
                  postedJobs={mockJobs.posted}
                  appliedJobs={mockJobs.applied}
                />
              </TabsContent>
              <TabsContent value="internships">
                <JobsSection
                  postedJobs={mockJobs.posted}
                  appliedJobs={mockJobs.applied}
                />
              </TabsContent>

              <TabsContent value="events">
                <EventsSection
                  postedEvents={mockEvents.posted}
                  registeredEvents={mockEvents.registered}
                />
              </TabsContent>

              <TabsContent value="mentorship">
                <MentorshipSection
                  profile={profile}
                  mentees={mockMentees}
                  onEdit={() => handleEdit("mentorship")}
                />
              </TabsContent>

              <TabsContent value="connections">
                <ConnectionsSection connections={mockConnections} />
              </TabsContent>
            </div>
          </Tabs>

          {isEditing && (
            <EditProfileModal
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              section={editSection}
              profile={profile}
              onSave={handleSave}
            />
          )}
        </motion.div>
      )}
    </>
  );
}
