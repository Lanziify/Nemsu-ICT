import React, { useEffect, useState } from "react";
import RequestList from "../../components/RequestList";
import ApiService from "../../api/apiService";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../redux/requestSlice";
import {
  MdHourglassEmpty,
  MdThumbUpOffAlt,
  MdDoneAll,
  MdOutlineCancel,
} from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { AnimatePresence } from "framer-motion";
import { CANCELED } from "../../utils/status";

export default function Requests() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { isFetchingNotification } = useSelector(
    (state) => state.notifications
  );
  const [searchedRequest, setSearchedRequest] = useState("");
  const [selectedRequest, setSelectedRequest] = useState();
  const [isResponding, setIsResponding] = useState(false);

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

  const handleRequestSearch = (search, list) => {
    const result = list.filter((item) => {
      return (
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.device.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase())
      );
    });
    search ? setSearchedRequest(result) : setSearchedRequest();
  };

  const getSortList = () => {
    if (searchedRequest) {
      return [...searchedRequest];
    } else {
      return [...requests];
    }
  };

  const sortedList = getSortList().sort((a, b) => {
    return b.createdAt._seconds - a.createdAt._seconds;
  });

  const filteredList = [...sortedList].filter((item) => {
    return item.status.toLowerCase().includes(
      location.pathname
        .split("/")
        .filter((segment) => segment !== "")
        .pop()
    );
  });

  const handleResponse = async (requestId, status) => {
    try {
      if (status === CANCELED) {
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
            setIsResponding(true);
            ApiService.createResponse(requestId, status).then(() => {
              setIsResponding(false);
            });
          }
          if (result.isDismissed) {
            setIsResponding(false);
          }
        });
        return;
      }

      setIsResponding(true);
      await ApiService.createResponse(requestId, status);
      setIsResponding(false);
      // setSelectedRequest();
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    dispatch(fetchRequests());
    console.log('rerender')
  }, [isFetchingNotification, isResponding]);

  return (
    <>
      <div>
        <div className="mb-4 grid grid-cols-3 gap-4 [&>div]:rounded-2xl [&>div]:shadow-sm">
          <div className="col-span-2 h-24 flex-1 bg-white"></div>
          <div className="row-span-2 flex-1 bg-gray-300"></div>
          <div className="h-48 flex-1 bg-white"></div>
          <div className="h-48 flex-1 bg-white"></div>
        </div>

        <h1 className="mb-4 text-xl font-black text-gray-400">Request List</h1>

        <div className="mb-4 flex flex-col justify-between gap-4">
          <div className="flex items-center overflow-x-auto border-b border-gray-300">
            {tabItems.map((item, index) => (
              <NavLink
                className={({ isActive }) => {
                  return (
                    "relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all " +
                    (isActive ? `text-cyan-500` : "hover:bg-gray-500/10 ")
                  );
                }}
                to={`/list/${item.path}`}
                key={index}
              >
                <div
                  className={`${
                    location.pathname.endsWith(item.path)
                      ? `text-cyan-500`
                      : `${item.style}`
                  }`}
                >
                  {item.icon}
                </div>
                <p>{item.title}</p>
                {location.pathname.endsWith(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 m-auto h-[2px] w-[calc(100%_-_48px)] bg-cyan-500"></span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-1 items-center">
            <FaSearch className="absolute ml-4 text-gray-400" size={18} />
            <input
              className="w-full rounded-full bg-white p-2 pl-[48px] text-gray-400 shadow-sm outline-none"
              type="text"
              placeholder="Search"
              onChange={(e) =>
                handleRequestSearch(e.target.value, filteredList)
              }
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 text-sm shadow-sm">
          <div className="overflow-x-auto rounded-md">
            <AnimatePresence initial={false}>
              <RequestList
                list={filteredList}
                requestId
                name
                email
                position
                office
                device
                brand
                model
                serial
                property
                status
                created
                admin
                handleResponse={handleResponse}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
