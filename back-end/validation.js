const validator = require('validator');


function validateSignIn(data) {
    const { email, password } = data;
    console.log("Sign-in form validation");
}
function validateSignUp(data) {
    const { email, password, passwordc, firstName, lastName } = data;
    console.log("Sign-up form validation");
}
}

