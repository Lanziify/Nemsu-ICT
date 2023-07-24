export default function validateRegistration(values) {
  const errorMessage = {};
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.name) {
    errorMessage.name = "Name is required.";
  }
  if (!values.position) {
    errorMessage.position = "Position is required.";
  }
  // Request form validations
  if (!values.email) {
    errorMessage.email = "Email is required.";
  } else if (!emailRegex.test(values.email)) {
    errorMessage.email = "Please enter a valid email address.";
  }
  // Password validation
  if (!values.password) {
    errorMessage.password = "Password is required.";
  }

  return errorMessage;
}
