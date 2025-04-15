"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

export default function EditProfileModal({
  isOpen,
  onClose,
  section,
  profile,
  onSave,
}) {
  const [formData, setFormData] = useState(profile);
  const [newSkill, setNewSkill] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newMentorshipTopic, setNewMentorshipTopic] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), newHobby.trim()],
      }));
      setNewHobby("");
    }
  };

  const handleRemoveHobby = (index) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setFormData((prev) => ({
        ...prev,
        communicationLanguages: [
          ...(prev.communicationLanguages || []),
          newLanguage.trim(),
        ],
      }));
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (index) => {
    setFormData((prev) => ({
      ...prev,
      communicationLanguages: prev.communicationLanguages.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleAddMentorshipTopic = () => {
    if (newMentorshipTopic.trim()) {
      setFormData((prev) => ({
        ...prev,
        mentorshipTopics: [
          ...(prev.mentorshipTopics || []),
          newMentorshipTopic.trim(),
        ],
      }));
      setNewMentorshipTopic("");
    }
  };

  const handleRemoveMentorshipTopic = (index) => {
    setFormData((prev) => ({
      ...prev,
      mentorshipTopics: prev.mentorshipTopics.filter((_, i) => i !== index),
    }));
  };

  const handleSwitchChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const renderBasicInfoForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="profileHeadline">Profile Headline</Label>
          <Input
            id="profileHeadline"
            name="profileHeadline"
            value={formData.profileHeadline || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
          <Input
            id="enrollmentNumber"
            name="enrollmentNumber"
            value={formData.enrollmentNumber || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? (
                  format(new Date(formData.dateOfBirth), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  formData.dateOfBirth
                    ? new Date(formData.dateOfBirth)
                    : undefined
                }
                onSelect={(date) => handleDateChange("dateOfBirth", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender || ""}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "gender", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Input
            id="college"
            name="college"
            value={formData.college || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input
            id="degree"
            name="degree"
            value={formData.degree || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={formData.department || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admissionYear">Admission Year</Label>
          <Input
            id="admissionYear"
            name="admissionYear"
            value={formData.admissionYear || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passoutYear">Passout Year</Label>
          <Input
            id="passoutYear"
            name="passoutYear"
            value={formData.passoutYear || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <Label>Current Work</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentlyWorkingIn">Industry</Label>
            <Input
              id="currentlyWorkingIn"
              name="currentlyWorkingIn"
              value={formData.currentlyWorkingIn || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentlyWorkingAt">Company</Label>
            <Input
              id="currentlyWorkingAt"
              name="currentlyWorkingAt"
              value={formData.currentlyWorkingAt || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentlyWorkingAs">Position</Label>
            <Input
              id="currentlyWorkingAs"
              name="currentlyWorkingAs"
              value={formData.currentlyWorkingAs || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <Label>Address</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address.houseNumber">House Number</Label>
            <Input
              id="address.houseNumber"
              value={formData.address?.houseNumber || ""}
              onChange={(e) =>
                handleNestedInputChange(
                  "address",
                  "houseNumber",
                  e.target.value
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.landmark">Landmark</Label>
            <Input
              id="address.landmark"
              value={formData.address?.landmark || ""}
              onChange={(e) =>
                handleNestedInputChange("address", "landmark", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.city">City</Label>
            <Input
              id="address.city"
              value={formData.address?.city || ""}
              onChange={(e) =>
                handleNestedInputChange("address", "city", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.pincode">Pincode</Label>
            <Input
              id="address.pincode"
              value={formData.address?.pincode || ""}
              onChange={(e) =>
                handleNestedInputChange("address", "pincode", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.country">Country</Label>
            <Input
              id="address.country"
              value={formData.address?.country || ""}
              onChange={(e) =>
                handleNestedInputChange("address", "country", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderAboutForm = () => (
    <>
      <div className="space-y-2 mb-4">
        <Label htmlFor="about">About Me</Label>
        <Textarea
          id="about"
          className="min-h-[150px]"
          value={formData.about ? formData.about.join("\n\n") : ""}
          onChange={(e) => {
            const paragraphs = e.target.value
              .split("\n\n")
              .filter((p) => p.trim());
            setFormData((prev) => ({ ...prev, about: paragraphs }));
          }}
          placeholder="Write a few paragraphs about yourself..."
        />
      </div>

      <div className="space-y-2 mb-4">
        <Label>Skills</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <Button type="button" onClick={handleAddSkill}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills?.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-muted rounded-full px-3 py-1"
            >
              <span className="mr-1">{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <Label>Languages</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddLanguage();
              }
            }}
          />
          <Button type="button" onClick={handleAddLanguage}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.communicationLanguages?.map((language, index) => (
            <div
              key={index}
              className="flex items-center bg-muted rounded-full px-3 py-1"
            >
              <span className="mr-1">{language}</span>
              <button
                type="button"
                onClick={() => handleRemoveLanguage(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <Label>Hobbies</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddHobby();
              }
            }}
          />
          <Button type="button" onClick={handleAddHobby}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.hobbies?.map((hobby, index) => (
            <div
              key={index}
              className="flex items-center bg-muted rounded-full px-3 py-1"
            >
              <span className="mr-1">{hobby}</span>
              <button
                type="button"
                onClick={() => handleRemoveHobby(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="socials.linkedin">LinkedIn</Label>
            <Input
              id="socials.linkedin"
              value={formData.socials?.linkedin || ""}
              onChange={(e) =>
                handleNestedInputChange("socials", "linkedin", e.target.value)
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="socials.github">GitHub</Label>
            <Input
              id="socials.github"
              value={formData.socials?.github || ""}
              onChange={(e) =>
                handleNestedInputChange("socials", "github", e.target.value)
              }
              placeholder="https://github.com/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="socials.twitter">Twitter</Label>
            <Input
              id="socials.twitter"
              value={formData.socials?.twitter || ""}
              onChange={(e) =>
                handleNestedInputChange("socials", "twitter", e.target.value)
              }
              placeholder="https://twitter.com/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="socials.portfolio">Portfolio</Label>
            <Input
              id="socials.portfolio"
              value={formData.socials?.portfolio || ""}
              onChange={(e) =>
                handleNestedInputChange("socials", "portfolio", e.target.value)
              }
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderMentorshipForm = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-0.5">
          <Label htmlFor="availableForMentorship">
            Available for Mentorship
          </Label>
          <p className="text-sm text-muted-foreground">
            Toggle this to show that you're open to mentoring others
          </p>
        </div>
        <Switch
          id="availableForMentorship"
          checked={formData.availableForMentorship}
          onCheckedChange={(checked) =>
            handleSwitchChange("availableForMentorship", checked)
          }
        />
      </div>

      <div className="space-y-2 mb-4">
        <Label htmlFor="mentorshipExperience">
          Mentorship Experience (years)
        </Label>
        <Input
          id="mentorshipExperience"
          name="mentorshipExperience"
          type="number"
          value={formData.mentorshipExperience || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2 mb-4">
        <Label>Mentorship Topics</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newMentorshipTopic}
            onChange={(e) => setNewMentorshipTopic(e.target.value)}
            placeholder="Add a topic..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddMentorshipTopic();
              }
            }}
          />
          <Button type="button" onClick={handleAddMentorshipTopic}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.mentorshipTopics?.map((topic, index) => (
            <div
              key={index}
              className="flex items-center bg-muted rounded-full px-3 py-1"
            >
              <span className="mr-1">{topic}</span>
              <button
                type="button"
                onClick={() => handleRemoveMentorshipTopic(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderFormBySection = () => {
    switch (section) {
      case "basic":
        return renderBasicInfoForm();
      case "about":
        return renderAboutForm();
      case "mentorship":
        return renderMentorshipForm();
      default:
        return <p>Select a section to edit</p>;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case "basic":
        return "Edit Basic Information";
      case "about":
        return "Edit About Me";
      case "experience":
        return "Edit Experience";
      case "education":
        return "Edit Education";
      case "certifications":
        return "Edit Certifications";
      case "mentorship":
        return "Edit Mentorship Settings";
      default:
        return "Edit Profile";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getSectionTitle()}</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{renderFormBySection()}</div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(section, formData)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
