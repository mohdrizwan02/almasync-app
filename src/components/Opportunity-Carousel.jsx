"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OpportunityCard from "./Opportunity-Card";

import {
  Flower,
  Cross,
  Sun,
  Moon,
  Cloud,
  Umbrella,
  Wind,
  Snowflake,
  Rainbow,
  Zap,
  Heart,
  Star,
} from "lucide-react";

const noScrollbarCSS = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
const OpportunityCarousel = ({ type }) => {
  const colors = ["green", "purple", "blue", "yellow", "red"];
  const items = [
    {
      Icon: Flower,
      title: "Rose",
      description: "Symbol of love and passion",
      action: () => addToast("Roses symbolize love and passion", "flower"),
    },
    {
      Icon: Cross,
      title: "St. Francis",
      description: "Patron saint of animals and nature",
      action: () =>
        addToast("St. Francis is known for his love of nature", "saint"),
    },
    {
      Icon: Sun,
      title: "Sunflower",
      description: "Symbol of adoration and loyalty",
      action: () => addToast("Sunflowers always face the sun", "flower"),
    },
    {
      Icon: Moon,
      title: "St. Clare",
      description: "Patron saint of television",
      action: () =>
        addToast("St. Clare is the patron saint of television", "saint"),
    },
    {
      Icon: Cloud,
      title: "Lily",
      description: "Symbol of purity and refined beauty",
      action: () =>
        addToast("Lilies represent purity and refined beauty", "flower"),
    },
    {
      Icon: Umbrella,
      title: "St. Patrick",
      description: "Patron saint of Ireland",
      action: () =>
        addToast(
          "St. Patrick is famous for banishing snakes from Ireland",
          "saint"
        ),
    },
    {
      Icon: Wind,
      title: "Dandelion",
      description: "Symbol of wishes and dreams",
      action: () =>
        addToast("Dandelions are known for granting wishes", "flower"),
    },
    {
      Icon: Snowflake,
      title: "St. Nicholas",
      description: "Patron saint of children",
      action: () =>
        addToast("St. Nicholas is the inspiration for Santa Claus", "saint"),
    },
    {
      Icon: Rainbow,
      title: "Iris",
      description: "Symbol of hope and wisdom",
      action: () => addToast("Irises represent hope and wisdom", "flower"),
    },
    {
      Icon: Zap,
      title: "St. Barbara",
      description: "Patron saint against lightning",
      action: () =>
        addToast("St. Barbara is invoked against lightning and fire", "saint"),
    },
    {
      Icon: Heart,
      title: "Forget-me-not",
      description: "Symbol of true love and memories",
      action: () =>
        addToast("Forget-me-nots symbolize true love and memories", "flower"),
    },
    {
      Icon: Star,
      title: "St. Dominic",
      description: "Patron saint of astronomers",
      action: () =>
        addToast("St. Dominic is often depicted with a star", "saint"),
    },
  ];
  const stats = [
    { icon: Sun, value: "2k" },
    { icon: Wind, value: "10k" },
    { icon: Umbrella, value: "15" },
  ];
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
      <div className="relative w-full max-w-7xl px-8 rounded-3xl  backdrop-blur-xl">
        <motion.div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide py-4 no-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <OpportunityCard
                Icon={item.Icon}
                title={item.title}
                description={item.description}
                onClick={item.action}
                type={type}
                color={colors[index%5]}
              />

              {/* <AppCard
                coverImage="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?fit=max&w=400&q=80"
                profileImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=max&w=400&q=80"
                name="Sarah Smith"
                role="Freelance Web Designer"
                stats={stats}
                onClick={() => alert("Follow Sarah!")}
              /> */}
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500  backdrop-blur-md rounded-full p-2 shadow-lg transition-colors hover:bg-orange-600"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 backdrop-blur-md rounded-full p-2 shadow-lg transition-colors hover:bg-orange-600"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default OpportunityCarousel;
