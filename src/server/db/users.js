const users = new Map();

let userCounter = 0;

function getUser(id) {
    return users.get(id);
}

function verifyUser(email, password) {

    const user = getUser(email);

    if (!user) {
        return false;
    }

    return user.password === password;
}

function createUser(email, firstName, lastName, password) {

    if (getUser(email)) {
        return false;
    }

    const user = {
        id: userCounter,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    };

    users.set(email, user);
    userCounter++;
    return true;
}

function initTestUser() {

    const user = createUser('pablo@cantina.io', 'Pablo', 'Garcia', 'Asd123');
    if (!user) {
        return;
    } else {
        console.log('Created user!', users);
    }
}

function resetAllUsers() {
    users.clear();
    userCounter = 0;
}

module.exports = {getUser, verifyUser, createUser, resetAllUsers, initTestUser};