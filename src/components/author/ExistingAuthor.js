import React, {Component} from 'react';
import {deleteAuthor, updateAuthor} from "../../api";
import AuthorEditing from "./AuthorEditing";
import AuthorView from "./AuthorView";

class ExistingAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: props.author,
            editing: false
        };
    }

    handleDelete = () => {
        const id = this.state.author.id;
        deleteAuthor(id).then(
            this.props.handleDelete(id)
        )
    };

    handleNameChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        let author = {...this.state.author};
        author[name] = value;
        this.setState({author});
    };

    handleSurnameChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const surname = event.target.name;
        let author = {...this.state.author};
        author[surname] = value;
        this.setState({author});
    };

    handleUpdate = () => {
        const authorToUpdate = this.state.author;
        updateAuthor(authorToUpdate).then(() => {
            this.handleCancel()
        });
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

        const author = this.state.author;

        return this.state.editing
            ? <AuthorEditing author={author}
                             handleUpdate={this.handleUpdate}
                             handleNameChange={this.handleNameChange}
                             handleSurnameChange={this.handleSurnameChange}
                             handleCancel={this.handleCancel}
                             handleDelete={this.handleDelete}/>
            : <AuthorView author={author}
                          handleEdit={this.handleEdit}
                          handleDelete={this.handleDelete}/>
    }
}

export default ExistingAuthor;