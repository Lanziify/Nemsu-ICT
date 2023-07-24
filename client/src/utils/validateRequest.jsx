export default function validateFields(values) {
  const errorMessage = {};
  const deviceRegex = /^[a-zA-Z]+$/;

  // Request form validations
  // if (!values.device || !deviceRegex.test(values.device)) {
  //   errorMessage.device = "Please specify the type of your device.";
  // }

  if (!values.brand) {
    errorMessage.brand = "Dont forget the brand of your device.";
  }
  if (!values.complaints) {
    errorMessage.complaints =
      "For easier troubleshooting, kindly provide some details regarding with the issue you are experiencing.";
  }

  return errorMessage;
}
