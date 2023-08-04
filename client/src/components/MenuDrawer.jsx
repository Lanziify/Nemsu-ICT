import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { drawerAnimation, drawerItems } from "../animations/variants";
import { adminItems, userItems } from "../utils/MenuItems";

function MenuDrawer(props) {
  const { isAdmin, isToggled, isMenuActive } = props;
  const [showMenu, setShowMenu] = useState(window.innerWidth <= 960);

  const menuItems = () => {
    if (isAdmin) {
      return adminItems;
    } else {
      return userItems;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth <= 960);
    };

    // if (!showMenu) {
    //   isMenuActive(false);
    // }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu]);

  return (
    <>
      <AnimatePresence>
        {isToggled && showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, duration: 0.01 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 top-0 z-10 flex h-full w-full items-start bg-black/20 text-sm text-white"
            onClick={() => isMenuActive(false)}
          >
            <motion.div
              variants={drawerAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-nemsu relative flex h-full w-[280px] shadow-2xl backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col justify-between bg-gradient-to-br from-cyan-500/20 to-gray-700 backdrop-blur-md">
                {/* Drawer header */}
                <div
                  className="absolute cursor-pointer right-0 top-0 m-4"
                  onClick={() => isMenuActive(false)}
                >
                  <MdCancel size={24} />
                </div>
                <div>
                  <div className="flex h-[180px] items-center p-4">
                    <h1 className="text-center text-lg font-black">
                      Digital Transformation Office
                    </h1>
                  </div>
                  <nav className="p-4">
                    {menuItems().map((item, index) => (
                      <motion.div variants={drawerItems} key={index}>
                        <NavLink
                          to={item.path}
                          key={index}
                          className={({ isActive }) => {
                            return (
                              "flex items-center gap-2 rounded-md p-2 font-medium transition-all " +
                              (isActive
                                ? `bg-cyan-500/20`
                                : "hover:bg-gray-500/10")
                            );
                          }}
                          onClick={() => isMenuActive(false)}
                        >
                          <div>{item.icon}</div>
                          <div>{item.name}</div>
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                {/* Drawer footer */}
                <footer className="px-4 py-2 text-center text-xs">
                  © 2023 North Eastern Mindanao State University - Tagbina
                  Campus
                </footer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MenuDrawer;
