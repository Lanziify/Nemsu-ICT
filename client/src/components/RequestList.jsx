import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdMoreHoriz,
  MdArrowDropDown,
  MdFilterList,
  MdChevronLeft,
  MdChevronRight,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import { createPopper } from "@popperjs/core";
import { usePopper } from "react-popper";
import {
  popUp,
  popUpItem,
  popUpItemRight,
  popUpRight,
} from "../animations/variants";
import Button from "./Button";
import Portal from "./Portal";
import { ACCEPTED, CANCELED, COMPLETED, PENDING } from "../utils/status";
import { update } from "react-spring";

const ITEMS_PER_PAGE = 5; // Number of items to display per page

function RequestList(props) {
  const { list, admin, handleResponse } = props;
  const navigate = useNavigate();

  const [sortedRequest, setSortedRequest] = useState();
  const [option, setOption] = useState({ show: false, id: null });
  const [ascending, setAscending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const optionContainer = useRef(null);
  const optionReference = useRef(null);
  const optionElement = useRef(null);

  const { styles, attributes } = usePopper(
    optionReference.current,
    optionElement.current
    , {
      placement: 'bottom-end'
    }
  );

  const sortRequestList = (item) => {
    const sortedList = [...getCurrentPageItems()].sort((a, b) => {
      if (typeof (a[item] && b[item]) == "string") {
        return ascending
          ? a[item] < b[item]
            ? -1
            : 1
          : a[item] < b[item]
          ? 1
          : -1;
      } else {
        return ascending
          ? b[item]._seconds - a[item]._seconds
          : a[item]._seconds - b[item]._seconds;
      }
    });
    return setSortedRequest(sortedList);
  };

  const convertCreatedDate = (unixValue) => {
    const convert = new Date(unixValue * 1000);

    return convert.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const headerItems = [
    {
      type: props.requestId,
      data: "requestId",
      label: "Request Id",
    },
    {
      type: props.name,
      data: "name",
      label: "Name",
    },
    {
      type: props.email,
      data: "email",
      label: "Email",
    },
    {
      type: props.position,
      data: "position",
      label: "Position",
    },
    {
      type: props.office,
      data: "office",
      label: "Office",
    },
    {
      type: props.device,
      data: "device",
      label: "Device",
    },
    {
      type: props.brand,
      data: "brand",
      label: "Brand",
    },
    {
      type: props.model,
      data: "model",
      label: "Model",
    },
    {
      type: props.serial,
      data: "serial",
      label: "Serial No.",
    },
    {
      type: props.property,
      data: "property",
      label: "Property No.",
    },
    {
      type: props.status,
      data: "status",
      label: "Status",
    },
    {
      type: props.created,
      data: "createdAt",
      label: "Created",
    },
  ];

  const tableHeader = (item, index) => {
    if (item.type) {
      return (
        <th
          className={`p-4 text-center max-sm:hidden ${!list && "border-b "}`}
          key={index}
        >
          <div
            className="flex cursor-pointer items-center justify-center duration-300 hover:text-cyan-500"
            onClick={() => {
              sortRequestList(item.data);
              setAscending(!ascending);
            }}
          >
            {item.label}
            <MdArrowDropDown size={18} />
          </div>
        </th>
      );
    }
  };

  const tableData = (item, request, index) => {
    if (item.type) {
      return (
        <td
          cell={`${item.label}: `}
          className={`px-2 py-4 text-center before:text-gray-500 ${
            item.data != "status"
              ? ""
              : (request[item.data] === PENDING && "text-yellow-500") ||
                (request[item.data] === ACCEPTED && "text-green-500") ||
                (request[item.data] === COMPLETED && "text-cyan-500")
          } before:font-bold max-sm:flex max-sm:justify-between max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(cell)]`}
          key={index}
        >
          {item.data != "createdAt"
            ? request[item.data]
            : convertCreatedDate(request[item.data]?._seconds)}
        </td>
      );
    }
  };

  const handleListDisplay = () => {
    if (!sortedRequest) {
      return getCurrentPageItems();
    } else {
      return sortedRequest;
    }
  };

  const handleOptionClick = (e, request) => {
    e.preventDefault();
    e.stopPropagation();
    // optionReference.current = request.requestId;
    !option.show && !option.id
      ? setOption({ show: true, id: request.requestId })
      : option.id === request.requestId
      ? setOption({})
      : setOption({ show: true, id: request.requestId });
  };

  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return list.slice(start, end);
  };

  const handlePaginationPrev = () => {
    setSortedRequest();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePaginationNext = () => {
    setSortedRequest();
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(list.length / ITEMS_PER_PAGE))
    );
  };

  const handleRequest = (request) => {
    navigate(`request/${request.requestId}`, { state: request });
  };

  console.log(optionReference.current)


  // useEffect(() => {
  //   const outsideClick = (e) => {
  //     if (!optionContainer.current.contains(e.target)) {
  //       console.log("hide");
  //     }
  //   };

  //   document.addEventListener("mousedown", outsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", outsideClick);
  //   };
  // }, []);

  return (
    <div className="flex min-w-fit flex-col">
      <table className="table-auto border-collapse rounded-md">
        {/* <caption className="text-2xl font-bold p-2 md:max-lg:hidden max-sm:block max-sm:p-4 text-cyan-500">Request List</caption> */}
        <thead>
          <tr className="border-b max-sm:border-0">
            {/* <th className="p-2 text-center max-sm:hidden">No.</th> */}

            {/* Header Items */}
            {headerItems.map((item, index) => tableHeader(item, index))}
          </tr>
        </thead>

        <tbody className="max-sm:flex max-sm:flex-col max-sm:gap-4">
          {handleListDisplay().length != 0 ? (
            <>
              {handleListDisplay().map((request, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b duration-150 last:border-0 hover:bg-gray-500/10 max-sm:block max-sm:rounded-2xl max-sm:border max-sm:p-4 max-sm:last:border"
                  onClick={() => handleRequest(request)}
                >
                  {headerItems.map((item, index) =>
                    tableData(item, request, index)
                  )}

                  {admin && (
                    <td className="pr-4 max-sm:hidden">
                      <div
                        ref={optionReference}
                        className={`${request.requestId} no_selection m-auto w-fit rounded-md p-1 text-xs duration-300 hover:bg-gray-300 max-sm:m-0 max-sm:hidden`}
                        onClick={(e) => {
                          handleOptionClick(e, request);
                        }}
                      >
                        <MdMoreHoriz size={18} />
                      </div>
                      {/* <Portal> */}
                      <div
                        ref={optionElement}
                        className={`z-[1] rounded-xl border bg-white p-3 ${
                          option.show && request.requestId === option.id
                            ? "visible opacity-100"
                            : "invisible hidden opacity-0"
                        }`}
                        style={styles.popper}
                        {...attributes.popper}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {request.status === PENDING && (
                          <>
                            <Button
                              success
                              width="full"
                              rounded="md"
                              iconStart={<MdCheckCircle size={18} />}
                              buttonText="Accept"
                              onClick={() => {
                                handleResponse(request.requestId, ACCEPTED);
                                setOption({});
                              }}
                            />
                            <Button
                              danger
                              width="full"
                              rounded="md"
                              iconStart={<MdCancel size={18} />}
                              buttonText="Cancel"
                              onClick={() => {
                                handleResponse(request.requestId, CANCELED);
                                setOption({});
                              }}
                            />
                          </>
                        )}
                      </div>
                      {/* </Portal> */}
                    </td>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr className="text-center max-sm:flex">
              <td className="p-4 max-sm:flex-1" colSpan="100%">
                There are no repair requests to display
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="sticky bottom-0 right-0 top-0 mt-2 flex gap-2 self-end">
        <p className="px-4 py-2 text-xs">
          Page{" "}
          {currentPage === 1 && !Object.keys(list).length
            ? currentPage - 1
            : currentPage}{" "}
          of {Math.ceil(list.length / ITEMS_PER_PAGE)}
        </p>
        <button
          className="rounded-md p-2 duration-300 hover:bg-gray-200 disabled:text-gray-300"
          onClick={handlePaginationPrev}
          disabled={currentPage === 1}
        >
          <MdChevronLeft size={18} />
        </button>
        <button
          className="rounded-md p-2 duration-300 hover:bg-gray-200 disabled:text-gray-300"
          onClick={handlePaginationNext}
          disabled={
            currentPage === 1 ||
            currentPage === Math.ceil(list.length / ITEMS_PER_PAGE)
          }
        >
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default RequestList;
