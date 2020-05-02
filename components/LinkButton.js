import React from "react";

const LinkButton = ({ onClick, className, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-pink-500 hover:underline ${className ?? ""}`}
  >
    {children}
  </button>
);

export default LinkButton;
