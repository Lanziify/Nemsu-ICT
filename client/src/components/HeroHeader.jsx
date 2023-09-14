import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCarrot, FaSignOutAlt } from "react-icons/fa";
import dtoLogo from "../assets/dtoLogo.svg";

export default function HeroHeader() {
  const [headerBackground, setHeaderBackground] = useState(false);

  const onScroll = () => {
    if (window.scrollY >= 180) {
      setHeaderBackground(true);
    } else {
      return setHeaderBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerBackground]);

  return (
    <header
      className={`no_selection fixed top-0 z-10 w-full text-sm text-gray-500 ${
        headerBackground ? "bg-white shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-[56px] max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* <div className="h-[36px] min-w-[36px] rounded-full bg-gradient-to-br from-cyan-100 to-cyan-500"></div> */}
            <img src={dtoLogo} alt="DTO logo" className="h-[24px] min-w-[24px]" />
            <span className="font-bold">Digital Transformation Office</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NavLink to={"/"}>Home</NavLink>
          <Link href="about">About</Link>
          <NavLink>Contact Us</NavLink>
        </div>
      </div>
    </header>
  );
}
