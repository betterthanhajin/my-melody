"use client";
import Image, { StaticImageData } from "next/image";
import test from "@/public/images/test1.png";
import { useRef } from "react";
import Button from "../ui/button/Button";

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
    <>
      <section className="mt-4 w-full h-[52px] flex justify-center gap-8">
        <div className="flex gap-4 border-b border-[#282828]">
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
              <p className="font-extrabold text-ellipsis overflow-hidden w-12 whitespace-nowrap">
                {mySubTitle ?? ""}
              </p>
            </div>
          </div>
          <Button />
        </div>
      </section>
    </>
  );
}
