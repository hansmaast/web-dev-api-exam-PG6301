import React from "react";
import {styles} from "../../styles";
import {withRouter} from "react-router-dom";

export class MyItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myItems: null
        }
    }

    componentDidMount() {
        console.log('User -->', this.props.user)
        this.fetchMyItems();
    }

    fetchMyItems = async () => {
        const url = "api/my-items";

        const myItems = [...this.props.user.myItems];

        console.log('user items ->', myItems);

        const payload = {
            myItems
        };
        let response;
        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();

            this.setState({myItems: payload})
        }
    }

    sellItem = (index) => {
        const {myItems} = this.state;
        const {sellUserItem} = this.props;

        sellUserItem(myItems[index])

        this.fetchMyItems();
    };

    render() {
        const {user} = this.props;
        if (!user) {
            this.props.history.push('/');
            return null;
        }
        const {myItems, errorMsg} = this.state

        let error = errorMsg ? <p>{errorMsg}</p> : null

        let listOfItems;
        if (myItems !== null && myItems.length > 0) {
            listOfItems = myItems.map((item, index) => {
                return (
                    <div key={index} style={styles.noteContainer}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price},-</p>
                        <button onClick={() => this.sellItem(index)}>Sell item</button>
                    </div>
                )
            })
        } else {
            listOfItems = <p> You have no items...</p>
        }

        return (
            <div style={styles.mainContainer}>
                <h2>Your items:</h2>
                {error}
                <div>
                    {listOfItems}
                </div>
            </div>
        )
    }
}

export default withRouter(MyItems)