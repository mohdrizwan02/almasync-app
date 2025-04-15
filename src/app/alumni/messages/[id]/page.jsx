"use client";
import ChatWindow from "@/components/Chat-Window";
import { useUser } from "@/hooks/useUser";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function ChatPage() {
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    useUser().then((response) => {
      setUserId((prev) => response.userId);
      setUsername((prev) => setUsername);
    });
  }, []);

  console.log(id);

  if (!userId || !id) return <div>Missing user info</div>;

  return (
    <div className="h-screen">
      <ChatWindow
        userId={userId}
        username={username}
        targetUserId={id}
      />
    </div>
  );
}
