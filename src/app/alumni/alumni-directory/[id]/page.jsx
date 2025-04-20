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
  Briefcase,
  MapPin,
  GraduationCap,
  Calendar,
  Languages,
  Heart,
  Globe,
  Building,
  ExternalLink,
  Award,
} from "lucide-react";

import CompatibilityModal from "@/components/view-profile/compatibility-modal";
import { toast } from "sonner";

import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

// Mock data based on the schema (same as before)

export default function ViewProfilePage() {
  const { id } = useParams();
  const [pageLoad, setPageLoad] = useState(true);

  const [error, setError] = useState(false);

  const [profile, setProfile] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] =
    useState(false);

  useEffect(() => {
    console.log(`Fetching profile for ID: ${id}`);

    axios
      .post("/api/alumni/get-alumni-profile", { alumniId: id })
      .then((response) => {
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
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative p-"
      >
        {/* Cover Image */}
        <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden relative">
          <img
            src={profile.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20 px-4 relative z-10">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarImage
                src={profile.profileImage || "/placeholder.svg"}
                alt={profile.profileHeadline}
              />
              <AvatarFallback>{profile.firstName.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 bg-white rounded-xl px-6 py-4 md:py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                <h1 className="text-lg text-gray-600 mt-2 font-bold">
                  {profile.profileHeadline}
                </h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.currentlyWorkingAt && (
                    <div className="flex items-center text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>
                        {profile.currentlyWorkingAs} at{" "}
                        {profile.currentlyWorkingAt}
                      </span>
                    </div>
                  )}
                  {profile.address?.city && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {profile.address.city}, {profile.address.country}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.college && (
                    <div className="flex items-center text-muted-foreground">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      <span>
                        {profile.degree}, {profile.college} (
                        {profile.admissionYear} - {profile.passoutYear})
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.currentExperience && (
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {profile.currentExperience} years of experience
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {profile.availableForMentorship && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-200"
                >
                  Available for Mentorship
                </Badge>
              )}
              {profile.skills?.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
              {profile.skills?.length > 5 && (
                <Badge variant="outline">
                  +{profile.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        </div>
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
      </motion.div>

      <Tabs defaultValue="about" className="mt-6">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      College
                    </p>
                    <p>{profile.college || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Department
                    </p>
                    <p>{profile.department || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Degree
                    </p>
                    <p>{profile.degree || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Batch
                    </p>
                    <p>
                      {profile.admissionYear} - {profile.passoutYear}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Gender
                    </p>
                    <p className="capitalize">
                      {profile.gender || "Not specified"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  {profile.address ? (
                    <div className="flex items-start mt-1">
                      <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                      <p>
                        {profile.address.city && `${profile.address.city}, `}
                        {profile.address.country}
                      </p>
                    </div>
                  ) : (
                    <p>Not specified</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>A brief description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.about ? (
                  <p>{profile.about}</p>
                ) : (
                  <p className="text-muted-foreground">
                    No information provided
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Professional skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No skills listed</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages & Hobbies</CardTitle>
                <CardDescription>
                  Languages and things they enjoy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">Languages</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.communicationLanguages &&
                    profile.communicationLanguages.length > 0 ? (
                      profile.communicationLanguages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No languages listed
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">Hobbies</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.hobbies && profile.hobbies.length > 0 ? (
                      profile.hobbies.map((hobby, index) => (
                        <Badge key={index} variant="outline">
                          {hobby}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No hobbies listed</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Presence across the web</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {profile.socials?.linkedin && (
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {profile.socials?.github && (
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {profile.socials?.twitter && (
                    <a
                      href={profile.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter
                    </a>
                  )}
                  {profile.socials?.portfolio && (
                    <a
                      href={profile.socials.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Globe className="h-5 w-5 mr-2" />
                      Portfolio
                    </a>
                  )}
                  {!profile.socials?.linkedin &&
                    !profile.socials?.github &&
                    !profile.socials?.twitter &&
                    !profile.socials?.portfolio && (
                      <p className="text-muted-foreground col-span-full">
                        No social links provided
                      </p>
                    )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="experience">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Professional journey</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.experience && profile.experience.length > 0 ? (
                  <div className="space-y-8">
                    {profile.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0"
                      >
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Building className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">
                            {exp.employmentPosition}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          {exp.employmentCompany}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{exp.employmentType}</Badge>
                          <Badge variant="outline">
                            {exp.employmentWorkType}
                          </Badge>
                          {exp.currentlyWorking && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 hover:bg-green-200"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(exp.employmentStartDate)} -{" "}
                          {exp.currentlyWorking
                            ? "Present"
                            : formatDate(exp.employmentEndDate)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-2" />
                          {exp.employmentLocation}
                        </div>
                        <p className="text-sm">{exp.employmentDescription}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No work experience listed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="education">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Academic background</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.education && profile.education.length > 0 ? (
                  <div className="space-y-8">
                    {profile.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0"
                      >
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <GraduationCap className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">
                            {edu.educationDegree} in {edu.educationFieldOfStudy}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          {edu.educationInstitution}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {edu.educationStartYear} - {edu.educationEndYear}
                        </div>
                        {edu.educationGrade && (
                          <p className="text-sm mb-2">
                            Grade: {edu.educationGrade}
                          </p>
                        )}
                        {edu.educationDescription && (
                          <p className="text-sm mb-3">
                            {edu.educationDescription}
                          </p>
                        )}
                        {edu.educationAssociatedSkills &&
                          edu.educationAssociatedSkills.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-1">
                                Skills Acquired:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {edu.educationAssociatedSkills.map(
                                  (skill, idx) => (
                                    <Badge key={idx} variant="outline">
                                      {skill}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No education details listed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="certifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Professional certifications</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.certifications && profile.certifications.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border rounded-lg p-4 relative"
                      >
                        <div className="flex items-start mb-3">
                          <Award className="h-5 w-5 mr-2 text-primary mt-1" />
                          <div>
                            <h3 className="font-semibold">
                              {cert.certificationName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {cert.certificationOrganization}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Issued: {formatDate(cert.certificationIssueDate)}
                            </span>
                          </div>
                          {cert.certificationExpirationDate && (
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                Expires:{" "}
                                {formatDate(cert.certificationExpirationDate)}
                              </span>
                            </div>
                          )}
                          {cert.certificationId && (
                            <div className="text-sm">
                              <span className="font-medium">
                                Credential ID:
                              </span>{" "}
                              {cert.certificationId}
                            </div>
                          )}
                        </div>

                        {cert.certificationUrl && (
                          <a
                            href={cert.certificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-primary hover:underline mb-3"
                          >
                            View Certificate{" "}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}

                        {cert.certificationAssociatedSkills &&
                          cert.certificationAssociatedSkills.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-1">
                                Skills:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {cert.certificationAssociatedSkills.map(
                                  (skill, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No certifications listed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
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
