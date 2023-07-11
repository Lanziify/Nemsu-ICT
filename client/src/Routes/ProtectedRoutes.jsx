import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ProtectedRoutes({ allowedUser }) {
  const { user, userProfile } = useAuth();
  const [isToggled, setIsToggled] = useState(true);

  const handleDrawerToggle = () => {
    setIsToggled(!isToggled);
  };

  const setOpenSideBar = (isOpen) => {
    setIsToggled(isOpen);
  };

  return userProfile?.claims?.admin === allowedUser ? (
    <>
      <Navbar toggleDrawer={handleDrawerToggle} />
      <div className="flex pt-14">
        <Sidebar isToggled={isToggled} setOpenSideBar={setOpenSideBar} />
        <div className="flex-1 min-h-[calc(100vh_-_56px)] bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="" />
  );
}

export default ProtectedRoutes;
