import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from "./components/home/home";
import Login from "./components/auth/login";
import HeaderBar from "./components/header/headerbar";
import Notes from "./components/notes/notes";
import EditMenu from "./components/cantinaMenu/EditMenu";
import GameDescription from "./components/gameDescription/GameDescription";
import {MyItems} from "./components/myItems/MyItems";
import SignUp from "./components/auth/signup";
import {GachaGame} from "./components/gachaGame/GachaGame";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        // Checks if session cookie already exists and gets the user in return
        this.checkIfAlreadyLoggedIn();
        console.log('index mounted')

    }

    updateLoggedInUser = (user) => {
        this.setState({user: user});
    };

    updateUserItems = item => {
        const user = {...this.state.user}
        let {myItems} = user;

        myItems.push(item.id)

        this.setState({user: {...user}});
    }

    sellUserItem = item => {
        const user = {...this.state.user}
        let {myItems} = user;

        let index = myItems.indexOf(item.id)
        myItems.splice(index, 1)

        user.cash += item.price;

        this.setState({user: {...user}});
    }

    updateUserLootboxes = boxes => {
        const user = {...this.state.user}

        user.lootBoxes += boxes;

        this.setState({user: {...user}});
        console.log('Your boxes ->', this.state.user.lootBoxes)
    }

    async checkIfAlreadyLoggedIn() {

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
            console.log('Payload if exists: ', payload);
            this.updateLoggedInUser(payload.user);
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
                               checkIfLoggedIn={this.checkIfAlreadyLoggedIn}
                               updateLoggedInUser={this.updateLoggedInUser}
                    />
                    <Switch>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      user={this.state.user}
                                                      updateLoggedInUser={this.updateLoggedInUser}/>}
                        />
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       user={this.state.user}
                                                       updateLoggedInUser={this.updateLoggedInUser}/>}
                        />
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        updateLoggedInUser={this.updateLoggedInUser}/>}
                        />

                        <Route exact path="/gacha-game"
                               render={props => <GachaGame {...props}
                                                           user={this.state.user}
                                                           updateUserItems={this.updateUserItems}
                                                           updateLootBoxes={this.updateUserLootboxes}
                                                           updateLoggedInUser={this.updateLoggedInUser}/>}
                        />

                        <Route exact path="/my-items"
                               render={props => <MyItems {...props}
                                                         user={this.state.user}
                                                         sellUserItem={this.sellUserItem}
                                                         updateLoggedInUser={this.updateLoggedInUser}/>}
                        />
                        <Route exact path={"/game-description"}>
                            <GameDescription/>
                        </Route>
                        <Route exact path="/notes"
                               render={props => <Notes {...props}
                                                       user={this.state.user}
                                                       updateLoggedInUser={this.updateLoggedInUser}/>}
                        />
                        <Route component={this.notFound}/>
                    </Switch>
                </>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
