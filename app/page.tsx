import CDPlayer from "@/components/CDPlayer";
import MusicContainer from "@/components/youtubeMusic/MusicContainer";

export default function Home() {
  return (
    // * flex flex-col items-center justify-between p-24
    <main className="w-full h-full flex justify-center items-center p-24">
      {/* <CDPlayer musicTitle="music title" /> */}
      <MusicContainer />
    </main>
  );
}
