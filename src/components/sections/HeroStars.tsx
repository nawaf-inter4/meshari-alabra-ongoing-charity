/**
 * Decorative stars — pure CSS, no client JS / lucide on the LCP path.
 * Positions live in globals.css (`.hero-star-dot:nth-child`) for CSP-friendly markup.
 */
export default function HeroStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
      <span className="hero-star-dot" />
    </div>
  );
}
