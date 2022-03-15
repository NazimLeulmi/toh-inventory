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
    return { isValid: errorsString === "" ? true : false, }
}
function validateSignUp(data) {
    const { email, password, passwordc, firstName, lastName } = data;
    const errors = { email: "", password: "", passwordc: "", firstName: "", lastName: "" };
    // Email input validation
    if (email === "" || email === null || email === undefined) {
        errors.email = " The email address is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "The email address is invalid";
    }
    // First name input validation
    if (firstName === "" || firstName === null || firstName === undefined) {
        errors.firstName = "The first name is required";
    } else if (!validator.isAlpha(firstName)) {
        errors.firstName = "The first name must contain only letters";
    }
    // Last name input validation
    if (lastName === "" || lastName === null || lastName === undefined) {
        errors.lastName = "The last name is required";
    } else if (!validator.isAlpha(lastName)) {
        errors.lastName = "The last name must contain only letters";
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
    const errorsString = errors.email + errors.password + errors.firstName + errors.lastName + errors.passwordc;
    return { isValid: errorsString === "" ? true : false, errors }
}
function validateProcessor(data) {
    console.log(data);
    const { processor_type, receipt_from, receipt_date, description, serial_number } = data;
    const errors = {
        processor_type: "", receipt_from: "", receipt_date: "",
        description: "", serial_number: ""
    };
    // Processor type validation
    if (processor_type === "" || processor_type === null || processor_type === undefined) {
        errors.processor_type = "The processor type is required";
    }
    // Receipt location validation
    if (receipt_from === "" || receipt_from === null || receipt_from === undefined) {
        errors.receipt_from = "The receipt location is required";
    }
    // Receipt date validation
    if (receipt_date === "" || receipt_date === null || receipt_date === undefined) {
        errors.receipt_date = "The receipt date is required";
    }
    else if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        .test(receipt_date) === false) {
        errors.receipt_date = "Date format has to be DD/MM/YYYY";
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
        errors.receipt_from = "The serial number must contain only numbers";
    }


    console.log("Processor form validation");
    const errorsString = errors.receipt_from + errors.receipt_date + errors.description +
        errors.serial_number + errors.processor_type;
    return { isValid: errorsString === "" ? true : false, errors }
}


module.exports = { validateSignIn, validateSignUp, validateProcessor }


