import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error processing your request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
