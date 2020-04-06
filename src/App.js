import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/footer';
import Tags from './components/tag/Tags';
import News from './components/news/News';
import FullNewsItem from './components/news/FullNewsItem';
import Authors from './components/author/Authors';
import Login from './components/Login';
import Menu from './components/common/Menu';
import './app.css';
import NewsItemCreation from "./components/news/NewsItemCreation";
import NewsItemEditing from "./components/news/NewsItemEditing";

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <Menu/>
                            </div>
                            <div className="col-sm-9">
                                <Switch>
                                    <Route path="/tags" component={Tags}/>
                                    <Route path="/authors" component={Authors}/>
                                    <Route path="/news/create" component={NewsItemCreation}/>
                                    <Route path="/news/:id/edit" component={NewsItemEditing}/>
                                    <Route path="/news/:id" component={FullNewsItem}/>
                                    <Route path="/news/" component={News}/>
                                    <Route path="/login" component={Login}/>
                                    <Route exact path="/" component={News}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}
