import React from "react";
import Link from "next/link";

const InternalLink = ({ href, className, children }) => (
  <Link href={href}>
    <a className={`text-pink-500 hover:underline ${className ?? ""}`}>
      {children}
    </a>
  </Link>
);

export default InternalLink;
