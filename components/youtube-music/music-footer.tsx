"use client";
import Image from "next/image";
import Home from "@/public/images/other_houses.svg";
import explore from "@/public/images/explore.svg";
import library from "@/public/images/library_music.svg";
import { useMusicState, musicActions } from "@/lib/state/music-state";
import { useState } from "react";

export default function MusicFooter() {
  const musicState = useMusicState();
  const [historyCount, setHistoryCount] = useState<number[]>([]);
  return (
    <section className="fixed bottom-0 left-0 right-0 mt-8 flex items-center justify-between bg-black p-4">
      <button
        className="flex flex-col items-center gap-2"
        onClick={() => {
          console.log("Home");
          const newCount = 0;
          setHistoryCount([...historyCount, newCount]);
          musicActions.addHistoryItem({
            historyId: newCount,
            historyTitle: "Home",
          });
        }}
      >
        <Image src={Home} alt="home" width={20} height={20} />
        <p className="text-sm">Home</p>
      </button>
      <button
        className="flex flex-col items-center justify-between gap-2"
        onClick={() => {
          console.log("explore");
          const newCount = 0;
          setHistoryCount([...historyCount, newCount]);
          musicActions.addHistoryItem({
            historyId: newCount,
            historyTitle: "explore",
          });
        }}
      >
        <Image src={explore} alt="explore" width={20} height={20} />
        <p className="text-sm">explore</p>
      </button>
      <button
        className="flex flex-col items-center justify-between gap-2"
        onClick={() => {
          console.log("library");
          const newCount = 0;
          setHistoryCount([...historyCount, newCount]);
          musicActions.addHistoryItem({
            historyId: newCount,
            historyTitle: "library",
          });
        }}
      >
        <Image src={library} alt="home" width={20} height={20} />
        <p className="text-sm">library</p>
      </button>
    </section>
  );
}
