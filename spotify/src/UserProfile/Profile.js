import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/Home_Icon.png";
import searchIcon from "../assets/Search_Icon.png";
import LibIcon from "../assets/Lib_Icon.png";
import './profile.css';

const ProfilePage = () => {
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("username@gmail.com");
  const [profileImage, setProfileImage] = useState(null);
  const [songsCount, setSongsCount] = useState(50); // تعداد آهنگ‌ها
  const [isEditing, setIsEditing] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");

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

  const handleSupportClick = () => {
    setShowSupportModal(true);
  };

  const handleSupportSubmit = () => {
    // ارسال ایمیل به salarikosar5@gmail.com
    window.location.href = `mailto:salarikosar5@gmail.com?subject=Support Request&body=${supportMessage}`;
    setShowSupportModal(false);
    setSupportMessage("");
  };

  return (
    <div className="container-fluid profile-container h-100 d-flex flex-column">
      {/* بخش بالای فوتر (دو قسمت) */}
      <div className="row flex-grow-1">
        {/* بخش بالا (زرد) */}
        <div className="top-part col-12">
          {/* عکس پروفایل */}
          <div className="profile-image-container">
            <img
              src={profileImage || "./assets/icon/Profile-image-default.png"} // عکس پیش‌فرض
              alt="Profile"
              className="profile-image"
            />
          </div>
          <h1>{username}</h1>
          <p>{songsCount} Songs</p>
        </div>

        {/* بخش پایین (قرمز) */}
        <div className="bottom-part red-part col-12">
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
              <div className="add-song-button-container">
                <button className="add-song-button" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          ) : (
            <div className="add-song-button-container">
              <button className="add-song-button" onClick={handleEditClick}>Change your Profile</button>
            </div>
          )}

          {/* نمایش ایمیل با آیکون */}
          <div className="email-section">
            <img src="./assets/Icon/email.png" alt="Email" className="email-icon" />
            <span className="email-text">Your Email: {email}</span>
          </div>

          {/* دکمه Support با آیکون */}
          <div className="support-section">
            <button className="support-button" onClick={handleSupportClick}>
              <img src="./assets/Icon/support.png" alt="Support" className="support-icon" />
              <span>Support</span>
            </button>
          </div>

          {/* مودال برای Support */}
          {showSupportModal && (
            <div className="support-modal">
              <textarea
                placeholder="Enter your message..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
              />
              <button onClick={handleSupportSubmit}>Send</button>
              <button onClick={() => setShowSupportModal(false)}>Cancel</button>
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

export default ProfilePage;