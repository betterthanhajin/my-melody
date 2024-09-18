"use client";
import CDPlayer from "@/components/CDPlayer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <CDPlayer musicTitle="music title" />
    </main>
  );
}
