import React, {Component} from 'react';

class AuthorView extends Component {

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
                <div className="row">
                    <div className="list-item col-sm-4 right-border">{author.name}</div>
                    <div className="list-item col-sm-4 right-border">{author.surname}</div>
                    <button type="button"
                            className="generic-button col-sm-2 right-border"
                            onClick={this.props.handleEdit}>
                        EDIT
                    </button>
                    <button type="button"
                            className="generic-button red-background-button col-sm-2"
                            onClick={this.props.handleDelete}>
                        DELETE
                    </button>
                </div>
            </div>
        )
    }
}

export default AuthorView;