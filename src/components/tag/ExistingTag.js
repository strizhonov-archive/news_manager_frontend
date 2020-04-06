import React, {Component} from 'react';
import {deleteTag, updateTag} from "../../api";
import TagView from "./TagView";
import TagEditing from "./TagEditing";

export default class ExistingTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: props.tag,
            editing: false
        };
    }

    handleDelete = () => {
        const id = this.state.tag.id;
        deleteTag(id).then(
            this.props.handleDelete(id)
        )
    };

    handleNameChange = (event) => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;
        let tag = {...this.state.tag};
        tag[name] = value;
        this.setState({tag});
    };

    handleUpdate = () => {
        const tagToUpdate = this.state.tag;
        updateTag(tagToUpdate).then(() => this.handleCancel());
    };

    handleEdit = () => {
        this.setState(() => ({
            editing: true
        }))
    };

    handleCancel = () => {
        this.setState(() => ({
            editing: false
        }))
    };

    render() {

        const {tag} = this.state;

        return this.state.editing
            ? <TagEditing tag={tag}
                          handleUpdate={this.handleUpdate}
                          handleNameChange={this.handleNameChange}
                          handleCancel={this.handleCancel}
                          handleDelete={this.handleDelete}/>
            : <TagView tag={tag}
                       handleEdit={this.handleEdit}
                       handleDelete={this.handleDelete}/>

    }
}