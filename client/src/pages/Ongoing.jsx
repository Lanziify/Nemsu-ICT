import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { FaClipboardList, FaPlus, FaSearch } from "react-icons/fa";
import getTimeAgo from "../utils/getTimeAgo";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";
import FormInput from "../components/FormInput";

export default function Ongoing() {
  const { user } = useAuth();
  const [userRequests, setUserRequests] = useState([]);
  const [createNewRequest, setCreateNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState();
  const [openRequest, setOpenRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const handleOnClick = (request) => {
    setSelectedRequest(request);
    setCreateNewRequest(false);
    setOpenRequest(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setData(userRequests);
    } else {
      filterRequest(e.target.value);
    }
  };

  const filterRequest = (search) => {
    const result = userRequests.filter((item) => {
      return (
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.device.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(result);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/${user.uid}`)
      .then((res) => {
        setUserRequests(res.data.request);
        setData(res.data.request);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className={`h-full ${createNewRequest || openRequest ? "relative" : ""}`}
    >
      <div className="text-sm text-gray-500">
        <div className="overflow-hidden">
          {/* Request List Head */}
          <div className="relative flex flex-col gap-6 p-6 justify-center">
            <div className="flex items-center gap-3 text-white">
              <div className="p-3 bg-blue-500 rounded-full ">
                <FaClipboardList size={24} />
              </div>
              <h1 className="font-black text-4xl text-blue-500">
                All requests
              </h1>
            </div>

            <div className="flex justify-between gap-6">
              <div className="flex-1 flex items-center">
                <FaSearch className="absolute ml-4 text-gray-400" size={24} />
                <input
                  className="w-full p-3 pl-[48px] bg-gray-200 hover:bg-gray-300 text-gray-400 outline-none rounded-full transition-all duration-300 ease-in-out"
                  value={searchQuery}
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
              <div>
                <button
                  className="px-4 h-full flex items-center gap-2 rounded-full text-white font-bold bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setCreateNewRequest(true);
                    setSelectedRequest({});
                    setOpenRequest(false);
                  }}
                >
                  <p>New request</p>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Renders all the request into
          a div with all the fields that the user register
          in the firestore collection*/}
          <RequestList list={data} onClickHandler={handleOnClick} />
        </div>
      </div>

      {/* This div will be render when state of createNewRequest and OpenRequest is true */}
      {createNewRequest || openRequest ? (
        <div className="absolute w-full top-0 bottom-0 z-0 flex justify-center items-center bg-black/50 ">
          {createNewRequest && (
            <div
              className={`text-sm rounded-md overflow-hidden transition-all ease-in-out duration-300 ${
                createNewRequest ? "max-w-md visible" : "w-0 invisible"
              }`}
            >
              <RequestForm
                user={user}
                cancelButton={true}
                closeForm={() => setCreateNewRequest(false)}
              />
            </div>
          )}
          {openRequest && (
            <div
              className={`text-sm rounded-md overflow-hidden transition-all ease-in-out duration-300 ${
                openRequest ? "max-w-md visible" : "w-0 invisible"
              }`}
            >
              <RequestForm
                user={user}
                openSelectedRequest={openRequest}
                selectedRequest={selectedRequest}
                closeForm={() => {
                  setOpenRequest(false);
                  setSelectedRequest({});
                }}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
