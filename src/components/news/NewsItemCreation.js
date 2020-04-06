import React, {Component} from 'react';
import {Multiselect} from "multiselect-react-dropdown";
import Select from "react-select";
import './news.css';
import {authorSelect, tagsSelect} from "./news-style-constants";
import {newsPath, newsTitlePattern} from "../../consts";
import {loadAuthor, loadAuthors, loadTags, saveNewsItem} from "../../api";

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

export default class NewsItemCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            formattedAuthors: [],
            allTags: []
        };
        this.tagsSelectRef = React.createRef();
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("News creation view mounted."))
    }

    async fetchData() {
        const rawAuthors = await loadAuthors();
        const formattedAuthors = this.formatAuthors(rawAuthors);

        const allTags = await loadTags();

        this.setState({formattedAuthors: formattedAuthors, allTags: allTags, isLoading: false});
    }

    handleReset = () => {
        this.tagsSelectRef.current.resetSelectedValues();
        this.setState({selectedFormattedAuthor: null});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const newsCreationData = await this.createCreationData(event);
        saveNewsItem(JSON.stringify(newsCreationData));
        console.log(newsCreationData);
            // .then(() => window.location.href = newsPath);
    };

    handleAuthorSelect = (selectedFormattedAuthor) => {
        this.setState({selectedFormattedAuthor: selectedFormattedAuthor});
    };

    createCreationData = async (event) => {
        const formData = new FormData(event.target);
        const newsCreationData = {};

        formData.forEach(function (value, key) {
            newsCreationData[key] = value;
        });
        const {selectedFormattedAuthor} = this.state;
        newsCreationData.author = await loadAuthor(selectedFormattedAuthor.value);
        newsCreationData.tags = this.tagsSelectRef.current.getSelectedItems();

        return newsCreationData;
    };

    formatAuthors = (rawAuthors) => {
        return rawAuthors.map(rawAuthor => {
                return {
                    value: rawAuthor.id,
                    label: rawAuthor.name + ' ' + rawAuthor.surname
                }
            }
        )
    };

    render() {

        const {formattedAuthors, allTags, isLoading, selectedFormattedAuthor} = this.state;

        if (isLoading) {
            return <p className="text-center">Loading...</p>;
        }

        return (
            <div className="news-form-block">
                <h2>News Creation</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="title"
                           type="text"
                           placeholder="Title"/>
                    <textarea name="shortText"
                              placeholder="Short description"/>
                    <textarea name="fullText"
                              placeholder="News contents"/>
                    <div className="author-select">
                        <Select
                            value={selectedFormattedAuthor}
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