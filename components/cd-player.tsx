"use client";
import React, { useEffect, useState } from "react";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { Mic, MicOff } from "lucide-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CDPlayer = ({ musicTitle }: { musicTitle: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [transcription, setTranscription] = useState("");
  const [language, setLanguage] = useState("ko");

  useEffect(() => {
    setLanguage(navigator.language);
  }, []);

  const vad = useMicVAD({
    modelURL: "https://static.llami.net/vad/silero_vad.onnx",
    workletURL: "https://static.llami.net/vad/vad.worklet.bundle.min.js",
    onSpeechStart: () => {
      console.log("Speech Start");
    },
    onSpeechEnd: async (audio: any) => {
      console.log("Speech End");
      const wavBuffer = utils.encodeWAV(audio);
      playAudio(
        URL.createObjectURL(new Blob([wavBuffer], { type: "audio/wav" }))
      );
      const base64 = utils.arrayBufferToBase64(wavBuffer);
      const audioSrc = `data:audio/wav;base64,${base64}`;
      const responseOfTTS = await fetch("/api/speech-to-text", {
        method: "POST",
        body: JSON.stringify({ audioSrc, language }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { text } = await responseOfTTS.json();
      setTranscription(text);

      let responseOfDALLE = await fetch("/api/create-image", {
        method: "POST",
        body: JSON.stringify({ requested_album_cover: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { generatedImageUrl } = await responseOfDALLE.json();
      console.log(generatedImageUrl);
      setUrl(generatedImageUrl);
      setImage(generatedImageUrl);
    },
    ortConfig: (ort: any) => {
      ort.env.wasm.wasmPaths = "https://unpkg.com/onnxruntime-web@dev/dist/";
    },
    startOnLoad: false,
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const hearingVoice = () => {
    console.log(isMicOn);
    if (!isMicOn) {
      vad.start();
    } else {
      vad.pause();
    }
    setIsMicOn(!isMicOn);
  };

  const playAudio = (audio: string) => {
    const audioPlayer = new Audio(audio);
    if (isPlaying) {
      audioPlayer.play();
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 280,
          maxHeight: 410,
          margin: "auto",
          backgroundColor: "#b3b3b3",
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem",
          marginTop: 2,
          marginBottom: "10px",
        }}
        className="lg:p-8 p-2"
      >
        <CardContent>
          <div className="flex flex-col justify-center items-center space-y-6">
            {!image ? (
              <div className="relative w-full">
                <svg viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg">
                  {/* CD Player body */}
                  <circle cx="125" cy="100" r="100" fill="#333" />

                  {/* CD */}
                  <g className={`cd ${isPlaying ? "rotating" : ""}`}>
                    <circle cx="125" cy="100" r="85" fill="#111" />
                    <circle cx="125" cy="100" r="30" fill="#333" />
                    <circle cx="125" cy="100" r="5" fill="#111" />
                    <line
                      x1="125"
                      y1="15"
                      x2="125"
                      y2="70"
                      stroke="#444"
                      strokeWidth="3"
                    />
                  </g>

                  {/* Play/Pause button */}
                  <g
                    className="play-pause-button"
                    onClick={togglePlay}
                    style={{ cursor: "pointer" }}
                  >
                    {isPlaying ? (
                      <circle cx="170" cy="170" r="20" fill="#f44336" />
                    ) : (
                      <circle cx="170" cy="170" r="15" fill="#db69c4" />
                    )}
                    {isPlaying ? (
                      // Pause icon
                      <g>
                        <rect
                          x="162"
                          y="160"
                          width="6"
                          height="20"
                          fill="white"
                        />
                        <rect
                          x="172"
                          y="160"
                          width="6"
                          height="20"
                          fill="white"
                        />
                      </g>
                    ) : (
                      // Play icon
                      <path d="M165,160 L165,180 L180,170 Z" fill="white" />
                    )}
                  </g>
                </svg>
              </div>
            ) : (
              <div>
                <img src={image} alt="album cover" width={280} height={280} />
              </div>
            )}
            <div
              className="flex flex-col justify-center items-center gap-2"
              onClick={hearingVoice}
            >
              {/* <OutlinedButtons> */}
              {isMicOn ? (
                <MicOff size={30} />
              ) : (
                <Mic
                  size={35}
                  className="text-[#db69c4] lg:w-[45px] w-[35px]"
                />
              )}
              {/* </OutlinedButtons> */}
            </div>

            <div className="max-w-full w-full text-md">
              {/* <ContinuousSlider /> */}
              <p className="text-sm mb-1">voice to text</p>

              <input
                type="textarea"
                className="border-b border-[#282828] bg-black text-pink w-full
              lg:h-20 h-16 p-2 rounded-md"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                value={transcription}
              />
            </div>
          </div>
        </CardContent>

        <style jsx>{`
          .cd {
            transform-origin: 125px 100px;
            transition: transform 0.5s linear;
          }
          .rotating {
            animation: rotate 5s linear infinite;
          }
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Card>
    </>
  );
};

export default CDPlayer;
