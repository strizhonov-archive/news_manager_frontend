import React, {Component} from 'react';
import ExistingAuthor from "./ExistingAuthor";

class PaginatedAuthors extends Component {

    render() {

        const {authors, currentPage, authorsPerPage} = this.props;

        const indexOfLast = currentPage * authorsPerPage;
        const indexOfFirst = indexOfLast - authorsPerPage;
        const currentAuthors = authors.sort((a, b) => b.id - a.id).slice(indexOfFirst, indexOfLast);

        return (
            <div>
                {
                    currentAuthors.map(author =>
                        <ExistingAuthor
                            key={author.id}
                            author={author}
                            handleDelete={this.props.handleDelete}
                        />
                    )
                }
            </div>
        );
    }
}

export default PaginatedAuthors;