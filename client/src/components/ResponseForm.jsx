import React, { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import FormInput from "./FormInput";
import Button from "./Button";
import ApiService from "../api/apiService";
import Validation from "../utils/Validation";

function ResponseForm(props) {
  const { activeForm, requestId, setLoading, setSelectedRequest } = props;
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
      setSelectedRequest(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={`mb-4 flex flex-col gap-4 rounded-md bg-white p-8 text-sm text-gray-500 shadow-sm ${
        formLoading ? "[&>*]:animate-pulse" : ""
      }`}
      onSubmit={handleCompleteRequest}
    >
      <div
        className="flex w-fit cursor-pointer items-center text-gray-400 duration-300 hover:text-gray-500"
        onClick={() => {
          !formLoading ? activeForm(false) : null;
        }}
      >
        <MdChevronLeft size={24} />
        <p>Details</p>
      </div>
      <h1 className="text-xl font-bold">Repair Response</h1>
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
        <p className="col-span-2 text-xs font-medium text-gray-400">
          Equipment Type
        </p>
        {adminRadioItems.map((item, index) => (
          <div className="flex items-center gap-2" key={index}>
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
          </div>
        ))}
        {error.equipment && (
          <span className="col-span-2 text-start text-sm text-red-500">
            {error.equipment}
          </span>
        )}
      </div>

      <Button
        primary
        type="submit"
        rounded="md"
        width="full"
        buttonText="Mark as completed"
        disabled={formLoading}
      />
    </form>
  );
}

export default ResponseForm;
