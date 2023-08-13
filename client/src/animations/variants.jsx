export const fadeDefault = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
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
export const carousell = {
  initial: {
    opacity: 0.5,
    x: -350,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      // delay: 0,
      type: "spring",
      damping: 20.8,
      stiffness: 100,
      // mass: 0.1,
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    x: 355,
    transition: {
      // delay: 0.5 / 2,
      type: "spring",
      damping: 20.8,
      stiffness: 100,

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
    opacity: 0,
    clipPath: "inset(0% 50% 90% 50% round 16px)",
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: {
      delayChildren: 0,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 50% 90% 50% round 16px)",
  },
};

export const menuDrawer = {
  initial: {
    opacity: 0,
    clipPath: "inset(0% 90% 0% 0% round 16px)",
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: {
      delayChildren: 0,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 90% 0% 0% round 16px)",
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
      damping: 18.8,
      stiffness: 100,
      // mass: 0.1,
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    y: 0,
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
    y: 0,
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
