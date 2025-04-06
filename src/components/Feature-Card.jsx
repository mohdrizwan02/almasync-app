"use client";

import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
const FeatureCard = ({ feature }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-100 rounded-xl p-6 shadow-md cursor-pointer sm:w-100 w-72 h-80  flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
    >
      <div className="flex flex-col h-full">
        <div className="">
          <div
            className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}
          >
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600 mb-6">{feature.description}</p>
        </div>
        <div className="mt-auto">
          <a
            href="#"
            className={`flex items-center  ${feature.learnMoreColor} font-medium`}
          >
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
