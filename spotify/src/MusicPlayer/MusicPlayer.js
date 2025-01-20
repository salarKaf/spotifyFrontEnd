import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const location = useLocation();
  const { songs, currentIndex } = location.state || { songs: [], currentIndex: 0 };

  // State for current music details
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: songs[currentIndex]?.title || 'No Song',
    songArtist: songs[currentIndex]?.Artist || 'No Artist',
    songSrc: songs[currentIndex]?.songSrc || '',
    songAvatar: songs[currentIndex]?.songAvatar || ''
  });

  const [musicIndex, setMusicIndex] = useState(currentIndex);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicTotalLength, setMusicTotalLength] = useState('00 : 00');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);

  // Ref for audio element
  const currentAudio = useRef(null);

  // Video array
  const vidArray = [
    './assets/video/video1.mp4',
    './assets/video/video2.mp4',
    './assets/video/video3.mp4'
  ];

  // Update music details when musicIndex changes
  useEffect(() => {
    if (songs.length > 0 && musicIndex >= 0 && musicIndex < songs.length) {
      const musicObject = songs[musicIndex];
      setCurrentMusicDetails({
        songName: musicObject.title,
        songArtist: musicObject.Artist,
        songSrc: musicObject.songSrc,
        songAvatar: musicObject.songAvatar
      });

      if (currentAudio.current) {
        currentAudio.current.src = musicObject.songSrc;
        currentAudio.current.load();

        // پخش خودکار آهنگ بعد از لود شدن
        currentAudio.current.addEventListener('canplay', () => {
          currentAudio.current.play()
            .then(() => setIsAudioPlaying(true))
            .catch((error) => console.error("Error playing audio:", error));
        });
      }
    }
  }, [musicIndex, songs]);

  // Handle next song
  const handleNextSong = () => {
    if (songs.length > 1) { // فقط اگر لیست بیشتر از یک آهنگ داشته باشه
      setMusicIndex((prevIndex) => (prevIndex >= songs.length - 1 ? 0 : prevIndex + 1));
    }
  };

  // Handle previous song
  const handlePrevSong = () => {
    if (songs.length > 1) { // فقط اگر لیست بیشتر از یک آهنگ داشته باشه
      setMusicIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
    }
  };

  // Handle audio time update
  const handleAudioUpdate = () => {
    if (currentAudio.current) {
      const { currentTime, duration } = currentAudio.current;

      // Update current time
      const currentMin = Math.floor(currentTime / 60);
      const currentSec = Math.floor(currentTime % 60);
      setMusicCurrentTime(`${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`);

      // Update progress
      const progress = (currentTime / duration) * 100;
      setAudioProgress(isNaN(progress) ? 0 : progress);
    }
  };

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
          onChange={(e) => setAudioProgress(e.target.value)}
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
      </div>
    </div>
  );
};

export default MusicPlayer;