import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { FaPencilAlt, FaCheck, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import RequestProgress from "../components/RequestProgress";
import { convertCreatedDate, getTimeAgo } from "../utils/timeUtils";
import Button from "../components/Button";
import Swal from "sweetalert2";
import ApiService from "../api/apiService";
import ResponseForm from "../components/ResponseForm";
import Notfound from "./Notfound";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  carousell,
  fadeDefault,
  popUp,
  popUpItem,
} from "../animations/variants";
import ResizablePanel from "../components/ResizablePanel";
import { PENDING, ACCEPTED, COMPLETED, CANCELED } from "../utils/status";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../config/firebase-config";
import { doc } from "firebase/firestore";
import Preloader from "../components/Preloader";

export default function RequestDetails() {
  const { isAdmin } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRequestId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const dtoRequestsDocRef = doc(firestore, "requests", currentRequestId);
  const [request, fetching, error] = useDocumentData(dtoRequestsDocRef);

  const stringyfiedRequest = JSON.stringify({ request });
  const parsedRequest = JSON.parse(stringyfiedRequest);
  const currentRequest = parsedRequest.request;

  const [isResponding, setIsResponding] = useState(false);
  const [tuple, setTuple] = useState([null, isResponding]);
  const [loading, setLoading] = useState(false);

  const requestDetails = [
    {
      cell: "Request Id",
      data: request?.requestId,
    },
    {
      cell: "User Id",
      data: currentRequest?.uid,
    },
    {
      cell: "Name",
      data: currentRequest?.name,
    },
    {
      cell: "Email",
      data: currentRequest?.email,
    },
    {
      cell: "Position",
      data: currentRequest?.position,
    },
    {
      cell: "Office",
      data: currentRequest?.office,
    },
    {
      cell: "Device Type",
      data: currentRequest?.device,
    },
    {
      cell: "Brand",
      data: currentRequest?.brand,
    },
    {
      cell: "Brand Model",
      data: currentRequest?.model,
    },
    {
      cell: "Serial Number",
      data: currentRequest?.serial,
    },
    {
      cell: "Property Number",
      data: currentRequest?.property,
    },
    {
      cell: "Status",
      data: currentRequest?.status,
    },
    {
      cell: "Updated",
      data: currentRequest?.updatedAt?.seconds
        ? getTimeAgo(currentRequest?.updatedAt?.seconds)
        : "---",
    },
    {
      cell: "Date Requested",
      data: convertCreatedDate(currentRequest?.createdAt?.seconds),
    },
    {
      cell: "Defects/Complaints",
      data: currentRequest?.complaints,
    },
  ];

  const requestResponse = [
    {
      cell: "Action taken",
      data: currentRequest?.actionTaken,
    },
    {
      cell: "Recommendation",
      data: currentRequest?.recommendation
        ? currentRequest?.recommendation
        : "N/A",
    },
    {
      cell: "Date completed",
      data: convertCreatedDate(currentRequest?.completedAt?.seconds),
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

  if (tuple[1] != isResponding) {
    setTuple([tuple[1], isResponding]);
  }

  const direction = isResponding > tuple[0] ? 1 : -1;

  if (currentRequest?.status != ACCEPTED && isResponding) {
    setIsResponding(false);
  }

  return (
    <>
      {currentRequest ? (
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
              className={`flex items-center justify-between gap-4 rounded-2xl bg-white p-4 text-sm shadow-sm ${
                loading ? "[&>*]:animate-pulse" : ""
              }`}
            >
              <div
                className="flex w-fit cursor-pointer items-center whitespace-nowrap text-gray-400 duration-300 hover:text-black"
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
              <ul className="flex gap-2 overflow-hidden uppercase max-sm:text-xs">
                <li
                  label="Request id. "
                  className="overflow-hidden text-ellipsis whitespace-nowrap before:font-bold before:content-[attr(label)]"
                >
                  {currentRequest.requestId}
                </li>
                <li className="border border-black max-sm:hidden"></li>
                <li className="text-gray-400 max-sm:hidden">
                  {currentRequest?.status}
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={popUpItem}
              className={`overflow-hidden rounded-2xl bg-white text-sm shadow-sm ${
                loading ? "[&>*]:animate-pulse" : ""
              }`}
            >
              <ResizablePanel direction={direction}>
                {((!isResponding && currentRequest?.status != CANCELED) ||
                  (isResponding && currentRequest?.status != ACCEPTED)) && (
                  <motion.div className="p-6">
                    <RequestProgress request={currentRequest} />
                  </motion.div>
                )}
                {currentRequest.status === ACCEPTED && isResponding && (
                  <ResponseForm
                    requestId={currentRequest.requestId}
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
              <div className="mb-4 flex h-9 items-center justify-between text-xs">
                {isAdmin && currentRequest?.status === ACCEPTED && !isResponding ? (
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

              {isAdmin && currentRequest?.status === PENDING && (
                <div className="mt-4 flex justify-between gap-4">
                  <Button
                    secondary
                    rounded="xl"
                    width="full"
                    buttonText="Cancel Request"
                    onClick={() =>
                      handleResponse(currentRequest?.requestId, CANCELED)
                    }
                    disabled={loading}
                  />
                  <Button
                    success
                    rounded="xl"
                    width="full"
                    buttonText="Accept Request"
                    onClick={() =>
                      handleResponse(currentRequest?.requestId, ACCEPTED)
                    }
                    disabled={loading}
                  />
                </div>
              )}
            </motion.div>

            <AnimatePresence>
              {currentRequest?.status === COMPLETED ? (
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
      ) : fetching && !error ? (
        <Preloader />
      ) : (
        <Notfound />
      )}
    </>
  );
}
