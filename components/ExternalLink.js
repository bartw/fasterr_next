import React from "react";

const ExternalLink = ({ href, className, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`underline ${className ?? ""}`}
    aria-label={label}
  >
    {children}
  </a>
);

export default ExternalLink;
