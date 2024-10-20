import Image from "next/image";
import youtubeLogo from "@/public/images/youtubeLogo.png";
import youtubeSearch from "@/public/images/youtube-search.svg";
import IU from "@/public/images/iu.webp";
import MusicMy from "./music-my";
export default function MusicHeader() {
  return (
    <header className="w-full h-[20px] flex justify-between items-center mb-12">
      <div className="flex items-center gap-2">
        <Image src={youtubeLogo} alt="youtube" width={65} height={65} />
        <div className="font-bold text-2xl">Music</div>
      </div>
      <div className="flex gap-4">
        <Image src={youtubeSearch} alt="youtube" width={35} height={35} />
        <MusicMy myImageURL={IU} myTitle={undefined} mySubTitle={undefined} />
      </div>
    </header>
  );
}
