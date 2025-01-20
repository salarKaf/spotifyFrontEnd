import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import SignInPage from './SignIn/SignUpPage';
import SetPass from './SetPassword/SetPassword';
import Home from './home';
import MusicPlayer from './MusicPlayer/MusicPlayer'
import Library from './Library/Library';
import AddNewSong from './AddNewSong/AddNewSong.js';
import ProfilePage from './UserProfile/Profile.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignInPage />} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/setPassword" element={<SetPass></SetPass>} />
        <Route path="/musicPlayer" element={<MusicPlayer></MusicPlayer>}/>
        <Route path="/library" element={<Library></Library>}/>
        <Route path="/AddNewSong" element={<AddNewSong></AddNewSong>}/>
        <Route  path="/profile"  element={<ProfilePage></ProfilePage>}/>
      </Routes>
    </Router>
  );
}

export default App;
