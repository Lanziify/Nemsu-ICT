import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import FormInput from "./FormInput";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import successSfx from "../assets/success.mp3";
import errorSfx from "../assets/error.mp3";
import { dropdownAnimation, popUp, popUpItem } from "../animations/variants";
import ApiService from "../api/apiService";
import Validation from "../utils/Validation";

function RequestForm(props) {
  const { user, closeForm } = props;
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
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formErrors = Validation.validateRequest(values);
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

      await ApiService.createRequest(values, token);

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your request has been successfully submitted.",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
      }).then((result) => {
        if (result.isConfirmed) {
          setValues({
            uid: user.uid,
            device: "",
            brand: "",
            model: "",
            serial: "",
            property: "",
            complaints: "",
          });
        }
      });

      const ringtone = new Audio(successSfx);
      ringtone.play();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
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

  return (
    <motion.form
      variants={popUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex max-w-md flex-col items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-xl"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.h1
        variants={popUpItem}
        className="mb-4 text-center text-2xl font-black text-cyan-500"
      >
        Repair Requisition Form
      </motion.h1>

      <motion.button
        variants={popUpItem}
        className="absolute right-0 top-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
        onClick={() => closeForm(false)}
        type="button"
      >
        <IoCloseCircle size={32} />
      </motion.button>

      <motion.div
        variants={popUpItem}
        className="relative w-full text-gray-500 "
      >
        <p className="mb-1 w-full text-xs font-medium text-gray-400 ">
          Equipment Type
        </p>
        <div
          ref={dropDownButtonRef}
          className={`flex cursor-pointer place-items-center justify-between rounded-xl border p-2 ${
            !values.device ? "text-gray-400" : ""
          }`}
          onClick={() => setDropdown(!dropdown)}
        >
          <span>{!values.device ? "Select a device" : values.device}</span>
          <FaChevronDown />
        </div>
        <AnimatePresence>
          {dropdown && (
            <motion.ul
              variants={dropdownAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              ref={dropDownContentRef}
              className={`absolute mt-4 w-full overflow-hidden rounded-xl bg-black/5 backdrop-blur-2xl`}
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
      <Button
        primary
        width="full"
        rounded="xl"
        type="submit"
        buttonText="Submit"
      />
    </motion.form>
  );
}

export default RequestForm;
