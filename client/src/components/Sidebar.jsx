import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { drawerAnimation, drawerItems } from "../animations/variants";
import { adminItems, userItems } from "../utils/MenuItems";

function Sidebar(props) {
  const { isAdmin, isToggled } = props;
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 960);

  const menuItems = () => {
    if (isAdmin) {
      return adminItems;
    } else {
      return userItems;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {showSidebar && isToggled && (
        <aside>
          <div className="sticky top-[72px] flex min-h-[calc(100vh_-_88px)] w-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 text-sm text-gray-500 shadow-sm">
            <div>
              {menuItems().map((item, index) => (
                <motion.div variants={drawerItems} key={index}>
                  <NavLink
                    to={item.path}
                    key={index}
                    className={({ isActive }) => {
                      return (
                        "flex items-center gap-2 rounded-xl p-2 font-medium transition-all " +
                        (isActive
                          ? `bg-cyan-500 text-white`
                          : "hover:bg-cyan-500/10")
                      );
                    }}
                  >
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <footer className="text-center text-[10px] leading-tight">
              <p>
                2023 North Eastern Mindanao State University - Tagbina Campus
              </p>
              <p>Current version 0.0.1.2</p>
            </footer>
          </div>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
