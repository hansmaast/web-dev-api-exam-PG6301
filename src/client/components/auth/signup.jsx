import React from 'react';
import {withRouter} from 'react-router-dom'
import {styles} from "../../styles";
import {validateEmail, validatePassword, msg} from "../../../shared/utils";

export class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            errorMsg: null
        };
    }

    onInputChange = event => {
        this.setState({[event.target.name]: event.target.value, errorMsg: null})
    }

    doSignUp = async () => {

        const {email, firstName, lastName, password, confirmPassword} = this.state;

        if (confirmPassword !== password) {
            this.setState({errorMsg: msg.falsePasswordMatch});
            return;
        }

        const url = "/api/signup";

        const payload = {userId: email, firstName: firstName, lastName: lastName, password: password};

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
            this.setState({errorMsg: msg.serverError + err});
            return;
        }

        if (response.status === 400) {
            this.setState({errorMsg: responsePayload.msg});
            return;
        }

        if (response.status !== 201) {
            this.setState({errorMsg: msg.serverError + response.status});
            return;
        }

        const responsePayload = await response.json()
        this.props.updateLoggedInUser(responsePayload.user);
        this.setState({errorMsg: null});
        this.props.history.push('/');
        console.log(responsePayload);
    };

    checkInputsIsEmpty = () => {

        const {email, firstName, lastName, password, confirmPassword, errorMsg} = this.state;

        const inputFields = [email, firstName, lastName, password, confirmPassword];

        if (!inputFields.includes('') && password === confirmPassword) {
            return false;
        }

        return true;

    }

    render() {

        const {password, confirmPassword, errorMsg} = this.state;


        let clientError = "";
        if (confirmPassword.length > 0) {
            let typingLetters = password.substr(0, confirmPassword.length);
            if (confirmPassword !== typingLetters) {
                clientError = <p id={'errorMessage'} style={styles.errorMsg}>{msg.falsePasswordMatch}</p>;
            }
        }

        let serverError = <p id={'errorMessage'} style={styles.errorMsg} className="errorMsg">{errorMsg}</p>;

        const displayError = errorMsg ? serverError : clientError;

        const errorBtn = (
            <button style={styles.buttonStyle}
                    className="btn"
                    disabled={true}
                    onClick={this.doSignUp}>Sign Up</button>
        );
        const signUpBtn = (
            <button style={styles.buttonStyle}
                    className="btn"
                    disabled={this.checkInputsIsEmpty()}
                    onClick={this.doSignUp}>Sign Up</button>
        )

        return (
            <div style={styles.mainContainer}>
                <div style={styles.loginContainer}>
                    <p>Please sign up to access this site..</p>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>Email:</p>
                        <input style={styles.loginInput}
                               type="email"
                               required={true}
                               value={this.state.email}
                               name={"email"}
                               onChange={this.onInputChange}/>
                    </div>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>First name:</p>
                        <input style={styles.loginInput}
                               type="text"
                               value={this.state.firstName}
                               name={"firstName"}
                               onChange={this.onInputChange}/>
                    </div>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>Last name:</p>
                        <input style={styles.loginInput}
                               type="text"
                               value={this.state.lastName}
                               name={"lastName"}
                               onChange={this.onInputChange}/>
                    </div>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>Password:</p>
                        <input style={styles.loginInput}
                               type="password"
                               name={"password"}
                               required={true}
                               value={this.state.password}
                               onChange={this.onInputChange}/>
                    </div>
                    <div style={styles.loginField}>
                        <p style={styles.loginLabel}>Confirm:</p>
                        <input style={styles.loginInput}
                               type="password"
                               value={this.state.confirmPassword}
                               name={"confirmPassword"}
                               onChange={this.onInputChange}/>
                    </div>
                    {displayError}
                    {errorMsg ?
                        errorBtn :
                        signUpBtn
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
