"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Heart,
  ChevronDown,
  ChevronUp,
  LinkIcon,
  FileText,
  Clock,
  Building,
  BookOpen,
  Star,
  Home,
  Hash,
} from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const { id } = useParams();
  const [studentProfile, setStudentProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    education: true,
    internships: true,
    certifications: true,
    skills: true,
    about: true,
    personal: true,
  });

  useEffect(() => {
    axios
      .post("/api/students/get-student-profile", { studentId: id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setStudentProfile(response.data.studentProfileData);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in getting the profile");
      });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatDate = (date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleConnect = () => {
    alert("Connect request sent!");
    // In a real application, you would implement the connection logic here
  };

  const handleAnalyzeCompatibility = () => {
    alert("Analyzing profile compatibility...");
    // In a real application, you would implement the compatibility analysis logic here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="min-h-screen  max-w-screen-xl container mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <motion.img
          src={studentProfile.coverImage || "/public/almasync.png"}
          alt="Cover"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-6 sm:p-8 md:flex">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <motion.img
                src={studentProfile.profileImage}
                alt={studentProfile.student.name}
                className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </div>
            <div className="md:ml-8 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {studentProfile.student.name}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {studentProfile.profileHeadline}
                  </p>
                  <div className="flex items-center mt-2 text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {studentProfile.address.city},{" "}
                      {studentProfile.address.country}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{studentProfile.email}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleConnect}
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Connect
                  </motion.button>
                  <motion.button
                    className="px-6 py-2 bg-purple-600 text-white rounded-md font-medium flex items-center justify-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleAnalyzeCompatibility}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Analyze Compatibility
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {studentProfile.socials.linkedin && (
                  <motion.a
                    href={studentProfile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                )}
                {studentProfile.socials.github && (
                  <motion.a
                    href={studentProfile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                )}
                {studentProfile.socials.twitter && (
                  <motion.a
                    href={studentProfile.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                )}
                {studentProfile.socials.portfolio && (
                  <motion.a
                    href={studentProfile.socials.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Globe className="h-5 w-5" />
                  </motion.a>
                )}
                {studentProfile.resume && (
                  <motion.a
                    href={studentProfile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FileText className="h-5 w-5" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
              variants={itemVariants}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("about")}
              >
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  About
                </h2>
                {expandedSections.about ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {expandedSections.about && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700">{studentProfile.about}</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-gray-700">
                          {formatDate(studentProfile.dateOfBirth)} (
                          {calculateAge(studentProfile.dateOfBirth)} years)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <p className="text-gray-700">
                          {studentProfile.mobileNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="text-gray-700">
                          {studentProfile.college}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="text-gray-700">
                          {studentProfile.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Admission Year</p>
                        <p className="text-gray-700">
                          {studentProfile.admissionYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Passout Year</p>
                        <p className="text-gray-700">
                          {studentProfile.passoutYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Degree</p>
                        <p className="text-gray-700">{studentProfile.degree}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Hash className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Enrollment Number
                        </p>
                        <p className="text-gray-700">
                          {studentProfile.enrollmentNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Education Section */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
              variants={itemVariants}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("education")}
              >
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                  Education
                </h2>
                {expandedSections.education ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {expandedSections.education && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {studentProfile.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className={`${index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {edu.educationDegree}
                          </h3>
                          <p className="text-gray-600">
                            {edu.educationInstitution}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            {edu.educationFieldOfStudy}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">
                            {edu.educationStartYear} - {edu.educationEndYear}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            Grade: {edu.educationGrade}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">
                        {edu.educationDescription}
                      </p>
                      {edu.educationAssociatedSkills.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500 mb-1">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.educationAssociatedSkills.map(
                              (skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Internships Section */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
              variants={itemVariants}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("internships")}
              >
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                  Internships
                </h2>
                {expandedSections.internships ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {expandedSections.internships && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {studentProfile.internships.map((internship, index) => (
                    <motion.div
                      key={index}
                      className={`${index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {internship.internshipRole}
                          </h3>
                          <p className="text-gray-600">
                            {internship.internshipCompany}
                          </p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{internship.internshipLocation}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">
                            {formatDate(internship.internshipStartDate)} -{" "}
                            {formatDate(internship.internshipEndDate)}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            {internship.internshipType}
                          </p>
                          {internship.currentlyWorking && (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">
                        {internship.internshipDescription}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Certifications Section */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
              variants={itemVariants}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("certifications")}
              >
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-500" />
                  Certifications
                </h2>
                {expandedSections.certifications ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {expandedSections.certifications && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {studentProfile.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <h3 className="font-medium text-gray-900">
                          {cert.certificationName}
                        </h3>
                        <p className="text-gray-600">
                          {cert.certificationOrganization}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Issued: {formatDate(cert.certificationIssueDate)}
                          {cert.certificationExpirationDate && (
                            <>
                              {" "}
                              · Expires:{" "}
                              {formatDate(cert.certificationExpirationDate)}
                            </>
                          )}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          ID: {cert.certificationId}
                        </p>
                        {cert.certificationUrl && (
                          <a
                            href={cert.certificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800"
                          >
                            <Globe className="h-4 w-4 mr-1" />
                            View Certificate
                          </a>
                        )}
                        {cert.certificationAssociatedSkills.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {cert.certificationAssociatedSkills.map(
                                (skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("skills")}
              >
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-500" />
                  Skills
                </h2>
                {expandedSections.skills ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {expandedSections.skills && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {studentProfile.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Mentorship Needs */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Mentorship Needs
                </h2>
                <div className="space-y-2">
                  {studentProfile.mentorshipsNeeds.map((need, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{need}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Personal Information */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("personal")}
              >
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-blue-500" />
                  Personal Information
                </h2>
                {expandedSections.personal ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {expandedSections.personal && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Address */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Home className="h-4 w-4 mr-2 text-gray-500" />
                      Address
                    </h3>
                    <div className="text-gray-700 space-y-1">
                      <p>{studentProfile.address.houseNumber}</p>
                      {studentProfile.address.landmark && (
                        <p>Near {studentProfile.address.landmark}</p>
                      )}
                      <p>
                        {studentProfile.address.city},{" "}
                        {studentProfile.address.pincode}
                      </p>
                      <p>{studentProfile.address.country}</p>
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-gray-500" />
                      Hobbies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {studentProfile.hobbies.map((hobby, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {hobby}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
