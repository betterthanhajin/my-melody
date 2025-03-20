import { uploadImageFile } from "@/lib/storage/r2Client";
import OpenAI from "openai";
import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";
import fs from "fs";

// * Vercel 에서 최대 30초 동안 API를 실행하도록 요청하는 상수
export const maxDuration = 30;

interface ExtendedGenerationConfig extends GenerationConfig {
  responseModalities?: string[];
}

export async function POST(request: Request) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const { requested_album_cover } = await request.json();
  let generatedImageUrl = "";
  async function generateImage() {
    const contents = requested_album_cover;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: {
        responseModalities: ["Image"],
      } as ExtendedGenerationConfig,
    });

    try {
      const response = await model.generateContent(contents);
      console.log(response);
      if (response?.response?.candidates?.[0]?.content?.parts) {
        for (const part of response.response.candidates[0].content.parts) {
          // Based on the part type, either show the text or save the image
          if (part.text) {
            console.log(part.text);
          } else if (part.inlineData) {
            console.log("Image data found in the response.");
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("gemini-native-image.png", new Uint8Array(buffer));
            console.log("Image saved as gemini-native-image.png");
            generatedImageUrl = await uploadImageFile({
              buffer: buffer.buffer.slice(
                buffer.byteOffset,
                buffer.byteOffset + buffer.byteLength
              ) as ArrayBuffer,
              folder: "my-melody-album-covers",
            });
            return Response.json({ generatedImageUrl });
          }
        }
      } else {
        console.error("No candidates found in the response.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

  generateImage();
  return Response.json({ generatedImageUrl });
}
