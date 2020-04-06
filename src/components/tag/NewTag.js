import React, {Component} from 'react';
import {emptyTag} from "../../consts";
import {saveTag} from "../../api";

export default class NewTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: emptyTag
        };
    }

    handleInputChange = (event) => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;
        let tag = {...this.state.tag};
        tag[name] = value;
        this.setState({tag});
    };

    handleSaving = () => {
        const tagToSave = this.state.tag;
        saveTag(tagToSave).then(this.props.refresh());
    };

    render() {
        return (
            <form onSubmit={this.handleSaving}>
                <input name="name"
                       className="list-item col-sm-8 right-border"
                       type="text"
                       placeholder="Type tag name here"
                       onChange={this.handleInputChange}/>
                <button type="submit"
                        className="generic-button col-sm-2 right-border">
                    SAVE
                </button>
                <button type="button"
                        className="generic-button purple-background-button col-sm-2"
                        onClick={this.props.handleCancel}>
                    CANCEL
                </button>
            </form>
        );
    }
}