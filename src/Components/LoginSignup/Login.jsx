import { useContext, useRef, useState } from "react";
import validator from "validator";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../CSS/Login.module.css";
import { DataContext } from "../../Context/DataContext";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(DataContext);
  const navigate = useNavigate();

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else if (value === "") {
      setErrorMessage("");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setErrorMessage("Email and Password cannot be empty");
    } else {
      setErrorMessage("");
    }
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("sessionToken", response.data.token);
        login();
        navigate("/");
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  }

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogleSuccess = async (response) => {
    try {
      // Extract token from Google response
      const token = response.credential;

      // Send the token to your backend for verification and user creation if needed
      const backendResponse = await axios.post(
        "http://localhost:3000/google-login",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (backendResponse.status === 200) {
        // Store the JWT token in localStorage (or wherever you prefer)
        localStorage.setItem("sessionToken", backendResponse.data.token);

        login();

        // Redirect to the home page
        navigate("/");
      } else {
        console.error("Google login failed at backend");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };

  const handleGitHubLogin = () => {
    const clientId = "Ov23lia2wRjk9kWpiGlE";
    const redirectUri = "http://localhost:3000/auth/github/callback"; // Backend endpoint
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = githubAuthUrl; // Redirects directly to GitHub
  };

  const handleFacebookResponse = async (response) => {
    try {
      const { accessToken } = response;

      const backendResponse = await axios.post(
        "http://localhost:3000/facebook-login",
        { accessToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (backendResponse.status === 200) {
        localStorage.setItem("sessionToken", backendResponse.data.token);
        login();
        navigate("/");
      } else {
        console.error("Facebook login failed at backend");
      }
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header section with Login text and Signup button */}
      <div className={styles.headerContainer}>
        <h3>Login</h3>
        <button
          className={styles.signButton}
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>

      {/* Form for Login */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className={styles.inputField}
            placeholder="Enter email"
            ref={emailRef}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.passwordInput}
              placeholder="Enter password"
              ref={passwordRef}
              onChange={(event) => validate(event.target.value)}
            />
            <button
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errorMessage && (
            <span className={styles.errorMessage}>{errorMessage}</span>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="customCheck1" />
          <label htmlFor="customCheck1">Remember me</label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      <div className={styles.belowBar}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          className="btn btn-primary btn-sm custom-small-button"
        />
        <button
          onClick={handleGitHubLogin}
          className="btn btn-primary btn-sm custom-small-button"
        >
          Sign Up with GitHub
        </button>
        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"
          fields="name,email,picture"
          callback={handleFacebookResponse}
          className="btn btn-primary btn-sm custom-small-button"
        />
        <p className={styles.forgotPassword}>
          Forgot <a href="#">password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
