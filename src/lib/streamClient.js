import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance(process.env.STREAM_API_KEY);
export default client;
