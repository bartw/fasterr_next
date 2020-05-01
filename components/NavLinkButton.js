import React from "react";
import { motion } from "framer-motion";

const NavLinkButton = ({ onClick, children }) => (
  <motion.button
    onClick={onClick}
    whileHover="hover"
    className="inline-block p-2 cursor-pointer"
  >
    <motion.span
      variants={{
        hover: { borderBottomWidth: 2 },
      }}
      transition={{ duration: 0.1 }}
      style={{ borderBottomWidth: 0 }}
      className="border-gray-700"
    >
      {children}
    </motion.span>
  </motion.button>
);

export default NavLinkButton;
