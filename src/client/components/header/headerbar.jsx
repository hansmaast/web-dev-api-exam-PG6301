import React from "react";
import {Link, withRouter} from "react-router-dom";
import {styles} from "../../styles";

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, {method: "post"});
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    };

    renderLoggedIn(user) {

        const {firstName, lastName} = user;
        const userName = `${firstName} ${lastName}`;

        return (
            <>
                <button style={styles.secondaryBtn}>
                    <Link to={"/my-items"}>
                        My Items
                    </Link>
                </button>

                <button style={styles.secondaryBtn}>
                    <Link to={"/gacha-game"}>
                        Gacha
                    </Link>
                </button>

                <h3>
                    Welcome, {userName}!
                </h3>

                <h3>$ {user.cash}</h3>

                <button style={styles.secondaryBtn} onClick={this.doLogout}>
                    Logout
                </button>
            </>
        );
    }

    renderNotLoggedIn() {
        return (
            <>
                <p>You are not logged in</p>
                <button style={styles.secondaryBtn}>
                    <Link to="/login">
                        LogIn
                    </Link>
                </button>
            </>
        );
    }

    render() {
        const {user} = this.props;
        let content;
        if (user === null) {
            content = this.renderNotLoggedIn();
        } else {
            content = this.renderLoggedIn(user);
        }

        return (
            <div style={styles.headerBar}>
                <button style={styles.secondaryBtn}>
                    <Link to={"/"}>
                        Home
                    </Link>
                </button>
                {content}
            </div>
        );
    }
}

export default withRouter(HeaderBar);
