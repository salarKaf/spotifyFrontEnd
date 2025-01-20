import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = useParams(); // اگر از پارامترهای مسیر استفاده می‌کنید

  useEffect(() => {
    // فرض کنید داده‌ها از طریق API دریافت می‌شوند
    fetch(`/api/playlists/${playlistId}`)
      .then((response) => response.json())
      .then((data) => setPlaylist(data))
      .catch((error) => console.error('Error fetching playlist:', error));
  }, [playlistId]);

  if (!playlist) {
    return <div>Loading...</div>; // نمایش پیام در حال بارگذاری
  }

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <h1>{playlist.name}</h1>
        <p>{playlist.description}</p>
        <p>Created by username: {playlist.createdBy}</p>
      </div>

      <div className="playlist-content">
        {playlist.sections.map((section, index) => (
          <SongList key={index} section={section} />
        ))}
      </div>

      <div className="playlist-footer">
        <p>Page</p>
        <ul>
          <li>15 EEE</li>
          <li>Local variables</li>
          <li>Local styles</li>
          <li>Color styles</li>
          <li>main</li>
          <li>secondary</li>
          <li>used</li>
          <li>fourth</li>
          <li>manifest</li>
        </ul>
      </div>
    </div>
  );
};

export default Playlist;