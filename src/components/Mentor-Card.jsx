"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
const MentorCard = ({ mentor }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl pb-6 shadow-md cursor-pointer  w-80 h-86 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
    >
      <div className="flex flex-col rounded-t-xl w-full h-full">
        <div className="relative h-24 rounded-t-xl bg-yellow-200">
          {/* Profile Image - Half in Header, Half in Card */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={mentor.profileImage || "/bvrit-admin.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-12 p-4">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center justify-center space-x-1">
            {mentor.fullName}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-5">
            {mentor.profileHeadline}
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
