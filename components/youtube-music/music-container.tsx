import { useEffect, useState } from "react";
import CDPlayer from "../cd-player";
import Button from "../ui/button/Button";
import MusicHistory from "../ui/MusicHistory";
import MusicFooter from "./music-footer";
import MusicHeader from "./music-header";
import MusicMy from "./music-my";
import { Play, Pause } from "lucide-react";

interface Track {
  audioUrl: string;
  coverUrl: string;
}

export default function MusicContainer({
  audio,
  albumCover,
}: {
  audio: string[];
  albumCover: string[];
}) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    // Combine audio and album cover URLs into track objects
    const newTracks = audio.map((audioUrl, index) => ({
      audioUrl,
      coverUrl: albumCover[index] || "/default-cover.jpg",
    }));

    setTracks(newTracks);
  }, [audio, albumCover]);

  useEffect(() => {
    // Cleanup audio element on unmount
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const playTrack = (track: Track) => {
    if (audioElement) {
      audioElement.pause();
    }

    const newAudio = new Audio(track.audioUrl);
    setAudioElement(newAudio);
    setCurrentTrack(track);

    newAudio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  };

  const togglePlayPause = () => {
    if (!audioElement || !currentTrack) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="mb-[100px] p-4 text-white">
      <MusicHeader />
      <MusicHistory />

      <div className="flex items-center mb-6">
        <MusicMy
          myImageURL={undefined}
          myTitle="My Recordings"
          mySubTitle="Listen Again"
        />
      </div>

      <div className="space-y-4">
        {tracks.map((track, index) => (
          <div
            key={track.audioUrl}
            className="flex items-center space-x-4 p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <img
              src={track.coverUrl}
              alt="Album cover"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Recording {index + 1}</h3>
              <p className="text-zinc-400 text-sm">Voice Recording</p>
            </div>
            <button
              onClick={() =>
                currentTrack?.audioUrl === track.audioUrl
                  ? togglePlayPause()
                  : playTrack(track)
              }
              className="p-2 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors"
            >
              {currentTrack?.audioUrl === track.audioUrl && isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} />
              )}
            </button>
          </div>
        ))}
      </div>

      <MusicFooter />
    </section>
  );
}
