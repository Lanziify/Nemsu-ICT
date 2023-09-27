import React from "react";
import dtoLogo from "../assets/dtoLogo.svg";
import { motion } from "framer-motion";
import { fadeDefault } from "../animations/variants";

function Preloader() {
  return (
    <motion.div
      variants={fadeDefault}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute flex h-full w-full animate-pulse items-center justify-center"
    >
      <img src={dtoLogo} alt="DTO logo" className="h-[56px] min-w-[56px]" />
    </motion.div>
  );
}

export default Preloader;
