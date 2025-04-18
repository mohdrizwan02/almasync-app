"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar, GraduationCap } from "lucide-react";

export default function ViewProfileHeader({ profile }) {
  const getInitials = (name) => {
    return name?.charAt(0) || "A";
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden relative">
        <img
          src={profile.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Image and Basic Info */}
      <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20 px-4 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="h-32 w-32 border-4 border-white shadow-md">
            <AvatarImage
              src={profile.profileImage || "/placeholder.svg"}
              alt={profile.profileHeadline}
            />
            <AvatarFallback>
              {getInitials(profile.profileHeadline)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 pt-4 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
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
                    <span>{profile.currentExperience} years of experience</span>
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
              <Badge variant="outline">+{profile.skills.length - 5} more</Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
