import React, {Component} from 'react';

class AuthorEditing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: props.author,
        };
    }

    render() {

        const author = this.state.author;

        return (
            <div className="container">
                <form
                    className="row"
                    onSubmit={this.props.handleUpdate}>
                    <input name="name"
                           className="list-item col-sm-3 right-border"
                           type="text"
                           defaultValue={author.name}
                           onChange={this.props.handleNameChange}
                    />
                    <input name="surname"
                           className="list-item col-sm-3 right-border"
                           type="text"
                           defaultValue={author.surname}
                           onChange={this.props.handleSurnameChange}
                    />
                    <button type="submit"
                            className="generic-button col-sm-2 right-border">
                        SUBMIT
                    </button>
                    <button type="button"
                            className="generic-button purple-background-button col-sm-2 right-border"
                            onClick={this.props.handleCancel}>
                        CANCEL
                    </button>
                    <button type="button"
                            className="generic-button red-background-button col-sm-2"
                            onClick={this.props.handleDelete}>
                        DELETE
                    </button>
                </form>
            </div>
        )
    }
}

export default AuthorEditing;