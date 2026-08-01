/**
 * Cross-component media coordination.
 * Quran ayah playback and YouTube should pause the floating memorial AudioPlayer.
 */

export const MEMORIAL_AUDIO_PAUSE_EVENT = "memorial-audio:pause";
export const EXTERNAL_MEDIA_PLAY_EVENT = "external-media:play";

export type ExternalMediaSource = "quran" | "youtube" | "other";

/** Set when Quran/YouTube (etc.) is active so a late-mounted AudioPlayer does not autoplay. */
let externalMediaActive = false;

export function isExternalMediaActive(): boolean {
  return externalMediaActive;
}

export function pauseMemorialAudio(): void {
  if (typeof window === "undefined") return;
  externalMediaActive = true;
  window.dispatchEvent(new CustomEvent(MEMORIAL_AUDIO_PAUSE_EVENT));
}

export function notifyExternalMediaPlay(source: ExternalMediaSource = "other"): void {
  if (typeof window === "undefined") return;
  externalMediaActive = true;
  window.dispatchEvent(
    new CustomEvent(EXTERNAL_MEDIA_PLAY_EVENT, { detail: { source } }),
  );
  window.dispatchEvent(new CustomEvent(MEMORIAL_AUDIO_PAUSE_EVENT));
}

/** Call when the user explicitly resumes the floating memorial player. */
export function clearExternalMediaActive(): void {
  externalMediaActive = false;
}
