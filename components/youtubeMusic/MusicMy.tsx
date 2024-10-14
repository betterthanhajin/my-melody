import Image from "next/image";
import test from "@/public/images/test1.png";

export default function MusicMy() {
  return (
    <section className="w-full h-[52px] flex justify-between gap-8">
      <div className="flex gap-4">
        <div>
          <Image
            src={test}
            alt="Spotify"
            className="rounded-[100%] object-cover"
            width={60}
            height={60}
          />
        </div>
        <div>
          <h3 className="font-extralight">START RADIO FROM A SONG</h3>
          <p className="font-extrabold">Quick picks</p>
        </div>
      </div>
      <div>
        <span className="whitespace-nowrap">Play all</span>
      </div>
    </section>
  );
}
