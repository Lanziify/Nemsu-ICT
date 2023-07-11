import React, { useEffect, useState } from "react";

function RequestList(props) {
  const { list, selectedRequest, onClickHandler } = props;

  const [floater, setFloater] = useState({});

  const position = (e, index) => {
    const { clientX, clientY } = e;
    setFloater({ clientX: clientX, clientY: clientY, pointerId: index });
  };

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
      hour: "2-digit",
      minute: "2-digit",
      // hourCycle: "h24",
      // timeStyle: 'medium',
    });
  };

  return (
    <>
      <div className="px-9 p-3 grid grid-flow-col auto-cols-fr font-bold">
        <p className="col-span-2">Request id</p>
        <p>Name</p>
        <p>Device</p>
        <p>Status</p>
        <p className="text-end">Created</p>
      </div>
      <div className=" mx-6 mb-2 border-b"></div>
      <div className="px-6 text-gray-500">
        {/* Loops the sorted user request object and map each element */}
        {sortedUserRequests.map((request, index) => (
          <div key={index}>
            <div
              className={`p-3 grid grid-flow-col auto-cols-fr items-center rounded-md hover:bg-gray-200 cursor-pointer ${
                request.requestId === selectedRequest?.requestId &&
                "bg-gray-300 text-gray-400"
              } transition-all duration-300`}
              onClick={() => onClickHandler(request)}
              onPointerMove={(e) => position(e, index)}
              onPointerOut={(e) => setFloater({})}
            >
              <p className="col-span-2 text-ellipsis whitespace-nowrap overflow-hidden ">
                {request.requestId}
              </p>
              <p className="text-ellipsis whitespace-nowrap overflow-hidden ">
                {request.name}
              </p>
              <p className="text-ellipsis whitespace-nowrap overflow-hidden ">
                {request.device}
              </p>
              <p className="text-ellipsis whitespace-nowrap overflow-hidden ">
                {request.status}
              </p>
              <p className="text-end text-ellipsis whitespace-nowrap overflow-hidden">
                {convertCreatedDate(request.createdAt._seconds)}
                {/* {getTimeAgo(request.createdAt._seconds)} */}
              </p>
            </div>

            {/* Uncomment to apply line Break to on the list */}
            {/* {Object.values(userRequests).length - 1 != index && <hr />} */}

            {/* Mounts the floater which contains the request data when the event is fired */}
            {floater?.pointerId === index && (
              <div
                className="no_selection absolute z-20 w-80 h-64 ml-4 border rounded-md bg-white bg-opacity-20 backdrop-blur shadow-md transition-transform"
                style={{
                  left:
                    floater?.clientX + 336 > window.innerWidth
                      ? floater?.clientX - 346
                      : floater?.clientX,
                  top:
                    floater?.clientY + 256 > window.innerHeight
                      ? floater?.clientY - 236
                      : floater?.clientY,
                }}
              >
                <div className="flex gap-2 p-8 justify-center items-baseline ">
                  <h1 className="text-xl text-center font-bold">
                    {request.brand}
                  </h1>
                  <p className="text-sm">{request.model}</p>
                  <h1
                    className={`absolute top-0 right-0 m-2 px-2 py-1 text-xs rounded-full font-bold text-white ${
                      request.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {request.status}
                  </h1>
                </div>
                <hr />
                <div className="p-2">
                  <p className="mb-2">
                    <strong>Name: </strong>
                    {request.name}
                  </p>
                  <p className="mb-2">
                    <strong>Serial: </strong>
                    {request.serial}
                  </p>
                  <p className="mb-2">
                    <strong>Property: </strong>
                    {request.property}
                  </p>
                  <p className="line-clamp-3">
                    <strong>Defects: </strong>
                    {request.complaints}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default RequestList;