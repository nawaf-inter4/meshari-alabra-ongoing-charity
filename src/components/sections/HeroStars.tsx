"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

/**
 * Decorative stars only — kept client-side so the LCP verse can SSR without
 * hydrating the whole hero tree.
 */
export default function HeroStars() {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;
    const count = coarse ? 4 : 8;
    setStars(
      [...Array(count)].map((_, i) => ({
        id: i,
        x: Math.random() * Math.max(width - 100, 100) + 50,
        y: Math.random() * Math.max(height - 100, 100) + 50,
        delay: i * 0.35,
      })),
    );
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute hero-star"
          style={{
            transform: `translate3d(${star.x}px, ${star.y}px, 0)`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <Star
            size={(star.id % 3) + 1.5}
            className="text-islamic-gold/60 fill-current"
          />
        </div>
      ))}
    </div>
  );
}
