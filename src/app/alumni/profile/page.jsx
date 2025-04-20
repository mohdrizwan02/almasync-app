"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import MentorshipSection from "@/components/profile/mentorship-section";
import ConnectionsSection from "@/components/profile/connections-section";

import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Award,
  Briefcase,
  Building,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Clock,
  Edit,
  ExternalLink,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  Phone,
  Plus,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn, formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
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
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

function EditCoverImageModal({ open, setOpen, refresh }) {
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!coverImage) return toast.error("Please select a cover image.");

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);

      const res = await axios.post(
        "/api/alumni/profile/edit-cover-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.data.success) throw new Error("Upload failed.");

      toast.success("Cover image updated!");
      await refresh();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to upload cover image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Cover Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="Cover Preview"
                width={500}
                height={200}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditProfileImageModal({ open, setOpen, refresh }) {
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!profileImage) return toast.error("Please select a profile image.");

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);

      const res = await axios.post(
        "/api/alumni/profile/edit-profile-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.data.success) throw new Error("Upload failed.");

      toast.success("profile image updated!");
      await refresh();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to upload cover image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Cover Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="Cover Preview"
                width={500}
                height={200}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditBasicProfileDetailsModal({ open, setOpen, refresh, data }) {
  const [basicProfileDetails, setBasicProfileDetails] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    about: data.about,
    profileHeadline: data.profileHeadline,

    address: data.address,

    gender: data.gender,
    mobileNumber: data.mobileNumber,
  });

  const [currentWorkDetails, setCurrentWorkDetails] = useState({
    currentlyWorkingAt: data.currentlyWorkingAt,
    currentlyWorkingAs: data.currentlyWorkingAs,
    currentlyWorkingIn: data.currentlyWorkingIn,
    currentExperience: data.currentExperience,
  });

  const [basicSubmitting, setbasicSubmitting] = useState(false);
  const [workSubmitting, setWorkSubmitting] = useState(false);
  const handleBasicProfileDetailsEdit = async () => {
    try {
      setbasicSubmitting((prev) => true);
      const formData = new FormData();
      formData.append("profileHeadline", basicProfileDetails.profileHeadline);
      formData.append("mobileNumber", basicProfileDetails.mobileNumber);
      formData.append(
        "address",
        JSON.stringify(basicProfileDetails.address || {})
      );
      formData.append("gender", basicProfileDetails.gender);
      formData.append("about", basicProfileDetails.about);

      const response = await axios.post(
        "/api/alumni/profile/edit-profile-basic-details",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.data.success) {
        toast.success("basic profile details updated!");
        setbasicSubmitting((prev) => false);
        await refresh();
        setOpen((prev) => false);
      } else {
        throw new Error("error occurred");
      }
    } catch (error) {
      setbasicSubmitting((prev) => false);
      toast.error("error occurred while saving profile");
    }
  };

  const handleCurrentWorkDetailsEdit = async () => {
    try {
      setWorkSubmitting((prev) => true);
      const formData = new FormData();
      formData.append(
        "currentlyWorkingAs",
        currentWorkDetails.currentlyWorkingAs
      );
      formData.append(
        "currentlyWorkingAt",
        currentWorkDetails.currentlyWorkingAt
      );
      formData.append(
        "currentlyWorkingIn",
        currentWorkDetails.currentlyWorkingIn
      );
      formData.append(
        "currentExperience",
        currentWorkDetails.currentExperience
      );

      const response = await axios.post(
        "/api/alumni/profile/edit-current-work",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.data.success) {
        toast.success("Current Work details updated!");
        setbasicSubmitting((prev) => false);
        await refresh();
        setOpen((prev) => false);
      } else {
        throw new Error("error occurred");
      }
    } catch (error) {
      setbasicSubmitting((prev) => false);
      toast.error("error occurred while saving current work");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl h-[80vh] items-start overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{"Edit Basic Profile Details"}</DialogTitle>
            <DialogDescription>
              Make changes to your profile information here. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="items-start">
            <Tabs defaultValue="basic">
              <TabsList>
                <TabsTrigger value="basic">Basic profile</TabsTrigger>
                <TabsTrigger value="currentwork">Current Work</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="py-4">
                  {" "}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-3 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="profileHeadline">Profile Headline</Label>
                      <Input
                        id="profileHeadline"
                        name="profileHeadline"
                        value={basicProfileDetails.profileHeadline || ""}
                        onChange={(e) => {
                          setBasicProfileDetails({
                            ...basicProfileDetails,
                            profileHeadline: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={basicProfileDetails.gender || ""}
                        onValueChange={(value) => {
                          setBasicProfileDetails({
                            ...basicProfileDetails,
                            gender: value,
                          });
                        }}
                      >
                        <SelectTrigger className={"w-full"}>
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
                        value={basicProfileDetails.mobileNumber || ""}
                        onChange={(e) => {
                          setBasicProfileDetails({
                            ...basicProfileDetails,
                            mobileNumber: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <Label>Address</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address.houseNumber">
                          House Number
                        </Label>
                        <Input
                          id="address.houseNumber"
                          value={basicProfileDetails.address?.houseNumber || ""}
                          onChange={(e) => {
                            let address = basicProfileDetails.address;
                            address.houseNumber = e.target.value;

                            setBasicProfileDetails({
                              ...basicProfileDetails,
                              address: address,
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address.landmark">Landmark</Label>
                        <Input
                          id="address.landmark"
                          value={basicProfileDetails.address?.landmark || ""}
                          onChange={(e) => {
                            let address = basicProfileDetails.address;

                            address.landmark = e.target.value;

                            setBasicProfileDetails({
                              ...basicProfileDetails,
                              address: address,
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address.city">City</Label>
                        <Input
                          id="address.city"
                          value={basicProfileDetails.address?.city || ""}
                          onChange={(e) => {
                            let address = basicProfileDetails.address;

                            address.city = e.target.value;

                            setBasicProfileDetails({
                              ...basicProfileDetails,
                              address: address,
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address.pincode">Pincode</Label>
                        <Input
                          id="address.pincode"
                          value={basicProfileDetails.address?.pincode || ""}
                          onChange={(e) => {
                            let address = basicProfileDetails.address;

                            address.pincode = e.target.value;

                            setBasicProfileDetails({
                              ...basicProfileDetails,
                              address: address,
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address.country">Country</Label>
                        <Input
                          id="address.country"
                          value={basicProfileDetails.address?.country || ""}
                          onChange={(e) => {
                            let address = basicProfileDetails.address;

                            address.country = e.target.value;

                            setBasicProfileDetails({
                              ...basicProfileDetails,
                              address: address,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea
                      id="about"
                      className="min-h-[150px]"
                      value={basicProfileDetails.about}
                      onChange={(e) => {
                        setBasicProfileDetails({
                          ...basicProfileDetails,
                          about: e.target.value,
                        });
                      }}
                      placeholder="Write a few paragraphs about yourself..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpen((prev) => false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleBasicProfileDetailsEdit}>
                      {basicSubmitting ? "submitting.." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="currentwork">
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileHeadline">Role</Label>
                    <Input
                      value={currentWorkDetails.currentlyWorkingAs || ""}
                      onChange={(e) => {
                        setCurrentWorkDetails({
                          ...currentWorkDetails,
                          currentlyWorkingAs: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileHeadline">Company</Label>
                    <Input
                      value={currentWorkDetails.currentlyWorkingAt || ""}
                      onChange={(e) => {
                        setCurrentWorkDetails({
                          ...currentWorkDetails,
                          currentlyWorkingAt: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileHeadline">Location</Label>
                    <Input
                      value={basicProfileDetails.profileHeadline || ""}
                      onChange={(e) => {
                        setCurrentWorkDetails({
                          ...currentWorkDetails,
                          currentlyWorkingIn: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileHeadline">Experience</Label>
                    <Input
                      value={currentWorkDetails.currentExperience || ""}
                      onChange={(e) => {
                        setCurrentWorkDetails({
                          ...currentWorkDetails,
                          currentExperience: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpen((prev) => false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCurrentWorkDetailsEdit}>
                      {workSubmitting ? "submitting .." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

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

  const [allSkills, setAllSkills] = useState([]);

  const [profileSkills, setProfileSkills] = useState([]);
  const [profileHobbies, setProfileHobbies] = useState([]);
  const [profileLanguages, setprofileLanguages] = useState([]);

  const [isEditCoverImageModalOpen, setIsEditCoverImageModalOpen] =
    useState(false);

  const [isEditProfileImageModalOpen, setIsEditProfileImageModalOpen] =
    useState(false);

  const handleEditSkillsHobbiesLanguages = async () => {
    try {
      console.log(profileSkills);
      const formData = new FormData();

      formData.append("skills", JSON.stringify(profileSkills || []));

      formData.append("hobbies", JSON.stringify(profileHobbies || []));
      formData.append(
        "communicationLanguages",
        JSON.stringify(profileLanguages || [])
      );

      const response = await axios.post(
        "/api/alumni/profile/edit-skills-hobbies-languages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Updated skills / hobbies / languages");
        setSkillEditing(false);
      }
    } catch (error) {
      toast.error("error while updating skills / hobbies / languages");
    } finally {
      setSkillEditing(false);
      setHobbyLanguageEditing(false);
      await refresh();
    }
  };

  const [
    isEditBasicProfileDetailsModalOpen,
    setIsEditBasicProfileDetailsModalOpen,
  ] = useState(false);

  const [skillEditing, setSkillEditing] = useState(false);
  const [hobbyLanguageEditing, setHobbyLanguageEditing] = useState(false);

  const [skillPopoverOpen, setSkillPopoverOpen] = useState(false);
  const [hobbyPopoverOpen, setHobbyPopoverOpen] = useState(false);
  const [languagePopoverOpen, setLanguagePopoverOpen] = useState(false);

  const [newLanguage, setNewLanguage] = useState("");
  const [newHobby, setNewHobby] = useState("");

  const [isEditExperienceModalOpen, setIsEditExperienceModalOpen] =
    useState(false);

  const [formattedDate, setFormattedDate] = useState("");

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
      .get("/api/alumni/get-current-profile")
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setProfile((prev) => response.data.alumniProfileData);
          setProfileSkills(
            (prev) => response.data.alumniProfileData?.skills || []
          );
          setProfileHobbies(
            (prev) => response.data.alumniProfileData?.hobbies || []
          );
          setprofileLanguages(
            (prev) => response.data.alumniProfileData?.communicationLanguages
          );
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    if (profile?.dateOfBirth) {
      const date = new Date(profile.dateOfBirth).toLocaleDateString();
      setFormattedDate(date);
    } else {
      setFormattedDate("Not specified");
    }
  }, [profile]);

  const refresh = async () => {
    setPageLoad((prev) => true);
    try {
      const response = await axios.get("/api/alumni/get-current-profile");
      if (response.data.success) {
        setProfile((prev) => response.data.alumniProfileData);

        setPageLoad((prev) => false);
      }
    } catch (error) {
      toast.error("error occurred");
    }
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-6 px-4 md:px-6 max-w-screen-xl"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden relative">
              <img
                src={profile.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <Button
                size="sm"
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsEditCoverImageModalOpen((prev) => true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Cover
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20 px-4 relative z-10">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage
                    src={profile.profileImage || "/bvrit-admin.png"}
                    alt={profile.profileHeadline}
                  />
                  <AvatarFallback>{"PROFILE IMAGE"}</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 bg-white/80 hover:bg-white/90"
                  onClick={() => setIsEditProfileImageModalOpen((prev) => true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Photo
                </Button>
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
                            {profile.department} , {profile.degree},{" "}
                            {profile.college} ({profile.admissionYear} -{" "}
                            {profile.passoutYear})
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {profile.mobileNumber && (
                        <div className="flex items-center text-muted-foreground">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{profile.mobileNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    className="mt-4 md:mt-0"
                    onClick={() => {
                      console.log("button clicked");
                      setIsEditBasicProfileDetailsModalOpen((prev) => true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
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
          </motion.div>

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
                  Internships
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Basic details about you
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Enrollment Number
                          </p>
                          <p>{profile.enrollmentNumber || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Date of Birth
                          </p>
                          <p>{formattedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Gender
                          </p>
                          <p className="capitalize">
                            {profile.gender || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Mobile Number
                          </p>
                          <p>{profile.mobileNumber || "Not specified"}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Address
                        </p>
                        {profile.address ? (
                          <div className="flex items-start mt-1">
                            <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <p>
                              {profile.address.houseNumber &&
                                `${profile.address.houseNumber}, `}
                              {profile.address.landmark &&
                                `${profile.address.landmark}, `}
                              {profile.address.city &&
                                `${profile.address.city}, `}
                              {profile.address.pincode &&
                                `${profile.address.pincode}, `}
                              {profile.address.country}
                            </p>
                          </div>
                        ) : (
                          <p>Not specified</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>About Me</CardTitle>
                        <CardDescription>
                          A brief description about yourself
                        </CardDescription>
                      </div>
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

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>
                          Your professional skills
                        </CardDescription>
                      </div>
                      {!skillEditing && (
                        <Button
                          size="sm"
                          variant={"outline"}
                          onClick={() => setSkillEditing((prev) => true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {skillEditing ? (
                        <motion.div
                          variants={itemVariants}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-semibold">
                            Professional Skills
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {profileSkills.map((skill, index) => (
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
                                  onClick={() => {
                                    const array = profileSkills.filter(
                                      (_, i) => i !== index
                                    );
                                    setProfileSkills(array);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>

                          <Popover
                            open={skillPopoverOpen}
                            onOpenChange={setSkillPopoverOpen}
                          >
                            <PopoverTrigger className={""} asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={skillPopoverOpen}
                                className="w-full max-w-72 justify-between"
                              >
                                {profileSkills.length == 0
                                  ? "select skills"
                                  : `${profileSkills.length} skills selected `}
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
                                    {allSkills.map((skill, index) => (
                                      <CommandItem
                                        key={index}
                                        value={skill}
                                        onSelect={(currentValue) => {
                                          if (
                                            !profileSkills.includes(
                                              currentValue
                                            )
                                          ) {
                                            console.log(currentValue);
                                            let array = [...profileSkills];

                                            array.push(currentValue);
                                            setProfileSkills([...array]);
                                          }
                                        }}
                                      >
                                        {skill}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            profileSkills.includes(skill)
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
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setSkillEditing((prev) => false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleEditSkillsHobbiesLanguages}>
                              Save
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profileSkills && profileSkills.length > 0 ? (
                            profileSkills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-muted-foreground">
                              No skills listed
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Languages & Hobbies</CardTitle>
                        <CardDescription>
                          Languages you speak and things you enjoy
                        </CardDescription>
                      </div>
                      {!hobbyLanguageEditing && (
                        <Button
                          size="sm"
                          variant={"outline"}
                          onClick={() => {
                            console.log("edit button clicker");
                            setHobbyLanguageEditing((prev) => true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!hobbyLanguageEditing ? (
                        <>
                          <div>
                            <div className="flex items-center mb-2">
                              <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                              <p className="font-medium">Languages</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {profileLanguages ? (
                                profileLanguages.map((language, index) => (
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
                              {profileHobbies && profileHobbies.length > 0 ? (
                                profileHobbies.map((hobby, index) => (
                                  <Badge key={index} variant="outline">
                                    {hobby}
                                  </Badge>
                                ))
                              ) : (
                                <p className="text-muted-foreground">
                                  No hobbies listed
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-semibold">
                              Communication Languages
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {profileLanguages.map((language, index) => (
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
                                    onClick={() => {
                                      const array = profileLanguages.filter(
                                        (_, i) => i !== index
                                      );
                                      setprofileLanguages(array);
                                    }}
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
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  let array = [...profileLanguages];
                                  array.push(newLanguage);
                                  setprofileLanguages((prev) => array);
                                  setNewLanguage((prev) => "");
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </motion.div>
                          <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-semibold">Hobbies</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {profileHobbies.map((hobby, index) => (
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
                                    onClick={() => {
                                      const array = profileHobbies.filter(
                                        (_, i) => i !== index
                                      );
                                      setProfileHobbies(array);
                                    }}
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
                                placeholder="Add your hobbies"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  let array = [...profileHobbies];
                                  array.push(newHobby);
                                  setProfileHobbies((prev) => array);
                                  setNewHobby((prev) => "");
                                }}
                              >
                                Add
                              </Button>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  setHobbyLanguageEditing((prev) => false)
                                }
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleEditSkillsHobbiesLanguages}
                              >
                                Save
                              </Button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Social Links</CardTitle>
                        <CardDescription>
                          Your presence across the web
                        </CardDescription>
                      </div>
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
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>
                          Your professional journey
                        </CardDescription>
                      </div>
                      <Button>
                        <Edit className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
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
                                <Badge variant="outline">
                                  {exp.employmentType}
                                </Badge>
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
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {formatDate(exp.employmentStartDate)} -{" "}
                                {exp.currentlyWorking
                                  ? "Present"
                                  : formatDate(exp.employmentEndDate)}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <MapPin className="h-4 w-4 mr-2" />
                                {exp.employmentLocation}
                              </div>
                              <p className="text-sm">
                                {exp.employmentDescription}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">
                            No work experience added yet
                          </p>
                          <Button
                            variant="outline"
                            //  onClick={onEdit}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Add Your First Experience
                          </Button>
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
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Education</CardTitle>
                        <CardDescription>
                          Your academic background
                        </CardDescription>
                      </div>
                      <Button
                      // onClick={onEdit}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
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
                                  {edu.educationDegree} in{" "}
                                  {edu.educationFieldOfStudy}
                                </h3>
                              </div>
                              <p className="text-muted-foreground mb-1">
                                {edu.educationInstitution}
                              </p>
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {edu.educationStartYear} -{" "}
                                {edu.educationEndYear}
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
                          <p className="text-muted-foreground mb-4">
                            No education details added yet
                          </p>
                          <Button
                            variant="outline"
                            // onClick={onEdit}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Add Your Education
                          </Button>
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
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Certifications</CardTitle>
                        <CardDescription>
                          Your professional certifications
                        </CardDescription>
                      </div>
                      <Button>
                        <Edit className="h-4 w-4 mr-2" />
                        Add Certification
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {profile.certifications &&
                      profile.certifications.length > 0 ? (
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
                                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    Issued:{" "}
                                    {formatDate(cert.certificationIssueDate)}
                                  </span>
                                </div>
                                {cert.certificationExpirationDate && (
                                  <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>
                                      Expires:{" "}
                                      {formatDate(
                                        cert.certificationExpirationDate
                                      )}
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
                                cert.certificationAssociatedSkills.length >
                                  0 && (
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
                          <p className="text-muted-foreground mb-4">
                            No certifications added yet
                          </p>
                          <Button
                            variant="outline"
                            //  onClick={onEdit}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Add Your First Certification
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="jobs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Tabs defaultValue="posted" className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <TabsList>
                        <TabsTrigger value="posted">Posted Jobs</TabsTrigger>
                        <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                      </TabsList>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                    </div>

                    <TabsContent value="posted">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            Jobs & Internships You've Posted
                          </CardTitle>
                          <CardDescription>
                            Manage your job listings and view applicants
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {mockJobs.posted && mockJobs.posted.length > 0 ? (
                            <div className="space-y-4">
                              {mockJobs.posted.map((job, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                                        <h3 className="font-semibold">
                                          {job.title}
                                        </h3>
                                      </div>
                                      <p className="text-sm text-muted-foreground ml-7">
                                        {job.company}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                        <span className="text-sm">
                                          {job.applicants} applicants
                                        </span>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground mb-4">
                                You haven't posted any jobs or internships yet
                              </p>
                              <Button variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Post Your First Job
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="applied">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            Jobs & Internships You've Applied To
                          </CardTitle>
                          <CardDescription>
                            Track your job applications
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {mockJobs.applied && mockJobs.applied.length > 0 ? (
                            <div className="space-y-4">
                              {mockJobs.applied.map((job, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                                        <h3 className="font-semibold">
                                          {job.title}
                                        </h3>
                                      </div>
                                      <p className="text-sm text-muted-foreground ml-7">
                                        {job.company}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <Badge
                                        variant={
                                          job.status === "Interview"
                                            ? "secondary"
                                            : "outline"
                                        }
                                        className={
                                          job.status === "Interview"
                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                            : ""
                                        }
                                      >
                                        <Clock className="h-3 w-3 mr-1" />
                                        {job.status}
                                      </Badge>
                                      <Button variant="outline" size="sm">
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View Job
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground mb-4">
                                You haven't applied to any jobs or internships
                                yet
                              </p>
                              <Button variant="outline">
                                Browse Open Positions
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </TabsContent>
              <TabsContent value="internships">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Tabs defaultValue="posted" className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <TabsList>
                        <TabsTrigger value="posted">Posted Jobs</TabsTrigger>
                        <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                      </TabsList>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                    </div>

                    <TabsContent value="posted">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            Jobs & Internships You've Posted
                          </CardTitle>
                          <CardDescription>
                            Manage your job listings and view applicants
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {mockJobs.posted && mockJobs.posted.length > 0 ? (
                            <div className="space-y-4">
                              {mockJobs.posted.map((job, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                                        <h3 className="font-semibold">
                                          {job.title}
                                        </h3>
                                      </div>
                                      <p className="text-sm text-muted-foreground ml-7">
                                        {job.company}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                        <span className="text-sm">
                                          {job.applicants} applicants
                                        </span>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground mb-4">
                                You haven't posted any jobs or internships yet
                              </p>
                              <Button variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Post Your First Job
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="applied">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            Jobs & Internships You've Applied To
                          </CardTitle>
                          <CardDescription>
                            Track your job applications
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {mockJobs.applied && mockJobs.applied.length > 0 ? (
                            <div className="space-y-4">
                              {mockJobs.applied.map((job, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                                        <h3 className="font-semibold">
                                          {job.title}
                                        </h3>
                                      </div>
                                      <p className="text-sm text-muted-foreground ml-7">
                                        {job.company}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <Badge
                                        variant={
                                          job.status === "Interview"
                                            ? "secondary"
                                            : "outline"
                                        }
                                        className={
                                          job.status === "Interview"
                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                            : ""
                                        }
                                      >
                                        <Clock className="h-3 w-3 mr-1" />
                                        {job.status}
                                      </Badge>
                                      <Button variant="outline" size="sm">
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View Job
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground mb-4">
                                You haven't applied to any jobs or internships
                                yet
                              </p>
                              <Button variant="outline">
                                Browse Open Positions
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </TabsContent>

              <TabsContent value="events"></TabsContent>

              <TabsContent value="mentorship">
                <MentorshipSection profile={profile} mentees={mockMentees} />
              </TabsContent>

              <TabsContent value="connections">
                <ConnectionsSection connections={mockConnections} />
              </TabsContent>
            </div>
          </Tabs>

          <EditCoverImageModal
            open={isEditCoverImageModalOpen}
            setOpen={setIsEditCoverImageModalOpen}
            refresh={refresh}
          />

          <EditProfileImageModal
            open={isEditProfileImageModalOpen}
            setOpen={setIsEditProfileImageModalOpen}
            refresh={refresh}
          />

          <EditBasicProfileDetailsModal
            data={profile}
            open={isEditBasicProfileDetailsModalOpen}
            setOpen={setIsEditBasicProfileDetailsModalOpen}
            refresh={refresh}
            skills={allSkills}
          />
        </motion.div>
      )}
    </>
  );
}
