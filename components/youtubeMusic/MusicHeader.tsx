import Image from "next/image";
import youtubeLogo from "@/public/images/youtubeLogo.svg";
import youtubeSearch from "@/public/images/youtube-search.svg";
import IU from "@/public/images/iu.webp";
import MusicMy from "./MusicMy";
export default function MusicHeader() {
  return (
    <header className="w-full h-[52px] flex justify-between items-center px-8">
      <div className="flex gap-4">
        <Image src={youtubeLogo} alt="youtube" width={45} height={45} />
      </div>
      <div className="flex gap-4">
        <button className="font-bold">Home</button>
        <button className="font-bold">Explore</button>
        <button className="font-bold">Library</button>
      </div>
      <div className="flex gap-4">
        <Image src={youtubeSearch} alt="youtube" width={35} height={35} />
        <MusicMy myImageURL={IU} myTitle={undefined} mySubTitle={undefined} />
      </div>
    </header>
  );
}
