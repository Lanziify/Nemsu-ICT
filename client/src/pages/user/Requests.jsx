import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MdChevronLeft } from "react-icons/md";
import { FaClipboardList, FaPlus, FaSearch } from "react-icons/fa";
import DtoTableList from "../../components/DtoTableList";
import { AnimatePresence, motion } from "framer-motion";
import { popUp, popUpItem } from "../../animations/variants";
import {
  MdHourglassEmpty,
  MdThumbUpOffAlt,
  MdDoneAll,
  MdOutlineCancel,
  MdFilterList,
} from "react-icons/md";
import ApiService from "../../api/apiService";
import RequestProgress from "../../components/RequestProgress";
import getTimeAgo from "../../utils/getTimeAgo";
import { convertCreatedDate } from "../../utils/timeUtils";
import DtoSearchBar from "../../components/DtoSearchBar";
import { filterItems } from "../../utils/filterItems";
import DtoFilterButton from "../../components/DtoFilterButton";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requestList, setRequestList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();

  const [activeItems, setActiveItems] = useState({
    requestId: true,
    name: true,
    email: true,
    position: true,
    office: true,
    device: true,
    brand: false,
    model: false,
    serial: false,
    property: false,
    status: true,
    created: true,
  });

  const requestDetails = [
    {
      cell: "Request Id",
      data: selectedRequest?.requestId,
    },
    {
      cell: "User Id",
      data: selectedRequest?.uid,
    },
    {
      cell: "Name",
      data: selectedRequest?.name,
    },
    {
      cell: "Email",
      data: selectedRequest?.email,
    },
    {
      cell: "Position",
      data: selectedRequest?.position,
    },
    {
      cell: "Device Type",
      data: selectedRequest?.device,
    },
    {
      cell: "Brand",
      data: selectedRequest?.brand,
    },
    {
      cell: "Brand Model",
      data: selectedRequest?.model,
    },
    {
      cell: "Serial Number",
      data: selectedRequest?.serial,
    },
    {
      cell: "Property Number",
      data: selectedRequest?.property,
    },
    {
      cell: "Status",
      data: selectedRequest?.status,
    },
    {
      cell: "Updated",
      data: selectedRequest?.updatedAt?._seconds
        ? getTimeAgo(selectedRequest?.updatedAt?._seconds)
        : "---",
    },
    {
      cell: "Date Requested",
      data: convertCreatedDate(selectedRequest?.createdAt?._seconds),
    },
    {
      cell: "Defects/Complaints",
      data: selectedRequest?.complaints,
    },
  ];

  const tabItems = [
    {
      title: "Pending",
      icon: <MdHourglassEmpty />,
      style: "text-yellow-500",
      path: "pending",
    },
    {
      title: "Accepted",
      icon: <MdThumbUpOffAlt />,
      style: "text-green-500",
      path: "accepted",
    },
    {
      title: "Completed",
      icon: <MdDoneAll />,
      style: "text-cyan-500",
      path: "completed",
    },
    {
      title: "Canceled",
      icon: <MdOutlineCancel />,
      style: "text-red-500",
      path: "canceled",
    },
  ];

  const fetchRequests = async () => {
    try {
      const request = await ApiService.fetchRequest(user.uid);
      setRequestList(request.data.request);
      setData(request.data.request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterHeader = (e) => {
    setActiveItems({
      ...activeItems,
      [e.target.name]: !activeItems[e.target.name],
    });
  };

  const handleSelectedRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleRequestClick = (request) => {
    navigate(`/request/${request.requestId}`);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <DtoSearchBar onChange={(e) => {}} />
        <DtoFilterButton
          filterItems={filterItems(activeItems)}
          onChange={handleFilterHeader}
        />
      </div>

      <div className="rounded-2xl bg-white p-6 text-sm shadow-sm max-sm:p-4">
        <div className="overflow-x-auto rounded-md">
          <DtoTableList
            list={data}
            {...activeItems}
            onClick={handleRequestClick}
          />
        </div>
      </div>
    </>
  );
}
