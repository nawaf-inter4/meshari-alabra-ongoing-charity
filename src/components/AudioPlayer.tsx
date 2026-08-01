"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Browsers permit muted autoplay. Restore the memorial ambience immediately,
  // then unmute as before; if autoplay is blocked, start on the first gesture.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let unmuteTimer: ReturnType<typeof setTimeout> | undefined;
    const startAfterGesture = () => {
      audio.muted = false;
      void audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => undefined);
      document.removeEventListener("pointerdown", startAfterGesture);
      document.removeEventListener("keydown", startAfterGesture);
    };

    audio.muted = true;
    setIsMuted(true);
    void audio.play().then(() => {
      setIsPlaying(true);
      unmuteTimer = setTimeout(() => {
        audio.muted = false;
        setIsMuted(false);
      }, 2000);
    }).catch(() => {
      document.addEventListener("pointerdown", startAfterGesture, { once: true });
      document.addEventListener("keydown", startAfterGesture, { once: true });
    });

    return () => {
      if (unmuteTimer) clearTimeout(unmuteTimer);
      document.removeEventListener("pointerdown", startAfterGesture);
      document.removeEventListener("keydown", startAfterGesture);
    };
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
    <div className="safe-fixed-bottom-right fixed z-50" data-audio-controls>
      <div className="bg-white/95 dark:bg-gray-800/95 rounded-full p-3 shadow-lg border border-islamic-gold/20">
        <div className="flex items-center gap-3">
          <audio
            ref={audioRef}
            loop
            preload="metadata"
            autoPlay
            muted
            className="hidden"
          >
            <source src="/audio-webiste.mp3" type="audio/mpeg" />
          </audio>

          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause background audio" : "Play background audio"}
            className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-colors duration-300"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-islamic-gold" />
            ) : (
              <Play className="w-5 h-5 text-islamic-gold" />
            )}
          </button>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
            className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-colors duration-300"
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