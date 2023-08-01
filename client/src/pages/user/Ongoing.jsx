import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { FaClipboardList, FaPlus, FaSearch } from "react-icons/fa";
import RequestForm from "../../components/RequestForm";
import RequestList from "../../components/RequestList";
import Button from "../../components/Button";
import { AnimatePresence, motion } from "framer-motion";
import ModalBackdrop from "../../components/ModalBackdrop";
import { popUp, popUpItem } from "../../animations/variants";

export default function Ongoing() {
  const { user } = useAuth();
  const [userRequests, setUserRequests] = useState([]);
  const [data, setData] = useState([]);
  const [createNewRequest, setCreateNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState();
  const [openRequest, setOpenRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRequests = async () => {
    try {
      const request = await axios.get(`${baseURL}/request/${user.uid}`);
      setUserRequests(request.data.request);
      setData(request.data.request);
    } catch (error) {}
  };

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
    fetchRequests();
  }, []);

  return (
    <div className="relative h-full shadow-sm">
      <motion.div
        variants={popUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full rounded-md bg-white p-6 text-sm text-gray-500"
      >
        <motion.div variants={popUpItem} className="overflow-hidden">
          {/* Request List Head */}
          <div className="relative mb-6 flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3 text-white">
              <motion.div
                variants={popUpItem}
                className="rounded-full bg-cyan-500 p-3 "
              >
                <FaClipboardList size={24} />
              </motion.div>
              <motion.h1
                variants={popUpItem}
                className="text-4xl font-black text-cyan-500"
              >
                My Requests
              </motion.h1>
            </div>

            <motion.div
              variants={popUpItem}
              className="flex flex-1 items-center"
            >
              <FaSearch className="absolute ml-4 text-gray-400" size={18} />
              <input
                className="w-full rounded-full bg-gray-100 p-2 pl-[48px] text-gray-400 outline-none transition-all duration-300 ease-in-out hover:bg-gray-200"
                value={searchQuery}
                type="text"
                placeholder="Search"
                onChange={handleSearch}
              />
            </motion.div>
          </div>

          {/* Renders all the request into
          a div with all the fields that the user register
          in the firestore collection*/}
        </motion.div>
        <RequestList
          list={data}
          requestId
          device
          model
          status
          created
          onClickHandler={handleOnClick}
        />
      </motion.div>
      {/* This div will be render when state of createNewRequest and OpenRequest is true */}
      {/* <AnimatePresence>
        {createNewRequest || openRequest ? (
          <div>
            <ModalBackdrop
              onClick={() => {
                setCreateNewRequest(false);
                setOpenRequest(false);
              }}
            >
              {createNewRequest && (
                <RequestForm
                  user={user}
                  cancelButton={true}
                  closeForm={() => setCreateNewRequest(false)}
                />
              )}
              {openRequest && (
                <RequestForm
                  user={user}
                  openSelectedRequest={openRequest}
                  selectedRequest={selectedRequest}
                  closeForm={() => {
                    setOpenRequest(false);
                    setSelectedRequest({});
                  }}
                />
              )}
            </ModalBackdrop>
          </div>
        ) : null}
      </AnimatePresence> */}
    </div>
  );
}
