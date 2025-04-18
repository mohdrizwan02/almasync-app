"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CompatibilityModal({ isOpen, onClose, profile }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Compatibility</DialogTitle>
          <DialogDescription>
            See how your skills and interests align with {profile.firstName}{" "}
            {profile.lastName}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="">profile compatibility modal</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
