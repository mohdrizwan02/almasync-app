"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Bell,
  Building2Icon,
  CircleCheck,
  CircleUser,
  GraduationCap,
  Home,
  LucideBriefcaseBusiness,
  Menu,
  MessageSquareText,
  PencilRuler,
  Search,
  Users,
  Users2Icon,
} from "lucide-react";

import { Input } from "./ui/input";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Navbar = () => {
  const navItems = [
    {
      name: "home",
      href: "/student",
      icon: <Home />,
    },
    {
      name: "Alumni",
      href: "/student/alumni-directory",
      icon: <Users2Icon />,
    },
    {
      name: "Students",
      href: "/student/student-directory",
      icon: <Users />,
    },
    {
      name: "Jobs",
      href: "/student/jobs",
      icon: <LucideBriefcaseBusiness />,
    },
    {
      name: "Internships",
      href: "/student/internships",
      icon: <Building2Icon />,
    },
    {
      name: "Mentorships",
      href: "/student/mentors",
      icon: <GraduationCap />,
    },
    {
      name: "webinars",
      href: "/student/webinars",
      icon: <PencilRuler />,
    },
  ];

  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  console.log(pathname);

  return (
    <div className="border-b mb-2  bg-white px-4 flex h-16 items-center w-full">
      <div className="w-full flex justify-between">
        <div className="">
          <NavigationMenu>
            <NavigationMenuList className={"flex gap-6 items-center"}>
              <NavigationMenuItem>
                <Link href="/student/">
                  <img src="/almasync.png" className="h-7" />
                </Link>
              </NavigationMenuItem>

              <div className="hidden lg:flex gap-4 ">
                <NavigationMenuItem className={""}>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/student/alumni-directory"
                  >
                    <Label className={"cursor-pointer"}>Alumni</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/student/student-directory"
                  >
                    <Label className={"cursor-pointer"}>Students</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/student/jobs"
                  >
                    <Label className={"cursor-pointer"}>Jobs</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/student/internships"
                  >
                    <Label className={"cursor-pointer"}>Internships</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/student/mentors"
                  >
                    <Label className={"cursor-pointer"}>Mentorships</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/student/notifications">
            <Bell className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          </Link>
          <Link href="/student/messages">
            <MessageSquareText className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          </Link>
          <Link href="/student/profile">
            <CircleUser className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={"lg:hidden m-0"}>
                <Menu className="w-6 h-6 cursor-pointer text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-5 rounded-lg p-3 shadow">
              <DropdownMenuGroup>
                {navItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <DropdownMenuItem
                      className={"flex gap-3 cursor-pointer justify-between"}
                    >
                      <div className="flex gap-2 items-center">
                        {item.icon}
                        {item.name}
                      </div>
                      {pathname === item.href && (
                        <CircleCheck className="text-orange-500" />
                      )}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
