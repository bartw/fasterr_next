import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  disabled = false,
  step,
  onChange = () => {},
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
    className={`border-2 rounded border-gray-200 bg-white p-2 w-full ${
      disabled ? "text-gray-500" : "text-black"
    }`}
    step={step}
  />
);

export default Input;
