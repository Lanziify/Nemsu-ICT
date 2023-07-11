import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCarrot, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="no_selection flex px-6 justify-between text-gray-500">
      <div className="py-2 flex gap-2 items-center">
        <img className="max-h-8 rounded-full" src={logo} />
        <span className="font-bold">NEMSU - Tagbina Campus</span>
      </div>
      <div className="py-4 flex gap-4">
        <NavLink to={'/'}>Home</NavLink>
        <Link href="about">About</Link>
        <NavLink>Contact Us</NavLink>
      </div>
    </nav>
  );
}
