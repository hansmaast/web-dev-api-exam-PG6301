import React from "react";
import {withRouter} from "react-router-dom";
import {styles} from "../../styles";
import {MenuEditable} from "./MenuEditable";
import {msg} from "../../../shared/utils";
import {EditOrAddDish} from "./EditOrAddDish";

export class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: {
                addedBy: "",
                nameOfDish: "",
                description: "",
                servedOnDays: []
            },
            dishIsUpdating: null,
            menu: null,
            msg: null,
        }
    }

    componentDidMount() {
        this.login()
        this.fetchMenu();
    };

    login = async () => {

        const url = "/api/login";

        const payload = {userId: 'pablo@cantina.io', password: 'Asd123'};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.setState({errorMsg: msg.invalidUserOrPassword});
            return;
        }

        if (response.status !== 200) {
            this.setState({errorMsg: "Error when connecting to server: status code " + response.status});
            return;
        }

        const responsePayload = await response.json();

        this.setState({errorMsg: null});
        console.log(responsePayload);
        this.props.updateLoggedInUser(responsePayload.user);
    }

    fetchMenu = async () => {
        const url = "api/menu";

        let response;
        try {
            response = await fetch(url, {
                method: 'get'
            })
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.setState({menu: payload})
        }
    }

    getDish = async (id) => {
        id = encodeURIComponent(id)
        const url = `api/menu/${id}`

        let response;
        try {
            response = await fetch(url, {
                method: 'get'
            })
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUser(null)
            this.props.history.push('/');
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            const dish = payload;
            this.updateDishState(dish)
            this.setState({dish: dish});
        }
    }

    createDish = async () => {

        const user = this.props.user;
        const {dish} = this.state;

        const newDish = {...dish};
        newDish.addedBy = user.email

        const url = `api/menu`;

        const payload = {
            ...newDish
        };

        console.log('Creating new dish -> ');
        console.table(payload);

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        } catch (err) {
            this.setState({errMsg: "Could not connect to server: " + err});
            return;
        }

        if (response.status === 400) {
            this.setState({msg: 'Could not create dish..'})
            return;
        }
        if (response.status === 201) {
            this.setState({msg: `${dish.nameOfDish} created!`})
            this.resetDishState()
            await this.fetchMenu();
            this.setState({updateDish: false})
        }
    }

    updateDish = async () => {

        const user = this.props.user;
        const {dish} = this.state;

        const updatedDish = {...dish};
        updatedDish.addedBy = user.email

        const url = `api/menu/${dish.id}`;

        const payload = {
            ...updatedDish
        };

        console.log('Update this:');
        console.table(payload);
        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        } catch (err) {
            this.setState({errMsg: "Could not connect to server: " + err});
            return;
        }

        if (response.status === 400) {
            this.setState({msg: 'Could not update dish..'})
            return;
        }
        if (response.status === 200) {
            this.setState({msg: `${dish.nameOfDish} updated!`})
            this.resetDishState()
            await this.fetchMenu();
            this.setState({updateDish: false})
        }
    }

    deleteDish = async (id) => {
        const url = `api/menu/${id}`;

        let response;

        try {
            response = await fetch(url, {
                method: "delete",
            });
            await this.fetchMenu()
        } catch (err) {
            this.setState({msg: "Could not connect to server: " + err});
            return;
        }
        console.log('DishId', id);
    }

    updateDishState = (dish) => {
        this.setState({
            dish: dish,
            dishIsUpdating: true
        })
    }

    resetDishState = () => {
        this.setState({
            dish: {
                nameOfDish: "",
                description: "",
                servedOnDays: []
            },
            dishIsUpdating: null
        });
    }

    onInputChange = {
        /**
         * Inspired by this snippet:
         * https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
         */
        nameOfDish: e => {
            const dish = {...this.state.dish}
            dish.nameOfDish = e.target.value;
            this.setState({dish: {...dish}});
        },
        description: e => {
            const dish = {...this.state.dish}
            dish.description = e.target.value;
            this.setState({dish: {...dish}});
        },
        servedOnDays: e => {

            /**
             *Snippet from this link:
             * https://stackoverflow.com/questions/37129437/how-do-i-use-react-and-forms-to-get-an-array-of-checked-checkbox-values/37130547
             */

            const dish = {...this.state.dish}

            // current array of days
            const {servedOnDays} = dish;

            // check if the check box is checked or unchecked
            if (e.target.checked) {
                // add the value of the checkbox
                servedOnDays.push(e.target.value)
            } else {
                // or remove the value from the unchecked checkbox from the array
                let index = servedOnDays.indexOf(+e.target.value)
                servedOnDays.splice(index, 1)
            }

            // update the state with the new array of days
            this.setState({dish: {...dish}});
        }
    }


    render() {

        const {menu, dish, dishIsUpdating} = this.state

        return (
            <div style={styles.mainContainer}>
                <h2>Add Dish</h2>
                <EditOrAddDish
                    dish={dish}
                    dishIsUpdating={dishIsUpdating}
                    createDish={this.createDish}
                    updateDish={this.updateDish}
                    resetDish={this.resetDishState}
                    onInputChange={this.onInputChange}
                    fetchMenu={this.fetchMenu}/>
                <div>
                    <MenuEditable
                        menuData={menu}
                        deleteDish={this.deleteDish}
                        getDish={this.getDish}/>
                </div>
            </div>
        );
    }
}

export default withRouter(EditMenu)