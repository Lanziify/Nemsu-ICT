import {
  MdHome,
  MdCreate,
  MdOutlineHourglassFull,
  MdCheckCircle,
  MdSpaceDashboard,
  MdCancel,
  MdEditDocument,
} from "react-icons/md";
import { IoPeople, IoDocuments, IoNotifications } from "react-icons/io5";

export const userItems = [
  {
    path: "/home",
    name: "Home",
    icon: <MdHome size={24} />,
  },
  {
    path: "/ongoing",
    name: "Ongoing Requests",
    icon: <MdEditDocument size={24} />,
  },
];

export const adminItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdSpaceDashboard size={24} />,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: <IoNotifications size={24} />,
  },
  {
    path: "/users",
    name: "Manage Users",
    icon: <IoPeople size={24} />,
  },
  {
    path: "/list",
    name: "Request List",
    icon: <IoDocuments size={24} />,
  },
];
