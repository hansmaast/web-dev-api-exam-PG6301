import React from "react";
import {Link} from "react-router-dom";
import {styles} from "../../styles";

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {user} = this.props

        const HomePage = user ?
            (
                <>
                    <h1>Welcome!</h1>
                    <h3>to</h3>
                    <h1>Gourmet Gacha!</h1>
                    <Link to={'/gacha-game'}>Play Game</Link>
                    <h3>or</h3>
                    <Link to={'/my-items'}>View my items</Link>
                    <p>Click <Link to={'/game-description'}>here</Link> view a descrition of the items found in the game</p>
                    </>
            )
         :
            (
            <>
                <h1>Welcome!</h1>
                <h3>to</h3>
                <h1>Gourmet Gacha!</h1>
                <Link to={'/login'}>Login</Link>
                <h3>or</h3>
                <Link to={'/login'}>Sign Up</Link><p>to play the game!</p>
                <p>Click <Link to={'/game-description'}>here</Link> view a descrition of the items found in the game</p>
            </>
            )


        return (
            <div style={styles.mainContainer}>
            {HomePage}
            </div>
        );
    }
}
