import React, {Component} from 'react';
import Select from "react-select";
import './news.css';
import {authorSelect, tagsSelect} from "./news-style-constants";
import {Multiselect} from "multiselect-react-dropdown";
import {newsPath} from "../../consts";
import {findNewsItem, loadAuthor, loadAuthors, loadTags, updateNewsItem} from "../../api";

/**
 * Implementation of "Name + Surname" view when selecting from authors, there are two types
 * of data structures introduced:
 *
 * 1. Raw Author = {
 *     id: value,
 *     name: value,
 *     surname: value
 * }
 *
 * 2. Formatted Author = {
 *     value: Raw Author's id,
 *     label: Raw Author's name value + ' ' + Raw Author's surname value
 * }
 */

class NewsItemEditing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            newsItemToEdit: null,
            selectedFormattedAuthor: null,
            defaultFormattedAuthor: null,
            formattedAuthors: [],
            allTags: []
        };
        this.tagsSelectRef = React.createRef();
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("News edition view mounted."))
    }

    async fetchData() {
        const id = this.props.location.pathname.split("/")[2];
        const newsItem = await findNewsItem(id);
        const selectedFormattedAuthor = this.formatAuthor(newsItem.author);

        const rawAuthors = await loadAuthors();
        const formattedAuthors = this.formatAuthors(rawAuthors);
        const allTags = await loadTags();

        this.setState({
            newsItemToEdit: newsItem,
            selectedFormattedAuthor: selectedFormattedAuthor,
            defaultFormattedAuthor: selectedFormattedAuthor,
            formattedAuthors: formattedAuthors,
            allTags: allTags,
            isLoading: false
        });
    }

    handleReset = () => {
        this.tagsSelectRef.current.resetSelectedValues();
        this.setState({
            selectedFormattedAuthor: this.state.defaultFormattedAuthor
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const newsUpdatingData = await this.createUpdatingData(event);
        updateNewsItem(JSON.stringify(newsUpdatingData)).then(() => window.location.href = newsPath);
    };

    handleAuthorSelect = (selectedFormattedAuthor) => {
        this.setState(
            {selectedFormattedAuthor: selectedFormattedAuthor}
        );
    };

    formatAuthor = (rawAuthor) => {
        return {
            value: rawAuthor.id,
            label: rawAuthor.name + ' ' + rawAuthor.surname
        }
    };

    formatAuthors = (rawAuthors) => {
        return rawAuthors.map(author => {
                return {
                    value: author.id,
                    label: author.name + ' ' + author.surname
                }
            }
        )
    };

    createUpdatingData = async (event) => {
        const formData = new FormData(event.target);
        const newsUpdatingData = {};

        newsUpdatingData.id = this.state.newsItemToEdit.id;
        formData.forEach(function (value, key) {
            newsUpdatingData[key] = value;
        });
        const selectedFormattedAuthor = this.state.selectedFormattedAuthor;
        newsUpdatingData.author = await loadAuthor(selectedFormattedAuthor.value);
        newsUpdatingData.tags = this.tagsSelectRef.current.getSelectedItems();

        return newsUpdatingData;
    };

    render() {

        const {isLoading, newsItemToEdit, selectedFormattedAuthor, formattedAuthors, allTags} = this.state;

        if (isLoading) {
            return <p className="text-center">Loading...</p>;
        }

        return (
            <div className="news-form-block">
                <h2>News Editing</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="title"
                           type="text"
                           defaultValue={newsItemToEdit.title}
                           placeholder="Title"/>
                    <textarea name="shortText"
                              defaultValue={newsItemToEdit.shortText}
                              placeholder="Short description"/>
                    <textarea name="fullText"
                              defaultValue={newsItemToEdit.fullText}
                              placeholder="News contents"/>
                    <div className="author-select">
                        <Select
                            defaultValue={selectedFormattedAuthor}
                            placeholder="Select Author..."
                            onChange={this.handleAuthorSelect}
                            options={formattedAuthors}
                            styles={authorSelect}
                        />
                    </div>
                    <div className="tags-select">
                        <Multiselect
                            options={allTags}
                            placeholder="Select Tags..."
                            displayValue="name"
                            closeIcon="cancel"
                            ref={this.tagsSelectRef}
                            style={tagsSelect}
                            selectedValues={newsItemToEdit.tags}
                        />
                    </div>
                    <button
                        type="submit"
                        className="generic-button col-sm-2 right-border">
                        SUBMIT
                    </button>
                    <button
                        type="reset"
                        className="generic-button red-background-button col-sm-2"
                        onClick={this.handleReset}>
                        RESET
                    </button>
                </form>
            </div>
        );
    }
}

export default NewsItemEditing;