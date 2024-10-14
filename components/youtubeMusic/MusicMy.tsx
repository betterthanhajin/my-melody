"use client";
import Image from "next/image";
import test from "@/public/images/test1.png";
import { use, useRef, useEffect } from "react";
import { keyframes } from "@emotion/react";
import { border, color } from "@mui/system";

export default function MusicMy() {
  const borderRef = useRef<HTMLDivElement>(null);
  const colors = ["pink", "purple", "blue", "green", "yellow", "red"];

  useEffect(() => {
    if (borderRef.current) {
      borderRef.current.style.border = `1px solid ${
        colors[Math.floor(Math.random() * colors.length)]
      }`;
    }
  }, []);

  return (
    <section className="w-full h-[52px] flex justify-between gap-8">
      <div className="flex gap-4">
        <div>
          <Image
            src={test}
            alt="Spotify"
            className="rounded-[100%] object-cover"
            width={60}
            height={60}
          />
        </div>
        <div>
          <h3 className="font-extralight text-xs whitespace-nowrap">
            START RADIO FROM A SONG
          </h3>
          <p className="font-extrabold">Quick picks</p>
        </div>
      </div>
      <div
        className="w-[100px] h-[42px] text-center rounded-2xl border-[1px] from-pink-300 to-purple-500 border-transparent p-2"
        ref={borderRef}
      >
        <span className="whitespace-nowrap text-xs">Play all</span>
      </div>
    </section>
  );
}
