import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MdChevronLeft } from "react-icons/md";
import { FaClipboardList, FaPlus, FaSearch } from "react-icons/fa";
import RequestList from "../../components/RequestList";
import { AnimatePresence, motion } from "framer-motion";
import { popUp, popUpItem } from "../../animations/variants";
import ApiService from "../../api/apiService";
import RequestProgress from "../../components/RequestProgress";
import getTimeAgo from "../../utils/getTimeAgo";

export default function Ongoing() {
  const { user } = useAuth();
  const [requestList, setRequestList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();

  const convertCreatedDate = (unixValue) => {
    const convert = new Date(unixValue * 1000);

    return convert.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      month: "2-digit",
      year: "2-digit",
    });
  };

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

  const fetchRequests = async () => {
    try {
      const request = await ApiService.fetchRequest(user.uid);
      setRequestList(request.data.request);
      setData(request.data.request);
    } catch (error) {}
  };

  const filterRequest = (search, list) => {
    const result = list.filter((item) => {
      return (
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.device.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(result);
  };

  const handleSelectedRequest = (request) => {
    setSelectedRequest(request);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      {!selectedRequest ? (
        <div className="rounded-md bg-white p-6 text-sm shadow-sm">
          <motion.div
            variants={popUpItem}
            className="flex flex-1 items-center sm:max-md:mb-4"
          >
            <FaSearch className="absolute ml-4 text-gray-400" size={18} />
            <input
              className="w-full rounded-full bg-gray-200 p-2 pl-[48px] text-gray-400 outline-none"
              type="text"
              placeholder="Search"
              onChange={(e) => filterRequest(e.target.value, requestList)}
            />
          </motion.div>
          <RequestList
            list={data}
            requestId
            device
            model
            status
            created
            handleSelected={handleSelectedRequest}
          />
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center justify-between rounded-md bg-white p-4 text-sm shadow-sm">
            <div
              className="flex w-fit cursor-pointer items-center text-gray-400 duration-300 hover:text-gray-500"
              onClick={() => {
                setSelectedRequest();
              }}
            >
              <MdChevronLeft size={24} />
              <p>Return</p>
            </div>
            <ul className="flex gap-2 uppercase">
              <li
                label="Request id. "
                className="before:font-bold  before:content-[attr(label)]"
              >
                {selectedRequest.requestId}
              </li>
              <li className="border border-black"></li>
              <li className="text-gray-400">{selectedRequest.status}</li>
            </ul>
          </div>
          <div className="mb-2 rounded-md bg-white p-6 text-sm shadow-sm">
            <RequestProgress request={selectedRequest} />
          </div>
          <div className="rounded-md bg-white p-6 text-sm shadow-sm">
            {requestDetails.map((item, index) => (
              <div
                cell={item.cell}
                className={`flex w-full justify-between text-gray-400 before:font-semibold before:text-black before:content-[attr(cell)] ${
                  item.cell === "Defects/Complaints" ? "flex-col gap-1" : "mb-1"
                }`}
                key={index}
              >
                {item.data}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
