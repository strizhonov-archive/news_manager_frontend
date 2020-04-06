import React, {Component} from 'react';
import PageNumbers from "../common/PageNumbers";
import PaginatedNews from "./PaginatedNews";
import {Link} from 'react-router-dom';
import NewsSearch from "./NewsSearch";
import searchImage from "../../img/search.png";
import {loadAuthor, loadNews, searchNews} from "../../api";

const defaultNewsPerPage = 3;

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: 1,
            newsPerPage: defaultNewsPerPage,
            news: [],
            search: {
                selectedFormattedAuthor: null
            }
        };
        this.tagsSelectRef = React.createRef();
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("News mounted."))
    }

    async fetchData() {
        const news = await loadNews();

        this.setState({
            news: news,
            isLoading: false
        });
    }

    handleSearchSwitch = () => {
        const searchBlock = document.getElementById("search");

        if (searchBlock.style.display === "none" || searchBlock.style.display === "") {
            searchBlock.style.display = "block";
        } else {
            searchBlock.style.display = "none";
        }
    };

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
            news: prevState.news.filter(el => el.id !== id)
        }))
    };

    handleSearch = async () => {
        const searchBody = await this.createSearchBody();

        console.log(searchBody);
        const filteredNews = await searchNews(searchBody);

        this.setState({
            news: filteredNews
        });
    };

    handleAuthorSelect = (selectedFormattedAuthor) => {
        this.setState({
            search: {
                // "" value is set to "Any Author" option
                selectedFormattedAuthor: selectedFormattedAuthor.value === "" ? null : selectedFormattedAuthor
            }
        })
    };

    createSearchBody = async () => {
        const searchBody = {};

        const {selectedFormattedAuthor} = this.state.search;
        if (selectedFormattedAuthor != null) {
            searchBody.author = await loadAuthor(selectedFormattedAuthor.value);
        }

        const tagsToSearch = this.tagsSelectRef.current.getSelectedItems();
        searchBody.tags = tagsToSearch.map(tag => tag.name);

        return searchBody;
    };

    lastPage = () => {
        const {news, newsPerPage} = this.state;
        return Math.ceil(news.length / newsPerPage);
    };

    render() {

        const {news, isLoading, currentPage, newsPerPage} = this.state;

        if (isLoading) {
            return <p className="text-center">Loading...</p>;
        }

        return (
            <div>
                <div className="row">
                    <h2 className="col-sm-6 block-header">News</h2>
                    <div className="col-sm-3">
                        <button onClick={this.handleSearchSwitch}
                                className="generic-button light-blue-background-button search-button">
                            <img src={searchImage} alt=""/>
                        </button>
                    </div>
                    <div className="col-sm-3">
                        <Link to='/news/create'>
                            <button
                                className="generic-button">
                                Add
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="search"
                     className="search-block">
                    <NewsSearch handleAuthorSelect={this.handleAuthorSelect}
                                handleSearch={this.handleSearch}
                                tagsSelectRef={this.tagsSelectRef}/>
                </div>
                <div className="list">
                    <PaginatedNews
                        handleDelete={this.handleDelete}
                        newsPerPage={newsPerPage}
                        currentPage={currentPage}
                        news={news}
                    />
                </div>
                <PageNumbers
                    currentPage={this.state.currentPage}
                    itemsLength={news.length}
                    itemsPerPage={newsPerPage}
                    handlePageNumber={this.handlePageNumber}
                    handleRight={this.handleRight}
                    handleLeft={this.handleLeft}
                />
            </div>
        );
    }
}