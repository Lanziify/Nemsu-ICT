import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DtoTableList from "../../components/DtoTableList";
import {
  MdHourglassEmpty,
  MdThumbUpOffAlt,
  MdDoneAll,
  MdOutlineCancel,
} from "react-icons/md";
import ApiService from "../../api/apiService";
import DtoSearchBar from "../../components/DtoSearchBar";
import { filterItems } from "../../utils/filterItems";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Requests() {
  const navigate = useNavigate();
  const [searchedRequest, setSearchedRequest] = useState();

  const { requests } = useSelector((state) => state.requests);

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

  const handleRequestClick = (request) => {
    navigate(`${request.requestId}`);
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

  return (
    <>
      <div className="mb-4 flex items-center overflow-x-auto border-b border-gray-300">
        {tabItems.map((item, index) => (
          <NavLink
            className={({ isActive }) => {
              return (
                "relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all " +
                (isActive ? `text-cyan-500` : "hover:bg-gray-500/10 ")
              );
            }}
            to={`/request/${item.path}`}
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

      <div className="mb-4">
        <DtoSearchBar
          filterEnable={true}
          filterItems={filterItems(activeItems)}
          onFilterChange={handleFilterHeader}
          onSearchChange={handleRequestSearch}
        />
      </div>

      <div className="rounded-2xl bg-white p-6 text-sm shadow-sm max-sm:p-4">
        <div className="overflow-x-auto rounded-md">
          <DtoTableList
            list={filteredList}
            {...activeItems}
            onClick={handleRequestClick}
          />
        </div>
      </div>
    </>
  );
}
