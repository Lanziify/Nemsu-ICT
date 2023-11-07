import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import FormInput from "./FormInput";
import Button from "./Button";
import { dropdownAnimation, popUp, popUpItem } from "../animations/variants";
import Validation from "../utils/Validation";
import ApiService from "../api/apiService";
import ResizablePanel from "./ResizablePanel";

function RegistrationForm(props) {
  const { user } = props;
  const [values, setValues] = useState({
    name: "",
    position: "",
    office: "",
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
      const formErrors = Validation.validateRegistration(values);

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

      await ApiService.registerUser(values, token);

      // Hide loading after the API call completes
      Swal.close();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "User has been successfully registered.",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
      });

      setValues({
        name: "",
        position: "",
        office: "",
        email: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
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
      className="relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-gray-100 bg-white p-6 shadow-sm"
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
        <ResizablePanel>
          <div
            ref={dropDownButtonRef}
            className={`flex place-items-center justify-between rounded-xl border p-2 ${
              !values.device ? "text-gray-400" : ""
            }`}
            onClick={() => setDropdown(!dropdown)}
            style={{ cursor: !dropdown ? "pointer" : "auto" }}
          >
            <span>
              {!values.position ? "Select Position" : values.position}
            </span>
            <FaChevronDown />
          </div>
          {dropdown && (
            <motion.ul
              variants={dropdownAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              ref={dropDownContentRef}
              className={`mb-2 mt-4 max-h-48 w-full overflow-auto rounded-md bg-black/5 backdrop-blur-2xl`}
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
        </ResizablePanel>

        {error.position && (
          <span className="w-full text-start text-sm text-red-500">
            {error.position}
          </span>
        )}
      </motion.div>
      <FormInput
        label="Office"
        name="office"
        type="office"
        value={values.office}
        placeholder="Office"
        error={error.office}
        onChange={handleOnChange}
      />
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
      <motion.div variants={popUpItem} className="w-full">
        <Button
          primary
          width="full"
          rounded="xl"
          type="submit"
          buttonText="Register"
        />
      </motion.div>
    </motion.form>
  );
}

export default RegistrationForm;
