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
                        <Route exact path="/my-items"
                               render={props => <MyItems {...props}
                                                        user={this.state.user}
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
