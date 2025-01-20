import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockUser } from '../MockData';
import './AddNewSong.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from "../assets/Home_Icon.png";
import searchIcon from "../assets/Search_Icon.png";
import LibIcon from "../assets/Lib_Icon.png";

const AddNewSong = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [trackName, setTrackName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [artist, setArtist] = useState("");
  const [trackCover, setTrackCover] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [newTrack, setNewTrack] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const user = mockUser;
    if (!user.isLoggedIn) {
      navigate("/login");
    } else {
      setUsername(user.username);
    }
  }, []);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setTrackCover(file);
    } else {
      alert("Please select a valid image file for the cover.");
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      alert("Please select a valid audio file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrack = {
      title: trackName,
      artist: artist,
      date: releaseDate,
      cover: trackCover ? URL.createObjectURL(trackCover) : null,
      audio: audioFile,
    };
    setNewTrack(newTrack);
    setIsSubmitted(false);

    // اضافه کردن آهنگ جدید به لیست آهنگ‌های کاربر
    const userSongs = JSON.parse(localStorage.getItem("userSongs")) || [];
    userSongs.push(newTrack);
    localStorage.setItem("userSongs", JSON.stringify(userSongs));
  };

  const handleComplete = () => {
    const formData = new FormData();
    formData.append("title", trackName);
    formData.append("artist", artist);
    formData.append("date", releaseDate);
    formData.append("cover", trackCover);
    formData.append("audio", audioFile);

    console.log("Sending data to backend:", formData);

    setIsSubmitted(true);
    setNewTrack(null);
    setTrackName("");
    setReleaseDate("");
    setArtist("");
    setTrackCover(null);
    setAudioFile(null);
  };

  return (
    <div className="container-fluid add-container h-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* بخش سمت چپ (فرم) */}
        <div className="col-6 d-flex align-items-center justify-content-center">
          <div className="Add-container p-4">
            <h2 className="text-white mb-4 add-title">Add New Song</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4 d-flex align-items-center">
                <label htmlFor="trackName" className="form-label text-white me-3">
                  Track Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="trackName"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4 d-flex align-items-center">
                <label htmlFor="artist" className="form-label text-white me-3">
                  Artist Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4 d-flex align-items-center">
                <label htmlFor="releaseDate" className="form-label text-white me-3">
                  Release Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="releaseDate"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4 d-flex align-items-center">
                <label htmlFor="cover" className="form-label text-white me-3">
                  Cover Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="cover"
                  onChange={handleCoverChange}
                  accept="image/*"
                  required
                />
              </div>
              <div className="form-group mb-4 d-flex align-items-center">
                <label htmlFor="audio" className="form-label text-white me-3">
                  Audio File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="audio"
                  onChange={handleAudioChange}
                  accept="audio/*"
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Add Song
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* بخش سمت راست (پیش‌نمایش کارت) */}
        <div className="col-6 d-flex align-items-center justify-content-center">
          {newTrack && (
            <div className="preview-container p-4">
              <h4 className="text-white mb-4">Preview</h4>
              <div className="card-added">
                <img
                  src={newTrack.cover}
                  alt={newTrack.title}
                  className="cover-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{newTrack.title}</h5>
                  <p className="card-text">{newTrack.artist}</p>
                  <p className="card-text">{newTrack.date}</p>
                </div>
                <button onClick={handleComplete} className="btn btn-success">
                  Complete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* فوتر */}
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

export default AddNewSong;