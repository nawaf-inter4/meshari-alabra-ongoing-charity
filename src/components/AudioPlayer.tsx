"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import {
  clearExternalMediaActive,
  EXTERNAL_MEDIA_PLAY_EVENT,
  isExternalMediaActive,
  MEMORIAL_AUDIO_PAUSE_EVENT,
} from "@/lib/media-coordination";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const suppressedRef = useRef(false);

  const pauseMemorial = () => {
    suppressedRef.current = true;
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying(false);
      return;
    }
    audio.pause();
    setIsPlaying(false);
  };

  // Pause when Quran / YouTube (or any other page media) plays.
  useEffect(() => {
    const onPauseEvent = () => pauseMemorial();

    const onMediaPlay = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLMediaElement)) return;
      if (target === audioRef.current) return;
      // Other <audio> (Quran) or <video> on the page.
      notifyAndPause();
    };

    const notifyAndPause = () => {
      suppressedRef.current = true;
      pauseMemorial();
    };

    window.addEventListener(MEMORIAL_AUDIO_PAUSE_EVENT, onPauseEvent);
    window.addEventListener(EXTERNAL_MEDIA_PLAY_EVENT, onPauseEvent);
    document.addEventListener("play", onMediaPlay, true);

    return () => {
      window.removeEventListener(MEMORIAL_AUDIO_PAUSE_EVENT, onPauseEvent);
      window.removeEventListener(EXTERNAL_MEDIA_PLAY_EVENT, onPauseEvent);
      document.removeEventListener("play", onMediaPlay, true);
    };
  }, []);

  // Autoplay only if nothing else already claimed audio focus.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isExternalMediaActive() || suppressedRef.current) {
      setIsPlaying(false);
      return;
    }

    let unmuteTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const startAfterGesture = () => {
      if (cancelled || suppressedRef.current || isExternalMediaActive()) return;
      audio.muted = false;
      void audio.play().then(() => {
        if (cancelled || suppressedRef.current || isExternalMediaActive()) {
          audio.pause();
          setIsPlaying(false);
          return;
        }
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => undefined);
      document.removeEventListener("pointerdown", startAfterGesture);
      document.removeEventListener("keydown", startAfterGesture);
    };

    audio.muted = true;
    setIsMuted(true);
    void audio.play().then(() => {
      if (cancelled || suppressedRef.current || isExternalMediaActive()) {
        audio.pause();
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
      unmuteTimer = setTimeout(() => {
        if (cancelled || suppressedRef.current || isExternalMediaActive()) {
          audio.pause();
          setIsPlaying(false);
          return;
        }
        audio.muted = false;
        setIsMuted(false);
      }, 2000);
    }).catch(() => {
      document.addEventListener("pointerdown", startAfterGesture, { once: true });
      document.addEventListener("keydown", startAfterGesture, { once: true });
    });

    return () => {
      cancelled = true;
      if (unmuteTimer) clearTimeout(unmuteTimer);
      document.removeEventListener("pointerdown", startAfterGesture);
      document.removeEventListener("keydown", startAfterGesture);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying || !audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    clearExternalMediaActive();
    suppressedRef.current = false;
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
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
            preload="none"
            muted
            className="hidden"
          >
            <source src="/audio-webiste.mp3" type="audio/mpeg" />
          </audio>

          <button
            type="button"
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
            type="button"
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
