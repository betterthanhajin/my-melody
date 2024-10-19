"use client";
import Image from "next/image";
import Home from "@/public/images/other_houses.svg";
import explore from "@/public/images/explore.svg";
import library from "@/public/images/library_music.svg";

export default function MusicFooter() {
  return (
    <section className="mt-8 flex items-center justify-between">
      <button
        className="flex flex-col items-center gap-4"
        onClick={() => {
          console.log("Home");
        }}
      >
        <Image src={Home} alt="home" width={30} height={30} />
        <p>Home</p>
      </button>
      <button
        className="flex flex-col items-center justify-between gap-4"
        onClick={() => {
          console.log("Home");
        }}
      >
        <Image src={explore} alt="explore" width={30} height={30} />
        <p>explore</p>
      </button>
      <button
        className="flex flex-col items-center justify-between gap-4"
        onClick={() => {
          console.log("Home");
        }}
      >
        <Image src={library} alt="home" width={30} height={30} />
        <p>library</p>
      </button>
    </section>
  );
}
