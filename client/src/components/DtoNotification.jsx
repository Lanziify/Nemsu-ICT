import React, { useState } from "react";
import getTimeAgo from "../utils/getTimeAgo";
import { motion } from "framer-motion";
import { popUpItem } from "../animations/variants";

function DtoNotification(props) {
  const { notifications, selectedNotification } = props;

  const sortedNotifications = [...notifications].sort(
    (a, b) => b.createdAt._seconds - a.createdAt._seconds
  );

  return (
    <>
      {sortedNotifications.map((notification, index) => (
        <motion.div
          variants={popUpItem}
          className="relative cursor-pointer rounded-xl text-sm hover:bg-gray-500/10"
          key={index}
          onClick={() => {
            selectedNotification(notification);
          }}
        >
          <div className="flex items-center gap-2 p-2">
            <div className="h-8 w-8 self-start rounded-full  bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
            <div className="flex-1 ">
              <p
                className={`text-md font-bold ${
                  !notification.read ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                {notification.title}
              </p>
              <p
                className={`${
                  !notification.read ? "font-semibold" : "text-gray-500"
                }`}
              >
                {notification?.body}
              </p>
              <p
                className={`text-start text-xs ${
                  !notification.read ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                {getTimeAgo(notification.createdAt?._seconds)}
              </p>
            </div>
            {!notification?.read && (
              <div className=" h-2 w-2 rounded-full bg-cyan-500"></div>
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default DtoNotification;
