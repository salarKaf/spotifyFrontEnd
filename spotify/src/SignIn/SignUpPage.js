import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUnStyle.css";
import { Link } from 'react-router-dom';
import LoginPageImg from "../assets/Login-Image.png";
import Logo from "../assets/Logo.png";
import icon from "../assets/Icon.png";
import Lock from "../assets/Lock.png";
import Email from "../assets/email.png";
import lineDesign from "../assets/Group 222.png";
import Line3Elipse from "../assets/line3elipse.png";

const SignInPage = () => {
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
          <img src={Logo} alt="Logo" className="SignIn_LogoDesign" />
          <form className="custom-form">
            <div className="d-flex justify-content-center">
              <input type="text" placeholder="first name" className="input-line-name flex-item" />
              <input type="text" placeholder="last name" className="input-line-name flex-item" />
            </div>
            <InputField type="text" placeholder="email" icon={Email} />
            <InputField type="text" placeholder="username" icon={icon} />
            <InputField type="password" placeholder="password" icon={Lock} />
            <InputField type="password" placeholder="Confirm password" icon={Lock} />
            <div className="text-end mb-3">
              <span className="text-white small-text"> have an account ? </span>
              <Link to="/" className="text-decoration-none forth"> Sign In</Link>
            </div>
            <button type="submit" className="btn LoginStyle">LOGIN</button>
            <OrSeparator Line3Elipse={Line3Elipse} />
            <button type="button" className="btn LoginGoogleStyle font-Prosto">G | Sign In with Google</button>
          </form>
        </div>

      </div>
    </div>
  );

}


const InputField = ({ type, placeholder, icon }) => (
  <div className="mb-3 position-relative">
    <input type={type} className="input-line" placeholder={placeholder} />
    <img src={icon} alt={`${type} Icon`} className="input-icon" />
  </div>
);

const OrSeparator = ({ Line3Elipse }) => (
  <div className="d-flex align-items-center justify-content-center text-center mt-3">
    <img src={Line3Elipse} className="rotated-image img-fluid" alt="First Image" />
    <span className="mx-2 forth prompt">or</span>
    <img src={Line3Elipse} className="img-fluid" alt="Second Image" />
  </div>
);


export default SignInPage;
