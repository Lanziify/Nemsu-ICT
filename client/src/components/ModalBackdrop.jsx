import React from "react";
import { motion } from "framer-motion";

function ModalBackdrop({ children, onClick }) {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/30 "
      onClick={onClick}
    >
      {/* <div className="max-w-md overflow-hidden rounded-md  shadow-lg"> */}
        {children}
      {/* </div> */}
    </motion.div>
  );
}

export default ModalBackdrop;
