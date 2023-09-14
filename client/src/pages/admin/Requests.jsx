import React, { useEffect, useRef, useState } from "react";
import RequestList from "../../components/RequestList";
import ApiService from "../../api/apiService";
import { NavLink, useLocation, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../redux/requestSlice";
import {
  MdHourglassEmpty,
  MdThumbUpOffAlt,
  MdDoneAll,
  MdOutlineCancel,
  MdFilterList,
} from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { BsFiles, BsFilesAlt } from "react-icons/bs";

// import { createPopper } from '@popperjs/core';

import LineChart from "../../components/LineChart";
import DoughnutChart from "../../components/DoughnutChart";
import AnimatedNumber from "../../components/AnimatedNumber";
import { AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import { ACCEPTED, CANCELED, COMPLETED, PENDING } from "../../utils/status";
import { usePopper } from "react-popper";

export default function Requests() {
  const { isAdmin } = useOutletContext();
  const location = useLocation();
  const dispatch = useDispatch();

  const { requests } = useSelector((state) => state.requests);
  const { isFetchingNotification } = useSelector(
    (state) => state.notifications
  );
  const [searchedRequest, setSearchedRequest] = useState();
  const [isResponding, setIsResponding] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [activeItems, setActiveItems] = useState({
    requestId: true,
    name: true,
    email: true,
    position: true,
    office: true,
    device: true,
    brand: true,
    model: true,
    serial: true,
    property: true,
    status: true,
    created: true,
  });

  const filterContainer = useRef();
  const popperReference = useRef();
  const popperElement = useRef();

  const { styles, attributes } = usePopper(
    popperReference.current,
    popperElement.current,
    {
      placement: "bottom-end",
    }
  );

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

  const filterItems = [
    {
      title: "Name",
      item: "name",
      value: activeItems.name,
    },
    {
      title: "Email",
      item: "email",
      value: activeItems.email,
    },
    {
      title: "Position",
      item: "position",
      value: activeItems.position,
    },
    {
      title: "Office",
      item: "office",
      value: activeItems.office,
    },
    {
      title: "Device",
      item: "device",
      value: activeItems.device,
    },
    {
      title: "Brand",
      item: "brand",
      value: activeItems.brand,
    },
    {
      title: "Model",
      item: "model",
      value: activeItems.model,
    },
    {
      title: "Serial No.",
      item: "serial",
      value: activeItems.serial,
    },
    {
      title: "Property No.",
      item: "property",
      value: activeItems.property,
    },
    {
      title: "Status",
      item: "status",
      value: activeItems.status,
    },
  ];

  const getStatusTotal = (status) => {
    const total = requests.filter((item) => {
      return item.status.toLowerCase().includes(status.toLowerCase());
    });
    return total.length;
  };

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

  useEffect(() => {
    dispatch(fetchRequests());
  }, [isFetchingNotification, isResponding]);

  useEffect(() => {
    const data = window.localStorage.getItem("filteredTable");
    setActiveItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "filteredTable",
      JSON.stringify(activeItems, undefined, 2)
    );
  }, [activeItems]);

  useEffect(() => {
    const outsideClick = (e) => {
      if (!filterContainer.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, []);

  return (
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

        <div className="flex items-center justify-between gap-4">
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
          {isAdmin && (
            <div ref={filterContainer}>
              <div
                ref={popperReference}
                className="no_selection m-auto w-fit cursor-pointer rounded-full bg-white p-2 shadow-sm duration-300 hover:bg-gray-200"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              >
                <MdFilterList size={20} />
              </div>
              <div
                ref={popperElement}
                className={`z-[1] mt-2 rounded-md border bg-white p-3  ${
                  showFilter ? "visible opacity-100" : "invisible opacity-0"
                } transition-all duration-150`}
                style={styles.popper}
                {...attributes.popper}
              >
                {filterItems.map((item, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      className="accent-cyan-600"
                      type="checkbox"
                      name={item.item}
                      id={index}
                      value={item.value}
                      onChange={handleFilterHeader}
                      checked={item.value}
                      autoComplete="off"
                    />
                    <p className="text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 text-sm shadow-sm max-sm:p-4">
        <div className="overflow-x-auto rounded-md">
          <AnimatePresence initial={false}>
            <RequestList
              list={filteredList}
              {...activeItems}
              admin
              handleResponse={handleResponse}
            />
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
