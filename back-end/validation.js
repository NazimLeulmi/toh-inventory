const validator = require('validator');


function validateSignIn(data) {
    const { email, password } = data;
    const errors = { email: "", password: "" };
    // Email input validation
    if (email === "" || email === null || email === undefined) {
        errors.email = "The email address is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "The email address is invalid";
    }
    // Password input validation
    if (password.length < 8 || password.length > 12) {
        errors.password = "The password must be 8 ~ 12 characters in length";
    } else if (!validator.isAlphanumeric(password)) {
        errors.password = "The password must contain only letters and numbers";
    }
    console.log("Sign-in form validation");
    const errorsString = errors.email + errors.password;
    return { isValid: errorsString === "" ? true : false, errors }
}
function validateSignUp(data) {
    const { email, password, passwordc, first_name, last_name } = data;
    const errors = { email: "", password: "", passwordc: "", first_name: "", last_name: "" };
    // Email input validation
    if (email === "" || email === null || email === undefined) {
        errors.email = " The email address is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "The email address is invalid";
    }
    // First name input validation
    if (first_name === "" || first_name === null || first_name === undefined) {
        errors.first_name = "The first name is required";
    } else if (!validator.isAlpha(first_name)) {
        errors.first_name = "The first name must contain only letters";
    }
    // Last name input validation
    if (last_name === "" || last_name === null || last_name === undefined) {
        errors.last_name = "The last name is required";
    } else if (!validator.isAlpha(last_name)) {
        errors.last_name = "The last name must contain only letters";
    }
    // Password input validation
    if (password === "" || password === null || password === undefined) {
        errors.password = "The password is required";
    } else if (password.length < 8 || password.length > 12) {
        errors.password = "The password must be 8 ~ 12 characters in length";
    }
    else if (!validator.isAlphanumeric(password)) {
        errors.password = "The password must contain only letters and numbers";
    }
    // Password confirmation
    if (!validator.equals(password, passwordc)) {
        errors.passwordc = "The password confirmation doesn't match";
    }
    const errorsString = errors.email + errors.password + errors.first_name + errors.last_name + errors.passwordc;
    return { isValid: errorsString === "" ? true : false, errors }
}
function validateProcessor(data) {
    console.log(data);
    const { processor_type, received_from, received_date, description, serial_number } = data;
    const errors = {
        processor_type: "", received_from: "", received_date: "",
        description: "", serial_number: ""
    };
    // Processor type validation
    if (processor_type === "" || processor_type === null || processor_type === undefined) {
        errors.processor_type = "The processor type is required";
    }
    // Receipt location validation
    if (received_from === "" || received_from === null || received_from === undefined) {
        errors.received_from = "The receipt location is required";
    }
    // Receipt date validation
    if (received_date === "" || received_date === null || received_date === undefined) {
        errors.received_date = "The receipt date is required";
    }
    else if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        .test(received_date) === false) {
        errors.received_date = "Date format has to be DD/MM/YYYY";
    }
    // Description validation
    if (description === "" || description === null || description === undefined) {
        errors.description = "The description date is required";
    }
    // Serial number validation
    if (serial_number === "" || serial_number === null || serial_number === undefined) {
        errors.serial_number = "The serial number is required";
    }
    else if (!validator.isNumeric(serial_number)) {
        errors.received_from = "The serial number must contain only numbers";
    }


    console.log("Processor form validation");
    const errorsString = errors.received_from + errors.received_date + errors.description +
        errors.serial_number + errors.processor_type;
    return { isValid: errorsString === "" ? true : false, errors }
}


module.exports = { validateSignIn, validateSignUp, validateProcessor }


