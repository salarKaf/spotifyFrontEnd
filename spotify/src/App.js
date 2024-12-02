import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import SignInPage from './SignIn/SignUpPage';
import SetPass from './SetPassword/SetPassword';
import Home from './home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/setPassword" element={<SetPass></SetPass>} />
      </Routes>
    </Router>
  );
}

export default App;
