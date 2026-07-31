interface SectionSkeletonProps {
  /** Compact fallback for below-the-fold home sections. */
  compact?: boolean;
  /** Accessible status label (visually hidden). */
  label?: string;
  className?: string;
}

function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-light-accent/80 dark:bg-dark-accent/60 skeleton-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Soft pulse skeleton for route/section loading — no circle spinners.
 */
export default function SectionSkeleton({
  compact = false,
  label = "Loading",
  className = "",
}: SectionSkeletonProps) {
  if (compact) {
    return (
      <div
        className={`mx-auto w-full max-w-6xl px-4 py-10 ${className}`}
        role="status"
        aria-busy="true"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
        <div className="mb-6 flex items-center gap-3">
          <Bone className="h-10 w-10 shrink-0 rounded-full bg-islamic-gold/15 dark:bg-islamic-gold/20" />
          <div className="min-w-0 flex-1 space-y-2">
            <Bone className="h-5 w-2/5 max-w-xs" />
            <Bone className="h-3 w-3/5 max-w-md" />
          </div>
        </div>
        <Bone className="h-40 w-full md:h-48" />
      </div>
    );
  }

  return (
    <div
      className={`mx-auto w-full max-w-6xl px-4 py-16 ${className}`}
      role="status"
      aria-busy="true"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <Bone className="h-12 w-12 rounded-full bg-islamic-gold/15 dark:bg-islamic-gold/20" />
        <Bone className="h-8 w-48 max-w-[70%] sm:w-64" />
        <Bone className="h-4 w-72 max-w-[85%] sm:w-80" />
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Bone className="h-16 w-full" />
        <Bone className="h-16 w-full" />
      </div>
      <Bone className="mb-4 h-72 w-full md:h-96" />
      <div className="space-y-3">
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-[92%]" />
        <Bone className="h-4 w-[78%]" />
      </div>
    </div>
  );
}
