import React, { useState, useEffect } from "react";
import { Await, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginStyle.css";


import { loginUser } from "../API/userAPIservice";

import LoginPageImg from "../assets/Login-Image.png";
import Logo from "../assets/Logo.png";
import icon from "../assets/Icon.png";
import Lock from "../assets/Lock.png";
import ClockIcon from "../assets/clock.png";
import lineDesign from "../assets/Group 222.png";
import Line3Elipse from "../assets/line3elipse.png";

const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotusername, setForgotusername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!username) formErrors.username = "Required";
    if (!password) formErrors.password = "Required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});

      const response = await loginUser(username, password);

      if (response.success) {
        console.log("Login Successful");
        //save token in local storage
        let token = response.data.token;
        localStorage.setItem("token", token);

        //redirect to home page
        window.location.href = "/home";
      } else {
        console.log("Login Failed");
        setErrors({ username: "Invalid username or password" });
      }
    }
  };


  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      console.log("Verification code sent to: ", forgotusername);
      setStep(2);
      setTimer(120);
    } else if (step === 2) {
      if (verificationCode === "123456") {
        console.log("Verification Code Submitted: ", verificationCode);
        setStep(3);
      } else {
        setErrors({ verificationCode: "Incorrect verification code" });
      }
    }
  };

  const handleResendCode = () => {
    console.log("Verification code resent to: ", forgotusername);
    setTimer(120);
  };

  const renderLoginForm = () => (
    <form className="custom-form" onSubmit={handleSubmit}>
      <InputField
        type="text"
        placeholder="username"
        icon={icon}
        value={username}
        onChange={(e) => setusername(e.target.value)}
        error={errors.username}
      />
      <InputField
        type="password"
        placeholder="password"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className="d-flex justify-content-end mb-3">
        <a href="#" onClick={() => setIsForgotPassword(true)} className="text-decoration-none FPassword">Forgot your password?</a>
      </div>
      <button type="submit" className="btn LoginStyle">LOGIN</button>
      <OrSeparator Line3Elipse={Line3Elipse} />
      <button type="button" className="btn LoginGoogleStyle font-Prosto">G | Login with Google</button>
      <div className="text-center mt-5">
        <span className="text-white small-text">You don't have an account? </span>
        <Link to="/signUp" className="text-decoration-none forth">Sign Up</Link>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form className="custom-form" onSubmit={handleForgotPasswordSubmit}>
      {step === 1 && (
        <>
          <InputField
            type="text"
            placeholder="Enter your username"
            icon={icon}
            value={forgotusername}
            onChange={(e) => setForgotusername(e.target.value)}
          />
          <button type="submit" className="btn LoginStyle">Send Verification Code</button>
        </>
      )}
      {step === 2 && (
        <>
          <InputField
            type="text"
            placeholder="Enter verification code"
            icon={icon}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            error={errors.verificationCode}
          />
          <button type="submit" className="btn LoginStyle">Submit</button>
          <div className="mt-3 d-flex align-items-center justify-content-center text-white">
            {timer > 0 ? (
              <>
                <img src={ClockIcon} alt="Clock" className="clock-icon" />
                <p className="mb-0">Resend code in {timer} seconds</p>
              </>
            ) : (
              <button type="button" className="btn btn-link text-white" onClick={handleResendCode}>Resend Verification Code</button>
            )}
          </div>
        </>
      )}
      <button type="button" className="btn btn-link text-white mt-3" onClick={() => setIsForgotPassword(false)}>Back to Login</button>
    </form>
  );

  return (
    <div className="container-fluid vh-100 p-0 d-flex align-items-center overflow-hidden">
      <div className="row w-100 h-100">
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center p-0 h-100 position-relative">
          <div className="welcome-section w-100 h-100">
            <img src={LoginPageImg} alt="Login" className="w-100 h-100" />
            <p className="font_welcome position-absolute">Welcome to Music Room!</p>
            <img src={lineDesign} className="lineDesignStyle position-absolute" alt="Line Design" />
            <p className="font_title position-absolute">Where Every Beat Finds a Home :)</p>
          </div>
        </div>

        <div className="col-md-6 login-section">
          <img src={Logo} alt="Logo" className="Login_LogoDesign" />
          {isForgotPassword ? renderForgotPasswordForm() : renderLoginForm()}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ type, placeholder, icon, value, onChange, error }) => (
  <div className="mb-3 position-relative input-field-wrapper">
    <input
      type={type}
      className={`input-line ${error ? 'is-invalid' : ''}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <img src={icon} alt={`${type} Icon`} className="input-icon" />
    {error && <span className="error-message">{error}</span>}
  </div>
);

const OrSeparator = ({ Line3Elipse }) => (
  <div className="d-flex align-items-center justify-content-center text-center mt-3">
    <img src={Line3Elipse} className="rotated-image img-fluid" alt="First Image" />
    <span className="mx-2 forth prompt">or</span>
    <img src={Line3Elipse} className="img-fluid" alt="Second Image" />
  </div>
);

export default LoginPage;
