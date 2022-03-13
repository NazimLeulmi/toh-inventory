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

module.exports = { validateSignIn, validateSignUp }


