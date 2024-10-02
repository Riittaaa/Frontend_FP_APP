import React from "react";
import "../../css/InputField.css";

function InputField({ label, type, id, value, onChange, required, min = "" }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="form-input"
        required={required}
        min={min}
      />
    </div>
  );
}

export default InputField;
