import React from "react";
import {styles} from "../../styles";

export class MenuEditable extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const menu = this.props.menuData

        let menuContent;
        if (menu !== null && menu.length > 0) {
            menuContent = menu.map((dish, index) => {
                return (
                    <div key={index} style={styles.noteContainer}>
                        <h2>{dish.nameOfDish}</h2>
                        <p>{dish.description}</p>
                        <p>Days served: {dish.servedOnDays.join(", ")}</p>
                        <p>{dish.text}</p>
                        <button onClick={() => this.props.getDish(dish.id)}>Edit</button>
                        <button onClick={() => this.props.deleteDish(dish.id)}>Delete</button>
                    </div>
                )
            })
        } else {
            menuContent = <p>The menu is empty..</p>
        }

        return (
            <div>
                <h2>Menu</h2>
                <div>
                    {menuContent}
                </div>
            </div>
        )
    }
}