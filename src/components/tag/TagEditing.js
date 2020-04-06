import React, {Component} from 'react';

class TagEditing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: props.tag,
        };
    }

    render() {

        const tag = this.state.tag;

        return (
            <div className="container">
                <form className="row"
                      onSubmit={this.props.handleUpdate}>
                    <input name="name"
                           className="list-item col-sm-6 right-border"
                           type="text"
                           defaultValue={tag.name}
                           onChange={this.props.handleNameChange}
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

export default TagEditing;