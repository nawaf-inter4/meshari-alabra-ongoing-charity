import { APPLE_SPLASH_IMAGES, appleSplashMedia } from "@/lib/apple-splash";

/**
 * Renders apple-touch-startup-image links for iOS Safari / installed PWAs.
 * Must live in <head>; blank white/black launch screens appear without these.
 */
export default function AppleSplashLinks() {
  return (
    <>
      {APPLE_SPLASH_IMAGES.map((image) => (
        <link
          key={image.href}
          rel="apple-touch-startup-image"
          href={image.href}
          media={appleSplashMedia(image)}
        />
      ))}
    </>
  );
}
