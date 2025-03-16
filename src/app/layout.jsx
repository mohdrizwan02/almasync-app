import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";



export const metadata = {
  title: "AlmaSync-app",
  description: "A comprehensive mentorship app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <>{children}</>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
