import React from "react";
import {styles} from "../../styles";
import {withRouter} from "react-router-dom";

export class MyItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myItems: null,
            missingItems: null
        }
    }

    componentDidMount() {

        this.fetchMyItems()

    }

    fetchMyItems = async () => {
        const {myItems} = this.props.user;

        this.setState({myItems: Object.values(myItems)}, () => this.findMissingItems());
    }

    findMissingItems = async () => {

        const {myItems} = this.props.user;

        const myIds = Object.keys(myItems);

        const url = '/api/missing-items'
        let response;

        try {

            response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({myItems: myIds})
            })

        } catch (err) {

            console.log(err);
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;

        }

        let responsePayload = await response.json();

        if (response.status !== 200) {

            console.log('error', response.status);

        } else {

            console.log('Response from server ->', responsePayload);
            this.setState({missingItems: [...responsePayload]});

        }

    }

    sellItem = (id) => {
        const {sellUserItem} = this.props;

        sellUserItem(id);

        this.fetchMyItems();
    };

    render() {
        const {user} = this.props;
        if (!user) {
            this.props.history.push('/');
            return null;
        }
        const {myItems, missingItems, errorMsg} = this.state

        let error = errorMsg ? <p>{errorMsg}</p> : null

        let listOfItems;
        if (myItems !== null && myItems.length > 0) {
            listOfItems = myItems.map((item) => {
                return (
                    <div className={'myItem'} key={item.id} style={styles.noteContainer}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price},-</p>
                        <p>Amount: {item.amount}</p>
                        <button className={'sellItemBtn'} onClick={() => this.sellItem(item.id)}>Sell item</button>
                    </div>
                )
            })
        } else {
            listOfItems = <p> You have no items...</p>
        }

        let listOfMissingItems;
        if (missingItems !== null && missingItems.length > 0) {
            listOfMissingItems = missingItems.map((item) => {
                return (
                    <div className={'missingItem'} key={item.id} style={styles.noteContainer}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price},-</p>
                    </div>
                )
            })
        } else {
            listOfMissingItems = <p> You have collected all items! </p>
        }

        return (
            <div style={{...styles.mainContainer, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'start'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: 10}}>
                    <h2>Your items:</h2>
                    {error}
                    <div>
                        {listOfItems}
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', margin: 10}}>
                    <h2>Missing items:</h2>
                    <div>{listOfMissingItems}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyItems)