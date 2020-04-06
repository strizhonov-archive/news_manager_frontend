import React, {Component} from 'react';
import NewsItemInList from "./NewsItemInList";

export default class PaginatedNews extends Component {

    render() {

        const {news, currentPage, newsPerPage} = this.props;

        const indexOfLast = currentPage * newsPerPage;
        const indexOfFirst = indexOfLast - newsPerPage;

        const currentNews = news.sort((a, b) => b.id - a.id).slice(indexOfFirst, indexOfLast);

        return (
            <div>
                {
                    currentNews.map(news =>
                        <NewsItemInList
                            key={news.id}
                            news={news}
                            handleDelete={this.props.handleDelete}
                        />
                    )
                }
            </div>
        );
    }
}