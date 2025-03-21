"use client";

import React from "react";

import { motion } from "framer-motion";

import { Clock, Eye, MoveUpRight } from "lucide-react";

import { Button } from "./ui/button";

const MentorCard = ({ Icon, title, description, onClick , color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl shadow-md cursor-pointer w-64 h-78 flex flex-col transition-colors duration-300 hover:bg-gray-50  border border-gray-200 relative"
      onClick={onClick}
    >
      <div className={`rounded-t-xl h-20 overflow-hidden bg-${color}-500`}>
        <svg width="100%" height="100%" className={`text-${color}-900`}>
          <pattern
            id="hexPattern"
            width="30"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <polygon
              points="15,2 30,10 30,20 15,28 0,20 0,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Profile Image */}
      <div className="mx-auto w-24 h-24 absolute top-12 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-24"
          src="/bvrit-admin.png"
          alt="Woman looking front"
        />
      </div>

      {/* Mentor Info */}
      <div className="relative flex flex-col items-center text-center mt-16">
        <div className="w-full px-4">
          <h2 className="font-semibold text-lg truncate">Mentor Name</h2>
          <h1 className="text-gray-500 text-sm line-clamp-2 overflow-hidden">
            Mentor Headline lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </h1>
        </div>
      </div>

      {/* Follow Button */}
      <div className="p-4 border-t mx-8 mt-4">
        <button className="w-full block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
          Follow
        </button>
      </div>
    </motion.div>
  );
};
export default MentorCard;
