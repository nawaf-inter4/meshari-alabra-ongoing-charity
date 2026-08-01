"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { notifyExternalMediaPlay } from "@/lib/media-coordination";

interface NativeYouTubeIframeProps {
  src: string;
  title: string;
  className?: string;
  iframeClassName?: string;
}

function withJsApi(src: string): string {
  try {
    const url = new URL(src, "https://www.youtube.com");
    if (!url.searchParams.has("enablejsapi")) {
      url.searchParams.set("enablejsapi", "1");
    }
    // YouTube rejects enablejsapi origin on plain HTTP localhost — omit there.
    if (
      typeof window !== "undefined" &&
      !url.searchParams.has("origin") &&
      window.location.protocol === "https:"
    ) {
      url.searchParams.set("origin", window.location.origin);
    }
    return url.toString();
  } catch {
    const joiner = src.includes("?") ? "&" : "?";
    return `${src}${joiner}enablejsapi=1`;
  }
}

export default function NativeYouTubeIframe({
  src,
  title,
  className = "absolute inset-0 h-full w-full",
  iframeClassName = "h-full w-full",
}: NativeYouTubeIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [embedSrc, setEmbedSrc] = useState(src);

  useEffect(() => {
    setEmbedSrc(withJsApi(src));
  }, [src]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setShouldLoad(true);
      observer.disconnect();
      window.removeEventListener("scroll", revealIfNear);
      window.removeEventListener("resize", revealIfNear);
    };
    const revealIfNear = () => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top <= window.innerHeight + 300 && bounds.bottom >= -300) reveal();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(element);
    window.addEventListener("scroll", revealIfNear, { passive: true });
    window.addEventListener("resize", revealIfNear, { passive: true });
    requestAnimationFrame(revealIfNear);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfNear);
      window.removeEventListener("resize", revealIfNear);
    };
  }, []);

  // YouTube posts player state over postMessage when enablejsapi=1.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        typeof event.origin !== "string" ||
        (!event.origin.endsWith("youtube.com") && !event.origin.endsWith("youtube-nocookie.com"))
      ) {
        return;
      }

      let data: unknown = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== "object") return;

      const payload = data as { event?: string; info?: number | { playerState?: number } };
      // YT.PlayerState.PLAYING === 1
      const state =
        typeof payload.info === "number"
          ? payload.info
          : typeof payload.info === "object" && payload.info
            ? payload.info.playerState
            : undefined;

      if (payload.event === "onStateChange" && state === 1) {
        notifyExternalMediaPlay("youtube");
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const onIframeLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
    const frame = event.currentTarget;
    // Handshake so YT posts onStateChange to this origin.
    try {
      frame.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: frame.id || "yt-player" }),
        "*",
      );
    } catch {
      // Cross-origin handshake is best-effort.
    }
  };

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          className={iframeClassName}
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={onIframeLoad}
        />
      ) : null}
    </div>
  );
}
