"use client";

import { motion } from "framer-motion";
import { Star, Trophy, BadgeCheck } from "lucide-react";
const MentorCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl pb-6 shadow-md cursor-pointer sm:w-100 w-80 h-86 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
    >
      <div className="flex flex-col rounded-t-xl w-full h-full">
        <div className="relative h-24 rounded-t-xl bg-yellow-200 ">
          {/* Badge */}
          <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black text-white px-2 py-1 text-xs rounded-full">
            <BadgeCheck size={12} className="text-green-400" />
            <span>Available</span>
          </div>

          {/* Trophy Icon */}
          <div className="absolute top-4 right-4 bg-white p-1 rounded-full shadow-md">
            <Trophy size={18} className="text-yellow-500" />
          </div>

          {/* Profile Image */}
          <div className="absolute top-12 left-28 w-24 h-24 mx-auto rounded-full overflow-hidden ">
            <img
              src="/bvrit-admin.png" // Add the profile image URL here
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-9 p-4">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center justify-center space-x-1">
            Mentor Name
            <Star size={16} className="text-yellow-500 ml-1" />
            <span className="text-sm text-gray-600">4.9</span>
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-5">
            HRBP @ Wipro | Unstop Top Mentor | 150+ Case Competitions | Unstop
            HRBP @ Wipro | Unstop Top Mentor | 150+ Case Competitions | Unstop
            HRBP @ Wipro | Unstop Top Mentor | 150+ Case Competitions | Unstop
            HRBP @ Wipro | Unstop Top Mentor | 150+ Case Competitions | Unstop
          </p>
          </div>

          {/* View Profile Button */}
          <div className="mt-auto flex justify-center">

          <motion.button
            whileHover={{ scale: 1.1 }}
            className=" bg-gray-100 text-black px-4 py-2 rounded-full w-40 font-medium shadow-sm hover:bg-gray-200"
            >
            View Profile
          </motion.button>
              </div>
        
      </div>
    </motion.div>
  );
};

export default MentorCard;
