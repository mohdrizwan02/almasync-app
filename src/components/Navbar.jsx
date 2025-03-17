"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Bell,
  CircleUser,
  Menu,
  MessageSquareText,
  Search,
  X,
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
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="border-b mb-2  bg-white px-4 flex h-16 items-center w-full">
      <div className="w-full flex justify-between">
        <div className="">
          <NavigationMenu>
            <NavigationMenuList className={"flex gap-6 items-center"}>
              <NavigationMenuItem>
                <NavigationMenuLink href="/student">
                  <img src="/almasync.png" className="h-7" />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className="hidden lg:block relative p-1">
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
          <Link href="/student">
            <CircleUser className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={"lg:hidden m-0"}
                onClick={() => {
                  setIsMobileMenuOpen((prev) => !prev);
                }}
              >
                <Menu className="w-6 h-6 cursor-pointer text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={"/"}>
                  <DropdownMenuItem>Alumni</DropdownMenuItem>
                </Link>
                <Link href={"/"}>
                  <DropdownMenuItem>Students</DropdownMenuItem>
                </Link>
                <Link href={"/"}>
                  <DropdownMenuItem>Jobs</DropdownMenuItem>
                </Link>
                <Link href={"/"}>
                  <DropdownMenuItem>Internships</DropdownMenuItem>
                </Link>
                <Link href={"/"}>
                <DropdownMenuItem>webinars</DropdownMenuItem>
                </Link>
                <Link href={"/"}>
                  <DropdownMenuItem>Mentorships</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
