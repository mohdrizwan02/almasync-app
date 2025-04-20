"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Building,
  CheckCircle,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { toast } from "sonner";

export default function internshipDetailsPage() {
  const { id } = useParams();
  const [internship, setInternship] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setAppliying] = useState(false);
  const [internshipApplied, setInternshipApplied] = useState(false);

  useEffect(() => {
    try {
      axios
        .post("/api/internships/get-internship", {
          internshipId: id,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setInternship((prev) => response.data.internship);
            setLoading((prev) => false);
          }
        })
        .catch((error) => {
          console.log(error);
          setError("error occurred");
          setLoading((perv) => false);
        });
    } catch (err) {
      setError(err.message);
      setLoading((prev) => false);
    }
  }, []);

  useEffect(() => {
    axios
      .post("/api/internships/check-apply", {
        internshipId: id,
      })
      .then((response) => {
        if (response.data.success) {
          setInternshipApplied((prev) => response.data.applied);
        }
      });
  }, []);

  if (loading) {
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

  const handleInternshipApply = async () => {
    setAppliying((prev) => true);
    try {
      const response = await axios.post("/api/internships/apply-internship", {
        internshipId: id,
      });

      if (response.data.success) {
        toast.success("successfully applied for this internship");
        setInternshipApplied((prev) => true);
      }
    } catch (error) {
      toast.error("error occurred while applying the internship try again");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 lg:max-w-6xl max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{internship.internshipTitle}</h1>
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
              <Building className="w-4 h-4 mr-1" />
              <span className="mr-4">{internship.internshipCompany}</span>
              <MapPin className="w-4 h-4 mr-1" />
              <span>{internship.internshipLocation}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleInternshipApply}
              disabled={internshipApplied}
            >
              {internshipApplied
                ? "Applied"
                : applying
                  ? "applying"
                  : "Apply Now"}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {internship.isInternshipVerified && (
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
            >
              <CheckCircle className="w-3 h-3 mr-1" /> Verified
            </Badge>
          )}
          <Badge variant="secondary">{internship.internshipType}</Badge>
          <Badge variant="secondary">{internship.internshipWorkType}</Badge>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            Posted: {formatDate(internship.createdAt)}
          </Badge>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Main Content */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  internship Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {internship.internshipDescription}
                </p>

                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {internship.internshipResponsibilities.map(
                    (responsibility, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {responsibility}
                      </motion.li>
                    )
                  )}
                </ul>

                <h3 className="text-lg font-semibold mb-3">Qualifications</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {internship.internshipQualification.map(
                    (qualification, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {qualification}
                      </motion.li>
                    )
                  )}
                </ul>

                <h3 className="text-lg font-semibold mb-3">Eligibility</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {internship.internshipEligibility.map(
                    (eligibility, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {eligibility}
                      </motion.li>
                    )
                  )}
                </ul>
              </motion.div>
            </CardContent>
          </Card>

          <motion.div variants={itemVariants} className="mb-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {internship.internshipSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge className="px-3 py-1 text-sm">{skill}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                internship Overview
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Salary
                    </p>
                    <p className="font-medium">{internship.internshipSalary}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      internship Type
                    </p>
                    <p className="font-medium">{internship.internshipType}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="font-medium">
                      {internship.internshipLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="w-5 h-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Experience
                    </p>
                    <p className="font-medium">
                      {internship.internshipExperienceRequired}+ years
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Work Days
                    </p>
                    <p className="font-medium">
                      {internship.internshipWorkDays} days per week
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Application Deadline
                    </p>
                    <p className="font-medium">
                      {formatDate(internship.internshipDeadline)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <Button
                className="w-full"
                onClick={handleInternshipApply}
                disabled={internshipApplied}
              >
                {internshipApplied
                  ? "Applied"
                  : applying
                    ? "applying"
                    : "Apply Now"}
              </Button>
            </CardContent>
          </Card>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Company Info</h2>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {internship.internshipCompany}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {internship.internshipLocation}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {internship.isPostedByCollege
                    ? "This internship is posted by the college and the firm is looking for talented professionals."
                    : "This internship is posted by an alumni working in this company looking for talented professionals."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Applications</h2>
                  <Badge variant="outline">{internship.applied.length}</Badge>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {internship.applied.length > 0
                    ? `${internship.applied.length} candidates have applied to this position.`
                    : "Be the first to apply to this position!"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          internship ID: {id} • Posted on {formatDate(internship.createdAt)}
        </p>
      </motion.div>
    </motion.div>
  );
}
