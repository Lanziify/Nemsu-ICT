class Validation {
  static validateLogin = (values) => {
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
  };

  static validateRegistration = (values) => {
    const errorMessage = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.name) {
      errorMessage.name = "Name is required.";
    }
    if (!values.position) {
      errorMessage.position = "Position is required.";
    }
    if (!values.office) {
      errorMessage.office = "Office is required.";
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
  };

  static validateRequest = (values) => {
    const errorMessage = {};
    const deviceRegex = /^[a-zA-Z]+$/;

    // Request form validations
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
  };

  static validateResponse = (values) => {
    const errorMessage = {};

    if (!values.actionTaken) {
      errorMessage.actionTaken = "Please don't forget to fill out this field.";
    }
    if (!values.equipment) {
      errorMessage.equipment = "Please specify the type of equipment.";
    }

    return errorMessage;
  };
}

export default Validation;
