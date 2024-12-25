"use client";
import { useEffect, useState } from "react";
import MusicHistory from "../ui/MusicHistory";
import MusicFooter from "./music-footer";
import MusicHeader from "./music-header";
import MusicMy from "./music-my";
import { Play, Pause, Download } from "lucide-react";
import IU from "@/public/images/iu.webp";

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
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  useEffect(() => {
    const newTracks = audio.map((audioUrl, index) => ({
      audioUrl,
      coverUrl: albumCover[index] ? albumCover[index] : `${IU}`,
    }));

    setTracks(newTracks);
  }, [audio, albumCover]);

  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `my-melody-cover-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  const playAllTracks = () => {
    if (tracks.length === 0) return;

    const startIndex = 0;
    setCurrentTrackIndex(startIndex);
    playTrack(tracks[startIndex], startIndex);
  };

  const playNextTrack = () => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < tracks.length) {
      playTrack(tracks[nextIndex], nextIndex);
    } else {
      // Reset when the last track ends
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setCurrentTrackIndex(-1);
      setCurrentTrack(null);
    }
  };

  const playTrack = (track: Track, index: number) => {
    if (currentTrackIndex === index && audioElement) {
      if (!audioElement.paused) {
        audioElement.pause();
        setCurrentTrackIndex(-1);
        setCurrentTrack(null);
        return;
      }
      audioElement.play();
      setCurrentTrackIndex(index);
      setCurrentTrack(track);
      return;
    }

    // Clean up previous audio
    if (audioElement) {
      audioElement.pause();
      audioElement.removeEventListener("ended", playNextTrack);
    }

    // Create new audio element
    const newAudio = new Audio(track.audioUrl);
    newAudio.addEventListener("ended", playNextTrack);

    setAudioElement(newAudio);
    setCurrentTrack(track);
    setCurrentTrackIndex(index);

    // Start playing
    newAudio.play();
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", playNextTrack);
        audioElement.pause();
        setCurrentTrack(null);
      }
    };
  }, [audioElement]);

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
              src={track.coverUrl ? track.coverUrl : `${IU}`}
              alt="Album cover"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-grow">
              <h3 className="text-sm font-medium">My Melody {index + 1}</h3>
              <p className="text-zinc-400 text-sm">My Melody</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => downloadImage(track.coverUrl, index)}
                className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors"
                title="Download album cover"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => playTrack(track, index)}
                className="p-2 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors"
              >
                {currentTrackIndex === index ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <MusicFooter />
    </section>
  );
}
