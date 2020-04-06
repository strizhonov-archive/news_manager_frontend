import React, {Component} from 'react';

class TagView extends Component {

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
                <div className="row">
                    <div className="list-item col-sm-8 right-border">{tag.name}</div>
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

export default TagView;