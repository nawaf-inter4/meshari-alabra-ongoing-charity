"use client";

import dynamic from "next/dynamic";

const YouTubePlaylist = dynamic(() => import("@/components/sections/YouTubePlaylist"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div>
    </div>
  ),
  ssr: false,
});

export default function YouTubeSectionWrapper() {
  return <YouTubePlaylist playlistId="PL5YnzBdhLdkXy12BLR-2mjj9qrPg4QL-N" />;
}

