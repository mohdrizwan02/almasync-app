import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function POST(req) {
  const { userId } = await req.json();
  console.log(userId);
  const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  );

  const token = serverClient.createToken(userId);
  return NextResponse.json({ token });
}
