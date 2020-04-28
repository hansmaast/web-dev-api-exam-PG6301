import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {styles} from "../../styles";
import {msg} from "../../../shared/utils";


export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMsg: null
        };
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    doLogIn = async () => {
        const {email, password} = this.state;

        const url = "/api/login";

        const payload = {userId: email, password: password};

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
        this.props.history.push('/');
    };

    checkLoginCredentials = () => {
        const {email, password} = this.state;
        return email.trim() === '' || password.trim() === '';
    }

    render() {

        let error;
        if (this.state.errorMsg) {
            error = <p id={'errorMsg'} style={styles.errorMsg}>{this.state.errorMsg}</p>
        }


        return (
            <div style={styles.mainContainer}>
                <div id={'loginContainer'} style={styles.loginContainer}>
                    <p>Please login to continue..</p>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>Email:</p>
                        <input id={"emailInput"}
                               style={styles.loginInput}
                               type="text"
                               value={this.state.email}
                               name={"email"}
                               onChange={this.onInputChange}/>
                    </div>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>Password:</p>
                        <input id={"passwordInput"}
                               style={styles.loginInput}
                               type="password"
                               value={this.state.password}
                               name={"password"}
                               onChange={this.onInputChange}/>
                    </div>
                    {error}
                    <button id={'loginBtn'} disabled={this.checkLoginCredentials()} style={styles.buttonStyle} className="btn"
                            onClick={this.doLogIn}>Log In
                    </button>
                    <p>or</p>
                    <Link to={"/signup"} id={'signupLink'}>Sign up!</Link>
                </div>
            </div>);
    }
}

export default withRouter(Login);
