"use client";

import { motion } from "framer-motion";
import { Star, Trophy, BadgeCheck, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
const StudentCard = ({ student, action }) => {
  const router = useRouter()
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl pb-6 shadow-md cursor-pointer  w-80 h-86 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
      onClick={() =>
        router.push(`/${action}/student-directory/${student.userId}`)
      }
    >
      <div className="flex flex-col rounded-t-xl w-full h-full">
        <div className="relative h-24 rounded-t-xl bg-yellow-200">
          {/* Profile Image - Half in Header, Half in Card */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={student.profileImageUrl} // Profile Image URL
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-12 p-4">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center justify-center space-x-1">
            {student.fullName}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-5">
            {student.profileHeadline}
          </p>
        </div>

        <div className="flex px-4 justify-between">
          <div className="flex text-gray-500 text-sm gap-2 items-center">
            <GraduationCap className="w-4 h-4 mr-1" />
            <span>{student.department}</span>
          </div>
          <div className="flex text-gray-500 gap-2 text-sm items-center">
            <span>{student.batch}</span>
            <span>Batch</span>
          </div>
        </div>
        {/* View Profile Button */}
        <div className="mt-auto flex  justify-center">
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

export default StudentCard;

// "use client";

// import { motion } from "framer-motion";
// import {
//   Building2,
//   MapPin,
//   GraduationCap,
//   ChevronRight,
//   Briefcase,
//   Clock,
// } from "lucide-react";
// const StudentCard = ({ item }) => {
//   return (
//     <motion.div
//       whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//       whileTap={{ scale: 0.95 }}
//       className="bg-white rounded-xl px-4 py-6 shadow-md cursor-pointer sm:w-92 md:w-80 border-2 border-gray-200 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
//     >
//       <div className="flex flex-col h-full">
//         <div className="flex items-center mb-4">
//           <div className="relative">
//             <div className="w-16 h-16 rounded-2xl bg-red-100 overflow-hidden relative">
//               <img
//                 src="/bvrit-admin.png"
//                 alt="Gaurav Tiwari"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M20 6L9 17L4 12"
//                   stroke="white"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="ml-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Gaurav Tiwari
//             </h2>
//             <div className="flex  mt-2 flex-col space-y-1 text-gray-500 text-sm">
//               <div className="flex items-center">
//                 <GraduationCap className="w-4 h-4 mr-1" />
//                 <span>Department name </span>
//               </div>
//               <p>2024 Batch</p>
//             </div>
//           </div>
//         </div>

//         {/* <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="flex items-center">
//             <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
//             <div>
//               <p className="text-gray-800">iOS Developer</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <MapPin className="w-5 h-5 text-purple-500 mr-2" />
//             <div>
//               <p className="text-gray-800">Bangalore</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap space-x-3 mb-6">
//           <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//             Swift
//           </span>
//           <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//             Android
//           </span>
//           <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//             React
//           </span>
//         </div> */}
//         <div className="flex justify-center mt-auto">
//           <motion.button
//             className="  px-6 py-2 rounded-full flex items-center hover:bg-gray-200 shadow-sm justify-center w-40"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             View Profile <ChevronRight className="w-4 h-4 ml-1" />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default StudentCard;
