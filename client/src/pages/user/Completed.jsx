import React from "react";
import { motion } from "framer-motion";

export default function Completed() {
  return (
    // <motion.div exit={{ opacity: 0 }}>
      <div className="grid h-full place-items-center">
        <div className="container text-center">
          <h1 className="mb-2 text-5xl font-black text-cyan-500">
            Completed Page
          </h1>
          <p>This page will be available soon.</p>
        </div>
      </div>
    // </motion.div>
  );
}
