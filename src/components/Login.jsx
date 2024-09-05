import React, { useState } from "react";
import "../css/Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateInput = (email, password) => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = validateInput(email, password);
    if (isValid) {
      console.log("Form submitted");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="login__input-group">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="login__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="login__error">{emailError}</p>}
          </div>

          <div className="login__input-group">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <div className="login__password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="login__input login__password-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="login__password-icon"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fas ${
                    passwordVisible ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>
            {passwordError && <p className="login__error">{passwordError}</p>}
          </div>

          <button type="submit" className="login__button">
            Login
          </button>

          {/* <p className="login__signup-prompt">
            Don't have an account? <a href="/signup">Signup</a>
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
