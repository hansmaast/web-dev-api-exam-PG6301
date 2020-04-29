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
        //     if (this.props.user) {
        //         this.props.fetchAndUpdateUserInfo();
        //     }
        console.log('User -->', this.props.user)
        this.fetchMyItems();
    }

    fetchMyItems = async () => {
        const {myItems} = this.props.user;

        this.setState({myItems: Object.values(myItems)});
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
        const {myItems, errorMsg} = this.state

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