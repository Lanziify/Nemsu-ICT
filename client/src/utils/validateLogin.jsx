export default function validateLogin(values) {
  const errorMessage = {};
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Login form validitions
  // Email validation
  if (!values.email) {
    errorMessage.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errorMessage.email = "Please enter a valid email address";
  }
  // Password validation
  if (!values.password) {
    errorMessage.password = "Password is required";
  }
  return errorMessage;
}
