import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";
import validateRequest from "../utils/validateRequest";
import { IoCloseCircle } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import FormInput from "./FormInput";

function RequestForm(props) {
  const {
    user,
    openSelectedRequest,
    selectedRequest,
    closeForm,
    cancelButton,
  } = props;
  const [values, setValues] = useState({
    uid: user.uid,
    name: "",
    email: user.email,
    position: "",
    device: "",
    brand: "",
    model: "",
    serial: "",
    property: "",
    complaints: "",
  });
  const [error, setError] = useState({});
  const [isToggled, setToggle] = useState(false);
  const dropDownButtonRef = useRef();
  const dropDownContentRef = useRef();

  const devices = [
    "Printer",
    "Desktop computer",
    "Laptop",
    "Network devices",
    "Other",
  ];

  function handleOnChange(e) {
    if (selectedRequest) {
      return;
    }
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateRequest(values);
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
    try {
      const token = await user.getIdToken();
      axios.post(
        `${baseURL}/request`,
        { data: values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setValues({
        uid: user.uid,
        name: "",
        email: user.email,
        position: "",
        device: "",
        brand: "",
        model: "",
        serial: "",
        property: "",
        complaints: "",
      });
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your request has been successfully submitted.",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectDevice = (device) => {
    setValues({ ...values, device: device });
    setError({ ...error, device: "" });
    setToggle(!isToggled);
  };

  const handleClickOutside = (event) => {
    if (
      dropDownContentRef.current &&
      !dropDownContentRef.current.contains(event.target) &&
      dropDownButtonRef.current &&
      !dropDownButtonRef.current.contains(event.target)
    ) {
      setToggle(false);
    }
  };

  useEffect(() => {
    const mouseDown = document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return mouseDown;
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      setValues({ ...selectedRequest });
    }
  }, [selectedRequest]);

  return (
    <>
      <form
        className="no_selection h-full relative p-6 flex flex-col items-center gap-2 justify-between bg-white"
        onSubmit={handleSubmit}
      >
        {!openSelectedRequest ? (
          <h1 className="mb-4 font-black text-2xl text-blue-500">
            Repair Requisition Form
          </h1>
        ) : (
          <div>
            <h1 className="mb-4 font-black text-2xl text-blue-500">
              {selectedRequest.requestId}
            </h1>
          </div>
        )}
        <div className="w-full flex gap-4">
          <FormInput
            label="End-user"
            name="name"
            type="text"
            value={values.name}
            placeholder="Name"
            error={error.name}
            onChange={handleOnChange}
          />
          <FormInput
            label="Position"
            name="position"
            type="text"
            value={values.position}
            placeholder="Position"
            error={error.position}
            onChange={handleOnChange}
          />
        </div>

        <div className="w-full relative text-gray-500 transition-all duration-500">
          <p className="mb-2 text-gray-400 font-medium">Equipment Type</p>
          <div
            ref={dropDownButtonRef}
            className="p-2 flex place-items-center justify-between bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md border transition duration-300 "
            onClick={() => setToggle(!isToggled)}
            // onMouseDown={() => setToggle(false)}
          >
            <span>{!values.device ? "Select a device" : values.device}</span>
            <FaChevronDown />
          </div>
          <ul
            ref={dropDownContentRef}
            className={`absolute -z-10 w-full opacity-0 overflow-hidden bg-gray-50 rounded-md transition-all duration-300 ${
              isToggled && !selectedRequest && "z-10 opacity-100 mt-4 border"
            }`}
          >
            {devices.map((device, index) => (
              <li
                key={index}
                className="p-2 bg-gray-50 hover:bg-gray-200 cursor-pointer  transition-all duration-300 "
                onClick={() => handleSelectDevice(device)}
              >
                {device}
              </li>
            ))}
          </ul>
          {error.device && (
            <span className="w-full text-start text-sm text-red-500">
              {error.device}
            </span>
          )}
        </div>

        <div className="w-full flex gap-4">
          <FormInput
            label="Brand"
            name="brand"
            type="text"
            value={values.brand}
            placeholder="Brand"
            error={error.brand}
            onChange={handleOnChange}
          />
          <FormInput
            label="Model"
            name="model"
            type="text"
            value={values.model}
            placeholder="Model"
            error={error.model}
            onChange={handleOnChange}
          />
        </div>
        <FormInput
          label="Serial no."
          name="serial"
          type="text"
          value={values.serial}
          placeholder="Serial number"
          error={error.model}
          onChange={handleOnChange}
        />
        <FormInput
          label="Property no."
          name="property"
          type="text"
          value={values.property}
          placeholder="Property number"
          error={error.property}
          onChange={handleOnChange}
        />
        <div className="w-full mb-6">
          <p className="mb-2 text-gray-400 font-medium">Defects/Complaints</p>
          <textarea
            className="w-full p-2 rounded-md border text-gray-500 bg-gray-100 hover:bg-gray-200 outline-none transition duration-150 ease-in-out"
            name="complaints"
            value={values.complaints}
            placeholder="If there is any other relevant information you think might be helpful for our admin team to know, please include it here. This could include specific actions you have taken to troubleshoot the problem or any other details you think may help to resolve the issue."
            rows={8}
            onChange={handleOnChange}
          ></textarea>
          <span className="w-full text-start text-sm text-red-500">
            {error.complaints}
          </span>
        </div>
        {/* If user request is clicked, form close button is rendered on the top right corner */}
        {/* Else cancel button is checked if props is set to true then render  */}
        {openSelectedRequest ? (
          <button
            className="absolute top-0 right-0 p-3 text-gray-400 hover:text-gray-500 transition-all duration-300 ease-in-out"
            onClick={closeForm}
            type="button"
          >
            <IoCloseCircle size={32} />
          </button>
        ) : (
          <div className="w-full flex gap-4">
            {cancelButton && (
              <button
                className="w-full px-5 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition-all duration-300 ease-in-out"
                type="button"
                onClick={closeForm}
              >
                Cancel
              </button>
            )}
            <button
              className="w-full px-5 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out"
              type="submit"
            >
              Submit
            </button>
          </div>
        )}
        {/* Status */}
        {openSelectedRequest && (
          <div
            className={`px-4 py-1 rounded-full font-bold text-white ${
              selectedRequest.status === "Pending"
                ? "bg-yellow-500"
                : "bg-green-500"
            } `}
          >
            {selectedRequest.status}
          </div>
        )}
      </form>
    </>
  );
}

export default RequestForm;
