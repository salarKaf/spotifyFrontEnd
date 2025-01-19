// import React, { useState } from "react";
// import { Link, useNavigate, } from "react-router-dom";
// import { useEffect } from "react";
// import { validateUser } from "./API/userAPIservice";

// const Home = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("N/A");
//     const [phone, setPhone] = useState("N/A");

//     useEffect(() => {
//         let token = localStorage.getItem('token')

//         if (!token) {
//             navigate("/login");
//         }

//         (async () => {
//             let result = await validateUser(token);

//             if (result.success) {
//                 setUsername(result.data.username);
//                 setEmail(result.data.email ?? "N/A");
//                 setPhone(result.data.phoneNumber);
//             } else {
//                 console.log("Failed to validate user");
//                 navigate("/login");
//             }
//         })()
//     }, [navigate]);

//     let usernameTag = (<></>)

//     if (username == "" || username == null) {
//         usernameTag = (<Link to="/setpassword" className="btn btn-primary">Set Username Password</Link>)
//     } else {
//         usernameTag = (<h3>username: {username}</h3>)
//     }

//     return (
//         <div>
//             <h1>Login was successful</h1>
//             <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
//             <br></br>
//             <h1>user details</h1>
//             <h3>phone: {phone}</h3>
//             {usernameTag}
//             <h3>email: {email}</h3>

//         </div>
//     );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add Link here
import { mockUser, mockRecentTracks, mockRecommendedAlbums, mockRecommendedTracks, mockRecentSearches } from './MockData'; // وارد کردن داده‌های mock
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from "./assets/Home_Icon.png";
import searchIcon from "./assets/Search_Icon.png";
import LibIcon from "./assets/Lib_Icon.png";
import { FaSearch } from "react-icons/fa"; // برای آیکن جستجو
import Logo from "./assets/Logo.png";
import Notif from "./assets/notif.png";

const Home = () => {
  const navigate = useNavigate(); // Define navigate here
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState(""); // State برای ذخیره کردن عبارت جستجو
  const [recentTracks, setRecentTracks] = useState(mockRecentTracks);  // استفاده از داده‌های mock
  const [recommendedAlbums, setRecommendedAlbums] = useState(mockRecommendedAlbums);  // استفاده از داده‌های mock
  const [recommendedTracks, setRecommendedTracks] = useState(mockRecommendedTracks);  // استفاده از داده‌های mock
  const [recentSearches, setRecentSearches] = useState(mockRecentSearches);  // اضافه کردن جستجوهای اخیر
  const [isSearching, setIsSearching] = useState(false);  // State برای بررسی اینکه آیا جستجو فعال است یا نه

  useEffect(() => {
    // استفاده از Mock Data برای اطلاعات کاربر
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
    setIsSearching(query !== ""); // اگر چیزی تایپ شد جستجو فعال میشه
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

          {/* نمایش جستجوهای اخیر اگر کاربر هنوز چیزی تایپ نکرده باشد */}
          {!isSearching && (
            <>
              <div className="recently-section-search">
                <span className="recently-text">Recently</span>
                <hr className="recently-line" />
              </div>
              <div className="search-results">
                {recentSearches.map((track) => (
                  <div key={track.id} className="search-item">
                    <img src={track.image} alt={track.title} className="track-image circle-image" />
                    <div className="search-item-text">
                      <span className="search-item-title">{track.title}</span>
                      <span className="search-item-artist">{track.Artist}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* نتایج جستجو به محض تایپ کردن */}
          {isSearching && (
            <div className="search-results">
              {recentSearches
                .filter(track =>
                  track.title.toLowerCase().includes(query.toLowerCase()) ||
                  track.Artist.toLowerCase().includes(query.toLowerCase())
                )
                .map((track) => (
                  <div key={track.id} className="search-item">
                    <img src={track.image} alt={track.title} className="track-image" />
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
                <span className="username-letter">{username.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </div>
          {/* Recently Played */}
          <div className="recently-section mt-4">
            <h5 className="section-title">Recent Tracks</h5>
            <div className="recommended-cards">
              {recentTracks.map((track) => (
                <div key={track.id} className="card">
                  <img src={track.image} alt={track.title} className="card-image" />
                  <div className="card-text">
                    <span className="card-title">{track.title}</span>
                    <span className="card-artist">{track.Artist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Albums */}
          <div className="recommended-section mt-4">
            <h5 className="section-title">Recommended Albums</h5>
            <div className="recommended-cards">
              {recommendedAlbums.map((album) => (
                <div key={album.id} className="card square-card">
                  <img src={album.image} alt={album.title} className="card-image" />
                  <span className="card-title">{album.title}</span>
                  <span className="card-artist">{album.Artist}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tracks */}
          <div className="recommended-section mt-4  mb-5">
            <h5 className="section-title">Recommended Tracks</h5>
            <div className="recommended-cards">
              {recommendedTracks.map((track) => (
                <div key={track.id} className="card square-card">
                  <img src={track.image} alt={track.title} className="card-image" />
                  <span className="card-title">{track.title}</span>
                  <span className="card-artist">{track.Artist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* نوار پایین صفحه */}
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