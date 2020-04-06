import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './news.css';
import {deleteNewsItem} from "../../api";

export default class NewsItemInList extends Component {

    handleDelete = () => {
        const {news} = this.props;
        deleteNewsItem(news.id).then(this.props.handleDelete(news.id))

    };

    render() {

        const {news} = this.props;

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

                <div className="row">
                    <div className="col-sm-12">
                        <Link to={`/news/${news.id}`}>
                            <button type="button"
                                    className="generic-button light-blue-background-button col-sm-2 right-border">
                                SHOW
                            </button>
                        </Link>
                        <Link
                            to={`/news/${news.id}/edit`}>
                            <button type="button"
                                    className="generic-button col-sm-2 right-border">
                                EDIT
                            </button>
                        </Link>
                        <button type="button"
                                className="generic-button red-background-button col-sm-2"
                                onClick={this.handleDelete}>
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}