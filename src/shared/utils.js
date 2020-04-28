/**
 * Code from this resource:
 * https://www.w3resource.com/javascript/form/email-validation.php
 *
 * @param email
 * @returns {boolean}
 */
exports.validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

/**
 * Code from this resource:
 * https://www.w3resource.com/javascript/form/password-validation.php
 *
 * Fun:
 * To check a password between 6 to 20 characters which contain
 * at least one numeric digit, one uppercase and one lowercase letter
 *
 * @param passw
 * @returns {boolean}
 */
exports.validatePassword = (passw) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(passw)
}

/**
 * Use this for sending error messages to user from server or client.
 *
 * @type {{invalidPassword: string, serverError: string, falsePasswordMatch: string, notAuthorized: string, invalidEmail: string}}
 */
exports.msg = {
    invalidEmail: 'Pssst! You need to enter a valid email..',
    invalidPassword: 'Pssst! You need to enter a valid password between 6-20 characters, ' +
        'containing at least one numeric digit, one uppercase and one lowercase letter.',
    serverError: 'Failed to connect to server: ',
    falsePasswordMatch: 'Psst! Your passwords does not match..',
    notAuthorized: 'Your are not authorized.. Please login or sign up.',
    userExists: 'There is already a user registered with this email.',
    invalidUserOrPassword: 'Invalid username or password.'
};
