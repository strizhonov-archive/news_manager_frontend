import React from 'react';
import {Link} from 'react-router-dom';
import './menu.css';

export default class Menu extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <ul className="menu-container">
                        <li className="col-sm-12"><Link className="menu-button" to="/news">News</Link></li>
                        <li className="col-sm-12"><Link className="menu-button" to="/authors">Authors</Link></li>
                        <li className="col-sm-12"><Link className="menu-button" to="/tags">Tags</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}
