import React from "react";
import { motion } from "framer-motion";

const bounceTransition = {
  x: {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeOut",
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: "easeOut",
    repeatDelay: 0.8,
  },
};

const BouncingBall = () => (
  <div className="absolute inset-0 w-full h-full flex justify-center items-center">
    <motion.span
      className="block w-4 h-4 rounded-lg bg-gray-700"
      transition={bounceTransition}
      animate={{ x: ["100%", "-100%"] }}
    />
  </div>
);

const Button = ({
  type = "button",
  state = "default",
  className,
  onClick,
  children,
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    style={{ minWidth: "3rem" }}
    className={`relative rounded ${
      state === "pending" ? "bg-gray-500" : "bg-gray-700"
    } text-gray-100 p-2 ${className ?? ""}`}
    whileHover={{ y: state === "default" ? -1 : 0 }}
    disabled={state === "pending"}
  >
    {state === "pending" && <BouncingBall />}
    <div>{children}</div>
  </motion.button>
);

export default Button;
