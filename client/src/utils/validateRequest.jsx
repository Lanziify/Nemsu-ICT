export default function validateFields(values) {
  const errorMessage = {};
  // Request form validations
  if (!values.name) {
    errorMessage.name = "Name is required.";
  }
  if (!values.position) {
    errorMessage.position = "Please enter your position.";
  }
  if (!values.device) {
    errorMessage.device = "Please specify the type of your device.";
  }
  if (!values.brand) {
    errorMessage.brand = "Dont forget the brand of your device.";
  }
  if (!values.complaints) {
    errorMessage.complaints =
      "For easier troubleshooting, kindly provide some details regarding with the issue you are experiencing.";
  }

  return errorMessage;
}
