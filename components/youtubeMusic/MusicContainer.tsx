import MusicFooter from "./MusicFooter";
import MusicHeader from "./MusicHeader";
import MusicMy from "./MusicMy";
import MusicPlayList from "./MusicPlayList";

export default function MusicContainer() {
  return (
    <div>
      <MusicHeader />
      <MusicMy
        myImageURL={undefined}
        myTitle="Sufyan Ali"
        mySubTitle="Listen Again"
      />
      <hr />
      <MusicMy
        myImageURL={undefined}
        myTitle="START RADIO FROM A SONG"
        mySubTitle="Quick picks"
      />
      <hr />
      <ul>
        {Array.from({ length: 10 }).map((_, index) => (
          <MusicPlayList key={index} />
        ))}
        <MusicPlayList />
      </ul>
      <MusicFooter />
    </div>
  );
}
