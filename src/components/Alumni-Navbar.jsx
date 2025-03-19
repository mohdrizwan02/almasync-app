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
  Dr,
} from "@/components/ui/dropdown-menu";

import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Navbar = () => {
  const navItems = [
    {
      name: "home",
      href: "/alumni",
      icon: <Home />,
    },
    {
      name: "Alumni",
      href: "/alumni/alumni-directory",
      icon: <Users2Icon />,
    },
    {
      name: "Students",
      href: "/alumni/alumni-directory",
      icon: <Users />,
    },
    {
      name: "Jobs",
      href: "/alumni/jobs",
      icon: <LucideBriefcaseBusiness />,
    },
    {
      name: "Internships",
      href: "/alumni/internships",
      icon: <Building2Icon />,
    },
    {
      name: "Mentorships",
      href: "/alumni/mentors",
      icon: <GraduationCap />,
    },
    {
      name: "webinars",
      href: "/alumni/webinars",
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
                <NavigationMenuLink href="/alumni">
                  <img src="/almasync.png" className="h-7" />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className="hidden sm:block relative p-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search. . ."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="hidden lg:flex gap-4 ">
                <NavigationMenuItem className={""}>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/"
                  >
                    <Label className={"cursor-pointer"}>Alumni</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/"
                  >
                    <Label className={"cursor-pointer"}>Students</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/"
                  >
                    <Label className={"cursor-pointer"}>Jobs</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/"
                  >
                    <Label className={"cursor-pointer"}>Internships</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                    href="/"
                  >
                    <Label className={"cursor-pointer"}>Mentorships</Label>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          <MessageSquareText className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          <Link href="/alumni">
            <CircleUser className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={"lg:hidden m-0"}>
                <Menu className="w-6 h-6 cursor-pointer text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-5 rounded-lg p-3 shadow">
              <DropdownMenuGroup className="">
                
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
