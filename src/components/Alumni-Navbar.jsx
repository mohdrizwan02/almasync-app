"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  Bell,
  Building2Icon,
  CircleCheck,
  CircleUser,
  GraduationCap,
  Home,
  LogOut,
  LucideBriefcaseBusiness,
  Mail,
  Menu,
  PencilRuler,
  User,
  Users,
  Users2Icon,
} from "lucide-react";

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
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  const logout = async () => {
    try {
      console.log("logging out");

      const response = await axios.get("/api/auth/logout");
      console.log(response);
      if (response.data.success) {
        console.log(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.log("error occurred while logging out try again");
    }
  };
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
      name: "students",
      href: "/alumni/student-directory",
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
      href: "/alumni/mentorships",
      icon: <GraduationCap />,
    },
    {
      name: "webinars",
      href: "/alumni/webinars",
      icon: <PencilRuler />,
    },
  ];

  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <div className="border-b mb-2  bg-white px-4 flex h-16 items-center w-full">
        <div className="w-full flex justify-between">
          <div className="">
            <NavigationMenu>
              <NavigationMenuList className={"flex gap-6 items-center"}>
                <NavigationMenuItem>
                  <Link href="/alumni/">
                    <img src="/almasync.png" className="h-7" />
                  </Link>
                </NavigationMenuItem>

                <div className="hidden lg:flex gap-4 ">
                  <NavigationMenuItem className={""}>
                    <NavigationMenuLink
                      className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                      href="/alumni/alumni-directory"
                    >
                      <Label className={"cursor-pointer"}>Alumni</Label>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                      href="/alumni/student-directory"
                    >
                      <Label className={"cursor-pointer"}>Students</Label>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                      href="/alumni/jobs"
                    >
                      <Label className={"cursor-pointer"}>Jobs</Label>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                      href="/alumni/internships"
                    >
                      <Label className={"cursor-pointer"}>Internships</Label>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                      href="/alumni/mentorships"
                    >
                      <Label className={"cursor-pointer"}>Mentorships</Label>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="hover:bg-orange-500/40 px-3 py-2 rounded-lg"
                      href="/alumni/webinars"
                    >
                      <Label className={"cursor-pointer"}>Webinars</Label>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUser className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuItem asChild>
                  <Link
                    href="/alumni/profile"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/alumni/messages"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Messages
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/alumni/notifications"
                    className="flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={logout}
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                        {hydrated && pathname === item.href && (
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
    </>
  );
};

export default Navbar;
