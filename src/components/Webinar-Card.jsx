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
  Users,
} from "lucide-react";
import { Label } from "./ui/label";
const WebinarCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white  rounded-xl pb-6  shadow-lg cursor-pointer  w-80 h-116 flex flex-col border-2 border-gray-200 justify-between transition-colors duration-300 hover:bg-gray-50"
    >
      <div className="flex flex-col rounded-t-xl h-full">
        <div className="relative h-40 rounded-t-xl bg-blue-900">
          <img
            src={event.coverImage}
            alt="AI vs ML"
            className="w-full rounded-t-xl h-full object-cover"
          />
          {event.status === "expired" && (
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs text-red-600">
              Ended
            </div>
          )}
          {event.status === "future" && (
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs text-orange-500">
              Upcoming
            </div>
          )}
          {event.status === "ongoing" && (
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs text-green-500">
              ongoing
            </div>
          )}
        </div>

        <div className="px-4 pt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
          <p className="text-gray-600 mb-3 line-clamp-2">
            {event.subtitle.slice(0,50)}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-start">
              <Users className="w-5 h-5 text-teal-500 mr-2 mt-0.5" />
              <div>
                <p className="text-gray-800">{event.seatsLeft} spots left</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-amber-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="text-gray-700">{event.time}</div>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <motion.button
            className=" px-6 py-3 rounded-full  flex items-center justify-center w-50  bg-gray-100 text-black  font-medium shadow-sm hover:bg-gray-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Register Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WebinarCard;
