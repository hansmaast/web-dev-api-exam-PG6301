import React from "react";
import {withRouter} from 'react-router-dom';
import {styles} from "../../styles";

export class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: "",
            updateId: null,
            notes: null
        }
    }

    componentDidMount() {
        this.fetchMyNotes();
    }

    fetchMyNotes = async () => {
        const url = "api/notes";

        let response;
        try {
            response = await fetch(url, {
                method: 'get'
            })
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUserId(null, null, null)
            this.props.history.push('/');
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.setState({notes: payload})
        }
    }

    getNote = async (id) => {
        const url = `api/notes/${id}`;

        let response;
        try {
            response = await fetch(url, {
                method: 'get'
            })
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUserId(null, null, null)
            this.props.history.push('/');
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            const {title, text} = payload;
            console.log(title, text);
            this.setState({title: title, text: text, updateId: id});
            //this.setState({notes: payload})
        }
    }

    updateNote = async () => {
        const user = this.props.user;
        const date = new Date().getDate();
        const {title, text, updateId} = this.state;

        const url = `api/notes/${updateId}`;

        const payload = {
            id: updateId,
            author: user.firstName + ' ' + user.lastName,
            date: date,
            title: title,
            text: text
        };

        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        } catch (err) {
            this.setState({errMsg: "Could not connect to server: " + err});
            return;
        }

        await this.fetchMyNotes();
        this.resetNote();
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    resetNote = () => {
        this.setState({title: '', text: '', updateId: null});
    }

    addNote = async () => {
        const user = this.props.user;
        const date = new Date().getDate();
        const {title, text} = this.state;

        const url = "api/notes";

        const payload = {
            author: user.firstName + ' ' + user.lastName,
            date: date,
            title: title,
            text: text
        };

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            await this.fetchMyNotes()
        } catch (err) {
            this.setState({errMsg: "Could not connent to server: " + err});
            return;
        }
        this.setState({title: '', text: ''});
    }

    deleteNote = async (id) => {
        const url = `api/notes/${id}`;

        let response;

        try {
            response = await fetch(url, {
                method: "delete",
            });
            await this.fetchMyNotes()
        } catch (err) {
            this.setState({errMsg: "Could not connect to server: " + err});
            return;
        }
        console.log('noteId', id);
    }

    render() {

        const {notes} = this.state

        let notesContent;
        if (notes !== null && notes.length > 0) {
            notesContent = notes.map((note, index) => {
                return (
                    <div key={index} style={styles.noteContainer}>
                        <h2>Title: {note.title}</h2>
                        <p>Author: {note.author}</p>
                        <p>{note.text}</p>
                        <button onClick={() => this.getNote(note.id)}>Edit</button>
                        <button onClick={() => this.deleteNote(note.id)}>Delete</button>
                    </div>
                )
            })
        } else {
            notesContent = <p>You have no notes..</p>
        }
        return (
            <div style={styles.mainContainer}>
                <h2>Notes</h2>
                <div id={'createNoteContainer'} style={{...styles.noteContainer, display: "flex", flexDirection: "column"}}>
                    <input id={'noteTitle'} style={styles.noteContainer}
                           type="text"
                           placeholder={'Title'}
                           value={this.state.title}
                           name={"title"}
                           onChange={this.onInputChange}
                    />
                    <textarea style={styles.noteContainer}
                              value={this.state.text}
                              placeholder={'Note..'}
                              name={"text"}
                              onChange={this.onInputChange}
                    />
                    {
                        this.state.updateId !== null ?
                            <button style={styles.secondaryBtn}
                                    disabled={true}>
                                Add note
                            </button> :
                            <button style={styles.secondaryBtn}
                                    onClick={this.addNote}>
                                Add note
                            </button>
                    }
                    {
                        this.state.updateId !== null ?
                            <button style={styles.secondaryBtn}
                                    onClick={this.updateNote}>
                                Edit note
                            </button> :
                            <button style={styles.secondaryBtn}
                                    disabled={true}>
                                Edit note
                            </button>
                    }
                    {
                        this.state.updateId !== null ?
                            <button style={styles.secondaryBtn}
                                    onClick={this.resetNote}>
                                Cancel
                            </button> :
                            <button style={styles.secondaryBtn} disabled={true}>
                                Cancel
                            </button>
                    }
                </div>
                <div>
                    <h3>My Notes:</h3>
                    {notesContent}
                </div>
            </div>
        );
    }
}

export default withRouter(Notes)