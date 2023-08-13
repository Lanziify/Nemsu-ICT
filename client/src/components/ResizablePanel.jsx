import React from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion } from "framer-motion";
import {
  carousell,
  drawerAnimation,
  fadeDefault,
  popUp,
  popUpItem,
} from "../animations/variants";

function ResizablePanel({ children, direction }) {
  const [ref, { height, width }] = useMeasure();

  // const ignoreCircularReferences = () => {
  //   const seen = new WeakSet();
  //   return (key, value) => {
  //     if (key.startsWith("_")) return; // Don't compare React's internal props.
  //     if (typeof value === "object" && value !== null) {
  //       if (seen.has(value)) return;
  //       seen.add(value);
  //     }
  //     return value;
  //   };
  // };

  const variant = {
    initial: ({ direction }) => ({ opacity: 0, y: direction * -height  }),
    animate: { opacity: 1, y: 0 },
    exit: ({ direction }) => ({ opacity: 0, y: direction * height * 1.9 }),
  };

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className={`${height ? "relative" : "absolute"}`}
    >
      <AnimatePresence initial={false} mode="sync" custom={{direction}}>
        <motion.div
          key={JSON.stringify(direction)}
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            damping: 24.4,
            stiffness: 100,
            delayChildren: 0,
            staggerChildren: 0.05,
          }}
          custom={{direction}}
        >
          <div
            ref={ref}
            className={`${height ? "absolute" : "relative"} w-full`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default ResizablePanel;
