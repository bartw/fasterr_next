import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const NavLink = ({ href, children }) => (
  <Link href={href} passHref>
    <motion.a
      href={href}
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
    </motion.a>
  </Link>
);

export default NavLink;
