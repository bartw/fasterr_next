import React from "react";

const FormElement = ({ label, className, children }) => (
  <label className={`block ${className ?? ""}`}>
    <div>{label}</div>
    <div className="mt-1">{children}</div>
  </label>
);

export default FormElement;
