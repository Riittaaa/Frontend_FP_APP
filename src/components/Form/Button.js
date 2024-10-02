import React from "react";
import "../../css/Button.css";

function Button({ label, loading }) {
  return (
    <button type="submit" className="form-button">
      {loading ? "Loading..." : label}
    </button>
  );
}

export default Button;
