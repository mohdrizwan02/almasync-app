import axios from "axios";

import { CohereClientV2 } from "cohere-ai";
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function profileAnalysis(prompt) {
  const response = await cohere.chat({
    model: "command-a-03-2025",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response;
}
