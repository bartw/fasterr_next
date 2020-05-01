import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const NavLinkButton = ({ href, children }) => (
  <Link href={href} passHref>
    <motion.a
      whileHover={{ y: -1 }}
      className="inline-block p-2 rounded bg-pink-500 text-white"
    >
      {children}
    </motion.a>
  </Link>
);

export default NavLinkButton;
