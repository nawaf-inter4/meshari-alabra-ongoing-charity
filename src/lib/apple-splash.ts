/**
 * iOS apple-touch-startup-image definitions.
 *
 * Apple matches these by device-width / device-height / pixel-ratio media queries.
 * Physical PNGs live in /public/splash/ — regenerate with:
 *   node scripts/generate-apple-splash.mjs
 *
 * Portrait-only: this memorial PWA locks orientation to portrait-primary.
 */
export interface AppleSplashImage {
  href: string;
  /** Physical pixel width of the PNG */
  width: number;
  /** Physical pixel height of the PNG */
  height: number;
  /** CSS device-width in px */
  deviceWidth: number;
  /** CSS device-height in px */
  deviceHeight: number;
  /** -webkit-device-pixel-ratio */
  pixelRatio: number;
}

export const APPLE_SPLASH_IMAGES: readonly AppleSplashImage[] = [
  { href: "/splash/apple-splash-1290x2796.png", width: 1290, height: 2796, deviceWidth: 430, deviceHeight: 932, pixelRatio: 3 },
  { href: "/splash/apple-splash-1179x2556.png", width: 1179, height: 2556, deviceWidth: 393, deviceHeight: 852, pixelRatio: 3 },
  { href: "/splash/apple-splash-1284x2778.png", width: 1284, height: 2778, deviceWidth: 428, deviceHeight: 926, pixelRatio: 3 },
  { href: "/splash/apple-splash-1170x2532.png", width: 1170, height: 2532, deviceWidth: 390, deviceHeight: 844, pixelRatio: 3 },
  { href: "/splash/apple-splash-1125x2436.png", width: 1125, height: 2436, deviceWidth: 375, deviceHeight: 812, pixelRatio: 3 },
  { href: "/splash/apple-splash-1242x2688.png", width: 1242, height: 2688, deviceWidth: 414, deviceHeight: 896, pixelRatio: 3 },
  { href: "/splash/apple-splash-828x1792.png", width: 828, height: 1792, deviceWidth: 414, deviceHeight: 896, pixelRatio: 2 },
  { href: "/splash/apple-splash-750x1334.png", width: 750, height: 1334, deviceWidth: 375, deviceHeight: 667, pixelRatio: 2 },
  { href: "/splash/apple-splash-1242x2208.png", width: 1242, height: 2208, deviceWidth: 414, deviceHeight: 736, pixelRatio: 3 },
  { href: "/splash/apple-splash-2048x2732.png", width: 2048, height: 2732, deviceWidth: 1024, deviceHeight: 1366, pixelRatio: 2 },
] as const;

export function appleSplashMedia(image: AppleSplashImage): string {
  return [
    `(device-width: ${image.deviceWidth}px)`,
    `(device-height: ${image.deviceHeight}px)`,
    `(-webkit-device-pixel-ratio: ${image.pixelRatio})`,
    `(orientation: portrait)`,
  ].join(" and ");
}
