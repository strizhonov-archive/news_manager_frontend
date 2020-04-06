import React, {Component} from 'react';
import Select from "react-select";
import {authorSelect, tagsSelect} from "./news-style-constants";
import {Multiselect} from "multiselect-react-dropdown";
import {anyAuthor} from "../../consts";
import {loadAuthors, loadTags} from "../../api";

export default class NewsSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formattedAuthors: [],
            allTags: []
        };
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("News Search mounted."))
    }

    async fetchData() {
        const rawAuthors = await loadAuthors();
        const formattedAuthors = this.formatAuthors(rawAuthors);
        let emptyWithFormattedAuthors = [];
        emptyWithFormattedAuthors.push(anyAuthor);
        emptyWithFormattedAuthors = emptyWithFormattedAuthors.concat(formattedAuthors);

        const allTags = await loadTags();

        this.setState({
            formattedAuthors: emptyWithFormattedAuthors,
            allTags: allTags
        });
    }

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

        const {formattedAuthors, allTags} = this.state;

        return (
            <div>
                <div className="author-select">
                    <Select
                        defaultValue={anyAuthor}
                        placeholder="Select Author..."
                        onChange={this.props.handleAuthorSelect}
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
                        ref={this.props.tagsSelectRef}
                        style={tagsSelect}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <button className="generic-button text-center"
                                onClick={this.props.handleSearch}>
                            SEARCH
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}