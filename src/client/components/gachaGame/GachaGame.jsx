import React from "react";
import {Link, withRouter} from "react-router-dom";
import {styles} from "../../styles";
import LootBox from "../lootBox/LootBox";

export class GachaGame extends React.Component {
    constructor(props) {
        super(props);
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
            const data = [];
            for (let i = lootBoxes; i > 0; i--) {
                data.push(i);
            }
            console.log(data);
            listOfBoxes = data.map((index) => {
                return (
                    <LootBox
                        items={3}
                        updateLootBoxes={this.props.updateLootBoxes}
                        updateUserItems={this.props.updateUserItems}
                    />
                )
            })
        }


        return (
            <div style={styles.mainContainer}>
                <h2>Your loot boxes:</h2>
                {listOfBoxes}
            </div>
        );
    }
}

export default withRouter(GachaGame);
