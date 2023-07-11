import React, { useState } from "react";
import { NavLink, json } from "react-router-dom";
import {
  MdOutlineHome,
  MdHome,
  MdOutlineCreate,
  MdCreate,
  MdOutlineRefresh,
  MdRefresh,
  MdCheckCircleOutline,
  MdCheckCircle,
} from "react-icons/md";

function Sidebar(props) {
  const { isToggled, setOpenSideBar } = props;
  const [selected, setSelected] = useState();

  const menuItems = [
    {
      path: "/home",
      name: "Home",
      icon: <MdHome size={24} />,
    },
    {
      path: "/request",
      name: "Request",
      icon: <MdCreate size={24} />,
    },
    {
      path: "/ongoing",
      name: "Ongoing",
      icon: <MdRefresh size={24} />,
    },
    {
      path: "/completed",
      name: "Completed",
      icon: <MdCheckCircle size={24} />,
    },
  ];

  return (
    <>
      <div
        className={`no_selection bg-gray-50 transition-all ease-in-out duration-300 ${
          isToggled ? "w-72 visible border-r" : "w-0 invisible"
        } `}
      >
        <div className="px-5 py-3 text-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => {
                return (
                  "flex gap-2 p-2 items-center rounded-md transition-all duration-200 ease-in-out " +
                  (isActive
                    ? `bg-blue-200 text-blue-500`
                    : "hover:bg-gray-200 text-gray-500")
                );
              }}
              onClick={() => setOpenSideBar(true)}
            >
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
