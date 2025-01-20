import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockUser, mockRecommendedTracks, mockRecentTracks } from './MockData';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from "./assets/Home_Icon.png";
import searchIcon from "./assets/Search_Icon.png";
import LibIcon from "./assets/Lib_Icon.png";
import { FaSearch, FaTrash } from "react-icons/fa"; // اضافه کردن آیکن سطل آشغال
import Logo from "./assets/Logo.png";
import Notif from "./assets/notif.png";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const [recentTracks, setRecentTracks] = useState(mockRecentTracks);
  const [recommendedTracks, setRecommendedTracks] = useState(mockRecommendedTracks);
  const [isSearching, setIsSearching] = useState(false);
  const [userSongs, setUserSongs] = useState([
    {
      id: 1,
      title: 'Flying (Live)',
      Artist: 'Anathema',
      songSrc: './assets/Songs/Anathema - Flying (Live).mp3',
      songAvatar: './assets/TrackPhoto-ex.jpg'
    },
    {
      id: 2,
      title: 'burn down my house',
      Artist: 'Architects',
      songSrc: './assets/Songs/Architects - burn down my house.mp3',
      songAvatar: './assets/images/img1.png'
    },
    {
      id: 3,
      title: 'houdini',
      Artist: 'dua_lipa',
      songSrc: './assets/Songs/dua_lipa_-_houdini.mp3',
      songAvatar: './assets/images/img2.jpg'
    },
    {
      id: 4,
      title: 'Marde Tanha',
      Artist: 'Farhad Mehrad',
      songSrc: './assets/Songs/Farhad Mehrad - Marde Tanha (320).mp3',
      songAvatar: './assets/images/img3.jpg'
    },
    {
      id: 5,
      title: 'All In My Mind',
      Artist: 'Isaac Gracie',
      songSrc: './assets/Songs/Isaac Gracie - All In My Mind.mp3',
      songAvatar: './assets/AlbumPhoto-ex.jpg'
    },
    {
      id: 6,
      title: 'Heroin',
      Artist: 'Lana Del Rey',
      songSrc: './assets/Songs/Lana Del Rey - Heroin.mp3',
      songAvatar: './assets/images/img2.jpg'
    },
    {
      id: 7,
      title: 'I`ll Be Waiting',
      Artist: 'Isak Danielson',
      songSrc: './assets/Songs/09 I`ll Be Waiting.mp3',
      songAvatar: './assets/Images/img3.jpg'
    }
  ]);

  useEffect(() => {
    const user = mockUser;
    if (!user.isLoggedIn) {
      navigate("/login");
    } else {
      setUsername(user.username);
    }
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    setIsSearching(query !== "");
  };

  // تابع حذف آهنگ از لیست userSongs
  const deleteUserSong = (index) => {
    setUserSongs((prevSongs) => prevSongs.filter((_, i) => i !== index));
  };

  // تابع حذف آهنگ از لیست recommendedTracks
  const deleteRecommendedTrack = (index) => {
    setRecommendedTracks((prevTracks) => prevTracks.filter((_, i) => i !== index));
  };

  const playSong = (songIndex, songList) => {
    navigate("/MusicPlayer", {
      state: {
        songs: songList,
        currentIndex: songIndex
      }
    });
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <div className="row flex-grow-1">
        <div className="col-3">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              value={query}
              onChange={handleSearchChange}
              placeholder="search my musics"
            />
            <FaSearch className="search-icon" />
          </div>

          {!isSearching && (
            <>
              <div className="recently-section-search">
                <span className="recently-text">Recently</span>
                <hr className="recently-line" />
              </div>
              <div className="search-results">
                {mockRecentTracks.map((track, index) => (
                  <div key={index} className="search-item" onClick={() => playSong(index, mockRecentTracks)}>
                    <img src={track.songAvatar} alt={track.title} className="track-image circle-image" />
                    <div className="search-item-text">
                      <span className="search-item-title">{track.title}</span>
                      <span className="search-item-artist">{track.Artist}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {isSearching && (
            <div className="search-results">
              {mockRecentTracks
                .filter(track =>
                  track.title.toLowerCase().includes(query.toLowerCase()) ||
                  track.Artist.toLowerCase().includes(query.toLowerCase())
                )
                .map((track, index) => (
                  <div key={index} className="search-item" onClick={() => playSong(index, mockRecentTracks)}>
                    <img src={track.songAvatar} alt={track.title} className="track-image" />
                    <div className="search-item-text">
                      <span className="search-item-title">{track.title}</span>
                      <span className="search-item-artist">{track.Artist}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="col-9">
          <div className="header d-flex justify-content-between align-items-center py-2 px-3">
            <img src={Logo} alt="Logo" className="logo" />
            <div className="d-flex align-items-center">
              <Link to="/notifications" className="notification-link">
                <img src={Notif} alt="Notifications" className="notification-icon" />
              </Link>
              <div className="username-circle ms-3">
                <Link to="/profile">
                  <span className="username-letter">{username.charAt(0).toUpperCase()}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="recently-section mt-4">
            <h5 className="section-title">ALL Your Song</h5>
            <div className="recommended-cards">
              {userSongs.map((track, index) => (
                <div key={index} className="card" onClick={() => playSong(index, userSongs)}>
                  <img src={track.songAvatar} alt={track.title} className="card-image" />
                  <div className="card-text-home">
                    <span className="card-title-home">{track.title}</span>
                    <span className="card-artist-home">{track.Artist}</span>
                  </div>
                  {/* آیکن سطل آشغال */}
                  <div className="trash-icon" onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از اجرای onClick کارت
                    deleteUserSong(index);
                  }}>
                    <FaTrash />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/AddNewSong">
              <div className="add-song-button-container">
                <button className="add-song-button">Add new Song</button>
              </div>
            </Link>
          </div>

          <div className="recommended-section mt-4 mb-5">
            <h5 className="section-title">Recommended Tracks</h5>
            <div className="recommended-cards">
              {mockRecommendedTracks.map((track, index) => (
                <div key={index} className="card square-card" onClick={() => playSong(index, mockRecommendedTracks)}>
                  <img src={track.songAvatar} alt={track.title} className="card-image" />
                  <span className="card-title">{track.title}</span>
                  <span className="card-artist">{track.Artist}</span>
                  {/* آیکن سطل آشغال */}
                  <div className="trash-icon" onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از اجرای onClick کارت
                    deleteRecommendedTrack(index);
                  }}>
                    <FaTrash />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <Link to="/home" className={`icon-container`}>
          <img src={HomeIcon} alt="Home" />
          <span>Home</span>
        </Link>
        <Link to="/search" className={`icon-container`}>
          <img src={searchIcon} alt="Search" />
          <span>Search</span>
        </Link>
        <Link to="/library" className={`icon-container`}>
          <img src={LibIcon} alt="Library" />
          <span>Library</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;