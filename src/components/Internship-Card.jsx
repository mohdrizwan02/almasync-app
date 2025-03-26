"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  HandCoins,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Label } from "./ui/label";
const InternshipCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white  rounded-xl p-6 shadow-lg cursor-pointer  sm:w-80 w-72 h-84 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
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
              AI Developer
            </h2>
            <div className="flex items-center text-gray-500 text-sm">
              <Building2 className="w-4 h-4 mr-1" />
              <span>Google</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-red-400 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">location</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-amber-400 mr-2" />
            <div>
              <p className="text-gray-500">experience</p>
            </div>
          </div>
          <div className="flex items-center col-span-2">
            <Briefcase className="w-5 h-5 text-pink-500 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">internship type</p>
            </div>
          </div>
          <div className="flex items-center col-span-2">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">months</p>
            </div>
          </div>
          <div className="flex items-center col-span-2">
            <HandCoins className="w-5 h-5 text-green-500 mr-2" />
            <div>
              <p className="text-gray-500 text-sm">rupee stipend</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Label
              key={index}
              className={"bg-orange-300/20 px-2 py-1.5 text-gray-600 rounded-full"}
            >
              skill {item}
            </Label>
          ))}
        </div>
        <div className="flex items-center mt-auto text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Posted 8 days ago</span>
          <span className="mx-2">•</span>
          <span className="text-green-500">Active</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
