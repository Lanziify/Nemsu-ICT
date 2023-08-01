import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";
import validateRequest from "../utils/validateRequest";
import { IoCloseCircle } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import FormInput from "./FormInput";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import successSfx from "../assets/success.mp3";
import errorSfx from "../assets/error.mp3";
import { dropdownAnimation, popUp, popUpItem } from "../animations/variants";

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
    device: "",
    brand: "",
    model: "",
    serial: "",
    property: "",
    complaints: "",
  });
  const [error, setError] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const dropDownButtonRef = useRef();
  const dropDownContentRef = useRef();

  const devices = ["Printer", "Desktop computer", "Laptop", "Network devices"];

  const handleOnChange = (e) => {
    if (selectedRequest) {
      return;
    }
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formErrors = validateRequest(values);
      if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
        return;
      }

      // Show loading before the API call
      Swal.fire({
        title: "Submitting...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const token = await user.getIdToken();

      await axios.post(
        `${baseURL}/create`,
        { data: values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Hide loading after the API call completes
      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your request has been successfully submitted.",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
      });

      setValues({
        uid: user.uid,
        device: "",
        brand: "",
        model: "",
        serial: "",
        property: "",
        complaints: "",
      });

      const ringtone = new Audio(successSfx);
      ringtone.play();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.response.data.message,
        showConfirmButton: true,
        confirmButtonText: "Return",
        confirmButtonColor: "#3b82f6",
      });
      const ringtone = new Audio(errorSfx);
      ringtone.play();
    }
  }

  const handleSelectDevice = (device) => {
    setValues({ ...values, device: device });
    setError({ ...error, device: "" });
    setDropdown(!dropdown);
  };

  const handleClickOutside = (event) => {
    if (
      dropDownContentRef.current &&
      !dropDownContentRef.current.contains(event.target) &&
      dropDownButtonRef.current &&
      !dropDownButtonRef.current.contains(event.target)
    ) {
      setDropdown(false);
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
    <motion.form
      variants={popUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex max-w-md flex-col items-center justify-between gap-4 rounded-md bg-white p-6 shadow-xl"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      {!openSelectedRequest ? (
        <motion.h1
          variants={popUpItem}
          className="mb-4 text-center text-2xl font-black text-cyan-500"
        >
          Repair Requisition Form
        </motion.h1>
      ) : (
        <motion.h1
          variants={popUpItem}
          className="mb-4 text-center text-2xl font-black text-cyan-500"
        >
          {selectedRequest.requestId}
        </motion.h1>
      )}

      <motion.div
        variants={popUpItem}
        className="relative w-full text-gray-500 "
      >
        <p className="mb-1 w-full text-xs font-medium text-gray-400 ">
          Equipment Type
        </p>
        <div
          ref={dropDownButtonRef}
          className={`flex place-items-center justify-between rounded-md border p-2 ${
            !values.device ? "text-gray-400" : ""
          }`}
          onClick={() => setDropdown(!dropdown)}
          style={{ cursor: !selectedRequest ? "pointer" : "auto" }}
        >
          <span>{!values.device ? "Select a device" : values.device}</span>
          {!selectedRequest && <FaChevronDown />}
        </div>
        <AnimatePresence>
          {dropdown && !selectedRequest && (
            <motion.ul
              variants={dropdownAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              ref={dropDownContentRef}
              className={`absolute mt-4 w-full overflow-hidden rounded-md bg-black/5 backdrop-blur-2xl`}
            >
              {devices.map((device, index) => (
                <motion.li
                  variants={popUpItem}
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-400/50"
                  onClick={() => handleSelectDevice(device)}
                >
                  {device}
                </motion.li>
              ))}
              <motion.li
                variants={popUpItem}
                className="cursor-pointer  hover:bg-gray-400/20 "
              >
                <input
                  name="device"
                  className="w-full bg-transparent p-2 outline-none placeholder:text-gray-500"
                  type="text"
                  placeholder="If other, please specify here"
                  onChange={handleOnChange}
                />
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>

        {error.device && (
          <span className="w-full text-start text-sm text-red-500">
            {error.device}
          </span>
        )}
      </motion.div>

      <div className="flex w-full gap-4">
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
      <div className="w-full">
        <motion.p
          variants={popUpItem}
          className="mb-1 text-xs font-medium text-gray-400"
        >
          Defects/Complaints
        </motion.p>
        <motion.textarea
          variants={popUpItem}
          className="w-full rounded-md border p-2 text-gray-500 outline-none "
          name="complaints"
          value={values.complaints}
          placeholder="If there is any other relevant information you think might be helpful for our admin team to know, please include it here."
          rows={7}
          onChange={handleOnChange}
        ></motion.textarea>
        <span className="w-full text-start text-sm text-red-500">
          {error.complaints}
        </span>
      </div>
      {/* If user request is clicked, form close button is rendered on the top right corner */}
      {/* Else cancel button is checked if props is set to true then render  */}
      {openSelectedRequest ? (
        <motion.button
          variants={popUpItem}
          className="absolute right-0 top-0 p-3 text-gray-400 hover:text-gray-500"
          onClick={closeForm}
          type="button"
        >
          <IoCloseCircle size={32} />
        </motion.button>
      ) : (
        <div className="flex w-full gap-4">
          {cancelButton && (
            <Button
              secondary
              width="full"
              rounded="md"
              buttonText="Cancel"
              onClick={closeForm}
            />
          )}
          <Button
            primary
            width="full"
            rounded="md"
            type="submit"
            buttonText="Submit"
          />
        </div>
      )}
      {/* Status */}
      {openSelectedRequest && (
        <motion.div
          variants={popUpItem}
          className={`w-full rounded-md px-4 py-2 text-center font-bold text-white ${
            selectedRequest.status === "Pending"
              ? "bg-yellow-500"
              : "bg-green-500"
          } `}
        >
          {selectedRequest.status}
        </motion.div>
      )}
    </motion.form>
  );
}

export default RequestForm;
