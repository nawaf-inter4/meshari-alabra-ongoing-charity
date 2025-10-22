"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Autoplay on page load
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Simple autoplay
    audio.muted = true;
    audio.play().then(() => {
      setIsPlaying(true);
      setTimeout(() => {
        audio.muted = false;
        setIsMuted(false);
      }, 2000);
    }).catch(() => {
      // If blocked, wait for user click
      const handleClick = () => {
        audio.muted = false;
        audio.play();
        setIsPlaying(true);
        setIsMuted(false);
        document.removeEventListener('click', handleClick);
      };
      document.addEventListener('click', handleClick);
    });
  }, []);

  // Stop audio when YouTube plays
  useEffect(() => {
    const handleVideoPlay = (event: Event) => {
      const target = event.target as HTMLElement;
      // Only handle if it's a video element and not our audio
      if (target && target !== audioRef.current && target.tagName === 'VIDEO') {
        const audio = audioRef.current;
        if (audio && !audio.paused) {
          audio.pause();
          setIsPlaying(false);
        }
      }
    };

    const handleVideoPause = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target !== audioRef.current && target.tagName === 'VIDEO') {
        const audio = audioRef.current;
        if (audio && audio.paused) {
          audio.play();
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('pause', handleVideoPause, true);

    return () => {
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('pause', handleVideoPause, true);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-islamic-gold/20">
        <div className="flex items-center gap-3">
          <audio
            ref={audioRef}
            loop
            preload="auto"
            autoPlay
            muted
            className="hidden"
          >
            <source src="/audio-webiste.mp3" type="audio/mpeg" />
          </audio>

          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-islamic-gold" />
            ) : (
              <Play className="w-5 h-5 text-islamic-gold" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-islamic-gold" />
            ) : (
              <Volume2 className="w-5 h-5 text-islamic-gold" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}