import React from "react";
import {styles} from "../../styles";
import {withRouter} from "react-router-dom";

export class GameDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameItems: null
        }
    }

    componentDidMount() {
        this.fetchItems()
    }

    fetchItems = async () => {
        const url = "api/game-items";

        let response;
        try {
            response = await fetch(url)
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.setState({gameItems: payload})
        }
    }

    render() {
        const {gameItems} = this.state

        let listOfItems;
        if (gameItems !== null && gameItems.length > 0) {
            listOfItems = gameItems.map((item, index) => {
                return (
                    <div className={'gameItem'} key={index} style={styles.noteContainer}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price},-</p>
                    </div>
                )
            })
        } else {
            listOfItems = <p> There are no items...</p>
        }

        return (
            <div style={styles.mainContainer}>
                <h2>Items found in game:</h2>
                <div>
                    {listOfItems}
                </div>
            </div>
        )
    }
}

export default withRouter(GameDescription)