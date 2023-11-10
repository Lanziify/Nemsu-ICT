import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "./FormInput";
import dtoLogo from "../assets/dtoLogo.svg";
import Button from "./Button";
import Validation from "../utils/Validation";
import Preloader from "./Preloader";
import { useDispatch } from "react-redux";
import { setDtoLoading } from "../redux/dtoLoadingSlice";

function LoginForm() {
  const { loginUser } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [firebaseError, setFirebaseError] = useState();
  const [error, setError] = useState({});
  const dispatch = useDispatch()

  // Assign the inputs of the selected field to the target name of state values
  // Clear the error when input changes
  function handleOnChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = Validation.validateLogin(values);
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      try {
        dispatch(setDtoLoading(true))
        await loginUser(values.email, values.password);
      } catch (error) {
        setFirebaseError("Incorrect email address or password");
      }
    }
  }

  return (
    <>
      <form
        className="flex w-96 min-w-0 flex-col items-center gap-4 rounded-2xl bg-white px-8 pb-8 pt-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* <div className="h-24 min-w-[96px] rounded-full border bg-gradient-to-br from-cyan-100 to-cyan-500"></div> */}
        <div className="rounded-full p-2">
          <img src={dtoLogo} alt="DTO logo" className="h-14 w-14" />
        </div>
        <span className="text-lg font-bold text-gray-500">
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
        <Button
          primary
          width="full"
          rounded="lg"
          buttonText="Sign in"
          type="submit"
        />
      </form>
    </>
  );
}

export default LoginForm;
