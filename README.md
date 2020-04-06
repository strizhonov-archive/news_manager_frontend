**News Manager application, frontend.**<br/>
=====================================

The project implements frontend part of news_manager application with ReactJS.<br/>

The whole application is a create-read-update-delete system, that allows user to operate with news and related entities.<br/>
Implemented features:
- [x] Fixed footer, header and left-side navigation menu;
- [x] List views of entities;
- [x] Adding, editing and removal of entities implementation;
- [x] Login page view (without backend impl);
- [x] News search implementation.

### How to build up the project and start it:<br/>
- Frontend requirements:<br/>
    * Node 8+.<br/>
    * NPM 6+.<br/>
    * Webpack 4+.<br/>
- Steps to start:<br/>
    * Sync backend server proxy in `./webpack.config.js`<br/>
    * Run `npm start` from `./`.<br/>
    * Default localhost is 3000 and can be changed in `./webpack.config.js`<br/>