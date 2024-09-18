import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { audioUrl } = req.body;

      // Download the audio file
      const audioResponse = await axios.get(audioUrl, {
        responseType: "arraybuffer",
      });
      const audioBuffer = Buffer.from(audioResponse.data);

      // Save the buffer to a temporary file
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, "temp_audio_file.wav");
      fs.writeFileSync(tempFilePath, audioBuffer);

      // Create a ReadStream from the temporary file
      const audioStream = fs.createReadStream(tempFilePath);

      const response = await openai.audio.transcriptions.create({
        file: audioStream,
        model: "whisper-1",
      });

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error("OpenAI API error:", error);
        res.status(error.status || 500).json({ error: error.message });
      } else {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
