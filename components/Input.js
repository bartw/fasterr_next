import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border-2 rounded border-gray-200 bg-white p-2 w-full"
  />
);

export default Input;
