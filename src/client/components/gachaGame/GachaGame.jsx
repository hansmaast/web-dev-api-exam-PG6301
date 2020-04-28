import React from "react";
import {Link, withRouter} from "react-router-dom";
import {styles} from "../../styles";
import LootBox from "../lootBox/LootBox";

export class GachaGame extends React.Component {
    constructor(props) {
        super(props);
    }

    buyLootBox = (price) => {
        const {cash} = this.props.user;

        if (price > cash) {
            alert('You do not have enough cash to buy a loot box..:(');
        } else if (
            confirm(`Are u sure u want to buy this loot for $${price},-..?`)
        ) {
            this.props.buyUserLootBox(price);
            this.props.updateUserLootBoxes.add();
        }
    }

    render() {

        const {user} = this.props

        if (!user) {
            this.props.history.push('/');
            return null;
        }

        let {lootBoxes} = user;
        console.log('user boxes ->', lootBoxes);

        let listOfBoxes;
        if (lootBoxes !== null && lootBoxes > 0) {
            const boxArray = [];
            for (let i = lootBoxes; i > 0; i--) {
                boxArray.push(i);
            }
            console.log(boxArray);
            listOfBoxes = boxArray.map((index) => {
                return (
                    <LootBox
                        items={3}
                        updateUserLootBoxes={this.props.updateUserLootBoxes}
                        updateUserItems={this.props.updateUserItems}
                    />
                )
            })
        } else {
            listOfBoxes = <p>You have no loot!</p>
        }


        return (
            <div style={styles.mainContainer}>
                <button
                    style={styles.buttonStyle}
                    onClick={() => this.buyLootBox(1000)}
                > BUY SOME LOOT
                </button>
                <h2>Your loot boxes:</h2>
                {listOfBoxes}
            </div>
        );
    }
}

export default withRouter(GachaGame);
