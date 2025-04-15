"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    axios
      .get("/api/check-profile-status")
      .then((response) => {
        if (!response.data.data.isProfileComplete) {
          router.push("/alumni/profile/complete-profile");
        } else {
          setPageLoad((prev) => false);
        }
      })
      .catch((error) => {
        console.log(error);

        router.push("/alumni/profile");
      });
  }, []);

  return (
    <>
      {pageLoad ? (
        <div>loading</div>
      ) : (
        <div className="">profile update page</div>
      )}
    </>
  );
};

export default ProfileUpdatePage;
