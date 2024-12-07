import { uploadImageFile } from "@/lib/storage/r2Client";
import OpenAI from "openai";

// * Vercel 에서 최대 30초 동안 API를 실행하도록 요청하는 상수
export const maxDuration = 30;

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { requested_album_cover } = await request.json();
  let generatedImageUrl = "";

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      quality: "standard",
      prompt: `Album Cover Design, Music Album, Album Cover Design
watercolor painting of a music album cover with a title "
${requested_album_cover}`,
    });

    const temporaryUrl = response.data?.[0]?.url;
    if (!temporaryUrl) throw new Error("No temporary URL");

    const imageResponse = await fetch(temporaryUrl);
    generatedImageUrl = await uploadImageFile({
      buffer: await imageResponse.arrayBuffer(),
      folder: "my-melody-album-covers",
    });
  } catch (e) {
    console.log("Error in create-image API");
    console.error(e);
  }

  return Response.json({ generatedImageUrl });
}
