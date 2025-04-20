"use client";

import { useEffect, useRef } from "react";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Save,
} from "lucide-react";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";

import { Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";

import { Github, Linkedin, Twitter, Globe } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

function EducationForm({ data, updateData }) {
  const [education, setEducation] = useState(data.education || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddEducation = () => {
    const newEducation = {
      educationInstitution: "",
      educationDegree: "",
      educationFieldOfStudy: "",
      educationStartYear: null,
      educationEndYear: null,
      educationGrade: "",
      educationDescription: "",
      educationAssociatedSkills: [],
    };

    setEducation([...education, newEducation]);
    updateData("education", { education: [...education, newEducation] });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    updateData("education", { education: updatedEducation });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
    updateData("education", { education: updatedEducation });
  };

  const handleAddSkill = (index) => {
    if (!newSkill.trim()) return;

    const updatedEducation = [...education];
    updatedEducation[index].educationAssociatedSkills = [
      ...updatedEducation[index].educationAssociatedSkills,
      newSkill.trim(),
    ];

    setEducation(updatedEducation);
    updateData("education", { education: updatedEducation });
    setNewSkill("");
  };

  const handleRemoveSkill = (educationIndex, skillIndex) => {
    const updatedEducation = [...education];
    updatedEducation[educationIndex].educationAssociatedSkills =
      updatedEducation[educationIndex].educationAssociatedSkills.filter(
        (_, i) => i !== skillIndex
      );

    setEducation(updatedEducation);
    updateData("education", { education: updatedEducation });
  };

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
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Education History</h2>
        <p className="text-muted-foreground">
          Add your educational background and qualifications
        </p>
      </motion.div>

      <ScrollArea className="h-[500px] pr-4">
        <AnimatePresence>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Education #{index + 1}
                    </h3>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>
                        Institution
                      </Label>
                      <Input
                        id={`institution-${index}`}
                        value={edu.educationInstitution || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "educationInstitution",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Harvard University"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={edu.educationDegree || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "educationDegree",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-${index}`}>Field of Study</Label>
                      <Input
                        id={`field-${index}`}
                        value={edu.educationFieldOfStudy || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "educationFieldOfStudy",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`grade-${index}`}>Grade/GPA</Label>
                      <Input
                        id={`grade-${index}`}
                        value={edu.educationGrade || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "educationGrade",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`start-year-${index}`}>Start Year</Label>
                      <Select
                        value={edu.educationStartYear?.toString() || ""}
                        onValueChange={(value) =>
                          handleEducationChange(
                            index,
                            "educationStartYear",
                            Number.parseInt(value)
                          )
                        }
                      >
                        <SelectTrigger id={`start-year-${index}`}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 50 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`end-year-${index}`}>End Year</Label>
                      <Select
                        value={edu.educationEndYear?.toString() || ""}
                        onValueChange={(value) =>
                          handleEducationChange(
                            index,
                            "educationEndYear",
                            Number.parseInt(value)
                          )
                        }
                      >
                        <SelectTrigger id={`end-year-${index}`}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 50 },
                            (_, i) => new Date().getFullYear() - i + 1
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={edu.educationDescription || ""}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "educationDescription",
                          e.target.value
                        )
                      }
                      placeholder="Describe your studies, achievements, etc."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label>Associated Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {edu.educationAssociatedSkills?.map(
                        (skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {skill}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() =>
                                handleRemoveSkill(index, skillIndex)
                              }
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkill(index);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddSkill(index)}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      <motion.div variants={itemVariants}>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleAddEducation}
        >
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </motion.div>
    </motion.div>
  );
}

