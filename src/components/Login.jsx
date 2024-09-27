import React, { useState } from "react";
import "../css/Login.css";
import { FETCH_GROUP } from "../graphql/queries";
import { LOGIN_USER } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [groupSelectionError, setGroupSelectionError] = useState("");
  const dispatch = useDispatch();

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useQuery(FETCH_GROUP);

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateInput = (email, password) => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setGroupSelectionError("");

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

    if (!group) {
      setGroupSelectionError("Group is required");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validateInput(email, password, group);
    if (isValid) {
      try {
        const { data } = await loginUser({
          variables: {
            login: {
              email,
              password,
              groupId: parseInt(group),
            },
          },
        });

        if (data.loginUser.token) {
          dispatch(
            loginSuccess({
              user: data.loginUser.user,
              token: data.loginUser.token,
            })
          );
          localStorage.setItem("token", data.loginUser.token);
          navigate("/dashboard");
          toast.success("Logged in successfully!!");
        } else {
          dispatch(loginFailure(data.loginUser.error));
          toast.error("Login failed:", data.loginUser.error);
        }
      } catch (err) {
        dispatch(loginFailure(err.message));
        toast.error("Error:", err.message);
      }
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

          <div className="login__input-group">
            <label htmlFor="group" className="login__label">
              Select Group
            </label>
            <select
              className="login__input"
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="">Select a group</option>
              {!groupLoading &&
                groupData?.allGroups?.group &&
                groupData?.allGroups?.group.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
            </select>
            {groupError && <p className="login__error">{groupError.message}</p>}
            {groupSelectionError && (
              <p className="login__error">{groupSelectionError}</p>
            )}
          </div>

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="login__error">Error logging in: {error.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
