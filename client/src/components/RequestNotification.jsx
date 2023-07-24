import React, { useState } from "react";
import getTimeAgo from "../utils/getTimeAgo";
import { motion } from "framer-motion";
import { popUpItem } from "../animations/variants";

function RequestNotification(props) {
  const { notifications } = props;
  const sortedNotifications = [...notifications].sort(
    (a, b) => b.createdAt._seconds - a.createdAt._seconds
  );

  return (
    <>
      {sortedNotifications.map((notification, index) => (
        <motion.div
          variants={popUpItem}
          className="relative cursor-pointer rounded-md text-sm text-gray-500  hover:bg-gray-300/50 hover:duration-300 hover:ease-in-out"
          key={index}
        >
          <div className="flex items-center justify-between px-2 pt-2">
            <p className="font-semibold">
              {notification.data?.device} repair request
            </p>
            {!notification?.read && (
              <div className=" h-2 w-2 rounded-full bg-cyan-500"></div>
            )}
          </div>
          <div className="mb-2 px-2">
            <p className="line-clamp-2 text-justify">
              You have a repair request from {notification?.senderName}
            </p>
            <p
              className={`text-start ${
                !notification.read ? "text-cyan-500" : "text-gray-400"
              }`}
            >
              {getTimeAgo(notification.createdAt?._seconds)}
            </p>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default RequestNotification;
