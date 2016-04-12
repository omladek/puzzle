import React, {Component, PropTypes} from 'react';
import Grid from '../components/Grid.js';

class Puzzle extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            mapPopupIsOpen: false
        };
    }

    render() {
        const { googleApiKey } = this.props;
        const blocks = {
            items: [
                {
                    text: '1',
                    isEmpty: false,
                    isMovable: false,
                    coords: [1, 1]
                },
                {
                    text: '2',
                    isEmpty: false,
                    isMovable: false,
                    coords: [1, 2]
                },
                {
                    text: '3',
                    isEmpty: false,
                    isMovable: false,
                    coords: [1, 3]
                },
                {
                    text: '4',
                    isEmpty: false,
                    isMovable: false,
                    coords: [1, 4]
                },
                {
                    text: '5',
                    isEmpty: false,
                    isMovable: false,
                    coords: [2, 1]
                },
                {
                    text: '6',
                    isEmpty: false,
                    isMovable: false,
                    coords: [2, 2]
                },
                {
                    text: '7',
                    isEmpty: false,
                    isMovable: false,
                    coords: [2, 3]
                },
                {
                    text: '8',
                    isEmpty: false,
                    isMovable: false,
                    coords: [2, 4]
                },
                {
                    text: '9',
                    isEmpty: false,
                    isMovable: false,
                    coords: [3, 1]
                },
                {
                    text: '10',
                    isEmpty: false,
                    isMovable: false,
                    coords: [3, 2]
                },
                {
                    text: '12',
                    isEmpty: false,
                    isMovable: false,
                    coords: [3, 3]
                },
                {
                    text: '15',
                    isEmpty: false,
                    isMovable: true,
                    coords: [3, 4]
                },
                {
                    text: '13',
                    isEmpty: false,
                    isMovable: false,
                    coords: [4, 1]
                },
                {
                    text: '14',
                    isEmpty: false,
                    isMovable: false,
                    coords: [4, 2]
                },
                {
                    text: '11',
                    isEmpty: false,
                    isMovable: true,
                    coords: [4, 3]
                },
                {
                    text: ' ',
                    isEmpty: true,
                    isMovable: false,
                    coords: [4, 4]
                }
                ]
            };

        return (
            <div>
                <Grid className="grid" blocks={blocks} />
            </div>
        );
    }
}

export default Puzzle;

Puzzle.propTypes = {
    googleApiKey: PropTypes.string.isRequired
};
