"use client";
import Image, { StaticImageData } from "next/image";
import test from "@/public/images/test1.png";
import { useRef } from "react";

interface MusicMyProps {
  myImageURL?: StaticImageData | undefined;
  myTitle?: string | undefined;
  mySubTitle?: string | undefined;
}

export default function MusicMy({
  myImageURL,
  myTitle,
  mySubTitle,
}: MusicMyProps) {
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
            {myTitle ?? ""}
          </h3>
          <p className="font-extrabold">{mySubTitle ?? ""}</p>
        </div>
      </div>
    </section>
  );
}
