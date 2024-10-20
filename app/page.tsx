import CDPlayer from "@/components/cd-player";
import MusicContainer from "@/components/youtube-music/music-container";
import MusicFooter from "@/components/youtube-music/music-footer";
import MusicHeader from "@/components/youtube-music/music-header";

export default function Home() {
  return (
    <>
      <main className="mt-[80px] w-full h-full pl-4 pr-4">
        <MusicHeader />
        <CDPlayer musicTitle="my melody" />
        <MusicContainer />
        <MusicFooter />
      </main>
    </>
  );
}
