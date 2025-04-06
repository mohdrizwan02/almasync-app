"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import JobCard from "./Job-Card";
import FeatureCard from "./Feature-Card";
import AlumniCard from "./Alumni-Card";
import InternshipCard from "./Internship-Card";
import MentorCard from "./Mentor-Card";
import WebinarCard from "./Webinar-Card";

const noScrollbarCSS = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Carousel = ({ type, data }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateScrollButtons);
      return () => carousel.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{noScrollbarCSS}</style>
      <div className="relative w-full max-w-7xl py-4 sm:px-4 px-2 rounded-3xl backdrop-blur-xl">
        {/* Arrow buttons moved to the top-right corner */}
        <AnimatePresence>
          {(canScrollLeft || canScrollRight) && (
            <div className="absolute right-4 top-0 flex gap-2 z-10">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll("left")}
                className=" backdrop-blur-md rounded-full p-2 shadow-lg transition-colors bg-orange-500  text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll("right")}
                className="backdrop-blur-md rounded-full p-2 shadow-lg transition-colors bg-orange-500  text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* Carousel data */}
        <motion.div
          ref={carouselRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide p-4 no-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              {type === "job" && <JobCard job={item} />}
              {type === "feature" && <FeatureCard feature={item} />}
              {type === "alumni" && <AlumniCard alumni={item} />}
              {type === "internship" && <InternshipCard internship={item} />}
              {type === "mentor" && <MentorCard mentor={item} />}
              {type === "webinar" && <WebinarCard event={item} />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Carousel;
