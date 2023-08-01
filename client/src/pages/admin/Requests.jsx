import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";
import RequestList from "../../components/RequestList";
import { MdChevronLeft } from "react-icons/md";
import { FaClipboardList, FaPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { popUp } from "../../animations/variants";
import Button from "../../components/Button";
import getTimeAgo from "../../utils/getTimeAgo";

export default function Requests() {
  const [requestList, setRequestList] = useState([]);
  const [userRequestList, setUserRequestList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const [loading, setLoading] = useState(false);

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

  const selectedRequestItem = [
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
  ];

  const fetchRequests = async () => {
    try {
      const request = await axios.get(`${baseURL}/requests`);
      setRequestList(request.data.request);
      setUserRequestList(request.data.request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setUserRequestList(requestList);
    } else {
      filterRequest(e.target.value);
    }
  };

  const filterRequest = (search) => {
    const result = requestList.filter((item) => {
      return (
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.device.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase())
      );
    });
    setUserRequestList(result);
  };

  const handleResponse = async (requestId, status) => {
    try {
      setLoading(true);
      await axios.put(`${baseURL}/request/${requestId}`, {
        status,
      });
      setLoading(false);
      if (selectedRequest) {
        setSelectedRequest();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedRequest = (request) => {
    setSelectedRequest(request);
  };

  useEffect(() => {
    fetchRequests();
  }, [loading]);


  return (
    <>
      {!selectedRequest ? (
        <div>
          <div className="mb-4 flex items-center gap-2">
            {/* <div className="rounded-full bg-cyan-500 p-2 text-white">
              <FaClipboardList size={18} />
            </div> */}
            <h1 className="text-xl font-black text-gray-400">User requests</h1>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4 [&>div]:shadow-sm">
            <div className="col-span-2 h-24 flex-1 rounded-md  bg-white"></div>
            <div className="row-span-2 flex-1 rounded-md bg-gray-300"></div>
            <div className="h-48 flex-1  rounded-md bg-white"></div>
            <div className="h-48 flex-1  rounded-md bg-white"></div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-black text-gray-400">Request list</h1>

            <div className="flex items-center">
              <FaSearch className="absolute ml-4 text-gray-400" size={18} />
              <input
                className="w-full rounded-full bg-white p-2 pl-[48px] text-gray-400 shadow-sm outline-none"
                type="text"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="rounded-md bg-white p-6 text-sm text-gray-500 shadow-sm">
            <div className="overflow-x-auto rounded-md">
              <RequestList
                list={userRequestList}
                requestId
                name
                email
                position
                device
                brand
                model
                serial
                property
                status
                created
                admin
                handleResponse={handleResponse}
                handleSelected={handleSelectedRequest}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`flex flex-col gap-4 rounded-md bg-white p-8 text-sm text-gray-500 shadow-sm ${
              loading ? "[&>*]:animate-pulse" : ""
            }`}
          >
            <div
              className="flex w-fit cursor-pointer items-center text-gray-400 duration-300 hover:text-gray-500"
              onClick={() => setSelectedRequest()}
            >
              <MdChevronLeft size={24} />
              <p>Request List</p>
            </div>
            <h1 className="text-xl font-bold">Request Details</h1>
            <hr />
            <div>
              {selectedRequestItem.map((item, index) => (
                <div
                  cell={item.cell}
                  className="mb-1 flex w-full justify-between text-gray-400 before:font-semibold before:text-gray-500 before:content-[attr(cell)]"
                  key={index}
                >
                  {item.data}
                </div>
              ))}
              <label htmlFor="complaints" className="font-semibold">
                Complaints/Defect
              </label>
            </div>
            <textarea
              name="complaints"
              id="complaints"
              className="rounded-md border bg-transparent p-2 text-gray-400 outline-none"
              value={selectedRequest.complaints}
              rows="8"
              disabled
            />
            {selectedRequest.status != "Accepted" && (
              <Button
                success
                rounded="md"
                buttonText="Accept"
                onClick={() =>
                  handleResponse(selectedRequest.requestId, "Accepted")
                }
                disabled={loading}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
