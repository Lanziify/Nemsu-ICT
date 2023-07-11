import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import validateLogin from "../utils/validateLogin";
import FormInput from "./FormInput";
import logo from "../assets/logo.png";

function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [firebaseError, setFirebaseError] = useState();
  const [error, setError] = useState({});
  const { loginUser } = useAuth();

  // Assign the inputs of the selected field to the target name of state values
  // Clear the error when input changes
  function handleOnChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateLogin(values);
    console.log(formErrors)
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      try {
        await loginUser(values.email, values.password);
      } catch (error) {
        setFirebaseError("Incorrect email address or password");
      }
    }
  }

  return (
    <>
      <form
        className="w-1/3 flex flex-col items-center gap-4 px-8 pt-6 pb-8 bg-white border rounded-md shadow-sm"
        onSubmit={handleSubmit}
      >
        <img className="max-h-20 rounded-full" src={logo} />
        <span className="font-bold text-lg text-gray-500">
          Log in to your account
        </span>
        {firebaseError && <span className="text-red-500">{firebaseError}</span>}
        <FormInput
          name="email"
          type="email"
          value={values.email}
          placeholder="name@example.com"
          error={error.email}
          onChange={handleOnChange}
        />
        <FormInput
          name="password"
          type="password"
          value={values.password}
          placeholder="Password"
          error={error.password}
          onChange={handleOnChange}
        />
        <span className="text-gray-400">Forgot password?</span>
        <button
          className="w-full px-5 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
