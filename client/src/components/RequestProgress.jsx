import React from "react";
import { FaClipboardList, FaThumbsUp, FaCheck } from "react-icons/fa";

function RequestProgress({ request }) {
  const convertCreatedDate = (unixValue) => {
    const convert = new Date(unixValue * 1000);

    return convert.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const progressItems = [
    {
      title: "Form Submitted",
      icon: <FaClipboardList size={32} />,
      date: convertCreatedDate(request?.createdAt.seconds),
      active: true,
    },
    {
      title: "Details Accepted",
      icon: <FaThumbsUp size={32} />,
      date: request?.updatedAt?.seconds
        ? convertCreatedDate(request?.updatedAt?.seconds)
        : "---",
      active: request?.updatedAt?.seconds ? true : false,
    },
    {
      title: "Request Completed",
      icon: <FaCheck size={32} />,
      date: request?.completedAt?.seconds
        ? convertCreatedDate(request?.completedAt?.seconds)
        : "---",
      active: request?.completedAt?.seconds ? true : false,
    },
  ];

  const getStepBar = () => {
    if (request.status === "Pending") {
      return "w-[calc((100%_-_192px)_*_0)]";
    } else if (request.status === "Accepted") {
      return "w-[calc((100%_-_192px)_*_0.5)]";
    } else if (request.status === "Completed") {
      return "w-[calc((100%_-_192px)_*_1)]";
    }
  };

  return (
    <div className="relative m-auto flex max-w-4xl justify-between gap-4">
      {progressItems.map((item, index) => (
        <div className="z-[1] w-48  text-center" key={index}>
          <div
            className={`m-auto mb-2 w-fit rounded-full border-4  bg-white p-5 ${
              item.active
                ? "border-cyan-500 text-cyan-500"
                : " border-gray-200 text-gray-200"
            }`}
          >
            {item.icon}
          </div>
          <p className="font-bold">{item.title}</p>
          <p className="text-gray-500">{item.date}</p>
        </div>
      ))}
      <div className="absolute top-10 h-[4px] w-full">
        <div className="absolute mx-24 h-full w-[calc(100%_-_192px)] bg-gray-200"></div>
        <div
          className={`absolute mx-24 h-full ${getStepBar()} bg-cyan-500`}
        ></div>
      </div>
    </div>
  );
}

export default RequestProgress;
