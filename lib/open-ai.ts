export async function textToImage(text: string) {
  const response = await fetch("/api/text-to-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: text }),
  });
  return response.json();
}

export async function speechToText(audioUrl: string) {
  const response = await fetch("/api/speech-to-text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ audioUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An error occurred during the API call");
  }

  return response.json();
}
