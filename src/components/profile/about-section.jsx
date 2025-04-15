"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Globe, MapPin, Languages, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutSection({ profile, onEdit }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (profile.dateOfBirth) {
      const date = new Date(profile.dateOfBirth).toLocaleDateString();
      setFormattedDate(date);
    } else {
      setFormattedDate("Not specified");
    }
  }, [profile.dateOfBirth]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about you</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
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
              <p className="capitalize">{profile.gender || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Mobile Number
              </p>
              <p>{profile.mobileNumber || "Not specified"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            {profile.address ? (
              <div className="flex items-start mt-1">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <p>
                  {profile.address.houseNumber &&
                    `${profile.address.houseNumber}, `}
                  {profile.address.landmark && `${profile.address.landmark}, `}
                  {profile.address.city && `${profile.address.city}, `}
                  {profile.address.pincode && `${profile.address.pincode}, `}
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>About Me</CardTitle>
            <CardDescription>
              A brief description about yourself
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.about && profile.about.length > 0 ? (
            profile.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p className="text-muted-foreground">No information provided</p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Your professional skills</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
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

      {/* Languages & Hobbies */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Languages & Hobbies</CardTitle>
            <CardDescription>
              Languages you speak and things you enjoy
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
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
                <p className="text-muted-foreground">No languages listed</p>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Your presence across the web</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
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
  );
}
