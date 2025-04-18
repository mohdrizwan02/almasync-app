"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Check, ChevronsUpDown, X } from "lucide-react";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export default function AddJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [locationOpen, setLocationOpen] = useState(false);

  const [skillOpen, setSkillOpen] = useState(false);
  const [responsibility, setResponsibility] = useState("");
  const [benifits, setBenifits] = useState("");
  const [eligibility, setEligibility] = useState("");

  useEffect(() => {
    axios
      .get("/api/get-locations")
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setLocations((prev) => response.data.locationData);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });

    axios
      .get("/api/get-skills")
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setSkills((prev) => response.data.skillData);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCompany: "",
    jobLocation: "",
    jobType: "",
    jobWorkType: "",
    jobDescription: "",
    jobResponsibilities: [],
    jobBenefits: [],
    jobEligibility: [],
    jobSkills: [],
    jobWorkDays: "",
    jobExperienceRequired: "",
    jobSalary: "",
    jobDeadline: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
          description:
            "Job has been listed ! waiting for admin to verify the job listing",
        });
        router.push("/alumni/jobs");
      } else {
        toast.error("Error", {
          description: "error posting the job try again",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error.response?.data?.message ||
          error.message ||
          "error adding the job ",
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
                    <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                      <PopoverTrigger className="" asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={locationOpen}
                          className="w-full max-w-72  justify-between"
                        >
                          {formData.jobLocation
                            ? locations.find(
                                (location) => location === formData.jobLocation
                              )
                            : "Select location"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className={"w-full"}>
                          <CommandInput
                            placeholder="Search locaion"
                            className="h-9"
                          />
                          <CommandList className={""}>
                            <CommandEmpty>No locations found.</CommandEmpty>
                            <CommandGroup>
                              {locations.map((location, index) => (
                                <CommandItem
                                  key={index}
                                  value={location}
                                  onSelect={(currentValue) => {
                                    setFormData({
                                      ...formData,
                                      jobLocation: currentValue,
                                    });
                                    setLocationOpen(false);
                                  }}
                                >
                                  {location}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      formData.jobLocation === location
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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

              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-xl font-semibold">Responsibilities</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.jobResponsibilities.map((res, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 text-sm py-1.5"
                    >
                      {res.slice(0, 20)}
                      {"..."}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const updatedArray = [
                            ...formData.jobResponsibilities,
                          ];
                          updatedArray.splice(index, 1);
                          setFormData({
                            ...formData,
                            jobResponsibilities: updatedArray,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Input
                    value={responsibility}
                    onChange={(e) =>
                      setResponsibility((prev) => e.target.value)
                    }
                    placeholder={`Add job responsibilities`}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (responsibility.trim().length === 0) {
                        return;
                      }
                      let array = [
                        ...formData.jobResponsibilities,
                        responsibility,
                      ];
                      setFormData({
                        ...formData,
                        jobResponsibilities: array,
                      });
                      setResponsibility((prev) => "");
                    }}
                  >
                    +
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-xl font-semibold">Eligibility</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.jobEligibility.map((elg, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 text-sm py-1.5"
                    >
                      {elg.slice(0, 20)}
                      {"..."}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const updatedArray = [...formData.jobEligibility];
                          updatedArray.splice(index, 1);
                          setFormData({
                            ...formData,
                            jobEligibility: updatedArray,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Input
                    value={eligibility}
                    onChange={(e) => setEligibility((prev) => e.target.value)}
                    placeholder={`Add job eligibilities`}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (eligibility.trim().length === 0) {
                        return;
                      }
                      let array = [...formData.jobEligibility, eligibility];
                      setFormData({
                        ...formData,
                        jobEligibility: array,
                      });
                      setEligibility((prev) => "");
                    }}
                  >
                    +
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-xl font-semibold">Job Benefits</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.jobBenefits.map((ben, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 text-sm py-1.5"
                    >
                      {ben.slice(0, 20)}
                      {"..."}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const updatedArray = [...formData.jobBenefits];
                          updatedArray.splice(index, 1);
                          setFormData({
                            ...formData,
                            jobBenefits: updatedArray,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Input
                    value={benifits}
                    onChange={(e) => setBenifits((prev) => e.target.value)}
                    placeholder={`Add job benefits`}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (benifits.trim().length === 0) {
                        return;
                      }
                      let array = [...formData.jobBenefits, benifits];
                      setFormData({
                        ...formData,
                        jobBenefits: array,
                      });
                      setBenifits((prev) => "");
                    }}
                  >
                    +
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-xl font-semibold">Required Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.jobSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 text-sm py-1.5"
                    >
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const updatedArray = [...formData.jobSkills];
                          updatedArray.splice(index, 1);
                          setFormData({
                            ...formData,
                            jobSkills: updatedArray,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <Popover open={skillOpen} onOpenChange={setSkillOpen}>
                  <PopoverTrigger className={""} asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={skillOpen}
                      className="w-full max-w-72 justify-between"
                    >
                      {formData.jobSkills.length == 0
                        ? "Select skills"
                        : `${formData.jobSkills.length} skills selected `}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-w-72 p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search skill.."
                        className="h-9"
                      />
                      <CommandList className={"w-full max-w-72"}>
                        <CommandEmpty>No skills found.</CommandEmpty>
                        <CommandGroup>
                          {skills.map((skill, index) => (
                            <CommandItem
                              key={index}
                              value={skill}
                              onSelect={(currentValue) => {
                                if (formData.jobSkills.includes(skill)) {
                                  let array = formData.jobSkills.filter(
                                    (skill) => skill !== currentValue
                                  );
                                  setFormData({
                                    ...formData,
                                    jobSkills: array,
                                  });
                                } else {
                                  let array = formData.jobSkills;

                                  array.push(currentValue);
                                  setFormData({
                                    ...formData,
                                    jobSkills: array,
                                  });
                                }
                                setSkillOpen(false);
                              }}
                            >
                              {skill}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  formData.jobSkills.includes(skill)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