function ExperienceForm({ data, updateData }) {
  const [experience, setExperience] = useState(data.experience || []);

  const handleAddExperience = () => {
    const newExperience = {
      employmentCompany: "",
      employmentPosition: "",
      employmentLocation: "",
      currentlyWorking: false,
      employmentType: "",
      employmentWorkType: "",
      employmentStartDate: null,
      employmentEndDate: null,
      employmentDescription: "",
    };

    setExperience([...experience, newExperience]);
    updateData("experience", { experience: [...experience, newExperience] });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    updateData("experience", { experience: updatedExperience });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
    updateData("experience", { experience: updatedExperience });
  };

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
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
    "Volunteer",
  ];

  const workTypes = ["On-site", "Remote", "Hybrid"];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <p className="text-muted-foreground">
          Add your professional experience and work history
        </p>
      </motion.div>

      <ScrollArea className="h-[500px] pr-4">
        <AnimatePresence>
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Experience #{index + 1}
                    </h3>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveExperience(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        value={exp.employmentCompany || ""}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "employmentCompany",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Google"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`position-${index}`}>Position</Label>
                      <Input
                        id={`position-${index}`}
                        value={exp.employmentPosition || ""}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "employmentPosition",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={exp.employmentLocation || ""}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "employmentLocation",
                            e.target.value
                          )
                        }
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`employment-type-${index}`}>
                        Employment Type
                      </Label>
                      <Select
                        value={exp.employmentType || ""}
                        onValueChange={(value) =>
                          handleExperienceChange(index, "employmentType", value)
                        }
                      >
                        <SelectTrigger id={`employment-type-${index}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`work-type-${index}`}>Work Type</Label>
                      <Select
                        value={exp.employmentWorkType || ""}
                        onValueChange={(value) =>
                          handleExperienceChange(
                            index,
                            "employmentWorkType",
                            value
                          )
                        }
                      >
                        <SelectTrigger id={`work-type-${index}`}>
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                          {workTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 flex items-center">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`currently-working-${index}`}
                          checked={exp.currentlyWorking}
                          onCheckedChange={(checked) =>
                            handleExperienceChange(
                              index,
                              "currentlyWorking",
                              checked
                            )
                          }
                        />
                        <Label htmlFor={`currently-working-${index}`}>
                          I currently work here
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <Input
                        id={`start-date-${index}`}
                        type="date"
                        value={
                          exp.employmentStartDate
                            ? new Date(exp.employmentStartDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "employmentStartDate",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${index}`}>End Date</Label>
                      <Input
                        id={`end-date-${index}`}
                        type="date"
                        disabled={exp.currentlyWorking}
                        value={
                          exp.employmentEndDate && !exp.currentlyWorking
                            ? new Date(exp.employmentEndDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "employmentEndDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={exp.employmentDescription || ""}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "employmentDescription",
                          e.target.value
                        )
                      }
                      placeholder="Describe your responsibilities and achievements"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      <motion.div variants={itemVariants}>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleAddExperience}
        >
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </motion.div>
    </motion.div>
  );
}

