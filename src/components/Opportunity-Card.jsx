"use client";

import React from "react";

import { motion } from "framer-motion";

import { Clock, Eye, MoveUpRight } from "lucide-react";

import { Button } from "./ui/button";

const OpportunityCard = ({
  Icon,
  title,
  description,
  onClick,
  color,
  type,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl  shadow-md cursor-pointer w-64 h-64 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50  border border-gray-200 relative"
      onClick={onClick}
    >
      <div className="">
        <div className={`relative h-24 rounded-t-xl bg-${color}-500`}>
          <div className="absolute inset-0 overflow-hidden">
            {type &&
              (type === "job" ? (
                <svg
                  width="100%"
                  height="100%"
                  className={`text-${color}-900 rounded-t-xl`}
                >
                  <pattern
                    id="gridPattern"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#gridPattern)" />
                </svg>
              ) : (
                <svg
                  width="100%"
                  height="100%"
                  className={` text-${color}-900 rounded-t-xl`}
                >
                  <pattern
                    id="wavePattern"
                    width="30"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 0 5 C 5 0, 10 0, 15 5 S 25 10, 30 5"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#wavePattern)" />
                </svg>
              ))}
          </div>
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700">
            In Office
          </div>
          <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white p-2 shadow-sm">
            <img
              src="/bvrit-admin.png"
              alt="PUMA Logo"
              className="object-contain"
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="mb-1 text-xl font-bold text-gray-800">
            Internship Name
          </h2>
          <p className="mb-4 text-gray-600">Company name</p>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center text-gray-500">
                <Eye className="mr-1 h-4 w-4" />
                <span className="text-sm">
                  29 <span className="text-gray-400">Views</span>
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                <span className="text-sm">
                  4 <span className="text-gray-400">days left</span>
                </span>
              </div>
            </div>
            <Button className=" rounded-full h-8 w-8 hover:bg-orange-700">
              <MoveUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default OpportunityCard;
