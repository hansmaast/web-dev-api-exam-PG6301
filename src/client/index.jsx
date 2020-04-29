import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from "./components/home/home";
import Login from "./components/auth/login";
import HeaderBar from "./components/header/headerbar";
import GameDescription from "./components/gameDescription/GameDescription";
import {MyItems} from "./components/myItems/MyItems";
import SignUp from "./components/auth/signup";
import {GachaGame} from "./components/gachaGame/GachaGame";


/**
 *TODO: -->
 * - Increment money when buying loot
 * - Maybye implement chat if time..
 */


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        // Checks if session cookie already exists and gets the user in return
        this.fetchAndUpdateUserInfo();
        console.log('index mounted')
    }

    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {

            response = await fetch(url, {
                method: "get"
            });

        } catch (err) {

            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;

        }

        if (response.status === 401) {
            // set user to null if unauthorized
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {

            const payload = await response.json();

            this.updateLoggedInUser(payload.user);

        }
    }

    updateLoggedInUser = (user) => {
        this.setState({user: user});
    }

    updateUserInDb = async () => {

        const {user} = this.state;

        const url = "/api/user";

        const payload = user
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
            console.log(err);
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            // set user to null if unauthorized
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
            console.log('Looks like your not online.. we can not save your changes.')
        }

    }

    updateUserItems = item => {
        const user = {...this.state.user}
        let {myItems} = user;

        if (myItems.hasOwnProperty(item.id)) {

            const propValue = myItems[item.id].amount;
            myItems[item.id].amount = propValue + 1;

        } else {

            myItems[item.id] = {
                id: item.id,
                name: item.name,
                description: item.description,
                amount: 1,
                price: item.price
            }
        }

        this.setState({user: {...user}}, () => this.updateUserInDb());
    }

    sellUserItem = id => {

        const user = {...this.state.user}
        let {myItems} = user;


        if (myItems[id].amount > 1) {

            const propValue = myItems[id].amount;
            myItems[id].amount = propValue - 1;

            user.cash += myItems[id].price;

        } else {

            user.cash += myItems[id].price;

            delete myItems[id];

        }

        this.setState({user: {...user}}, () => this.updateUserInDb());


    }

    buyUserLootBox = price => {
        const user = {...this.state.user};
        console.log(typeof price, price);
        // TODO this is not updating when bying loot
        user.cash -= price;
        console.log('user cash ->', user);
        this.setState({user: {...user}}, () => this.updateUserInDb());

    }

    updateUserLootBoxes = {
        remove: () => {

            const user = {...this.state.user}
            const prevValue = user.lootBoxes;
            user.lootBoxes = prevValue - 1

            this.setState({user: {...user}}, () => this.updateUserInDb());
        },
        add: () => {

            const user = {...this.state.user}
            const prevValue = user.lootBoxes;
            user.lootBoxes = prevValue + 1

            this.setState({user: {...user}}, () => this.updateUserInDb());
            console.log('Your boxes ->', this.state.user.lootBoxes)
        }
    }

    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    <HeaderBar user={this.state.user}
                               updateLoggedInUser={this.updateLoggedInUser}
                    />
                    <Switch>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      user={this.state.user}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}
                        />
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       user={this.state.user}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}
                        />
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}
                        />
                        <Route exact path="/gacha-game"
                               render={props => <GachaGame {...props}
                                                           user={this.state.user}
                                                           updateUserItems={this.updateUserItems}
                                                           buyUserLootBox={this.buyUserLootBox}
                                                           updateUserLootBoxes={this.updateUserLootBoxes}/>}
                        />
                        <Route exact path="/my-items"
                               render={props => <MyItems {...props}
                                                         user={this.state.user}
                                                         sellUserItem={this.sellUserItem}/>}
                        />
                        <Route exact path={"/game-description"}>
                            <GameDescription/>
                        </Route>
                        <Route component={this.notFound}/>
                    </Switch>
                </>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
