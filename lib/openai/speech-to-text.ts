import OpenAI, { toFile } from "openai";

// * Vercel 에서 최대 30초 동안 API를 실행하도록 요청하는 상수
export const maxDuration = 30;

export async function speechToText({
  audioSrc,
  language,
}: {
  audioSrc: string;
  language: string;
}) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const audioType = audioSrc.match(/data:audio\/(.+?);/)?.[1];
  const audioFullType = audioSrc.match(/data:audio\/(.+?),/)?.[0];

  if (!audioType || !audioFullType) {
    throw new Error("Unsupported audio type");
  }

  const voiceBuffer = Buffer.from(
    audioSrc.replace(audioFullType, ""),
    "base64"
  );

  const file = await toFile(voiceBuffer, `audio.${audioType}`, {
    type: `audio/${audioType}`,
  });

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    response_format: "text",
    language: language,
  });

  return transcription;
}

export default speechToText;
