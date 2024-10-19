"use client";
import CDPlayer from "../CDPlayer";
import Button from "../ui/button/Button";
import MusicHistory from "../ui/MusicHistory";
import MusicFooter from "./MusicFooter";
import MusicHeader from "./MusicHeader";
import MusicMy from "./MusicMy";
import MusicPlayList from "./MusicPlayList";

export default function MusicContainer() {
  return (
    <section>
      <MusicHistory />
      <div className="flex items-center">
        <MusicMy
          myImageURL={undefined}
          myTitle="Sufyan Ali"
          mySubTitle="Listen Again"
        />
        <Button />
      </div>
      <hr />
      <ul>
        {Array.from({ length: 10 }).map((_, index) => (
          <MusicPlayList key={index} />
        ))}
        <MusicPlayList />
      </ul>
    </section>
  );
}
