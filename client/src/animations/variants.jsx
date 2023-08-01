export const fadeDefault = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    duration: 0.05,
  },
  exit: {
    opacity: 0,
    delay: 0.05,
  },
};
export const drawerAnimation = {
  initial: {
    x: -400,
  },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.1,
      delayChildren: 0,
      staggerChildren: 0.03,
    },
  },
  exit: {
    x: -400,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.4,
    },
  },
};

export const drawerItems = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.22,
    },
  },
  exit: {
    y: 0,
    opacity: 0,
  },
};

export const dropdownAnimation = {
  initial: {
    clipPath: "inset(0% 50% 90% 50% round 6px)",
    duration: 0.05,
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0% round 6px)",
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
  exit: {
    duration: 0.0,
    clipPath: "inset(0% 50% 90% 50% round 6px)",
  },
};

export const popUp = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.32,
      delayChildren: 0,
      staggerChildren: 0.02,
    },
  },
  exit: {
    y: 40,
    opacity: 0,
  },
};
export const popUpRight = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.8,
      delayChildren: 0,
      staggerChildren: 0.08,
    },
  },
  exit: {
    x: 10,
    opacity: 0,
  },
};

export const popUpItem = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.22,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
  },
};
export const popUpItemRight = {
  initial: { opacity: 0, x: 10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 7.8,
      stiffness: 100,
      mass: 0.22,
    },
  },
  exit: {
    opacity: 0,
    x: 10,
  },
};
