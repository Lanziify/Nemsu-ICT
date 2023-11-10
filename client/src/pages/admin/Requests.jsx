import React, { useEffect, useState } from "react";
import DtoTableList from "../../components/DtoTableList";
import ApiService from "../../api/apiService";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MdHourglassEmpty,
  MdThumbUpOffAlt,
  MdDoneAll,
  MdOutlineCancel,
  MdFilterList,
} from "react-icons/md";
import { BsFiles, BsFilesAlt } from "react-icons/bs";
import LineChart from "../../components/LineChart";
import DoughnutChart from "../../components/DoughnutChart";
import AnimatedNumber from "../../components/AnimatedNumber";
import { AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { ACCEPTED, CANCELED, COMPLETED, PENDING } from "../../utils/status";
import Preloader from "../../components/Preloader";
import DtoSearchBar from "../../components/DtoSearchBar";
import { filterItems } from "../../utils/filterItems";

export default function Requests() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const { requests, fetchingRequests } = useSelector((state) => state.requests);
  const [searchedRequest, setSearchedRequest] = useState();

  const status = [
    { status: PENDING, style: "text-yellow-500" },
    { status: ACCEPTED, style: "text-teal-500" },
    { status: COMPLETED, style: "text-cyan-500" },
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

  const filteredList = (searchedRequest ? searchedRequest : requests).filter(
    (item) => {
      return item.status.toLowerCase().includes(
        location.pathname
          .split("/")
          .filter((segment) => segment !== "")
          .pop()
      );
    }
  );

  const handleRequestSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const result = filteredList.filter((item) => {
      return (
        item.requestId.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.device.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
      );
    });
    console.log(result);
    e.target.value ? setSearchedRequest(result) : setSearchedRequest();
  };

  const handleFilterHeader = (e) => {
    setActiveItems({
      ...activeItems,
      [e.target.name]: !activeItems[e.target.name],
    });
  };

  const getStatusTotal = (status) => {
    const total = requests.filter((item) => {
      return item.status.toLowerCase().includes(status.toLowerCase());
    });
    return total.length;
  };

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
            // setIsResponding(true);
            ApiService.createResponse(requestId, status).then(() => {
              // setIsResponding(false);
            });
          }
          if (result.isDismissed) {
            // setIsResponding(false);
          }
        });
        return;
      }

      // setIsResponding(true);
      await ApiService.createResponse(requestId, status);
      // setIsResponding(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestClick = (request) => {
    navigate(`request/${request.requestId}`);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("filteredTable");
    if (data) {
      setActiveItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("filteredTable", JSON.stringify(activeItems));
  }, [activeItems]);

  return !fetchingRequests ? (
    <>
      <div className="mb-4 grid grid-cols-3 gap-4 [&>div]:rounded-2xl [&>div]:shadow-sm [&>div]:max-sm:col-span-full">
        <div className="col-span-2 h-48 flex-1 overflow-hidden bg-white p-4 max-sm:p-0">
          <LineChart requests={requests} />
        </div>
        <div className="flex-1 bg-white p-4">
          <DoughnutChart requests={requests} />
        </div>
        {status.map((item, index) => (
          <div
            className={`relative flex flex-1 items-center justify-center bg-white p-4 ${item.style} overflow-hidden`}
            key={index}
          >
            <div className="absolute -left-4 top-0 rotate-45 opacity-20 blur-md">
              <BsFiles size={125} />
            </div>
            <div className="absolute -right-4 bottom-0 -rotate-12 opacity-20 blur-md">
              <BsFilesAlt size={125} />
            </div>
            <div className="text-center font-bold ">
              <div className="text-7xl">
                <AnimatedNumber number={getStatusTotal(item.status)} />
              </div>
              <p className="text-xs">Total {item.status} Requests</p>
            </div>
          </div>
        ))}
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
              ></div>
              <p>{item.title}</p>
              {location.pathname.endsWith(item.path) && (
                <span className="absolute bottom-0 left-0 right-0 m-auto h-[2px] w-[calc(100%_-_48px)] bg-cyan-500"></span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <DtoSearchBar
            filterEnable={true}
            filterItems={filterItems(activeItems)}
            onFilterChange={handleFilterHeader}
            onSearchChange={handleRequestSearch}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 text-sm shadow-sm max-sm:p-4">
        <div className="overflow-x-auto rounded-md">
          <AnimatePresence initial={false}>
            <DtoTableList
              list={filteredList}
              {...activeItems}
              admin
              handleResponse={handleResponse}
              onClick={handleRequestClick}
            />
          </AnimatePresence>
        </div>
      </div>
    </>
  ) : (
    <>
      <Preloader />
    </>
  );
}
