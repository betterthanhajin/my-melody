import CDPlayer from "@/components/CDPlayer";
import MusicContainer from "@/components/youtubeMusic/MusicContainer";
import MusicFooter from "@/components/youtubeMusic/MusicFooter";
import MusicHeader from "@/components/youtubeMusic/MusicHeader";

export default function Home() {
  return (
    <>
      <main className="w-full h-full p-12">
        <MusicHeader />
        {/* <CDPlayer musicTitle="music title" /> */}
        <MusicContainer />
        <MusicFooter />
      </main>
    </>
  );
}
