import React, { useState, useEffect, useRef } from "react";
import {
  IoMenu,
  IoPersonCircle,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

function Navbar(props) {
  const { toggleDrawer } = props;
  const { user, logoutUser } = useAuth();
  const [isToggled, setIsToggled] = useState(false);
  const profileFloaterRef = useRef(null);
  const profileButtonRef = useRef(null);

  const items = [
    {
      path: "/settings",
      name: "Settings",
      icon: <IoSettingsOutline size={24} />,
    },
    {
      path: "/help",
      name: "Help",
      icon: <IoHelpCircleOutline size={24} />,
    },
    {
      path: "/feedback",
      name: "Send feedback",
      icon: <BsChatLeftDots size={20} />,
    },
  ];

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOutside = (event) => {
    if (
      profileFloaterRef.current &&
      !profileFloaterRef.current.contains(event.target) &&
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target)
    ) {
      setIsToggled(false);
    }
  };

  useEffect(() => {
    const mouseDown = document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return mouseDown;
  }, []);

  return (
    <nav className="no_selection fixed w-full z-10 flex px-6 justify-between text-sm text-gray-500 border-b bg-gray-50">
      <div className="py-2 flex gap-6 items-center">
        <button
          className="p-2 rounded-full  hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out "
          onClick={toggleDrawer}
        >
          <IoMenu size={24} />
        </button>
        <div className="flex gap-2 items-center">
          <img className="max-h-8 rounded-full" src={logo} />
          <span className="font-bold">NEMSU - Tagbina Campus</span>
        </div>
      </div>
      <div className="flex place-items-center ">
        {/* Profile Button */}
        <div className="relative flex flex-col place-items-center">
          <button
            ref={profileButtonRef}
            className="rounded-full text-blue-500"
            onClick={() => setIsToggled(!isToggled)}
          >
            <IoPersonCircle size={36} />
          </button>

          {/* Profile floater */}
          <div
            ref={profileFloaterRef}
            className={`absolute -z-10 w-64 right-0 top-full opacity-0 overflow-hidden bg-gray-50 rounded-md transition-all duration-200 ${
              isToggled ? "z-10 opacity-100 mt-6 border visible" : "invisible"
            }`}
          >
            <div className="p-4">
              <img className="max-h-16 m-auto mb-2 rounded-full" src={logo} />
              <p className="mb-2 text-center">{user.email}</p>
              <button className="w-full py-1 border rounded-md hover:bg-gray-200 transition-all duration-300">
                Manage Profile
              </button>
            </div>
            <hr />
            <div className="py-2">
              {items.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="px-4 py-2 flex place-items-center gap-4 bg-gray-50 hover:bg-gray-200 cursor-pointer"
                >
                  <div>{item.icon}</div>
                  <div>{item.name}</div>
                </NavLink>
              ))}
            </div>
            <hr />
            <div className="p-4">
              <button
                className="w-full py-2 flex justify-center items-center gap-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-150 ease-in-out"
                onClick={handleLogout}
              >
                <IoLogOutOutline size={24} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
