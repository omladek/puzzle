import React from 'react';
import ReactDOM from 'react-dom';
import Puzzle from './containers/Puzzle.js';

export default {
    init: function(container, config) {
        ReactDOM.render(
            <Puzzle />,
            container
        );
    }
};
