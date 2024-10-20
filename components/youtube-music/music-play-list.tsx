"use client";
import Image from "next/image";
import IU from "@/public/images/iu.webp";
import moreVert from "@/public/images/more_vert.svg";

export default function MusicPlayList() {
  return (
    <li className="mt-4 flex justify-between items-center gap-2">
      <Image src={IU} alt="IU" width={60} height={60} />
      <div>
        <h3 className="lg:text-md text-xs">Listen Again</h3>
        <p className="lg:text-md text-xs">Recommended for you</p>
      </div>
      <Image src={moreVert} alt="More" width={20} height={20} />
    </li>
  );
}
