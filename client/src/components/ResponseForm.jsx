import React, { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import FormInput from "./FormInput";
import Button from "./Button";
import ApiService from "../api/apiService";
import Validation from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  carousell,
  dropdownAnimation,
  fadeDefault,
  popUp,
  popUpItem,
} from "../animations/variants";

function ResponseForm(props) {
  const { activeForm, requestId, setLoading } = props;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    actionTaken: "",
    recommendation: "",
    equipment: "",
  });
  const [error, setError] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  const adminRadioItems = [
    {
      data: "Functional",
    },
    {
      data: "Unserviceable",
    },
    {
      data: "Under observation",
    },
    {
      data: "For repair to authorized ICT service center",
    },
  ];

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleCompleteRequest = async (e) => {
    e.preventDefault();
    try {
      const status = "Completed";
      const formValidation = Validation.validateResponse(values);
      if (Object.keys(formValidation).length > 0) {
        setError(formValidation);
        return;
      }
      setLoading(true);
      setFormLoading(true);
      await ApiService.completeRequest(requestId, status, values);
      setLoading(false);
      activeForm(false);
      setFormLoading(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.form
      // variants={carousell}
      // initial="initial"
      // animate="animate"
      // exit="exit"
      className="flex flex-col gap-4 bg-white p-6 text-sm"
      onSubmit={handleCompleteRequest}
    >
      <motion.h1 variants={popUpItem} className="text-xl font-bold">
        Repair Response
      </motion.h1>
      {/* <div className="flex flex-col gap-4"> */}
      <FormInput
        name="actionTaken"
        values={values.actionTaken}
        label="Action Taken"
        placeholder="Action"
        error={error.actionTaken}
        onChange={handleOnChange}
      />
      <FormInput
        name="recommendation"
        values={values.recommendation}
        label="Recommendation"
        placeholder="Recommendation"
        error={error.recommendation}
        onChange={handleOnChange}
      />
      {/* </div> */}
      <div className="grid grid-cols-2 gap-2">
        <motion.p
          variants={popUpItem}
          className="col-span-2 text-xs font-medium text-gray-400"
        >
          Equipment Type
        </motion.p>
        {adminRadioItems.map((item, index) => (
          <motion.div
            variants={popUpItem}
            className="flex items-center gap-2"
            key={index}
          >
            <input
              type="radio"
              checked={values.equipment === item.data}
              className="h-4 w-4 accent-cyan-600"
              name="equipment"
              value={item.data}
              id={item.data}
              onChange={handleOnChange}
            />
            <label htmlFor={item.id}>{item.data}</label>
          </motion.div>
        ))}
        {error.equipment && (
          <span className="col-span-2 text-start text-sm text-red-500">
            {error.equipment}
          </span>
        )}
      </div>
      <motion.div variants={popUpItem} className="flex gap-4">
        <Button
          secondary
          type="button"
          rounded="xl"
          width="full"
          buttonText="Close"
          disabled={formLoading}
          onClick={() => {
            !formLoading ? activeForm(false) : null;
          }}
        />
        <Button
          primary
          type="submit"
          rounded="xl"
          width="full"
          buttonText="Mark as completed"
          disabled={formLoading}
        />
      </motion.div>
    </motion.form>
  );
}

export default ResponseForm;
