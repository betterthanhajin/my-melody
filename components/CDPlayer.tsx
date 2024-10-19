"use client";
import React, { useState } from "react";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import {
  Mic,
  PlayCircle,
  PauseCircle,
  Volume2,
  VolumeX,
  MicOff,
} from "lucide-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import OutlinedButtons from "@/components/ui/OutlinedButtons";
import ContinuousSlider from "@/components/ui/ContinuousSlider";
import textToImage from "@/lib/api/image-create";
import { blue, blueGrey } from "@mui/material/colors";

const CDPlayer = ({ musicTitle }: { musicTitle: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [transcription, setTranscription] = useState("");

  const vad = useMicVAD({
    modelURL: "https://static.llami.net/vad/silero_vad.onnx",
    workletURL: "https://static.llami.net/vad/vad.worklet.bundle.min.js",
    onSpeechStart: () => {
      console.log("Speech Start");
      vad.start();
    },
    onSpeechEnd: async (audio: any) => {
      const wavBuffer = utils.encodeWAV(audio);
      const base64 = utils.arrayBufferToBase64(wavBuffer);
      const url = `data:audio/wav;base64,${base64}`;
      await convertSpeechToText(url);
    },
    ortConfig: (ort: any) => {
      ort.env.wasm.wasmPaths = "https://unpkg.com/onnxruntime-web@dev/dist/";
    },
    startOnLoad: false,
  });

  const convertSpeechToText = async (audioUrl: string) => {
    console.log("Converting speech to text");
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscription(result);
      console.log("Transcription:", result);
      textToImage(result);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
    };
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const hearingVoice = () => {
    console.log("hearingVoice");
    if (isMicOn) {
      vad.pause();
    } else {
      vad.start();
    }
    setIsMicOn(!isMicOn);
  };

  return (
    <Card
      sx={{
        maxWidth: 280,
        maxHeight: 410,
        margin: "auto",
        backgroundColor: "#282828", // slate-950 equivalent
        color: "white",
        padding: 5,
        borderRadius: "1.5rem",
        marginTop: 2,
        marginBottom: 10,
      }}
    >
      <CardContent className="pt-6 pb-6 pr-3 pl-3">
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="relative w-full">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* CD Player body */}
              <circle cx="100" cy="100" r="100" fill="#333" />

              {/* CD */}
              <g className={`cd ${isPlaying ? "rotating" : ""}`}>
                <circle cx="100" cy="100" r="85" fill="#111" />
                <circle cx="100" cy="100" r="30" fill="#333" />
                <circle cx="100" cy="100" r="5" fill="#111" />
                <line
                  x1="100"
                  y1="15"
                  x2="100"
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
                  <circle cx="170" cy="170" r="15" fill="#4CAF50" />
                )}
                {isPlaying ? (
                  // Pause icon
                  <g>
                    <rect x="162" y="160" width="6" height="20" fill="white" />
                    <rect x="172" y="160" width="6" height="20" fill="white" />
                  </g>
                ) : (
                  // Play icon
                  <path d="M165,160 L165,180 L180,170 Z" fill="white" />
                )}
              </g>
            </svg>
          </div>

          <h3 className="text-xl font-bold text-center">{musicTitle}</h3>
          <div onClick={hearingVoice}>
            {/* <OutlinedButtons> */}
            {isMicOn ? (
              <MicOff size={20} />
            ) : (
              <Mic size={20} className="text-[#4CAF50]" />
            )}
            {/* </OutlinedButtons> */}
          </div>

          <div className="w-48">
            <ContinuousSlider />
          </div>
          {transcription && (
            <div className="mt-4 p-2 bg-gray-100 rounded">
              <p>
                <strong>Transcription:</strong> {transcription}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <style jsx>{`
        .cd {
          transform-origin: 100px 100px;
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
  );
};

export default CDPlayer;
