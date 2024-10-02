import React from "react";
import { Link } from "react-router-dom";
import "../../css/BackToTableLink.css";

const BackToTableLink = ({ link, table }) => {
  return (
    <Link to={link} className="link">
      Back to {table}
    </Link>
  );
};

export default BackToTableLink;
