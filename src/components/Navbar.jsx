import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import logo from "../images/logo.png";
import "../css/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo" onClick={closeMenu}>
        <img src={logo} alt="Logo" className="navbar__logo-img" />
      </Link>

      <div className="navbar__menu-icon" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>

      <ul
        className={`navbar__nav-links ${
          isMenuOpen ? "navbar__nav-links--active" : ""
        }`}
      >
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard" onClick={closeMenu}>
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/customers" onClick={closeMenu}>
                <i className="fas fa-users"></i> Customers
              </Link>
            </li>
            <li>
              <Link to="/goods" onClick={closeMenu}>
                <i className="fas fa-box-open"></i> Goods
              </Link>
            </li>
            <li>
              <Link to="/vehicles" onClick={closeMenu}>
                <i className="fas fa-truck"></i> Vehicles
              </Link>
            </li>
            {/* <li className="order-dropdown">
              <Link onClick={closeMenu}>
                <i className="fas fa-shopping-cart"></i> Orders
                <i className="fas fa-angle-down"></i>
              </Link>

              <div className="dropdown-content">
                <a href="/orderlists">Order Group</a>
                <a href="/deliveryOrders">Delivery Order</a>
                <a href="/recurringOrders">Recurring Order</a>
              </div>
            </li> */}

            <li>
              <Link to="/drivers" onClick={closeMenu}>
                <i className="fas fa-tags"></i> Drivers
              </Link>
            </li>
            <li className="navbar__logout-item">
              <Link
                to="/login"
                className="navbar__login"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </li>
          </>
        ) : (
          <li className="navbar__login-item">
            <Link to="/login" className="navbar__login" onClick={closeMenu}>
              <i className="fas fa-user"></i> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
