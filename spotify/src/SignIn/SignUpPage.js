import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = "Required";
    if (!formData.username) formErrors.username = "Required";
    if (!formData.password) formErrors.password = "Required";
    if (!formData.confirmPassword) formErrors.confirmPassword = "Required";
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Mismatch";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      // اجرای ارسال فرم یا هر عملیات دیگری
      console.log("Form submitted");
    }
  };

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
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <InputField
                type="text"
                placeholder="first name"
                className="input-line-name flex-item"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <InputField
                type="text"
                placeholder="last name"
                className="input-line-name flex-item"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
            <InputField
              type="text"
              placeholder="email"
              icon={Email}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              type="text"
              placeholder="username"
              icon={icon}
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            <InputField
              type="password"
              placeholder="password"
              icon={Lock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              type="password"
              placeholder="Confirm password"
              icon={Lock}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
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
};

const InputField = ({ type, placeholder, icon, name, value, onChange, error }) => (
  <div className="mb-3 position-relative input-field-wrapper">
    <input
      type={type}
      className={`input-line ${error ? 'is-invalid' : ''}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {icon && <img src={icon} alt={`${type} Icon`} className="input-icon" />}
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

export default SignInPage;
