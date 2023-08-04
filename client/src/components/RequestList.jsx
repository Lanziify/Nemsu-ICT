import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdMoreHoriz,
  MdArrowDropDown,
  MdFilterList,
  MdChevronLeft,
  MdChevronRight,
  MdCheckCircle,
  MdCancel,
  MdDelete,
} from "react-icons/md";
// import { usePopper } from "@popperjs/core";
import { usePopper } from "react-popper";
import { popUp, popUpItemRight, popUpRight } from "../animations/variants";
import Button from "./Button";
import Portal from "./Portal";

const ITEMS_PER_PAGE = 5; // Number of items to display per page

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
    operation,
    admin,
    handleResponse,
    handleSelected,
  } = props;

  const [sortedRequest, setSortedRequest] = useState();
  const [option, setOption] = useState({ show: false, index: null });
  const [filter, setFilter] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [activeItems, setActiveItems] = useState({ ...props });
  const [currentPage, setCurrentPage] = useState(1);

  const [popperReference, setPopperReference] = useState();
  const [popperElement, setPopperElement] = useState();

  const { styles, attributes } = usePopper(popperReference, popperElement, {
    placement: "bottom-end",
  });

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
      type: activeItems?.requestId,
      data: "requestId",
      label: "Request Id",
    },
    {
      type: activeItems.name,
      data: "name",
      label: "Name",
    },
    {
      type: activeItems.email,
      data: "email",
      label: "Email",
    },
    {
      type: activeItems.position,
      data: "position",
      label: "Position",
    },
    {
      type: activeItems.device,
      data: "device",
      label: "Device",
    },
    {
      type: activeItems.brand,
      data: "brand",
      label: "Brand",
    },
    {
      type: activeItems.model,
      data: "model",
      label: "Model",
    },
    {
      type: activeItems.serial,
      data: "serial",
      label: "Serial No.",
    },
    {
      type: activeItems.property,
      data: "property",
      label: "Property No.",
    },
    {
      type: activeItems.status,
      data: "status",
      label: "Status",
    },
    {
      type: activeItems.created,
      data: "createdAt",
      label: "Created",
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

  const tableHeader = (item, index) => {
    if (item.type) {
      return (
        <th
          className={`p-4 text-center sm:max-md:hidden ${!list && "border-b "}`}
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
          className={`overflow-hidden text-ellipsis whitespace-nowrap px-2 py-4 text-center before:text-gray-500 ${
            item.data != "status"
              ? ""
              : (request[item.data] === "Pending" && "text-yellow-500") ||
                (request[item.data] === "Accepted" && "text-green-500") ||
                (request[item.data] === "Completed" && "text-cyan-500")
          } before:font-bold sm:max-md:flex sm:max-md:justify-between sm:max-md:px-0 sm:max-md:py-1 sm:max-md:before:content-[attr(cell)]`}
          key={index}
        >
          {item.data != "createdAt"
            ? request[item.data]
            : convertCreatedDate(request[item.data]?._seconds)}
        </td>
      );
    }
  };

  const handleFilterHeader = (e) => {
    setActiveItems({
      ...activeItems,
      [e.target.name]: !activeItems[e.target.name],
    });
  };

  const handleListDisplay = () => {
    if (!sortedRequest) {
      return getCurrentPageItems();
    } else {
      return sortedRequest;
    }
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

  return (
    <div className="relative flex min-w-fit flex-col">
      <motion.table
        variants={popUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="table-auto border-collapse rounded-md"
      >
        {/* <caption className="text-2xl font-bold p-2 md:max-lg:hidden sm:max-md:block sm:max-md:p-4 text-cyan-500">Request List</caption> */}
        <thead>
          <tr className="border-b sm:max-md:border-0">
            {/* <th className="p-2 text-center sm:max-md:hidden">No.</th> */}

            {/* Header Items */}
            {headerItems.map((item, index) => tableHeader(item, index))}

            {/* Filter Feature */}
            {admin && (
              <th
                className={`p-2 text-center sm:max-md:hidden ${
                  filter ? "sticky right-0 top-0 bg-white" : ""
                } `}
              >
                <div
                  ref={setPopperReference}
                  className="no_selection m-auto w-fit cursor-pointer rounded-full p-1 duration-300 hover:bg-gray-200"
                  onClick={() => setFilter(!filter)}
                >
                  <MdFilterList size={20} />
                </div>
                {filter && (
                  <Portal>
                    <div
                      ref={setPopperElement}
                      className="rounded-md bg-gray-200 px-4 py-2 font-normal shadow-sm"
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
                            // value={item.value}
                            onChange={handleFilterHeader}
                            checked={item.value}
                          />
                          <p>{item.title}</p>
                        </div>
                      ))}
                    </div>
                  </Portal>
                )}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="sm:max-md:flex sm:max-md:flex-col sm:max-md:gap-4">
          {handleListDisplay().length != 0 ? (
            <>
              {handleListDisplay().map((request, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b duration-150 last:border-0 hover:bg-gray-500/10 sm:max-md:block sm:max-md:rounded-md sm:max-md:border sm:max-md:p-4 sm:max-md:last:border"
                  onClick={() => handleSelected(request)}
                >
                  {/* <td className="p-1 text-center font-semibold">{index + 1}</td> */}

                  {headerItems.map((item, index) =>
                    tableData(item, request, index)
                  )}
                  {admin && (
                    <td className="relative justify-between py-1 sm:max-md:hidden">
                      <div
                        className="no_selection m-auto w-fit rounded-md bg-gray-200 p-1 text-xs duration-300 hover:bg-gray-300 sm:max-md:m-0 sm:max-md:hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                          !option.show && !option.index
                            ? setOption({ show: true, index: index })
                            : index === option.index
                            ? setOption({})
                            : setOption({ show: true, index: index });
                        }}
                      >
                        <MdMoreHoriz size={18} />
                        <AnimatePresence>
                          {option.show && option.index == index && (
                            <motion.div
                              variants={popUpRight}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className="absolute bottom-0 right-full  top-0 flex items-center gap-2 rounded-md"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {request.status === "Pending" && (
                                <>
                                  <motion.div variants={popUpItemRight}>
                                    <Button
                                      success
                                      rounded="md"
                                      iconStart={<MdCheckCircle size={18} />}
                                      buttonText="Accept"
                                      onClick={() => {
                                        handleResponse(
                                          request.requestId,
                                          "Accepted"
                                        );
                                        setOption({});
                                      }}
                                    />
                                  </motion.div>
                                  <motion.div variants={popUpItemRight}>
                                    <Button
                                      danger
                                      rounded="md"
                                      iconStart={<MdCancel size={18} />}
                                      buttonText="Cancel"
                                      onClick={() => {
                                        handleResponse(
                                          request.requestId,
                                          "Canceled"
                                        );
                                        setOption({});
                                      }}
                                    />
                                  </motion.div>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr className="text-center sm:max-md:flex">
              <td className="p-4 sm:max-md:flex-1" colSpan="100%">
                There are no repair requests to display
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>

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
