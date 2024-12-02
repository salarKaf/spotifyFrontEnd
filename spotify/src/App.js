import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import SignInPage from './SignIn/SignUpPage';
import Home from './home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignInPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home></Home>} />
      </Routes>
    </Router>
  );
}

export default App;
