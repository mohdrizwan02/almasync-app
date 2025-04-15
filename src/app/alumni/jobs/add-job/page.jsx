"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import axios from "axios";

export default function AddJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCompany: "",
    jobLocation: "",
    jobType: "",
    jobWorkType: "",
    jobDescription: "",
    jobResponsibilities: [""],
    jobQualification: [""],
    jobEligibility: [""],
    jobSkills: [""],
    jobWorkDays: "",
    jobExperienceRequired: "",
    jobSalary: "",
    jobDeadline: null,
  });

  // Handle input change for simple fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle array field changes
  const handleArrayFieldChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Add new item to array fields
  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove item from array fields
  const removeArrayItem = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/jobs/add-job", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Success!", {
          description: "Job has been posted successfully.",
        });
        router.push("/alumni/jobs");
      } else {
        toast.error("Error", {
          description: "error posting the job try again",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
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
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill in the details of the job you want to post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Basic Job Information */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobCompany">Company Name *</Label>
                    <Input
                      id="jobCompany"
                      name="jobCompany"
                      value={formData.jobCompany}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobLocation">Location *</Label>
                    <Input
                      id="jobLocation"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobSalary">Salary</Label>
                    <Input
                      id="jobSalary"
                      name="jobSalary"
                      value={formData.jobSalary}
                      onChange={handleInputChange}
                      placeholder="e.g. $50,000 - $70,000"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Job Type Information */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Job Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Employment Type</Label>
                    <Select
                      value={formData.jobType}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "jobType", value },
                        })
                      }
                    >
                      <SelectTrigger id="jobType" className="w-full">
                        <span>
                          {formData.jobType || "Select employment type"}
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobWorkType">Work Type</Label>
                    <Select
                      value={formData.jobWorkType}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "jobWorkType", value },
                        })
                      }
                    >
                      <SelectTrigger id="jobWorkType" className="w-full">
                        <span>
                          {formData.jobWorkType || "Select work type"}
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobWorkDays">Work Days (per week)</Label>
                    <Input
                      id="jobWorkDays"
                      name="jobWorkDays"
                      type="number"
                      min="1"
                      max="7"
                      value={formData.jobWorkDays}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobExperienceRequired">
                      Experience Required (years)
                    </Label>
                    <Input
                      id="jobExperienceRequired"
                      name="jobExperienceRequired"
                      type="number"
                      min="0"
                      value={formData.jobExperienceRequired}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Job Description */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Description</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
              </motion.div>

              {/* Job Responsibilities */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Responsibilities</h2>
                {formData.jobResponsibilities.map((responsibility, index) => (
                  <div key={`resp-${index}`} className="flex gap-2">
                    <Input
                      value={responsibility}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "jobResponsibilities",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    {formData.jobResponsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeArrayItem("jobResponsibilities", index)
                        }
                      >
                        -
                      </Button>
                    )}
                    {index === formData.jobResponsibilities.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addArrayItem("jobResponsibilities")}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Job Qualifications */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Qualifications</h2>
                {formData.jobQualification.map((qualification, index) => (
                  <div key={`qual-${index}`} className="flex gap-2">
                    <Input
                      value={qualification}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "jobQualification",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Qualification ${index + 1}`}
                    />
                    {formData.jobQualification.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeArrayItem("jobQualification", index)
                        }
                      >
                        -
                      </Button>
                    )}
                    {index === formData.jobQualification.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addArrayItem("jobQualification")}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Job Eligibility */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Eligibility Criteria</h2>
                {formData.jobEligibility.map((eligibility, index) => (
                  <div key={`elig-${index}`} className="flex gap-2">
                    <Input
                      value={eligibility}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "jobEligibility",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Eligibility Criteria ${index + 1}`}
                    />
                    {formData.jobEligibility.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("jobEligibility", index)}
                      >
                        -
                      </Button>
                    )}
                    {index === formData.jobEligibility.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addArrayItem("jobEligibility")}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Job Skills */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Required Skills</h2>
                {formData.jobSkills.map((skill, index) => (
                  <div key={`skill-${index}`} className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "jobSkills",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Skill ${index + 1}`}
                    />
                    {formData.jobSkills.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("jobSkills", index)}
                      >
                        -
                      </Button>
                    )}
                    {index === formData.jobSkills.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addArrayItem("jobSkills")}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Job Deadline */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Application Deadline</h2>
                <div className="space-y-2">
                  <Label htmlFor="jobDeadline">Deadline Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.jobDeadline && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.jobDeadline ? (
                          format(new Date(formData.jobDeadline), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={
                          formData.jobDeadline
                            ? new Date(formData.jobDeadline)
                            : undefined
                        }
                        onSelect={(date) =>
                          setFormData({ ...formData, jobDeadline: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Job"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  );
}
