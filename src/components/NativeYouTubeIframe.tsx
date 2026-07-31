"use client";

import { useEffect, useRef, useState } from "react";

interface NativeYouTubeIframeProps {
  src: string;
  title: string;
  className?: string;
  iframeClassName?: string;
}

export default function NativeYouTubeIframe({
  src,
  title,
  className = "absolute inset-0 h-full w-full",
  iframeClassName = "h-full w-full",
}: NativeYouTubeIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

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

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          className={iframeClassName}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  );
}
