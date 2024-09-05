import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/fleetpanda.png";
import "../css/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo" onClick={closeMenu}>
        <img src={logo} alt="Fleetpanda" className="navbar__logo-img" />
      </Link>

      <div className="navbar__menu-icon" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>

      <ul
        className={`navbar__nav-links ${
          isMenuOpen ? "navbar__nav-links--active" : ""
        }`}
      >
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
          <Link to="/products" onClick={closeMenu}>
            <i className="fas fa-box-open"></i> Products
          </Link>
        </li>
        <li>
          <Link to="/assets" onClick={closeMenu}>
            <i className="fas fa-truck"></i> Assets
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={closeMenu}>
            <i className="fas fa-shopping-cart"></i> Orders
          </Link>
        </li>
        <li>
          <Link to="/categories" onClick={closeMenu}>
            <i className="fas fa-tags"></i> Categories
          </Link>
        </li>
        <li className="navbar__login-item">
          <Link to="/login" className="navbar__login" onClick={closeMenu}>
            <i className="fas fa-user"></i> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
