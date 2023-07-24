import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCarrot, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="no_selection flex justify-between px-6 text-gray-500">
      <div className="flex items-center gap-2 py-2">
        <img className="max-h-8 rounded-full" src={logo} />
        <span className="font-bold">NEMSU - Tagbina Campus</span>
      </div>
      <div className="flex gap-4 py-4">
        <NavLink to={"/"}>Home</NavLink>
        <Link href="about">About</Link>
        <NavLink>Contact Us</NavLink>
      </div>
    </nav>
  );
}
