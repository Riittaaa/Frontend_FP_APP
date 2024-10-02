import React from "react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  required,
  options,
  loading,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="form-input"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select {label}</option>
        {loading ? (
          <option>Loading...</option>
        ) : error ? (
          <option>Error loading options</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error loading {id}: {error.message}
        </p>
      )}
    </div>
  );
};

export default SelectField;
