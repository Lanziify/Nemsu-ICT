import React, { useEffect, useState } from "react";
import RequestList from "../../components/RequestList";
import {
  MdChevronLeft,
  MdHourglassEmpty,
  MdThumbUpOffAlt,
  MdDoneAll,
  MdOutlineCancel,
} from "react-icons/md";
import { FaPencilAlt, FaCheck, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { popUp } from "../../animations/variants";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import getTimeAgo from "../../utils/getTimeAgo";
import ResponseForm from "../../components/ResponseForm";
import ApiService from "../../api/apiService";
import RequestProgress from "../../components/RequestProgress";

export default function Requests() {
  const [requestList, setRequestList] = useState([]);
  const [userRequestList, setUserRequestList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const [dataTab, setDataTab] = useState({ index: 1, content: "Pending" });
  const [actionTaken, setActionTaken] = useState(false);
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

  const dataTabs = [
    {
      title: "Pending",
      icon: <MdHourglassEmpty />,
      style: "text-yellow-500",
    },
    {
      title: "Accepted",
      icon: <MdThumbUpOffAlt />,
      style: "text-green-500",
    },
    {
      title: "Completed",
      icon: <MdDoneAll />,
      style: "text-cyan-500",
    },
    {
      title: "Canceled",
      icon: <MdOutlineCancel />,
      style: "text-red-500",
    },
  ];

  const fetchRequests = async () => {
    try {
      const request = await ApiService.fetchUserRequests();
      setRequestList(request.data.request);
      setUserRequestList(request.data.request);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedList = [...userRequestList].sort((a, b) => {
    return b.createdAt._seconds - a.createdAt._seconds;
  });

  const filteredList = [...sortedList].filter((item) => {
    return item.status.includes(dataTab.content);
  });

  const filterRequest = (search, list) => {
    const result = list.filter((item) => {
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
      if (status === "Canceled") {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonColor: "#ef4444",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Cancel Request",
          cancelButtonText: "Return",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(true);
            ApiService.createResponse(requestId, status).then(() => {
              setLoading(false);
              setSelectedRequest();
            });
          }
          if (result.isDismissed) {
            setLoading(false);
          }
        });
        return;
      }

      setLoading(true);
      await ApiService.createResponse(requestId, status);
      setLoading(false);
      setSelectedRequest();
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
          <div className="mb-4 grid grid-cols-3 gap-4 [&>div]:shadow-sm">
            <div className="col-span-2 h-24 flex-1 rounded-md  bg-white"></div>
            <div className="row-span-2 flex-1 rounded-md bg-gray-300"></div>
            <div className="h-48 flex-1  rounded-md bg-white"></div>
            <div className="h-48 flex-1  rounded-md bg-white"></div>
          </div>

          <h1 className="mb-4 text-xl font-black text-gray-400">
            Request list
          </h1>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 ">
              {dataTabs.map((item, index) => (
                <div
                  className={`flex cursor-pointer items-center gap-1  rounded-full ${
                    index + 1 === dataTab.index
                      ? `bg-white`
                      : "bg-white opacity-50"
                  } px-4 py-2 text-sm font-semibold shadow-sm`}
                  key={index}
                  onClick={() =>
                    setDataTab({ index: index + 1, content: item.title })
                  }
                >
                  <div
                    className={`${
                      index + 1 === dataTab.index
                        ? `${item.style}`
                        : `${item.style}`
                    } `}
                  >
                    {item.icon}
                  </div>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-1 items-center">
              <FaSearch className="absolute ml-4 text-gray-400" size={18} />
              <input
                className="w-full rounded-full bg-white p-2 pl-[48px] text-gray-400 shadow-sm outline-none"
                type="text"
                placeholder="Search"
                onChange={(e) => filterRequest(e.target.value, requestList)}
              />
            </div>
          </div>

          <div className="rounded-md bg-white p-6 text-sm shadow-sm">
            <div className="overflow-x-auto rounded-md">
              <RequestList
                list={filteredList}
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
          {actionTaken && (
            <ResponseForm
              requestId={selectedRequest.requestId}
              activeForm={setActionTaken}
              setLoading={setLoading}
              setSelectedRequest={setSelectedRequest}
            />
          )}

          {/* Request Details */}
          <div
            className={`flex flex-col gap-4 rounded-md bg-white p-8 text-sm shadow-sm ${
              loading ? "[&>*]:animate-pulse" : ""
            }`}
          >
            {!actionTaken && (
              <div
                className="flex w-fit cursor-pointer items-center text-gray-400 duration-300 hover:text-gray-500"
                onClick={() => {
                  setSelectedRequest();
                  setActionTaken(false);
                  setLoading(false);
                }}
              >
                <MdChevronLeft size={24} />
                <p>Request List</p>
              </div>
            )}
            <RequestProgress request={selectedRequest} />

            <div className="flex h-9 items-center justify-between text-xs">
              {selectedRequest.status === "Accepted" && !actionTaken ? (
                <>
                  <h1 className="text-xl font-bold">Request Details</h1>
                  <Button
                    outlinePrimary
                    rounded="md"
                    iconStart={<FaPencilAlt />}
                    buttonText="Action taken"
                    onClick={() => setActionTaken(true)}
                  />
                </>
              ) : (
                <h1 className="text-xl font-bold">Request Details</h1>
              )}
            </div>
            <div>
              {requestDetails.map((item, index) => (
                <div
                  cell={item.cell}
                  className={`flex w-full justify-between text-gray-400 before:font-semibold before:text-gray-500 before:content-[attr(cell)] ${
                    item.cell === "Defects/Complaints"
                      ? "flex-col gap-1"
                      : "mb-1"
                  }`}
                  key={index}
                >
                  {item.data}
                </div>
              ))}
            </div>
            {selectedRequest.status === "Pending" && (
              <div className="flex justify-between gap-4">
                <Button
                  secondary
                  rounded="md"
                  width="full"
                  buttonText="Cancel Request"
                  onClick={() =>
                    handleResponse(selectedRequest.requestId, "Canceled")
                  }
                  disabled={loading}
                />
                <Button
                  success
                  rounded="md"
                  width="full"
                  buttonText="Accept Request"
                  onClick={() =>
                    handleResponse(selectedRequest.requestId, "Accepted")
                  }
                  disabled={loading}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
