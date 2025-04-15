"use client";
import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";

import client from "@/lib/streamClient";

export default function ChatWindow({ userId, username, targetUserId }) {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/stream-api-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const { token } = await res.json();
      console.log(token)

      await client.connectUser({ id: userId, name: username }, token);

      const newChannel = client.channel("messaging", {
        members: [userId, targetUserId],
      });

      await newChannel.watch();
      setChannel(newChannel);
    };

    init();

    return () => {
      client.disconnectUser();
    };
  }, [userId, username, targetUserId]);

  if (!channel) return <div>Loading chat...</div>;

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}
