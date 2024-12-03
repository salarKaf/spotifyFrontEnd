import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUnStyle.css";
import { Link, useNavigate } from 'react-router-dom';
import LoginPageImg from "../assets/Login-Image.png";
import Logo from "../assets/Logo.png";
import icon from "../assets/Icon.png";
import Lock from "../assets/Lock.png";
import lineDesign from "../assets/Group 222.png";
import Line3Elipse from "../assets/line3elipse.png";
import { signUser, verifyPhone } from "../API/userAPIservice";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    verificationCode: "",
  });
  const [errors, setErrors] = useState({});
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.phoneNumber) formErrors.phoneNumber = "Required";
    if (!formData.verificationCode) formErrors.verificationCode = "Required";
    return formErrors;
  };

  const handleSendVerificationCode = async () => {
    let irphoneregex = /^(\+98|0)?9\d{9}$/;
    if (!irphoneregex.test(formData.phoneNumber)) {
      setErrors({
        phoneNumber: "Invalid Phone Number"
      });
      return;
    }

    //send verification code
    let result = await signUser(formData.phoneNumber);

    if (!result.success) {
      setErrors({
        phoneNumber: "Failed to send verification code"
      });
      return;
    }

    setIsVerificationCodeSent(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});

      let code = formData.verificationCode;
      let phone = formData.phoneNumber;

      let result = await verifyPhone(phone, code);

      if (!result.success) {
        setErrors({
          verificationCode: "Failed to verify phone number"
        });
        return;
      }

      
      localStorage.setItem("token", result.data.token);

      navigate("/home");
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
            <InputField
              type="text"
              placeholder="Phone Number"
              icon={icon}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />
            {isVerificationCodeSent ? (
              <InputField
                type="text"
                placeholder="Verification Code"
                icon={Lock}
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                error={errors.verificationCode}
              />
            ) : (
              <button type="button" className="btn SendVerificationCodeStyle LoginGoogleStyle prompt" onClick={handleSendVerificationCode}>
                Send Verification Code
              </button>
            )}
            <div className="text-end mb-3">
              <span className="text-white small-text"> have an account ? </span>
              <Link to="/" className="text-decoration-none forth"> Sign In</Link>
            </div>
            <button type="submit" className="btn LoginStyle">Sign Up</button>
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

// const OrSeparator = ({ Line3Elipse }) => (
//   <div className="d-flex align-items-center justify-content-center text-center mt-3">
//     <img src={Line3Elipse} className="rotated-image img-fluid" alt="First Image" />
//     <span className="mx-2 forth prompt">or</span>
//     <img src={Line3Elipse} className="img-fluid" alt="Second Image" />
//   </div>
// );

export default SignInPage;
