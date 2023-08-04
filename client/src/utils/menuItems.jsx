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
    name: "Requests",
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
    path: "/users",
    name: "Manage users",
    icon: <IoPeople size={24} />,
  },
  {
    path: "/requests",
    name: "Repair requests",
    icon: <IoDocuments size={24} />,
  },
];
