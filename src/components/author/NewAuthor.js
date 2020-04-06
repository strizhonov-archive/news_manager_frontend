import React, {Component} from 'react';
import {emptyAuthor} from "../../consts";
import {saveAuthor} from "../../api";

class NewAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: emptyAuthor
        };
    }

    handleNameInputChange = (event) => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;
        let author = {...this.state.author};
        author[name] = value;
        this.setState({author});
    };

    handleSurnameInputChange = (event) => {
        event.preventDefault();

        const value = event.target.value;
        const surname = event.target.name;
        let author = {...this.state.author};
        author[surname] = value;
        this.setState({author});
    };

    handleSave = () => {
        const authorToSave = this.state.author;
        saveAuthor(authorToSave).then(this.props.refresh());
    };


    render() {
        return (
            <form onSubmit={this.handleSave}>
                <input name="name"
                       className="list-item col-sm-4 right-border"
                       type="text"
                       placeholder="Name"
                       onChange={this.handleNameInputChange}
                />
                <input name="surname"
                       className="list-item col-sm-4 right-border"
                       type="text"
                       placeholder="Surname"
                       onChange={this.handleSurnameInputChange}
                />
                <button type="submit"
                        className="generic-button col-sm-2 right-border">
                    SAVE
                </button>
                <button type="button"
                        className="generic-button purple-background-button col-sm-2 right-border"
                        onClick={this.props.handleCancel}>
                    CANCEL
                </button>
            </form>
        );
    }
}

export default NewAuthor;