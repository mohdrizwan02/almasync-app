"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Label } from "./ui/label";
const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className=" rounded-xl p-6 shadow-lg cursor-pointer sm:w-80 w-72 h-92 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src="/bvrit-admin.png"
              alt="Google Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
            <div className="flex items-center text-gray-500 text-sm">
              <Building2 className="w-4 h-4 mr-1" />
              <span>{job.company}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-red-400 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">{job.location}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-amber-400 mr-2" />
            <div>
              <p className="text-gray-500">{job.experience}</p>
            </div>
          </div>
          <div className=" col-span-2 flex items-center">
            <Briefcase className="w-5 h-5 text-red-400 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">{job.jobType}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-green-500 mr-2" />
          <p className="text-green-500">{job.salary}</p>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {job.skills &&
            job.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}

          {job.skills && job.skills.length > 3 && (
            <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center mt-auto text-gray-500 text-sm ">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Posted {job.postedDaysAgo} days ago</span>
          <span className="mx-2">•</span>
          <span className="text-green-500">
            {job.isActive ? "active" : "expired"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