function MentorshipForm({ data, updateData }) {
  const [availableForMentorship, setAvailableForMentorship] = useState(
    data.availableForMentorship || false
  );
  const [mentorshipExperience, setMentorshipExperience] = useState(
    data.mentorshipExperience || null
  );
  const [mentorshipTopics, setMentorshipTopics] = useState(
    data.mentorshipTopics || []
  );
  const [newTopic, setNewTopic] = useState("");

  const handleAvailabilityChange = (checked) => {
    setAvailableForMentorship(checked);
    updateData("mentorship", { availableForMentorship: checked });
  };

  const handleExperienceChange = (value) => {
    const experience = Number.parseInt(value);
    setMentorshipExperience(experience);
    updateData("mentorship", { mentorshipExperience: experience });
  };

  const handleAddTopic = () => {
    if (!newTopic.trim()) return;
    const updatedTopics = [...mentorshipTopics, newTopic.trim()];
    setMentorshipTopics(updatedTopics);
    updateData("mentorship", { mentorshipTopics: updatedTopics });
    setNewTopic("");
  };

  const handleRemoveTopic = (index) => {
    const updatedTopics = mentorshipTopics.filter((_, i) => i !== index);
    setMentorshipTopics(updatedTopics);
    updateData("mentorship", { mentorshipTopics: updatedTopics });
  };

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
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Mentorship Information</h2>
        <p className="text-muted-foreground">
          Share your mentorship preferences and expertise
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                  Mentorship Availability
                </h3>
                <p className="text-sm text-muted-foreground">
                  Are you available to mentor other alumni or students?
                </p>
              </div>
              <Switch
                checked={availableForMentorship}
                onCheckedChange={handleAvailabilityChange}
              />
            </div>

            {availableForMentorship && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="mentorship-experience">
                    Years of Mentorship Experience
                  </Label>
                  <Select
                    value={mentorshipExperience?.toString() || ""}
                    onValueChange={handleExperienceChange}
                  >
                    <SelectTrigger id="mentorship-experience">
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 21 }, (_, i) => i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year === 0
                            ? "Less than 1 year"
                            : `${year} ${year === 1 ? "year" : "years"}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mentorship Topics</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add topics you're willing to mentor others in
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentorshipTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 text-sm py-1.5"
                      >
                        {topic}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTopic(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="e.g., Career Guidance, Technical Skills, Interview Preparation"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTopic();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTopic}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function SocialContactForm({ data, updateData }) {
  const [socials, setSocials] = useState(
    data.socials || {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
    }
  );

  const [address, setAddress] = useState(
    data.address || {
      country: "",
      pincode: "",
      landmark: "",
      city: "",
      houseNumber: "",
    }
  );

  const handleSocialChange = (platform, value) => {
    const updatedSocials = { ...socials, [platform]: value };
    setSocials(updatedSocials);
    updateData("socials", { socials: updatedSocials });
  };

  const handleAddressChange = (field, value) => {
    const updatedAddress = { ...address, [field]: value };
    setAddress(updatedAddress);
    updateData("address", { address: updatedAddress });
  };

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
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Social & Contact Information</h2>
        <p className="text-muted-foreground">
          Add your social media profiles and contact details
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Social Media Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={socials.linkedin || ""}
                  onChange={(e) =>
                    handleSocialChange("linkedin", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </Label>
                <Input
                  id="github"
                  value={socials.github || ""}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter
                </Label>
                <Input
                  id="twitter"
                  value={socials.twitter || ""}
                  onChange={(e) =>
                    handleSocialChange("twitter", e.target.value)
                  }
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Portfolio/Website
                </Label>
                <Input
                  id="portfolio"
                  value={socials.portfolio || ""}
                  onChange={(e) =>
                    handleSocialChange("portfolio", e.target.value)
                  }
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={address.country || ""}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  placeholder="e.g., India"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city || ""}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="e.g., Hyderabad"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Postal/ZIP Code</Label>
                <Input
                  id="pincode"
                  value={address.pincode || ""}
                  onChange={(e) =>
                    handleAddressChange("pincode", e.target.value)
                  }
                  placeholder="e.g., 500003"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="houseNumber">House/Apartment Number</Label>
                <Input
                  id="houseNumber"
                  value={address.houseNumber || ""}
                  onChange={(e) =>
                    handleAddressChange("houseNumber", e.target.value)
                  }
                  placeholder="e.g., Apt 4B, 123"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={address.landmark || ""}
                  onChange={(e) =>
                    handleAddressChange("landmark", e.target.value)
                  }
                  placeholder="e.g., Near jubliee hills"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function SkillsCertificationsForm({ allSkills, data, updateData }) {
  const [open, setOpen] = useState(false);

  const [skills, setSkills] = useState(data.skills || []);
  const [languages, setLanguages] = useState(data.communicationLanguages || []);
  const [hobbies, setHobbies] = useState(data.hobbies || []);
  const [certifications, setCertifications] = useState(
    data.certifications || []
  );

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newCertSkill, setNewCertSkill] = useState("");

  // Skills handlers
  const handleAddSkill = (skill) => {
    const updatedSkills = [...skills, skill];
    setSkills(updatedSkills);
    updateData("skills", { skills: updatedSkills });
    setNewSkill("");
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateData("skills", { skills: updatedSkills });
  };

  // Languages handlers
  const handleAddLanguage = () => {
    if (!newLanguage.trim()) return;
    const updatedLanguages = [...languages, newLanguage.trim()];
    setLanguages(updatedLanguages);
    updateData("languages", { communicationLanguages: updatedLanguages });
    setNewLanguage("");
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
    updateData("languages", { communicationLanguages: updatedLanguages });
  };

  // Hobbies handlers
  const handleAddHobby = () => {
    if (!newHobby.trim()) return;
    const updatedHobbies = [...hobbies, newHobby.trim()];
    setHobbies(updatedHobbies);
    updateData("hobbies", { hobbies: updatedHobbies });
    setNewHobby("");
  };

  const handleRemoveHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
    updateData("hobbies", { hobbies: updatedHobbies });
  };

  // Certifications handlers
  const handleAddCertification = () => {
    const newCertification = {
      certificationName: "",
      certificationOrganization: "",
      certificationIssueDate: null,
      certificationExpirationDate: null,
      certificationId: "",
      certificationUrl: "",
      certificationAssociatedSkills: [],
    };

    setCertifications([...certifications, newCertification]);
    updateData("certifications", {
      certifications: [...certifications, newCertification],
    });
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
    updateData("certifications", { certifications: updatedCertifications });
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
    updateData("certifications", { certifications: updatedCertifications });
  };

  const handleAddCertSkill = (index) => {
    if (!newCertSkill.trim()) return;

    const updatedCertifications = [...certifications];
    updatedCertifications[index].certificationAssociatedSkills = [
      ...updatedCertifications[index].certificationAssociatedSkills,
      newCertSkill.trim(),
    ];

    setCertifications(updatedCertifications);
    updateData("certifications", { certifications: updatedCertifications });
    setNewCertSkill("");
  };

  const handleRemoveCertSkill = (certIndex, skillIndex) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[certIndex].certificationAssociatedSkills =
      updatedCertifications[certIndex].certificationAssociatedSkills.filter(
        (_, i) => i !== skillIndex
      );

    setCertifications(updatedCertifications);
    updateData("certifications", { certifications: updatedCertifications });
  };

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
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Skills & Certifications</h2>
        <p className="text-muted-foreground">
          Showcase your skills, languages, and professional certifications
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold">Professional Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 text-sm py-1.5"
            >
              {skill}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleRemoveSkill(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className={""} asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full max-w-72 justify-between"
            >
              {skills.length == 0
                ? "select skills"
                : `${skills.length} skills selected `}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-72 p-0">
            <Command>
              <CommandInput placeholder="Search skill.." className="h-9" />
              <CommandList className={"w-full max-w-72"}>
                <CommandEmpty>No skills found.</CommandEmpty>
                <CommandGroup>
                  {allSkills.map((skill, index) => (
                    <CommandItem
                      key={index}
                      value={skill}
                      onSelect={(currentValue) => {
                        handleAddSkill(currentValue);
                        setOpen(false);
                      }}
                    >
                      {skill}
                      <Check
                        className={cn(
                          "ml-auto",
                          skills.includes(skill) ? "opacity-100" : "opacity-0"
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

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold">Communication Languages</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((language, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 text-sm py-1.5"
            >
              {language}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleRemoveLanguage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language (e.g., English, Spanish)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddLanguage();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={handleAddLanguage}>
            Add
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold">Hobbies & Interests</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {hobbies.map((hobby, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 text-sm py-1.5"
            >
              {hobby}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleRemoveHobby(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby (e.g., Photography, Hiking)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddHobby();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={handleAddHobby}>
            Add
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold">Certifications</h3>

        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence>
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">
                        Certification #{index + 1}
                      </h4>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveCertification(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`cert-name-${index}`}>
                          Certification Name
                        </Label>
                        <Input
                          id={`cert-name-${index}`}
                          value={cert.certificationName || ""}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "certificationName",
                              e.target.value
                            )
                          }
                          placeholder="e.g., AWS Certified Solutions Architect"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-org-${index}`}>
                          Issuing Organization
                        </Label>
                        <Input
                          id={`cert-org-${index}`}
                          value={cert.certificationOrganization || ""}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "certificationOrganization",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-issue-date-${index}`}>
                          Issue Date
                        </Label>
                        <Input
                          id={`cert-issue-date-${index}`}
                          type="date"
                          value={
                            cert.certificationIssueDate
                              ? new Date(cert.certificationIssueDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "certificationIssueDate",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-expiry-date-${index}`}>
                          Expiration Date
                        </Label>
                        <Input
                          id={`cert-expiry-date-${index}`}
                          type="date"
                          value={
                            cert.certificationExpirationDate
                              ? new Date(cert.certificationExpirationDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "certificationExpirationDate",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-id-${index}`}>
                          Credential ID
                        </Label>
                        <Input
                          id={`cert-id-${index}`}
                          value={cert.certificationId || ""}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "certificationId",
                              e.target.value
                            )
                          }
                          placeholder="e.g., ABC123XYZ"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cert-url-${index}`}>
                          Credential URL
                        </Label>
                        <Input
                          id={`cert-url-${index}`}
                          value={cert.certificationUrl || ""}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "certificationUrl",
                              e.target.value
                            )
                          }
                          placeholder="e.g., https://credential.verify.com/abc123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <Label>Associated Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {cert.certificationAssociatedSkills?.map(
                          (skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {skill}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() =>
                                  handleRemoveCertSkill(index, skillIndex)
                                }
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          )
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newCertSkill}
                          onChange={(e) => setNewCertSkill(e.target.value)}
                          placeholder="Add a skill related to this certification"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCertSkill(index);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAddCertSkill(index)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleAddCertification}
        >
          <Plus className="h-4 w-4" /> Add Certification
        </Button>
      </motion.div>
    </motion.div>
  );
}

