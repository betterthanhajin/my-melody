import CDPlayer from "@/components/CDPlayer";
import MusicContainer from "@/components/youtubeMusic/MusicContainer";
import MusicFooter from "@/components/youtubeMusic/MusicFooter";
import MusicHeader from "@/components/youtubeMusic/MusicHeader";

export default function Home() {
  return (
    <>
      <MusicHeader />
      <main className="w-full h-full flex justify-center items-center p-24">
        <CDPlayer musicTitle="music title" />
        <MusicContainer />
      </main>
      <MusicFooter />
    </>
  );
}
