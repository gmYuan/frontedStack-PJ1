/* eslint-disable */

// import React from 'react';
// import largeNumber from 'large-number';
// import logo from './images/logo.png';
// import './search.less';

// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');
const largeNumber = require('large-number');
const logo = require('./images/logo.png');
// eslint-disable-next-line no-unused-vars
const s = require('./search.less');

class Search extends React.Component {
    constructor() {
        // eslint-disable-next-line prefer-rest-params
        super(...arguments);

        this.state = {
            Text: null,
        };
    }

    loadComponent() {
    import('./text.js').then((Text) => {
        this.setState({
            Text: Text.default,
        });
    });
    }

    render() {
        const { Text } = this.state;
        const addResult = largeNumber('999', '1');
        return (
            // eslint-disable-next-line react/jsx-indent
            <div className="search-text">
                {Text ? <Text /> : null}
                {addResult}
        搜索文字的内容
                <img src={logo} onClick={this.loadComponent.bind(this)} />
            </div>
        );
    }
}

module.exports = <Search />;
