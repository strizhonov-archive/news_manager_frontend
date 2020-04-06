import React, {Component} from 'react';
import './news.css';
import {loadNewsItem} from "../../api";

export default class FullNewsItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("FullNewsItem mounted."))
    }

    async fetchData() {
        const id = this.props.location.pathname.split("/")[2];
        const newsItem = loadNewsItem(id);
        this.setState({news: newsItem, isLoading: false});
    }

    render() {

        const {news, isLoading} = this.state;

        if (isLoading) {
            return <p className="text-center">Loading...</p>;
        }

        const tags = news.tags.length > 0
            ?
            <div className="row">
                <div className="col-sm-12">
                    <div className="tags">
                        {
                            news.tags.map(tag =>
                                <div className="tag-in-news">{tag.name}</div>
                            )
                        }
                    </div>
                </div>
            </div>
            : '';

        return (
            <div className="col-sm-12 news-item-block">
                <div className="row">
                    <h3 className="col-sm-12">{news.title}</h3>
                </div>
                <div className="row">
                    <div className="col-sm-12 author">
                        {news.author.name}&nbsp;{news.author.surname},&nbsp;{news.creationDate}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 short-text">{news.shortText}</div>
                </div>

                {tags}

                <div className="divider"/>
                <div className="row">
                    <div className="col-sm-12 full-text">{news.fullText}</div>
                </div>
            </div>
        );
    }
}