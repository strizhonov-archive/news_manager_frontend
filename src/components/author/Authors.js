import React, {Component} from 'react';
import NewAuthor from "./NewAuthor";
import PageNumbers from "../common/PageNumbers";
import PaginatedAuthors from "./PaginatedAuthors";
import {loadAuthors} from "../../api";

const defaultAuthorsPerPage = 5;

class Authors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasNewItemField: false,
            currentPage: 1,
            authorsPerPage: defaultAuthorsPerPage,
            authors: []
        };
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("Authors mounted."))
    }

    async fetchData() {
        const authors = await loadAuthors();
        this.setState({authors: authors, isLoading: false});
    }

    handlePageNumber = (event) => {
        event.preventDefault();
        this.setState({
            currentPage: Number(event.target.id)
        });
    };

    handleRight = () => {
        const {currentPage} = this.state;
        if (currentPage < this.maxPage()) {
            this.setState({
                currentPage: currentPage + 1
            });
        }
    };

    handleLeft = () => {
        const currentPage = this.state.currentPage;
        if (currentPage > 1) {
            this.setState({
                currentPage: (currentPage - 1)
            });
        }
    };

    handleDelete = (id) => {
        this.setState(prevState => ({
            authors: prevState.authors.filter(el => el.id !== id)
        }))
    };

    handleAdd = () => {
        if (this.state.hasNewLine === true) return;
        this.setState(({
                hasNewLine: true
            })
        )
    };

    handleCancel = () => {
        this.setState(prevState => ({
                authors: prevState.authors.filter(el => el.id > 0),
                hasNewLine: false
            })
        )
    };

    refresh = () => {
        this.setState(() => {
        })
    };

    maxPage = () => {
        const {authors, authorsPerPage} = this.state;
        return Math.ceil(authors.length / authorsPerPage);
    };

    render() {

        const {authors, isLoading, currentPage, authorsPerPage, hasNewLine} = this.state;

        if (isLoading) {
            return <p className="text-center">Loading...</p>;
        }

        const newEntityField = hasNewLine === true
            ?
            <NewAuthor
                handleCancel={this.handleCancel}
                refresh={this.refresh}
            />
            : '';

        return (
            <div>
                <div className="row">
                    <h2 className="col-sm-9">Authors</h2>
                    <div className="col-sm-3">
                        <button
                            className="generic-button"
                            onClick={this.handleAdd}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="list">

                    {newEntityField}

                    <PaginatedAuthors
                        handleDelete={this.handleDelete}
                        authorsPerPage={authorsPerPage}
                        currentPage={currentPage}
                        authors={authors}
                    />
                </div>
                <PageNumbers
                    currentPage={this.state.currentPage}
                    itemsLength={authors.length}
                    itemsPerPage={authorsPerPage}
                    handlePageNumber={this.handlePageNumber}
                    handleRight={this.handleRight}
                    handleLeft={this.handleLeft}
                />
            </div>
        );
    }
}

export default Authors;