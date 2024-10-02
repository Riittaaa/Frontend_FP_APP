import React from "react";
import "../../css/FormWrapper.css";

function FormWrapper({ title, children, handleSubmit }) {
  return (
    <div className="form">
      <div className=" form-container">
        <div className="form-heading">
          <h3>{title}</h3>
        </div>
        <form onSubmit={handleSubmit}>{children}</form>
      </div>
    </div>
  );
}

export default FormWrapper;
