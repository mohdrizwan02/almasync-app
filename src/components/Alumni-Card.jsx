"use client";

import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  GraduationCap,
  ChevronRight,
  Briefcase,
  Clock,
} from "lucide-react";
const AlumniCard = ({ alumni }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl px-4 py-6 shadow-md cursor-pointer w-72 sm:w-86  h-98 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-red-100 overflow-hidden relative">
              <img
                src={alumni.profileImage}
                alt={alumni.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {alumni.fullName}
            </h2>
            <div className="flex  mt-2 flex-col space-y-1 text-gray-500 text-sm">
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                <span>{alumni.department}</span>
              </div>
              <p>{alumni.batch} Batch</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-800">
                {alumni.role ? alumni.role : "xyz role"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-purple-500 mr-2" />
            <div>
              <p className="text-gray-800">
                {alumni.location ? alumni.location : "xyz location"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Building2 className="w-5 h-5 text-gray-600 mr-2" />
            <div>
              <p className="text-gray-800">
                {alumni.company ? alumni.company : "xyz company"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            <div>
              <p className="text-gray-800">
                {alumni.experience ? alumni.experience : "xyz experience"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-1 space-y-1 mb-6">
          {alumni.skills &&
            alumni.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}

          {alumni.skills && alumni.skills.length > 3 && (
            <span className="px-3 py-1  bg-gray-200 text-gray-700 rounded-full text-sm">
              +{alumni.skills.length - 3} more
            </span>
          )}
        </div>
        <div className="flex justify-center mt-auto">
          <motion.button
            className="  px-6 py-2 rounded-full flex items-center hover:bg-gray-200 shadow-sm justify-center w-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Profile <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCard;
