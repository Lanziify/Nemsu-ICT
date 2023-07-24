import {
    MdHome,
    MdCreate,
    MdOutlineHourglassFull,
    MdCheckCircle,
    MdSpaceDashboard,
    MdCancel,
    MdEditDocument,
  } from "react-icons/md";
  import { IoPeople, IoDocuments } from "react-icons/io5";


export const userItems = [
    {
      path: "/home",
      name: "Home",
      icon: <MdHome size={24} />,
    },
    {
      path: "/ongoing",
      name: "Ongoing",
      icon: <MdOutlineHourglassFull size={24} />,
    },
    {
      path: "/completed",
      name: "Completed",
      icon: <MdCheckCircle size={24} />,
    },
    {
      path: "/canceled",
      name: "Canceled",
      icon: <MdCancel size={24} />,
    },
  ];

export  const adminItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdSpaceDashboard size={24} />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <IoPeople size={24} />,
    },
    {
      path: "/requests",
      name: "Request",
      icon: <IoDocuments size={24} />,
    },
  ];