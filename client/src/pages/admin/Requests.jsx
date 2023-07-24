import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";
import RequestList from "../../components/RequestList";
import { motion } from "framer-motion";
import { popUp } from "../../animations/variants";

export default function Requests() {
  const [userRequests, setRequestList] = useState([]);
  const [searchRequests, setSearchRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const request = await axios.get(`${baseURL}/requests`);
      setRequestList(request.data.request);
      setSearchRequests(request.data.request);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="rounded-md h-full bg-white text-sm text-gray-500 sm:max-md:bg-transparent sm:max-md:shadow-none shadow-sm">
        <RequestList
          list={searchRequests}
          requestId
          name
          email
          position
          brand
          model
          serial
          property
          status
          created
        />
      </div>
    </div>
  );
}
