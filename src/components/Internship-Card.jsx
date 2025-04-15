"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Calendar, HandCoins } from "lucide-react";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
const InternshipCard = ({ internship, action }) => {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white  rounded-xl p-6 shadow-lg cursor-pointer  sm:w-80 w-72 h-84 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
      onClick={() => router.push(`/${action}/internships/${internship.id}`)}
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
            <h2 className="text-xl font-semibold text-blue-600">
              {internship.title}
            </h2>
            <div className="flex items-center text-gray-500 text-sm">
              <Building2 className="w-4 h-4 mr-1" />
              <span>{internship.company}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center col-span-2">
            <Briefcase className="w-5 h-5 text-pink-500 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">
                {internship.internshipType}
              </p>
            </div>
          </div>
          <div className="flex items-center col-span-2">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">{internship.duration}</p>
            </div>
          </div>
          <div className="flex items-center col-span-2">
            <HandCoins className="w-5 h-5 text-green-500 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">{internship.stipend}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {internship.skills &&
            internship.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}

          {internship.skills && internship.skills.length > 3 && (
            <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
              +{internship.skills.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center mt-auto text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Posted {internship.postedDaysAgo} days ago</span>
          <span className="mx-2">•</span>
          <span className="text-green-500">
            {internship.isActive ? "active" : "expired"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
