import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeDefault } from "./variants";

function Transition(Component) {
  return (
    <motion.div
      variants={fadeDefault}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      <Component />
    </motion.div>
  );
}

export default Transition;
