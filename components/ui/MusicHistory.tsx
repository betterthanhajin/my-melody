import History from "./History";
import { useMusicState, musicActions } from "@/lib/state/music-state";

export default function MusicHistory() {
  const musicState = useMusicState();
  return (
    <section className="flex items-center gap-4 overflow-x-scroll scrollbar-none">
      {musicState.historyList.map((history, index) => (
        <History key={index} title={history.historyTitle} />
      ))}
    </section>
  );
}
