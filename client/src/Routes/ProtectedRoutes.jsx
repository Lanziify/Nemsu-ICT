import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isSidebarToggled, setIsSidebarToggled] = useState(true);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 960);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

  const handleDrawerToggle = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const setSidebar = (close) => {
    setIsSidebarToggled(close);
  };

  if (window.innerWidth <= 960 && isSidebarToggled && !showSidebar) {
    document.body.classList.add("dto-menu-shown");
  } else {
    document.body.classList.remove("dto-menu-shown");
  }

  const handleCreateRequest = () => {
    setIsCreatingRequest(true);
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!showSidebar) {
      setIsSidebarToggled(!isSidebarToggled);
    } else {
      setIsSidebarToggled(true);
    }
  }, [showSidebar]);
  

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
            isToggled={handleDrawerToggle}
            isCreatingRequest={handleCreateRequest}
            setToggled={setSidebar}
          />
          <AnimatePresence>
            {isCreatingRequest && (
              <ModalBackdrop onClick={() => setIsCreatingRequest(false)}>
                <RequestForm user={user} closeForm={setIsCreatingRequest} />
              </ModalBackdrop>
            )}
          </AnimatePresence>
          <div className="mx-auto flex h-full w-full max-w-7xl gap-4 p-4">
            <Sidebar
              isToggled={showSidebar && isSidebarToggled}
              isAdmin={userProfile.claims.admin}
            />
            <MenuDrawer
              isToggled={!showSidebar && isSidebarToggled}
              isAdmin={userProfile.claims.admin}
              closeSidebar={setSidebar}
            />
            <main className="min-h-[calc(100vh_-_88px)] w-full min-w-0">
              <Outlet context={{isAdmin: userProfile.claims.admin}}/>
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
