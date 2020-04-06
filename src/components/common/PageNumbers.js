import React, {Component} from 'react';
import left from "../../img/left-arrow.png";
import right from "../../img/right-arrow.png"

const visibleNumbers = 10;

export default class PageNumbers extends Component {

    getPageNumbers = (lastPage) => {
        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    outOfBounds = (currentPage, number) => {
        return number - visibleNumbers / 2 > currentPage || number + visibleNumbers / 2 < currentPage;
    };

    render() {

        const {currentPage, itemsLength, itemsPerPage} = this.props;

        const lastPage = Math.ceil(itemsLength / itemsPerPage);
        const pageNumbers = this.getPageNumbers(lastPage);

        const leftButton = currentPage === 1 || itemsLength === 0
            ?
            ''
            :
            <button className="pagination left-button" onClick={this.props.handleLeft}>
                <img src={left} alt=""/>
            </button>;


        const rightButton = currentPage === lastPage || itemsLength === 0
            ?
            ''
            :
            <button className="pagination right-button" onClick={this.props.handleRight}>
                <img src={right} alt=""/>
            </button>;

        return (
            <div className="container">
                <div className="row">
                    <div className="pagination-container">

                        {leftButton}

                        {
                            pageNumbers.map(number => {
                                if (this.outOfBounds(currentPage, number)) return;

                                return (
                                    <button
                                        className={number === currentPage ? "pagination-current" : "pagination"}
                                        key={number}
                                        id={number}
                                        onClick={this.props.handlePageNumber}>
                                        {number}
                                    </button>
                                );
                            })
                        }

                        {rightButton}

                    </div>
                </div>
            </div>
        )
    }
}