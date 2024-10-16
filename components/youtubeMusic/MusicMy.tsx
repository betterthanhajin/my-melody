"use client";
import Image from "next/image";
import test from "@/public/images/test1.png";
import { useRef } from "react";

interface MusicMyProps {
  myImageURL: string | undefined;
  myTitle: string;
  mySubTitle: string;
}

export default function MusicMy({
  myImageURL,
  myTitle,
  mySubTitle,
}: MusicMyProps) {
  const borderRef = useRef<HTMLDivElement>(null);
  const colors = ["pink", "purple", "blue", "green", "yellow", "red"];
  return (
    <section className="mt-4 w-full h-[52px] flex justify-between gap-8">
      <div className="flex gap-4">
        <div>
          <Image
            src={myImageURL ?? test}
            alt="music"
            className="rounded-[100%] object-cover"
            width={45}
            height={45}
          />
        </div>
        <div>
          <h3 className="font-extralight text-xs whitespace-nowrap">
            {myTitle ?? "My Playlist"}
          </h3>
          <p className="font-extrabold">{mySubTitle ?? "MY"}</p>
        </div>
      </div>

      <div
        className="border-motion w-[100px] h-[42px] text-center rounded-2xl border-[1px] border-transparent p-2"
        ref={borderRef}
      >
        <span className="whitespace-nowrap text-xs">Play all</span>
      </div>
      <style jsx>{`
        .border-motion {
          animation-name: borderChange;
          animation-duration: 4s;
          animation-iteration-count: infinite;
        }

        @keyframes borderChange {
          0%{
          border-color: ${colors[0]};
          }
             20%{
          border-color: ${colors[1]};
          }
             40%{
          border-color: ${colors[2]};
          }
             60%{
          border-color: ${colors[3]};
          }
             80%{
          border-color: ${colors[4]};
          }

          100%{
          border-color: ${colors[5]};
          }
      `}</style>
    </section>
  );
}
