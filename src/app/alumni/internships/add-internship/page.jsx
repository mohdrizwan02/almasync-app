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

export default function AddInternshipPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

  // Form state
  const [formData, setFormData] = useState({
    internshipTitle: "",
    internshipCompany: "",
    internshipLocation: "",
    internshipType: "",
    internshipWorkType: "",
    internshipDescription: "",
    internshipDuration: "",
    internshipResponsibilities: [""],
    internshipQualification: [""],
    internshipEligibility: [""],
    internshipSkills: [""],
    internshipWorkDays: "",
    internshipExperienceRequired: "",
    internshipSalary: "",
    internshipDeadline: null,
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
      const response = await axios.post(
        "/api/internships/add-internship",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Success!", {
          description: "internship has been posted successfully.",
        });
        router.push("/alumni/internships");
      } else {
        toast.error("Error", {
          description: "error posting the internship try again",
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
          <h1 className="text-3xl font-bold mb-6">Post a New Internship</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Internship Details</CardTitle>
              <CardDescription>
                Fill in the details of the internship you want to post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="internshipTitle">Internship Role*</Label>
                    <Input
                      id="internshipTitle"
                      name="internshipTitle"
                      value={formData.internshipTitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipCompany">Company Name *</Label>
                    <Input
                      id="internshipCompany"
                      name="internshipCompany"
                      value={formData.internshipCompany}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipLocation">Location *</Label>
                    <Input
                      id="internshipLocation"
                      name="internshipLocation"
                      value={formData.internshipLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipSalary">Stipend</Label>
                    <Input
                      id="internshipSalary"
                      name="internshipSalary"
                      value={formData.internshipSalary}
                      onChange={handleInputChange}
                      placeholder="e.g. $50,000 - $70,000"
                    />
                  </div>
                </div>
              </motion.div>

              {/* internship Type Information */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Internship Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="internshipType">Employment Type</Label>
                    <Select
                      value={formData.internshipType}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "internshipType", value },
                        })
                      }
                    >
                      <SelectTrigger id="internshipType" className="w-full">
                        <span>
                          {formData.internshipType || "Select employment type"}
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
                    <Label htmlFor="internshipWorkType">Work Type</Label>
                    <Select
                      value={formData.internshipWorkType}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "internshipWorkType", value },
                        })
                      }
                    >
                      <SelectTrigger id="internshipWorkType" className="w-full">
                        <span>
                          {formData.internshipWorkType || "Select work type"}
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
                    <Label htmlFor="internshipWorkDays">
                      Work Days (per week)
                    </Label>
                    <Input
                      id="internshipWorkDays"
                      name="internshipWorkDays"
                      type="number"
                      min="1"
                      max="7"
                      value={formData.internshipWorkDays}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipExperienceRequired">
                      Experience Required (years)
                    </Label>
                    <Input
                      id="internshipExperienceRequired"
                      name="internshipExperienceRequired"
                      type="number"
                      min="0"
                      value={formData.internshipExperienceRequired}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </motion.div>

              {/* internship Description */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Internship Description
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="internshipDescription">Description</Label>
                  <Textarea
                    id="internshipDescription"
                    name="internshipDescription"
                    value={formData.internshipDescription}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Responsibilities</h2>
                {formData.internshipResponsibilities.map(
                  (responsibility, index) => (
                    <div key={`resp-${index}`} className="flex gap-2">
                      <Input
                        value={responsibility}
                        onChange={(e) =>
                          handleArrayFieldChange(
                            "internshipResponsibilities",
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Responsibility ${index + 1}`}
                      />
                      {formData.internshipResponsibilities.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            removeArrayItem("internshipResponsibilities", index)
                          }
                        >
                          -
                        </Button>
                      )}
                      {index ===
                        formData.internshipResponsibilities.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            addArrayItem("internshipResponsibilities")
                          }
                        >
                          +
                        </Button>
                      )}
                    </div>
                  )
                )}
              </motion.div>

              {/* internship Qualifications */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Qualifications</h2>
                {formData.internshipQualification.map(
                  (qualification, index) => (
                    <div key={`qual-${index}`} className="flex gap-2">
                      <Input
                        value={qualification}
                        onChange={(e) =>
                          handleArrayFieldChange(
                            "internshipQualification",
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Qualification ${index + 1}`}
                      />
                      {formData.internshipQualification.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            removeArrayItem("internshipQualification", index)
                          }
                        >
                          -
                        </Button>
                      )}
                      {index ===
                        formData.internshipQualification.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            addArrayItem("internshipQualification")
                          }
                        >
                          +
                        </Button>
                      )}
                    </div>
                  )
                )}
              </motion.div>

              {/* internship Eligibility */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Eligibility Criteria</h2>
                {formData.internshipEligibility.map((eligibility, index) => (
                  <div key={`elig-${index}`} className="flex gap-2">
                    <Input
                      value={eligibility}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "internshipEligibility",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Eligibility Criteria ${index + 1}`}
                    />
                    {formData.internshipEligibility.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeArrayItem("internshipEligibility", index)
                        }
                      >
                        -
                      </Button>
                    )}
                    {index === formData.internshipEligibility.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addArrayItem("internshipEligibility")}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* internship Skills */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Required Skills</h2>
                {formData.internshipSkills.map((skill, index) => (
                  <div key={`skill-${index}`} className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "internshipSkills",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Skill ${index + 1}`}
                    />
                    {formData.internshipSkills.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeArrayItem("internshipSkills", index)
                        }
                      >
                        -
                      </Button>
                    )}
                    {index === formData.internshipSkills.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addArrayItem("internshipSkills")}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* internship Deadline */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-semibold">Application Deadline</h2>
                <div className="space-y-2">
                  <Label htmlFor="internshipDeadline">Deadline Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.internshipDeadline &&
                            "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.internshipDeadline ? (
                          format(new Date(formData.internshipDeadline), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={
                          formData.internshipDeadline
                            ? new Date(formData.internshipDeadline)
                            : undefined
                        }
                        onSelect={(date) =>
                          setFormData({ ...formData, internshipDeadline: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="internshipExperienceRequired">
                    Internship Duration(months)
                  </Label>
                  <Input
                    id="internshipDuration"
                    name="internshipDuration"
                    type="number"
                    min="0"
                    value={formData.internshipDuration}
                    onChange={handleInputChange}
                  />
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
                {isSubmitting ? "Posting..." : "Post internship"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  );
}
