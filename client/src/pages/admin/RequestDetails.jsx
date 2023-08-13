import React, { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { FaPencilAlt, FaCheck, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import RequestProgress from "../../components/RequestProgress";
import { convertCreatedDate, getTimeAgo } from "../../utils/timeUtils";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import ApiService from "../../api/apiService";
import ResponseForm from "../../components/ResponseForm";
import Notfound from "../Notfound";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  carousell,
  fadeDefault,
  popUp,
  popUpItem,
} from "../../animations/variants";
import ResizablePanel from "../../components/ResizablePanel";
import { PENDING, ACCEPTED, COMPLETED, CANCELED } from "../../utils/status";

export default function RequestDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isResponding, setIsResponding] = useState(false);
  const [tupple, setTupple] = useState([null, isResponding]);
  const [loading, setLoading] = useState(false);

  const requestDetails = [
    {
      cell: "Request Id",
      data: location.state?.requestId,
    },
    {
      cell: "User Id",
      data: location.state?.uid,
    },
    {
      cell: "Name",
      data: location.state?.name,
    },
    {
      cell: "Email",
      data: location.state?.email,
    },
    {
      cell: "Position",
      data: location.state?.position,
    },
    {
      cell: "Office",
      data: location.state?.office,
    },
    {
      cell: "Device Type",
      data: location.state?.device,
    },
    {
      cell: "Brand",
      data: location.state?.brand,
    },
    {
      cell: "Brand Model",
      data: location.state?.model,
    },
    {
      cell: "Serial Number",
      data: location.state?.serial,
    },
    {
      cell: "Property Number",
      data: location.state?.property,
    },
    {
      cell: "Status",
      data: location.state?.status,
    },
    {
      cell: "Updated",
      data: location.state?.updatedAt?._seconds
        ? getTimeAgo(location.state?.updatedAt?._seconds)
        : "---",
    },
    {
      cell: "Date Requested",
      data: convertCreatedDate(location.state?.createdAt?._seconds),
    },
    {
      cell: "Defects/Complaints",
      data: location.state?.complaints,
    },
  ];

  const requestResponse = [
    {
      cell: "Action taken",
      data: location.state?.actionTaken,
    },
    {
      cell: "Recommendation",
      data: location.state?.recommendation
        ? location.state?.recommendation
        : "N/A",
    },
    {
      cell: "Date completed",
      data: convertCreatedDate(location.state?.completedAt?._seconds),
    },
  ];

  const handleResponse = async (requestId, status) => {
    try {
      if (status === "Canceled") {
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
            setLoading(true);
            ApiService.createResponse(requestId, status).then(() => {
              setLoading(false);
              navigate(-1);
            });
          }
          if (result.isDismissed) {
            setLoading(false);
          }
        });
        return;
      }

      setLoading(true);
      await ApiService.createResponse(requestId, status);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  if (tupple[1] != isResponding) {
    setTupple([tupple[1], isResponding]);
  }
  
  const direction = isResponding > tupple[0] ? 1 : -1;
  
  if (location.state?.status != ACCEPTED && isResponding) {
    setIsResponding(false);
  }


  return (
    <>
      {location.state ? (
        <MotionConfig transition={{ duration: 0.5 }}>
          <motion.div
            variants={popUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4"
          >
            <motion.div
              variants={popUpItem}
              className={`flex items-center justify-between rounded-2xl bg-white p-4 text-sm shadow-sm ${
                loading ? "[&>*]:animate-pulse" : ""
              }`}
            >
              <div
                className="flex w-fit cursor-pointer items-center text-gray-400 duration-300 hover:text-black"
                onClick={() =>
                  !loading
                    ? navigate(
                        location.pathname.includes("notification")
                          ? "/notifications"
                          : -1
                      )
                    : null
                }
              >
                <MdChevronLeft size={24} />
                <p>Request List</p>
              </div>
              <ul className="flex gap-2 uppercase">
                <li
                  label="Request id. "
                  className="before:font-bold  before:content-[attr(label)]"
                >
                  {location.state.requestId}
                </li>
                <li className="border border-black"></li>
                <li className="text-gray-400">{location.state?.status}</li>
              </ul>
            </motion.div>

            <motion.div
              variants={popUpItem}
              className={`overflow-hidden rounded-2xl bg-white text-sm shadow-sm ${
                loading ? "[&>*]:animate-pulse" : ""
              }`}
            >
              <ResizablePanel direction={direction}>
                {((!isResponding && location.state?.status != CANCELED) ||
                  (isResponding && location.state?.status != ACCEPTED)) && (
                  <motion.div className="p-6">
                    <RequestProgress request={location.state} />
                  </motion.div>
                )}
                {location.state.status === ACCEPTED && isResponding && (
                  <ResponseForm
                    requestId={location.state.requestId}
                    activeForm={setIsResponding}
                    setLoading={setLoading}
                  />
                )}
              </ResizablePanel>
            </motion.div>

            <motion.div
              variants={popUpItem}
              className={`rounded-2xl bg-white p-6 text-sm shadow-sm ${
                loading ? "[&>*]:animate-pulse" : ""
              }`}
            >
              <div className="mb-2 flex h-9 items-center justify-between text-xs">
                {location.state?.status === ACCEPTED && !isResponding ? (
                  <>
                    <h1 className="text-xl font-bold">Request Details</h1>
                    <Button
                      outlinePrimary
                      rounded="xl"
                      iconStart={<FaPencilAlt />}
                      buttonText="Action taken"
                      onClick={() => setIsResponding(true)}
                    />
                  </>
                ) : (
                  <h1 className="text-xl font-bold">Request Details</h1>
                )}
              </div>

              {requestDetails.map((item, index) => (
                <div
                  cell={item.cell}
                  className={`flex w-full justify-between text-gray-400 before:font-semibold before:text-black before:content-[attr(cell)] ${
                    item.cell === "Defects/Complaints"
                      ? "flex-col gap-1"
                      : "mb-1"
                  }`}
                  key={index}
                >
                  {item.data}
                </div>
              ))}

              {location.state?.status === PENDING && (
                <div className="mt-4 flex justify-between gap-4">
                  <Button
                    secondary
                    rounded="xl"
                    width="full"
                    buttonText="Cancel Request"
                    onClick={() =>
                      handleResponse(location.state?.requestId, CANCELED)
                    }
                    disabled={loading}
                  />
                  <Button
                    success
                    rounded="xl"
                    width="full"
                    buttonText="Accept Request"
                    onClick={() =>
                      handleResponse(location.state?.requestId, ACCEPTED)
                    }
                    disabled={loading}
                  />
                </div>
              )}
            </motion.div>

            <AnimatePresence>
              {location.state?.status === COMPLETED ? (
                <motion.div
                  variants={popUpItem}
                  className="rounded-2xl bg-cyan-500 p-6 text-sm text-white shadow-sm"
                >
                  <h1 className="mb-2 text-xl font-bold">Action Details</h1>
                  {requestResponse.map((item, index) => (
                    <div
                      cell={item.cell}
                      className={`flex w-full justify-between text-white before:font-semibold before:text-white before:content-[attr(cell)] ${
                        item.cell === "Defects/Complaints"
                          ? "flex-col gap-1"
                          : "mb-1"
                      }`}
                      key={index}
                    >
                      {item.data}
                    </div>
                  ))}
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
          </motion.div>
        </MotionConfig>
      ) : (
        <Notfound />
      )}
    </>
  );
}
