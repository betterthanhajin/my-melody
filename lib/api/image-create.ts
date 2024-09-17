export default async function textToImage(text: string) {
await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`},
  body: JSON.stringify({
    model: "dall-e-3",
    prompt: text,
    n: 1,
    size: "1024x1024"
  })
}).then(response => {const test = response.json()
  console.log(test);
})
};
