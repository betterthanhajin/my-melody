import OpenAI from "openai";
import fs from "fs";
export default async function convertSpeechToText(audioUrl: string) {
  const openai = new OpenAI();
  console.log("Converting speech to text");
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioUrl),
    model: "whisper-1",
    response_format: "text",
  });

  console.log(transcription);
}
