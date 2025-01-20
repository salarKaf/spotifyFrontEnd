import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/Home_Icon.png";
import searchIcon from "../assets/Search_Icon.png";
import LibIcon from "../assets/Lib_Icon.png";

const ProfilePage = () => {
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("username@gmail.com");
  const [profileImage, setProfileImage] = useState(null);
  const [songsCount, setSongsCount] = useState(50); // تعداد آهنگ‌ها
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // در اینجا می‌توانید اطلاعات را به سرور ارسال کنید
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <div className="container-fluid profile-container h-100 d-flex flex-column">
      {/* بخش بالای فوتر (دو قسمت) */}
      <div className="top-section">
        <div className="top-left">
          <h1>{username}</h1>
          <p>{songsCount} Songs</p>
        </div>
        <div className="top-right">
          <h2>Change your Profile</h2>

          {isEditing ? (
            <div className="edit-form">
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Profile Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <button onClick={handleSave}>Save Changes</button>
            </div>
          ) : (
            <button onClick={handleEditClick}>Change your Profile</button>
          )}

          <h3>Support</h3>
          <p>If you have any problem, you can share with us :)</p>
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

export default ProfilePage;