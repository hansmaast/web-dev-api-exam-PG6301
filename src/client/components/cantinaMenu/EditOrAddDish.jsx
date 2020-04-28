import React from "react";
import {styles} from "../..//styles";

export class EditOrAddDish extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const {servedOnDays} = this.props.dish;

        const checkDays = daysOfWeek.map( (day, key) => {
            if (servedOnDays.includes(day)){
            return(
                <div key={key}>
                    <input type='checkbox'
                           checked={true}
                           id={day.toLowerCase()}
                           name="servedOnDays"
                           value={day}
                           key={key}
                           onChange={this.props.onInputChange.servedOnDays}/>
                    <label htmlFor={day.toLowerCase()}>{day}</label>
                </div>
            )
            } else {
                return(
                    <div key={key}>
                        <input type='checkbox'
                               checked={false}
                               id={day.toLowerCase()}
                               name="servedOnDays"
                               value={day}
                               onChange={this.props.onInputChange.servedOnDays}/>
                        <label htmlFor={day.toLowerCase()}>{day}</label>
                    </div>
                )
            }
        })

        return (
            <div id={"createNoteContainer"}
                 style={{...styles.noteContainer, display: "flex", flexDirection: "column"}}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                <input id={"noteTitle"}
                       style={styles.inputField}
                       type="text"
                       placeholder={"Name of Dish"}
                       value={this.props.dish.nameOfDish}
                       name={"nameOfDish"}
                       onChange={this.props.onInputChange.nameOfDish}
                />
                <textarea style={styles.inputField}
                          value={this.props.dish.description}
                          placeholder={"Description.."}
                          name={"description"}
                          onChange={this.props.onInputChange.description}
                />
                </div>
                <div>
                <p>Select days available</p>
                {checkDays}
                </div>
                {
                    this.props.dishIsUpdating ?
                        <button style={styles.secondaryBtn}
                                disabled={true}>
                            Add Dish
                        </button> :
                        <button style={styles.secondaryBtn}
                                onClick={this.props.createDish}>
                            Add Dish
                        </button>
                }
                {
                    this.props.dishIsUpdating ?
                        <button style={styles.secondaryBtn}
                                onClick={this.props.updateDish}>
                            Update Dish
                        </button> :
                        <button style={styles.secondaryBtn}
                                disabled={true}>
                            Update Dish
                        </button>
                }
                {
                    this.props.dishIsUpdating ?
                        <button style={styles.secondaryBtn}
                                onClick={this.props.resetDish}>
                            Cancel
                        </button> :
                        <button style={styles.secondaryBtn} disabled={true}>
                            Cancel
                        </button>
                }
            </div>
        )
    }
}