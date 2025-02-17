import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddNewSong.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from "../assets/Home_Icon.png";
import searchIcon from "../assets/Search_Icon.png";
import LibIcon from "../assets/Lib_Icon.png";
import { validateUser, AddCoverSong, AddAudioFile, AddSongToArtist } from "../API/userAPIservice";

const AddNewSong = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [trackCover, setTrackCover] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [newTrack, setNewTrack] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageKey, setImageKey] = useState(null);
  const [musicKey, setMusicKey] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("N/A");
  const [phone, setPhone] = useState("N/A");

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
      date: releaseDate,
      cover: trackCover ? URL.createObjectURL(trackCover) : null,
      audio: audioFile,
    };
    setNewTrack(newTrack);
    setIsSubmitted(false);
  };

  const handleComplete = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("User not authenticated");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const coverResponse = await AddCoverSong(token, trackCover);
      if (!coverResponse.success) {
        alert("Failed to upload cover image");
        setIsLoading(false);
        return;
      }
      setImageKey(coverResponse.key);

      const audioResponse = await AddAudioFile(token, audioFile);
      if (!audioResponse.success) {
        alert("Failed to upload audio file");
        setIsLoading(false);
        return;
      }
      setMusicKey(audioResponse.key);

      const songData = {
        name: trackName,
        releaseDate: releaseDate,
        imageKey: coverResponse.key,
        musicKey: audioResponse.key
      };

      const addSongResponse = await AddSongToArtist(token, songData);
      if (!addSongResponse.success) {
        alert("Failed to add song to artist");
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      setNewTrack(null);
      setTrackName("");
      setReleaseDate("");
      setTrackCover(null);
      setAudioFile(null);
      setImageKey(null);
      setMusicKey(null);

      alert("Song added successfully!");
    } catch (error) {
      console.error("Error in handleComplete:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

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
        navigate("/login");
      }
    })();
  }, [navigate]);

  let usernameTag = (<></>);

  if (username == "" || username == null) {
    usernameTag = (<Link to="/setpassword" className="btn btn-primary">Set Username Password</Link>);
  } else {
    usernameTag = (<h3>username: {username}</h3>);
  }

  return (
    <div className="container-fluid add-container h-100 d-flex flex-column">
      <div className="row flex-grow-1">
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
            <button
              onClick={() => navigate('/')} 
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#c8acd6',
                color: '#17153b',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Home
            </button>
          </div>
        </div>

        <div className="col-6 d-flex align-items-center justify-content-center">
          {newTrack && (
            <div className="preview-container p-4">
              <h4 className="text-white mb-4">Preview</h4>
              <div className="card-added">
                {isLoading && (
                  <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                  </div>
                )}
                <img
                  src={newTrack.cover}
                  alt={newTrack.title}
                  className="cover-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{newTrack.title}</h5>
                  <p className="card-text">{newTrack.date}</p>
                </div>
                <button onClick={handleComplete} className="btn btn-success" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Complete'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewSong;