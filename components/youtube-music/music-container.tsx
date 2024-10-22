"use client";
import CDPlayer from "../cd-player";
import Button from "../ui/button/Button";
import MusicHistory from "../ui/MusicHistory";
import MusicFooter from "./music-footer";
import MusicHeader from "./music-header";
import MusicMy from "./music-my";
import MusicPlayList from "./music-play-list";

export default function MusicContainer() {
  return (
    <section className="mb-[100px]">
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
