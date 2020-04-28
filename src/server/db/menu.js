const menu = new Map();

let dishId = 0;

function getDishById(id) {
    return menu.get(parseInt(id));
}

function getAllDishes() {
    const menuAsArray = Array.from(menu.values());
    return menuAsArray;
}

function createDish(addedBy, nameOfDish, description, servedOnDays) {
    if (
        addedBy === '' ||
        nameOfDish === ''
    ) {
        return false;
    }

    const dish = {
        id: dishId,
        addedBy: addedBy,
        dateCreated: Date.now(),
        nameOfDish: nameOfDish,
        description: description,
        servedOnDays: servedOnDays
    };

    menu.set(dishId, dish);
    dishId++;
    return true;
}

function deleteDish(id) {
    return menu.delete(parseInt(id));
}

function initTestMenu() {

    if (menu.size > 0) {
        return;
    }

    if (
        createDish(
            'pablo@cantina.io',
            'Pasta Bolognese',
            'Spaghetti served with a tomato sauce and delicious meatballs.',
            ['All days']
        ) &&
        createDish(
            'pablo@cantina.io',
            'Pasta Carbonara',
            'Spaghetti served with a creamy sauce with bacon and pepper.',
            ['Monday', 'Wednesday', 'Friday', 'Sunday']
        ) &&
        createDish(
            'rico@cantina.io',
            'Ice cream',
            'Delicious ice creame served with fresh berries',
            ['Monday', 'Sunday', 'Saturday', 'Sunday']
        )) {
        console.log('Test cantinaMenu created.');
        return true;
    } else {
        console.log('Could not create test cantinaMenu..');
        return false;
    }
}

function updateDish(id, updatedDish) {

    const dish = {...updatedDish}
    dish.dateCreated = Date.now();

    menu.set(parseInt(id), dish);

    return true;
}

module.exports = {createDish, getDishById, getAllDishes, deleteDish, updateDish, initTestMenu}