function PersonalInfoForm({ locations, data, updateData }) {
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [locationOpen, setLocationOpen] = useState(false);

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Save the file object in state
    updateData("personalInfo", {
      [type]: file,
    });
  };

  const triggerUpload = (ref) => {
    ref.current?.click();
  };

  const getImageUrl = (file) => {
    if (typeof file === "string") {
      return file; // Already a URL or base64 string
    }

    if (file instanceof File) {
      return URL.createObjectURL(file); // Create preview URL
    }

    return "/placeholder.svg"; // Fallback placeholder
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData("personalInfo", {
      about: [about],
      // Other fields would be collected from the form
    });
  };

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
    },
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">
          Let's start with your basic information
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={
              data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              updateData("personalInfo", { dateOfBirth: e.target.value })
            }
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            value={data.mobileNumber}
            onChange={(e) =>
              updateData("personalInfo", { mobileNumber: e.target.value })
            }
            placeholder="Enter your mobile number"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <RadioGroup
            value={data.gender}
            onValueChange={(value) =>
              updateData("personalInfo", { gender: value })
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="profileHeadline">Profile Headline</Label>
        <Input
          id="profileHeadline"
          value={data.profileHeadline}
          onChange={(e) =>
            updateData("personalInfo", { profileHeadline: e.target.value })
          }
          placeholder="e.g., Software Engineer at Google | AI Enthusiast"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          value={data.about}
          onChange={(e) =>
            updateData("personalInfo", { about: e.target.value })
          }
          placeholder="Tell us about yourself"
          rows={4}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold">Current Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentlyWorkingAt">Company</Label>
            <Input
              id="currentlyWorkingAt"
              value={data.currentlyWorkingAt}
              onChange={(e) =>
                updateData("personalInfo", {
                  currentlyWorkingAt: e.target.value,
                })
              }
              placeholder="e.g., Google, Microsoft"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentlyWorkingAs">Role</Label>
            <Input
              id="currentlyWorkingAs"
              value={data.currentlyWorkingAs}
              onChange={(e) =>
                updateData("personalInfo", {
                  currentlyWorkingAs: e.target.value,
                })
              }
              placeholder="e.g., Software Engineer, Product Manager"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentlyWorkingIn">Location</Label>

            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger className="" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={locationOpen}
                  className="w-full max-w-72  justify-between"
                >
                  {data.currentlyWorkingIn !== ""
                    ? locations.find(
                        (location) => location === data.currentlyWorkingIn
                      )
                    : "Select location"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className={"w-full"}>
                  <CommandInput placeholder="Search locaion" className="h-9" />
                  <CommandList className={""}>
                    <CommandEmpty>No locations found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location, index) => (
                        <CommandItem
                          key={index}
                          value={location}
                          onSelect={(currentValue) => {
                            if (data.currentlyWorkingIn === currentValue) {
                              updateData("personalInfo", {
                                currentlyWorkingIn: "",
                              });
                            } else {
                              updateData("personalInfo", {
                                currentlyWorkingIn: currentValue,
                              });
                            }
                            setLocationOpen(false);
                          }}
                        >
                          {location}
                          <Check
                            className={cn(
                              "ml-auto",
                              data.currentlyWorkingIn === location
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
            <Label htmlFor="currentExperience">Experience</Label>
            <Input
              id="currentExperience"
              value={data.currentExperience}
              onChange={(e) =>
                updateData("personalInfo", {
                  currentExperience: e.target.value,
                })
              }
              placeholder="e.g., 3 years"
            />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold">Profile Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
                  {data.profileImage ? (
                    <>
                      <Image
                        src={getImageUrl(data.profileImage)}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-6 w-6"
                        onClick={() =>
                          updateData("personalInfo", { profileImage: null })
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "profileImage")}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => triggerUpload(profileInputRef)}
                >
                  <Upload className="h-4 w-4" /> Upload Profile Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
                  {data.coverImage ? (
                    <>
                      <Image
                        src={getImageUrl(data.coverImage)}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-6 w-6"
                        onClick={() =>
                          updateData("personalInfo", { coverImage: null })
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "coverImage")}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => triggerUpload(coverInputRef)}
                >
                  <Upload className="h-4 w-4" /> Upload Cover Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.form>
  );
}

export default function ProfileUpdatePage() {
  const [pageLoad, setPageLoad] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    mobileNumber: "",
    coverImage,
    profileImage,
    gender: "",
    about: "",

    currentlyWorkingIn: "",
    currentlyWorkingAt: "",
    currentlyWorkingAs: "",
    currentExperience: "",
    profileHeadline: "",

    skills: [],
    communicationLanguages: [],
    hobbies: [],

    education: [
      {
        educationInstitution: "",
        educationDegree: "",
        educationFieldOfStudy: "",
        educationStartYear: null,
        educationEndYear: null,
        educationGrade: "",
        educationDescription: "",
        educationAssociatedSkills: [],
      },
    ],

    experience: [
      {
        employmentCompany: "",
        employmentPosition: "",
        employmentLocation: "",
        currentlyWorking: false,
        employmentType: "",
        employmentWorkType: "",
        employmentStartDate: null,
        employmentEndDate: null,
        employmentDescription: "",
      },
    ],

    certifications: [
      {
        certificationName: "",
        certificationOrganization: "",
        certificationIssueDate: null,
        certificationExpirationDate: null,
        certificationId: "",
        certificationUrl: "",
        certificationAssociatedSkills: [],
      },
    ],

    availableForMentorship: false,
    mentorshipExperience: null,
    mentorshipTopics: [],

    socials: {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
    },
    address: {
      country: "",
      pincode: "",
      landmark: "",
      city: "",
      houseNumber: "",
    },
  });

  const [locations, setLocations] = useState([]);

  const [allSkills, setAllSkills] = useState([]);

  const totalSteps = 6;

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
  }, []);

  useEffect(() => {
    try {
      axios.get("/api/get-skills").then((response) => {
        if (response.data.success) {
          setAllSkills((prev) => response.data.skillData);
        }
      });
    } catch (error) {
      console.log("error occurred ");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/check-profile-status")
      .then((response) => {
        if (response.data.data.isProfileComplete) {
          router.push("/alumni/profile");
        } else {
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        console.log(error);
        router.push("/alumni/profile");
      });
  }, []);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading((prev) => true);
    try {
      const formDataToSend = new FormData();

      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      formDataToSend.append("mobileNumber", formData.mobileNumber || "");
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("dateOfBirth", formData.dateOfBirth || "");
      formDataToSend.append(
        "currentExperience",
        formData.currentExperience || ""
      );
      formDataToSend.append(
        "currentlyWorkingAs",
        formData.currentlyWorkingAs || ""
      );
      formDataToSend.append(
        "currentlyWorkingAt",
        formData.currentlyWorkingAt || ""
      );
      formDataToSend.append(
        "currentlyWorkingIn",
        formData.currentlyWorkingIn || ""
      );
      formDataToSend.append("profileHeadline", formData.profileHeadline || "");
      formDataToSend.append(
        "availableForMentorship",
        String(formData.availableForMentorship || false)
      );
      formDataToSend.append(
        "mentorshipExperience",
        formData.mentorshipExperience || ""
      );

      formDataToSend.append("about", JSON.stringify(formData.about || ""));
      formDataToSend.append("address", JSON.stringify(formData.address || {}));
      formDataToSend.append(
        "certifications",
        JSON.stringify(formData.certifications || [])
      );
      formDataToSend.append(
        "communicationLanguages",
        JSON.stringify(formData.communicationLanguages || [])
      );
      formDataToSend.append(
        "education",
        JSON.stringify(formData.education || [])
      );
      formDataToSend.append(
        "experience",
        JSON.stringify(formData.experience || [])
      );
      formDataToSend.append(
        "mentorshipTopics",
        JSON.stringify(formData.mentorshipTopics || [])
      );
      formDataToSend.append("skills", JSON.stringify(formData.skills || []));
      formDataToSend.append("socials", JSON.stringify(formData.socials || {}));
      formDataToSend.append("hobbies", JSON.stringify(formData.hobbies || []));

      const response = await axios.post(
        "/api/alumni/complete-profile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        console.log("profile details has been successfully updated");
      }

      toast.success("Profile Updated", {
        description: "Your profile has been successfully updated.",
        descriptionClassName: "text-gray-700",
      });

      router.push("/alumni/profile");
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.error("Error", {
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData}
            locations={locations}
            updateData={updateFormData}
          />
        );
      case 2:
        return <EducationForm data={formData} updateData={updateFormData} />;
      case 3:
        return <ExperienceForm data={formData} updateData={updateFormData} />;
      case 4:
        return (
          <SkillsCertificationsForm
            allSkills={allSkills}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 5:
        return <MentorshipForm data={formData} updateData={updateFormData} />;
      case 6:
        return (
          <SocialContactForm data={formData} updateData={updateFormData} />
        );
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const fadeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <>
      {pageLoad ? (
        <div className="container mx-auto max-w-7xl md:px-5">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Complete Your Alumni Profile
            </h1>
            <p className="text-muted-foreground">
              Showcase your journey and connect with fellow alumni
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center ${
                    index + 1 === currentStep
                      ? "text-primary"
                      : index + 1 < currentStep
                        ? "text-primary/70"
                        : "text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      index + 1 === currentStep
                        ? "bg-primary text-white"
                        : index + 1 < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs hidden md:block">
                    {index === 0
                      ? "Personal"
                      : index === 1
                        ? "Education"
                        : index === 2
                          ? "Experience"
                          : index === 3
                            ? "Skills"
                            : index === 4
                              ? "Mentorship"
                              : "Contact"}
                  </span>
                </motion.div>
              ))}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="flex items-center gap-2">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                Save Profile <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
