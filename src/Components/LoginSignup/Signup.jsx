/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import styles from "../../CSS/SignUp.module.css"; // New CSS module for styles
import axios from "axios";

export default function SignUp() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Make sure to call useNavigate

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

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
    };

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        navigate("/");
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        // General error handling
        alert("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            required
            ref={nameRef}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            ref={emailRef}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            ref={passwordRef}
            onChange={(event) => validate(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            required
            ref={confirmPasswordRef}
          />
        </div>

        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/Login">sign in?</a>
        </p>
      </form>
    </div>
  );
}
