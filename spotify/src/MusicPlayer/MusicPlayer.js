import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate
import "./MusicPlayer.css";
import { likeMusic, unlikeMusic } from '../API/userAPIservice';

const MusicPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { songs, currentSongId } = location.state || { songs: [], currentSongId: null };

  const currentSongIndex = songs.findIndex(song => song.id === currentSongId);
  const [musicIndex, setMusicIndex] = useState(currentSongIndex >= 0 ? currentSongIndex : 0);

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songId: songs[musicIndex]?.id || 0,
    songName: songs[musicIndex]?.title || 'No Song',
    songArtist: songs[musicIndex]?.Artist || 'No Artist',
    songSrc: songs[musicIndex]?.songSrc || '',
    songAvatar: songs[musicIndex]?.songAvatar || '',
    songIsLiked: songs[musicIndex]?.isLiked || false
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicTotalLength, setMusicTotalLength] = useState('00 : 00');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const currentAudio = useRef(null);

  const vidArray = [
    './assets/video/video1.mp4',
    './assets/video/video2.mp4',
    './assets/video/video3.mp4'
  ];

  useEffect(() => {
    if (songs.length > 0 && musicIndex >= 0 && musicIndex < songs.length) {
      const musicObject = songs[musicIndex];
      setCurrentMusicDetails({
        songId: musicObject.id,
        songName: musicObject.title,
        songArtist: musicObject.Artist,
        songSrc: musicObject.songSrc,
        songAvatar: musicObject.songAvatar,
        songIsLiked: musicObject.isLiked
      });

      if (currentAudio.current) {
        currentAudio.current.src = musicObject.songSrc;
        currentAudio.current.load();

        currentAudio.current.addEventListener('canplay', () => {
          currentAudio.current.play()
            .then(() => setIsAudioPlaying(true))
            .catch((error) => console.error("Error playing audio:", error));
        });

        currentAudio.current.addEventListener('loadedmetadata', () => {
          const duration = currentAudio.current.duration;
          const totalMin = Math.floor(duration / 60);
          const totalSec = Math.floor(duration % 60);
          setMusicTotalLength(`${totalMin < 10 ? `0${totalMin}` : totalMin} : ${totalSec < 10 ? `0${totalSec}` : totalSec}`);
        });
      }
    }
  }, [musicIndex, songs]);

  const handleNextSong = () => {
    if (songs.length > 1) {
      setMusicIndex((prevIndex) => (prevIndex >= songs.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handlePrevSong = () => {
    if (songs.length > 1) {
      setMusicIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
    }
  };

  const handleAudioUpdate = () => {
    if (currentAudio.current) {
      const { currentTime, duration } = currentAudio.current;

      const currentMin = Math.floor(currentTime / 60);
      const currentSec = Math.floor(currentTime % 60);
      setMusicCurrentTime(`${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`);

      const progress = (currentTime / duration) * 100;
      setAudioProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setAudioProgress(newProgress);

    if (currentAudio.current) {
      const newTime = (newProgress / 100) * currentAudio.current.duration;
      currentAudio.current.currentTime = newTime;
    }
  };

  const toggleFavorite = () => {
    const currentSong = songs[musicIndex];
    const isFavorite = favorites.some(fav => fav.songSrc === currentSong.songSrc);
    let token = localStorage.getItem('token');

    if (!token) {
      alert('You need to login to like a song');
      return;
    }

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.songSrc !== currentSong.songSrc);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      unlikeMusic(token, currentMusicDetails.songId);
    } else {
      const updatedFavorites = [...favorites, currentSong];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      likeMusic(token, currentMusicDetails.songId);
    }
  };

  const isCurrentSongFavorite = favorites.some(fav => fav.songSrc === currentMusicDetails.songSrc);

  return (
    <div className="container">
      <audio
        ref={currentAudio}
        src={currentMusicDetails.songSrc}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className="backgroundVideo"></video>
      <div className="blackScreen"></div>

      <button
        onClick={() => navigate('/')} 
        style={{
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          padding: '10px 20px',
          backgroundColor: '#c8acd6',
          color: '#17153b',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 1000 
        }}
      >
        Home
      </button>
      <div className="music-Container">
        <p className="musicPlayer">Music Player</p>
        <p className="music-Head-Name">{currentMusicDetails.songName}</p>
        <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
        <img
          src={currentMusicDetails.songAvatar}
          className="objectFitCover"
          alt="song Avatar"
          id="songAvatar"
        />
        <div className="musicTimerDiv">
          <p className="musicCurrentTime">{musicCurrentTime}</p>
          <p className="musicTotalLenght">{musicTotalLength}</p>
        </div>
        <input
          type="range"
          name="musicProgressBar"
          className="musicProgressBar"
          value={audioProgress}
          onChange={handleProgressChange}
        />
        <div className="musicControlers">
          <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
          <i
            className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`}
            onClick={() => {
              if (currentAudio.current.paused) {
                currentAudio.current.play();
                setIsAudioPlaying(true);
              } else {
                currentAudio.current.pause();
                setIsAudioPlaying(false);
              }
            }}
          ></i>
          <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
        </div>
        <i
          className={`fa-heart ${isCurrentSongFavorite ? 'fa-solid' : 'fa-regular'} favoriteIcon`}
          onClick={toggleFavorite}
          style={{ cursor: 'pointer', color: isCurrentSongFavorite ? 'red' : 'white' }}
        ></i>
      </div>
    </div>
  );
};

export default MusicPlayer;