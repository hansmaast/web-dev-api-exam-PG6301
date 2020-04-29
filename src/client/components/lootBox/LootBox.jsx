import React from "react";
import {styles} from "../../styles";
import {withRouter} from "react-router-dom";

export class LootBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItems: null
        }
    }

    getRandomItems = async (amout) => {
        const url = `api/random-items?amount=${amout}`;

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

            console.log('Random items ->', payload);

            this.setState({newItems: payload});

        }
    }

    consumeItem = (index) => {

        const {updateUserItems} = this.props;

        const newItems = [...this.state.newItems];

        updateUserItems(newItems[index])

        newItems.splice(index, 1);

        this.setState({newItems: newItems})

        console.log('Length ->', newItems.length);
    }

    render() {

        const {newItems} = this.state;
        const {items} = this.props;

        let listOfItems;
        if (newItems !== null && newItems.length > 0) {
            listOfItems = newItems.map((item, index) => {
                return (
                    <div key={index} style={styles.noteContainer}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price},-</p>
                        <button onClick={() => this.consumeItem(index)}>
                            Consume
                        </button>
                    </div>
                )
            })
        } else {
            listOfItems = <p> Loot the box to view the items...</p>
        }

        if (newItems !== null && newItems.length === 0) {
            console.log('ready to delete..')
            this.props.updateUserLootBoxes.remove();
            this.setState({newItems: null});
        }


        // TODO: fix this test, onclick is not registered?
        return (
            <div className={'lootBox'} style={styles.noteContainer}>
                <h2>You got a loot box!</h2>
                <div>
                    {listOfItems}
                </div>
                <button className={'gimmeLootBtn'} onClick={() => this.getRandomItems(items)}>Gimme some loot!</button>
                <button onClick={this.props.updateUserLootBoxes.remove}>Remove box</button>
            </div>
        )
    }
}

export default withRouter(LootBox);