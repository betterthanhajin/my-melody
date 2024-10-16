"use client";
import Image from "next/image";
import IU from "@/public/images/iu.webp";
import moreVert from "@/public/images/more_vert.svg";

export default function MusicPlayList() {
  return (
    <li className="mt-4 flex justify-between items-center">
      <Image src={IU} alt="IU" width={60} height={60} />
      <p>
        <h3>Listen Again</h3>
        <p>Recommended for you</p>
      </p>
      <Image src={moreVert} alt="More" width={20} height={20} />
    </li>
  );
}
