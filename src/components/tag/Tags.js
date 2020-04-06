import React, {Component} from 'react';
import NewTag from "./NewTag";
import PageNumbers from "../common/PageNumbers";
import PaginatedTags from "./PaginatedTags";
import {loadTags} from "../../api";

const defaultTagsPerPage = 5;

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasNewLine: false,
            currentPage: 1,
            tagsPerPage: defaultTagsPerPage,
            tags: []
        };
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("Tags mounted."))
    }

    async fetchData() {
        const tags = await loadTags();
        this.setState({tags: tags, isLoading: false});
    }

    handlePageNumber = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    };

    handleRight = () => {
        const {currentPage} = this.state;
        if (currentPage < this.lastPage()) {
            this.setState({
                currentPage: currentPage + 1
            });
        }
    };

    handleLeft = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: (this.state.currentPage - 1)
            });
        }
    };

    handleDelete = (id) => {
        this.setState(prevState => ({
            tags: prevState.tags.filter(el => el.id !== id)
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
                tags: prevState.tags.filter(el => el.id !== 0),
                hasNewLine: false
            })
        )
    };

    refresh = () => {
        this.setState(() => ({}))
    };

    lastPage = () => {
        const {tags, tagsPerPage} = this.state;
        return Math.ceil(tags.length / tagsPerPage);
    };

    render() {

        const {tags, isLoading, currentPage, tagsPerPage, hasNewLine} = this.state;

        if (isLoading) {
            return <p className="text-center">Loading...</p>;
        }

        const newEntityField = hasNewLine === true
            ?
            <NewTag
                handleCancel={this.handleCancel}
                refresh={this.refresh}
            />
            :
            '';


        return (
            <div style={tagView}>
                <div className="row">
                    <h2 className="col-sm-9 block-header">Tags</h2>
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

                    <PaginatedTags
                        handleDelete={this.handleDelete}
                        tagsPerPage={tagsPerPage}
                        currentPage={currentPage}
                        tags={tags}
                    />
                </div>
                <PageNumbers
                    currentPage={this.state.currentPage}
                    itemsLength={tags.length}
                    itemsPerPage={tagsPerPage}
                    handlePageNumber={this.handlePageNumber}
                    handleRight={this.handleRight}
                    handleLeft={this.handleLeft}
                />
            </div>
        );
    }
}

const tagView = {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    flex: "inherit"
};

export default Tags;