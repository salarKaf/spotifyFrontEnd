import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import SignInPage from './SignIn/SignInPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignInPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
