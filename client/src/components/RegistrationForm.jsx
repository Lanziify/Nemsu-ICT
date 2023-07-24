import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import FormInput from "./FormInput";
import Button from "./Button";
import { dropdownAnimation, popUp, popUpItem } from "../animations/variants";
import validateRegistration from "../utils/validateRegistration";

function RegistrationForm(props) {
  const { user } = props;
  const [values, setValues] = useState({
    name: "",
    position: "",
    email: "",
    password: "",
  });
  const [dropdown, setDropdown] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const dropDownButtonRef = useRef();
  const dropDownContentRef = useRef();

  const position = [
    "Instructor I",
    "Instructor II",
    "Instructor II",
    "Assistant Professor I",
    "Assistant Professor II",
    "Assistant Professor III",
    "Assistant Professor IV",
    "Associate Professor I",
    "Associate Professor II",
    "Associate Professor III",
    "Associate Professor IV",
    "Professor I",
    "Professor II",
    "Professor III",
    "Professor IV",
    "Professor V",
    "Professor VI",
  ];

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const formErrors = validateRegistration(values);

      if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
        return;
      }
      // Show loading before the API call
      Swal.fire({
        title: "Loading...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const token = await user.getIdToken();

      await axios.post(
        `${baseURL}/register`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Hide loading after the API call completes
      Swal.close();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your request has been successfully submitted.",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
      });

      setValues({
        name: "",
        position: "",
        email: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.response.data.message,
        showConfirmButton: true,
        confirmButtonText: "Return",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const handleSelectedPosition = (position) => {
    setValues({ ...values, position: position });
    setError({ ...error, position: "" });
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
      className="relative flex min-w-[480px] flex-col items-center justify-between gap-4 rounded-lg border-gray-100 bg-white p-6"
      onSubmit={handleRegistration}
    >
      <motion.h1
        variants={popUpItem}
        className="mb-4 text-center text-2xl font-black text-cyan-500"
      >
        Register User
      </motion.h1>

      <FormInput
        label="Name"
        name="name"
        type="text"
        value={values.name}
        placeholder="Name"
        error={error.name}
        onChange={handleOnChange}
      />
      <motion.div
        variants={popUpItem}
        className="relative w-full text-gray-500 "
      >
        <p className="mb-1 w-full text-xs font-medium text-gray-400 ">
          Position
        </p>
        <div
          ref={dropDownButtonRef}
          className={`flex place-items-center justify-between rounded-md border p-2 ${
            !values.device ? "text-gray-400" : ""
          }`}
          onClick={() => setDropdown(!dropdown)}
          style={{ cursor: !dropdown ? "pointer" : "auto" }}
        >
          <span>{!values.position ? "Select Position" : values.position}</span>
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
              className={`mt-4 max-h-48 w-full overflow-auto rounded-md bg-black/5 backdrop-blur-2xl`}
            >
              {position.map((position, index) => (
                <motion.li
                  variants={popUpItem}
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-400/20"
                  onClick={() => handleSelectedPosition(position)}
                >
                  {position}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {error.position && (
          <span className="w-full text-start text-sm text-red-500">
            {error.position}
          </span>
        )}
      </motion.div>
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={values.email}
        placeholder="Email"
        error={error.email}
        onChange={handleOnChange}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={values.password}
        placeholder="Password"
        error={error.password}
        onChange={handleOnChange}
      />
      <Button
        primary
        width="full"
        rounded="md"
        type="submit"
        buttonText="Register"
      />
    </motion.form>
  );
}

export default RegistrationForm;
