"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function FAQSection({ role }) {
  const [activeCategory, setActiveCategory] = useState("networking");
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const isQuestionExpanded = (id) => expandedQuestions.includes(id);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-72 flex-shrink-0">
            <CategoryList
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <CategoryContent
                  category={activeCategory}
                  isQuestionExpanded={isQuestionExpanded}
                  toggleQuestion={toggleQuestion}
                  role={role}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryList({ activeCategory, setActiveCategory }) {
  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      articles: 3,
      icon: (className) => (
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            className
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12L18 8V11H6.5C5.67 11 5 11.67 5 12.5V13.5C5 14.33 5.67 15 6.5 15H18V18L22 14V12Z"
              fill="currentColor"
            />
            <path
              d="M2 12C2 6.48 6.48 2 12 2C14.8 2 17.3 3.2 19 5.1L19 5.1L17.9 6.2C16.6 4.8 14.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12L20 11H22L22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "networking",
      title: "Networking",
      articles: 3,
      icon: (className) => (
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            className
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z"
              fill="currentColor"
            />
            <path
              d="M12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "careers",
      title: "Careers & Jobs",
      articles: 2,
      icon: (className) => (
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            className
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "events",
      title: "Events",
      articles: 2,
      icon: (className) => (
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            className
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "mentorship",
      title: "Mentorship",
      articles: 3,
      icon: (className) => (
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            className
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;

        let bgColor = "bg-white";
        let iconBgColor = "bg-blue-100";
        let iconColor = "text-blue-600";

        if (category.id === "networking") {
          iconBgColor = "bg-purple-100";
          iconColor = "text-purple-600";
        } else if (category.id === "careers") {
          iconBgColor = "bg-green-100";
          iconColor = "text-green-600";
        } else if (category.id === "events") {
          iconBgColor = "bg-orange-100";
          iconColor = "text-orange-600";
        } else if (category.id === "mentorship") {
          iconBgColor = "bg-indigo-100";
          iconColor = "text-indigo-600";
        }

        if (isActive) {
          if (category.id === "networking") {
            bgColor = "bg-purple-500";
            iconBgColor = "bg-purple-400";
            iconColor = "text-white";
          } else if (category.id === "careers") {
            bgColor = "bg-green-500";
            iconBgColor = "bg-green-400";
            iconColor = "text-white";
          } else if (category.id === "getting-started") {
            bgColor = "bg-blue-500";
            iconBgColor = "bg-blue-400";
            iconColor = "text-white";
          } else if (category.id === "events") {
            bgColor = "bg-orange-500";
            iconBgColor = "bg-orange-400";
            iconColor = "text-white";
          } else if (category.id === "mentorship") {
            bgColor = "bg-indigo-500";
            iconBgColor = "bg-indigo-400";
            iconColor = "text-white";
          }
        }

        return (
          <motion.div
            key={category.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl cursor-pointer shadow-sm border border-gray-100",
              bgColor,
              isActive ? "text-white" : "text-gray-700"
            )}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3">
              {category.icon(cn(iconBgColor, iconColor))}
              <div>
                <h3 className="font-medium">{category.title}</h3>
                <p className="text-sm opacity-80">
                  {category.articles} articles
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Category Content Component
function CategoryContent({
  category,
  isQuestionExpanded,
  toggleQuestion,
  role,
}) {
  const categoryContent = {
    "getting-started": {
      title: "Getting Started",
      description: "Find answers to common questions about getting started",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12L18 8V11H6.5C5.67 11 5 11.67 5 12.5V13.5C5 14.33 5.67 15 6.5 15H18V18L22 14V12Z"
              fill="currentColor"
            />
            <path
              d="M2 12C2 6.48 6.48 2 12 2C14.8 2 17.3 3.2 19 5.1L19 5.1L17.9 6.2C16.6 4.8 14.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12L20 11H22L22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
      questions: [
        {
          id: "gs-1",
          question: "How do I join the alumni network?",
          answer:
            "To join the alumni network, you need to complete the registration process on our  portal. Visit the registration page, fill in your details, and verify your email address. Once approved, you'll have full access to the alumni network features.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z"
                  fill="currentColor"
                />
                <path
                  d="M12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
        },
        {
          id: "gs-2",
          question: "How do I join the student network?",
          answer:
            "To join the alumni network, you need to complete the registration process on our  portal. Visit the registration page, fill in your details, and verify your email address. Once approved, you'll have full access to the alumni network features.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z"
                  fill="currentColor"
                />
                <path
                  d="M12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
        },
      ],
    },
    networking: {
      title: "Networking",
      description: "Find answers to common questions about networking",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z"
              fill="currentColor"
            />
            <path
              d="M12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),

      questions: [
        {
          id: "net-1",
          question: "How can I find alumni of my college?",
          answer:
            "navigate to alumni directory to find alumni by company, location, or graduation year. You can also join industry-specific groups and attend networking events.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          actions: [
            {
              label: "alumni network",
              icon: "users",
              link: `/${role}/alumni-directory`,
            },

            {
              label: "student network",
              icon: "users",
              link: `/${role}/student-directory`,
            },
          ],
        },
        {
          id: "net-2",
          question: "How can I find students of my college?",
          answer:
            "navigate to student directory to find students by department or graduation year.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          actions: [
            {
              label: "student network",
              icon: "users",
              link: `/${role}/student-directory`,
            },
          ],
        },
      ],
    },
    careers: {
      title: "Careers & Jobs",
      description: "Find answers to common questions about careers & jobs",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
      questions: [
        {
          id: "career-1",
          question: "How do I post job or internship opportunities?",
          answer:
            "Verified alumni can post jobs and internships through our dedicated portal. Click on 'Post a Job' or 'Post an Internship' below and follow the simple submission process.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                  fill="currentColor"
                />
                <path
                  d="M17 12H12V7H10V12H7V14H10V19H12V14H17V12Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          actions: [
            {
              label: "Post a Job",
              icon: "plus",
              link: `/${role}/jobs/add-job`,
            },
            {
              label: "Post an Internship",
              icon: "plus",
              link: `/${role}/internships/add-internship`,
            },
          ],
        },
        {
          id: "career-2",
          question: "How do I find job or internship opportunities?",
          answer:
            "Verified alumni can post jobs or internships through our dedicated portal. you can view jobs posted by verified alumni and college in the Jobs section.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                  fill="currentColor"
                />
                <path
                  d="M17 12H12V7H10V12H7V14H10V19H12V14H17V12Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          actions: [
            {
              label: "find a Job",
              icon: "MoveUpRight",
              link: `/${role}/jobs`,
            },
            ,
            {
              label: "find Internship",
              icon: "MoveUpRight",
              link: `/${role}/internships`,
            },
          ],
        },
      ],
    },
    events: {
      title: "Events",
      description: "Find answers to common questions about events",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
      questions: [
        {
          id: "events-1",
          question: "How do I register for events?",
          answer:
            "To register for events, browse the Events calendar and select the event you're interested in. Click the 'Register' button and complete the registration form. You'll receive a confirmation email with event details and a calendar invitation.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          actions: [
            {
              label: "Browse events",
              icon: "MoveUpRight",
              link: `/${role}/webinars`,
            },
            ,
          ],
        },
      ],
    },
    mentorship: {
      title: "Mentorship",
      description: "Find answers to common questions about mentorship",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ),
      questions: [
        {
          id: "mentor-1",
          question: "How do I become a mentor?",
          answer:
            "To become a mentor, visit the Mentorship section and click on 'Become a Mentor'. Complete the application form detailing your expertise, experience, and the areas in which you'd like to mentor. Once approved, your profile will be visible to potential mentees.",
          icon: (
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
        },
      ],
    },
  };

  const content = categoryContent[category];

  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        {content.icon}
        <div>
          <h2 className="text-xl font-bold">{content.title}</h2>
          <p className="text-gray-500">{content.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {content.questions.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleQuestion(item.id)}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-medium">{item.question}</h3>
              </div>
              <motion.div
                animate={{ rotate: isQuestionExpanded(item.id) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isQuestionExpanded(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </motion.div>
            </div>

            <AnimatePresence>
              {isQuestionExpanded(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-gray-700 mb-4">{item.answer}</p>

                    {item.actions && (
                      <div className="flex flex-wrap gap-3">
                        {item.actions.map((action, index) => (
                          <motion.button
                            key={index}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
                              category === "networking"
                                ? "bg-purple-100 text-purple-700"
                                : category === "careers"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                            )}
                            onClick={() => router.push(action.link)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {action.icon === "search" && (
                              <Search className="w-4 h-4" />
                            )}
                            {action.icon === "users" && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                              >
                                <path
                                  d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                            {action.icon === "plus" && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                              >
                                <path
                                  d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                            {action.icon === "file" && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                              >
                                <path
                                  d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                            {action.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
