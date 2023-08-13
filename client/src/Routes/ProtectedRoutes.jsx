import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import ModalBackdrop from "../components/ModalBackdrop";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { fadeDefault } from "../animations/variants";
import RequestForm from "../components/RequestForm";
import MenuDrawer from "../components/MenuDrawer";

function ProtectedRoutes({ allowedUser }) {
  const { user, userProfile } = useAuth();
  const [isToggled, setIsToggled] = useState(true);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

  const handleDrawerToggle = () => {
    setIsToggled(!isToggled);
  };

  const setOpenSideBar = (close) => {
    setIsToggled(close);
  };

  const handleCreateRequest = () => {
    setIsCreatingRequest(true);
  };
  
  return allowedUser.includes(userProfile?.claims?.admin) ? (
    <>
      <div className="relative">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="relative flex min-h-screen flex-col bg-gray-100">
          <Navbar
            toggleDrawer={handleDrawerToggle}
            isCreatingRequest={handleCreateRequest}
          />
          <AnimatePresence>
            {isCreatingRequest && (
              <ModalBackdrop onClick={() => setIsCreatingRequest(false)}>
                <RequestForm user={user} closeForm={setIsCreatingRequest} />
              </ModalBackdrop>
            )}
          </AnimatePresence>
          <div className="mx-auto flex h-full w-full max-w-7xl gap-4 p-4">
            <Sidebar isToggled={isToggled} isAdmin={userProfile.claims.admin} />
            <MenuDrawer
              isToggled={isToggled}
              isAdmin={userProfile.claims.admin}
              isMenuActive={setOpenSideBar}
            />
            <main className="w-full min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="" />
  );
}

export default ProtectedRoutes;
