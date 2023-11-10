import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import ModalBackdrop from "../components/ModalBackdrop";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import RequestForm from "../components/RequestForm";
import MenuDrawer from "../components/MenuDrawer";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading, setError } from "../redux/requestSlice";
import { setDtoLoading } from "../redux/dtoLoadingSlice";
import Preloader from "../components/Preloader";

function ProtectedRoutes({ allowedUser }) {
  const { user, userToken } = useAuth();
  const dispatch = useDispatch();

  const dtoRequestsRef = collection(firestore, "requests");
  const requestQuery = query(dtoRequestsRef, orderBy("createdAt", "desc"));
  const userRequestQuery = query(
    dtoRequestsRef,
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const [adminRequestList, adminRequestFetchloading, adminError] =
    useCollectionData(requestQuery);
  const [userRequests, userRequestFetchloading, userError] =
    useCollectionData(userRequestQuery);

  const { isDtoLoading } = useSelector((state) => state.dtoLoading);

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

  useEffect(() => {
    try {
      if (userToken.claims.admin) {
        const stringyfiedList = JSON.stringify(adminRequestList);
        dispatch(setLoading(adminRequestFetchloading));
        if (stringyfiedList) {
          const parsedList = JSON.parse(stringyfiedList);
          dispatch(setData(parsedList));
        }
      } else {
        const stringyfiedList = JSON.stringify(userRequests);
        dispatch(setLoading(userRequestFetchloading));
        if (stringyfiedList) {
          const parsedList = JSON.parse(stringyfiedList);
          dispatch(setData(parsedList));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [adminRequestList, userRequests]);

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(setDtoLoading(false));
  //   }, 3000);
  // }, [isDtoLoading]);

  if ((isDtoLoading && adminRequestFetchloading) || userRequestFetchloading) {
    return <Preloader />;
  }

  return allowedUser.includes(userToken?.claims?.admin) ? (
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
              isAdmin={userToken.claims.admin}
            />
            <MenuDrawer
              isToggled={!showSidebar && isSidebarToggled}
              isAdmin={userToken.claims.admin}
              closeSidebar={setSidebar}
            />
            <main className="relative min-h-[calc(100vh_-_88px)] w-full min-w-0">
              <Outlet context={{ isAdmin: userToken.claims.admin }} />
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
