import speechToText from "@/lib/openai/speech-to-text";
export const maxDuration = 30;

export async function POST(request: Request) {
  const { audioSrc, language } = await request.json();
  const text = await speechToText({ audioSrc, language });
  return Response.json({ text });
}
