import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

export default class Header extends React.Component {

    render() {
        return (
            <header className="container">
                <div className="row site-header">
                    <div className="col-sm-4">
                        <h1 className="site-branding">News Management</h1>
                    </div>
                    <div className="col-sm-4">
                        <ul className="lang-navigation">
                            <li><Link className="lang-button" to="/">RU</Link></li>
                            <li><Link className="lang-button" to="/">EN</Link></li>
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <ul className="login-button-block">
                            <li><Link className="login-button" to="/login">Log In</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}
