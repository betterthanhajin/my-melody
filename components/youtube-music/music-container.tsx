"use client";
import { useEffect, useState } from "react";
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
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  useEffect(() => {
    // Combine audio and album cover URLs into track objects
    const newTracks = audio.map((audioUrl, index) => ({
      audioUrl,
      coverUrl: albumCover[index] || "/public/images/iu.webp",
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

  // Add this new function to handle playing all tracks
  const playAllTracks = () => {
    if (tracks.length === 0) return;

    const startIndex = 0;
    setCurrentTrackIndex(startIndex);
    playTrack(tracks[startIndex]);
  };

  // Modify the existing playTrack function
  const playTrack = (track: Track) => {
    if (audioElement) {
      audioElement.pause();
    }

    const newAudio = new Audio(track.audioUrl);
    setAudioElement(newAudio);
    setCurrentTrack(track);

    // Add ended event listener to play next track
    newAudio.addEventListener("ended", playNextTrack);

    newAudio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  };

  // Add new function to handle playing next track
  const playNextTrack = () => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < tracks.length) {
      setCurrentTrackIndex(nextIndex);
      playTrack(tracks[nextIndex]);
    } else {
      // Reset when all tracks are finished
      setCurrentTrackIndex(-1);
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", playNextTrack);
        audioElement.pause();
        setCurrentTrackIndex(0);
        setIsPlaying(false);
        setCurrentTrack(null);
        audioElement.src = "";
      }
    };
  }, [audioElement]);

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

      <div className="mb-6">
        <MusicMy
          myImageURL={undefined}
          myTitle="My Melody"
          mySubTitle="Listen Again"
          onPlayAll={playAllTracks}
        />
      </div>
      <div className="space-y-4">
        {tracks.length === 0 && (
          <p className="text-center text-sm text-zinc-400">
            No recordings available
          </p>
        )}
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
              <h3 className="text-sm font-medium">My Melody {index + 1}</h3>
              <p className="text-zinc-400 text-sm">My Melody</p>
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
