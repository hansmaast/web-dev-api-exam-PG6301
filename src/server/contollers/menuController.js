const Menu = require('../db/menu');
const {msg} = require('../../shared/utils');

exports.getMenu = (req, res) => {

    Menu.initTestMenu()

    const menu = Menu.getAllDishes()

    if (menu.length === 0) {
        res.status(200).json({msg: 'There are no menu for this week..'});
        return;
    }

    res.status(200).json(menu)
};

exports.getDishById = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const id = decodeURIComponent(req.params.id);

    const dish = Menu.getDishById(id)

    if (dish == null) {
        res.status(404).json({msg: 'Could not find dish..'});
        return;
    }

    res.status(200).json(dish)
};

exports.postDish = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: 'You need to login to access this..'});
        return;
    }

    const {addedBy, nameOfDish, description, servedOnDays} = req.body;
    const createdDish = Menu.createDish(addedBy, nameOfDish, description, servedOnDays);

    if (!createdDish) {
        // sends 400 bad request
        res.status(400).json({msg: 'Could not add dish..'});
        return;
    }

    console.log('Created dish -> ', req.body);
    res.status(201).json({msg: "Dish added!"})
};

exports.deleteDish = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const id = req.params.id;

    const deletedDish = Menu.deleteDish(id);

    if (!deletedDish) {
        // sends 400 bad request
        res.status(400).json({msg: 'Could not delete note..'});
        return;
    }

    res.status(200).json({msg: `Note ${id} deleted!`})

};

exports.updateDish = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const id = req.params.id;

    const payload = req.body;
    console.log('Payload with update ' + id + ' ->', payload);
    const updatedNote = Menu.updateDish(id, payload);

    if (!updatedNote) {
        // sends 400 bad request
        res.status(400).json({msg: 'Could not update dish..'});
        return;
    }

    res.status(200).json({msg: `Dish ${id} updated!`});

}

