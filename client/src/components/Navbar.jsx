import React, { useState, useEffect, useRef } from "react";
import {
  IoMenu,
  IoPersonCircle,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import DtoNotification from "./DtoNotification";
import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { messaging } from "../config/firebase-config";
import { toast } from "react-toastify";
import notificationRingtone from "../assets/notification.mp3";
import { AnimatePresence, motion } from "framer-motion";
import { fadeDefault, popUp, popUpItem } from "../animations/variants";
import ApiService from "../api/apiService";

function Navbar(props) {
  const { user, userProfile, logoutUser } = useAuth();
  const { toggleDrawer, isCreatingRequest } = props;
  const [notifications, setNotification] = useState([]);

  const [unreadNotifications, setUnreadNotifications] = useState();
  const [isProfileToggled, setIsProfileToggled] = useState(false);
  const [isNotificationToggled, setIsNotificationToggled] = useState(false);
  // Refs
  const notificationButton = useRef(null);
  const notificationFloater = useRef(null);
  const profileButton = useRef(null);
  const profileFloater = useRef(null);

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

  const fetchNotifications = async () => {
    try {
      const notifications = await ApiService.fetchNotifications(user.uid);
      setNotification(notifications.data.notification);
      const unread = notifications.data.notification.filter(
        (notification) => notification.read === false
      ).length;

      setUnreadNotifications(unread);
    } catch (error) {
      console.log(error);
    }
  };

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BItYMIPmv1rk5OeMPmz2__C1LaALFQZs-eRDr0JojHd8Hj3PyelNHMz5xzGgH-j1jRLecKyMVDP_wiRceSQvbDo",
      });
      await ApiService.updateFcm(user.uid, token);
    } else {
      await deleteToken(messaging);
      await ApiService.updateFcm(user.uid, null);
    }
  };

  const ToastifyNotification = ({ title, body }) => (
    <>
      <div className="mb-2 flex items-center gap-2">
        <img className="max-h-6 rounded-full" src={logo} />
        <h1 className="text-sm font-bold">{title}</h1>
      </div>
      <p className="text-xs">{body}</p>
    </>
  );

  useEffect(() => {
    requestPermission();
    try {
      onMessage(messaging, (payload) => {
        toast(
          <ToastifyNotification
            title={payload.data.title}
            body={payload.data.subtitle}
          />,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        fetchNotifications();

        const ringtone = new Audio(notificationRingtone);
        ringtone.play();
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isNotificationToggled &&
        notificationFloater.current &&
        !notificationFloater.current.contains(e.target) &&
        notificationButton.current &&
        !notificationButton.current.contains(e.target)
      ) {
        setIsNotificationToggled(false);
      }

      if (
        profileFloater.current &&
        !profileFloater.current.contains(e.target) &&
        profileButton.current &&
        !profileButton.current.contains(e.target)
      ) {
        setIsProfileToggled(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNotificationToggled, isProfileToggled]);

  return (
    <header className="no_selection sticky top-0 z-10 bg-white text-sm text-gray-500 shadow-sm">
      {/* Left side div */}
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <div
            className="cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-gray-200 "
            onClick={toggleDrawer}
          >
            <IoMenu size={24} />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[36px] min-w-[36px] rounded-full border bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
            <span className="font-bold">Digital Transformation Office</span>
          </div>
        </div>

        <div className=" flex items-stretch gap-4">
          {/* Notification */}
          <div
            className="relative flex items-center p-1"
            onClick={() => setIsNotificationToggled(!isNotificationToggled)}
          >
            <div className="cursor-pointer" ref={notificationButton}>
              <div>
                <IoNotificationsOutline size={24} />
              </div>
              {unreadNotifications ? (
                <div
                  className="no_selection absolute right-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-cyan-500  text-white"
                  onClick={() =>
                    setIsNotificationToggled(!isNotificationToggled)
                  }
                >
                  <p className="text-[10px]">{unreadNotifications}</p>
                </div>
              ) : null}
            </div>
            {/* Notification floater */}
            <AnimatePresence>
              {isNotificationToggled && (
                <motion.div
                  variants={popUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  ref={notificationFloater}
                  className="sm:max-md: absolute right-0 top-full -z-10 mt-4 flex w-[360px] flex-col rounded-md bg-white p-4 text-gray-500 shadow-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <motion.h1
                    variants={popUpItem}
                    className="mb-2 text-2xl font-bold"
                  >
                    Notifications
                  </motion.h1>
                  <DtoNotification notifications={notifications} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Create request button */}
          {!userProfile.claims.admin && (
            <Button
              primary
              rounded="md"
              buttonText="Create a request"
              onClick={isCreatingRequest}
            />
          )}
          {/* Profile */}
          <div className="relative flex cursor-pointer items-center">
            <div
              ref={profileButton}
              className="rounded-full text-cyan-500"
              onClick={() => setIsProfileToggled(!isProfileToggled)}
            >
              <IoPersonCircle size={36} />
            </div>

            {/* Profile floater */}
            <AnimatePresence>
              {isProfileToggled && (
                <motion.div
                  variants={popUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  ref={profileFloater}
                  className="absolute right-0 top-full -z-10 mt-4 min-w-[280px] rounded-md bg-white p-4 text-gray-500 shadow-xl"
                >
                  <div className="mb-2">
                    <div className="m-auto mb-2 h-[96px] max-w-[96px] rounded-full bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
                    <p className="mb-2 text-center">{user.email}</p>
                    <Button
                      width="full"
                      rounded="md"
                      buttonText="Manage profile"
                    />
                  </div>
                  <div className="py-2">
                    {items.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        className="flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-2 font-semibold  hover:bg-gray-300/50"
                      >
                        <div>{item.icon}</div>
                        <p>{item.name}</p>
                      </NavLink>
                    ))}
                  </div>
                  <hr />
                  <a
                    className="mt-2 flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-2 font-semibold  hover:bg-gray-300/50"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline size={24} />
                    <p>Logout</p>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
