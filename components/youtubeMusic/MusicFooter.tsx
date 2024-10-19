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
    <section className="mt-8 flex items-center justify-between">
      <button
        className="flex flex-col items-center gap-4"
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
        <Image src={Home} alt="home" width={30} height={30} />
        <p>Home</p>
      </button>
      <button
        className="flex flex-col items-center justify-between gap-4"
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
        <Image src={explore} alt="explore" width={30} height={30} />
        <p>explore</p>
      </button>
      <button
        className="flex flex-col items-center justify-between gap-4"
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
        <Image src={library} alt="home" width={30} height={30} />
        <p>library</p>
      </button>
    </section>
  );
}
