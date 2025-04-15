"use client";

import { useState } from "react";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export default function ProfileBanner({
  title,
  description,
  buttonText,
  buttonLink,
  bannerStatus = true, // default true
}) {
  const [bannerOpen, setBannerOpen] = useState(bannerStatus);

  // ✅ Don't render if closed

  return (
    <>
      {bannerOpen &&
        (bannerOpen ? (
          <div className="w-full p-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded-md flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 shadow-md mb-4">
            <div className="flex-1">
              <AlertTitle className="text-yellow-800 dark:text-yellow-100 font-semibold">
                {title}
              </AlertTitle>
              <AlertDescription className="text-sm text-yellow-700 dark:text-yellow-200">
                {description}
              </AlertDescription>
            </div>

            <div className="flex items-center gap-2">
              <Link href={buttonLink}>
                <Button
                  variant="outline"
                  className="text-yellow-800 border-yellow-400 hover:bg-yellow-200"
                >
                  {buttonText}
                </Button>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setBannerOpen(false)} // ✅ Close banner
                className="text-yellow-700 hover:bg-yellow-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <></>
        ))}
    </>
  );
}
