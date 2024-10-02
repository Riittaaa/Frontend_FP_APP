import React from "react";
import "../../css/Header.css";

const Header = ({ title, click }) => {
  return (
    <div className="header">
      <h2 className="title">{title}</h2>
      <button className="add-button" onClick={click}>
        + Add {title}
      </button>
    </div>
  );
};

export default Header;
