/**
 * Cross-component media coordination.
 * Quran ayah playback and YouTube should pause the floating memorial AudioPlayer.
 */

export const MEMORIAL_AUDIO_PAUSE_EVENT = "memorial-audio:pause";
export const EXTERNAL_MEDIA_PLAY_EVENT = "external-media:play";

export type ExternalMediaSource = "quran" | "youtube" | "other";

export function pauseMemorialAudio(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(MEMORIAL_AUDIO_PAUSE_EVENT));
}

export function notifyExternalMediaPlay(source: ExternalMediaSource = "other"): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(EXTERNAL_MEDIA_PLAY_EVENT, { detail: { source } }),
  );
  pauseMemorialAudio();
}
