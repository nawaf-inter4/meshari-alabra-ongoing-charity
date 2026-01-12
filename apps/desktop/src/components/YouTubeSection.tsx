export function YouTubeSection() {
  const handleOpenPlaylist = () => {
    window.open('https://www.youtube.com/playlist?list=PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb', '_blank');
  };

  return (
    <div className="youtube-section">
      <h2>YouTube Playlist</h2>
      <p>Watch beautiful Quran recitations and Islamic content</p>
      <button onClick={handleOpenPlaylist} className="playlist-button">
        Open Playlist
      </button>
    </div>
  );
}
