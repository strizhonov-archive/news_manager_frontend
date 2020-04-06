import React, {Component} from 'react';
import ExistingTag from "./ExistingTag";

export default class PaginatedTags extends Component {


    render() {

        const {tags, currentPage, tagsPerPage} = this.props;

        const indexOfLast = currentPage * tagsPerPage;
        const indexOfFirst = indexOfLast - tagsPerPage;
        const currentTags = tags.sort((a, b) => b.id - a.id).slice(indexOfFirst, indexOfLast);

        return (
            <div>
                {
                    currentTags.map(tag =>
                        <ExistingTag
                            key={tag.id}
                            tag={tag}
                            handleDelete={this.props.handleDelete}
                        />
                    )
                }
            </div>
        );
    }
}