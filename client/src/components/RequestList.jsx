import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popUp, popUpItem } from "../animations/variants";

function RequestList(props) {
  const {
    list,
    requestId,
    name,
    email,
    position,
    device,
    brand,
    model,
    serial,
    property,
    status,
    created,
    selectedRequest,
    onClickHandler,
  } = props;

  const sortedUserRequests = [...list].sort(
    (a, b) => b.createdAt._seconds - a.createdAt._seconds
  );

  const convertCreatedDate = (unixValue) => {
    const convert = new Date(unixValue * 1000);

    return convert.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const headerItems = [
    {
      type: requestId,
      data: "requestId",
      label: "Request Id",
    },
    {
      type: name,
      data: "name",
      label: "Name",
    },
    {
      type: email,
      data: "email",
      label: "Email",
    },
    {
      type: position,
      data: "position",
      label: "Position",
    },
    {
      type: device,
      data: "device",
      label: "Device",
    },
    {
      type: brand,
      data: "brand",
      label: "Brand",
    },
    {
      type: model,
      data: "model",
      label: "Model",
    },
    {
      type: serial,
      data: "serial",
      label: "Serial No.",
    },
    {
      type: property,
      data: "property",
      label: "Property No.",
    },
    {
      type: status,
      data: "status",
      label: "Status",
    },
    {
      type: created,
      data: "createdAt",
      label: "Created",
    },
  ];

  const tableHeader = (item, index) => {
    if (item.type) {
      return (
        <th
          className={`px-4 py-2 text-center sm:max-md:hidden ${
            !list && "border-b "
          }`}
          key={index}
        >
          {item.label}
        </th>
      );
    }
  };

  const tableData = (item, request, index) => {
    if (item.type) {
      return (
        <td
          cell={`${item.label}: `}
          className={`cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-4 text-center before:text-gray-500 ${
            item.data != "status"
              ? ""
              : (request[item.data] === "Pending" && "text-yellow-500") ||
                (request[item.data] === "Accepted" && "text-green-500")
          } before:font-bold sm:max-md:flex sm:max-md:justify-between sm:max-md:border-b sm:max-md:px-0 sm:max-md:py-2 sm:max-md:before:content-[attr(cell)] sm:max-md:last:border-0`}
          key={index}
        >
          {item.data != "createdAt"
            ? request[item.data]
            : convertCreatedDate(request[item.data]?._seconds)}
        </td>
      );
    }
  };

  return (
    <>
      <motion.table
        variants={popUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full table-fixed border-collapse text-sm text-gray-500 "
      >
        {/* <caption className="text-2xl font-bold p-2 md:max-lg:hidden sm:max-md:block  sm:max-md:p-4 bg-cyan-500">Request List</caption> */}
        <thead>
          <tr>{headerItems.map((item, index) => tableHeader(item, index))}</tr>
        </thead>
        <tbody className="sm:max-md:flex sm:max-md:flex-col sm:max-md:gap-4">
          {sortedUserRequests.length != 0 ? (
            <>
              {sortedUserRequests.map((request, index) => (
                <tr
                  key={index}
                  className="overflow-hidden rounded-xl  sm:max-md:block sm:max-md:border sm:max-md:bg-gray-50 sm:max-md:p-4"
                >
                  {headerItems.map((item, index) =>
                    tableData(item, request, index)
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr className="text-center">
              <td className="p-4" colSpan={5}>
                There are no repair requests to display
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </>
  );
}

export default RequestList;
