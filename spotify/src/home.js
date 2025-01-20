import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockRecommendedTracks, mockRecentTracks } from './MockData';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from "./assets/Home_Icon.png";
import searchIcon from "./assets/Search_Icon.png";
import LibIcon from "./assets/Lib_Icon.png";
import { FaSearch, FaTrash } from "react-icons/fa"; // اضافه کردن آیکن سطل آشغال
import Logo from "./assets/Logo.png";
import { apiClient, getHomeSongs, getSearchSongs, validateUser } from "./API/userAPIservice";
import { FaHeart } from "react-icons/fa"; // اضافه کردن آیکن قلب

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(mockRecentTracks);
  const [userSongs, setUserSongs] = useState([]);

  // دریافت لیست علاقه‌مندی‌ها از localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("N/A");
  const [phone, setPhone] = useState("N/A");

  useEffect(() => {
    let token = localStorage.getItem('token');

    if (!token) {
      navigate("/login");
    }

    (async () => {
      let result = await validateUser(token);

      if (result.success) {
        setUsername(result.data.username);
        setEmail(result.data.email ?? "N/A");
        setPhone(result.data.phoneNumber);
      } else {
        console.log("Failed to validate user");
        localStorage.removeItem("token");
        navigate("/login");
      }

      let songsRes = await getHomeSongs(token);

      if (songsRes.success) {
        let songs = songsRes.data.map((song) => {
          return {
            id: song.id,
            title: song.name,
            Artist: `user ${song.artistId}`,
            songSrc: `${apiClient.baseURL}/Media/files/stream/${song.musicKey}`,
            songAvatar: `${apiClient.baseURL}/Media/files/image/${song.imageKey}`,
            isLiked: song.isLiked
          };
        });

        setUserSongs(songs);
      }

      let allSongs = await getSearchSongs(token, undefined);

      if (allSongs.success) {
        setSearchResults(allSongs.data.map((song) => {
          return {
            id: song.id,
            title: song.name,
            Artist: `user ${song.artistId}`,
            songSrc: `${apiClient.baseURL}/Media/files/stream/${song.musicKey}`,
            songAvatar: `${apiClient.baseURL}/Media/files/image/${song.imageKey}`,
            isLiked: song.isLiked
          };
        }));
      }
    })();
  }, [navigate]);

  let usernameTag = (<></>);

  if (username == "" || username == null) {
    usernameTag = (<Link to="/setpassword" className="btn btn-primary">Set Username Password</Link>);
  } else {
    usernameTag = (<h3>username: {username}</h3>);
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    setIsSearching(query !== "");
  };


  const playSong = (songId, songList) => {
    navigate("/MusicPlayer", {
      state: {
        songs: songList,
        currentSongId: songId // ارسال id آهنگ به جای index
      }
    });
  };

  const deleteRecommendedTrack = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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

          {isSearching && (
            <div className="search-results">
              {searchResults
                .filter(track =>
                  track.title.toLowerCase().includes(query.toLowerCase()) ||
                  track.Artist.toLowerCase().includes(query.toLowerCase())
                )
                .map((track) => (
                  <div key={track.id} className="search-item" onClick={() => playSong(track.id, searchResults)}>
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
              <div className="notification-link">
                <button onClick={handleLogout} className="btn btn-logout">Log Out</button>
              </div>
              <div className="username-circle ms-3">
                <span className="username-letter">{username.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="recently-section mt-4">
            <h5 className="section-title">ALL Your Song</h5>
            <div className="recommended-cards">
              {userSongs.map((track, index) => (
                <div key={track.id} className="card" onClick={() => playSong(track.id, userSongs)}>
                  <img src={track.songAvatar} alt={track.title} className="card-image" />
                  <div className="card-text-home">
                    <span className="card-title-home">{track.title}</span>
                    <span className="card-artist-home">{track.Artist}</span>
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

          {/* بخش علاقه‌مندی‌ها */}
          <div className="recently-section mt-4">
            <h5 className="section-title">Favorites</h5>
            <div className="recommended-cards">
              {favorites.map((track, index) => (
                <div key={track.id} className="card" onClick={() => playSong(track.id, favorites)}>
                  <img src={track.songAvatar} alt={track.title} className="card-image" />
                  <div className="card-text-home">
                    <span className="card-title-home">{track.title}</span>
                    <span className="card-artist-home">{track.Artist}</span>
                  </div>
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
    </div>
  );
};

export default Home;