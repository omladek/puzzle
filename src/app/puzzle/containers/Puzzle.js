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
                    empty: false,
                    isMovable: false,
                    coords: [1,1]
                },
                {
                    text: '2',
                    empty: false,
                    isMovable: false,
                    coords: [1,2]
                },
                {
                    text: '3',
                    empty: false,
                    isMovable: false,
                    coords: [1,3]
                },
                {
                    text: '4',
                    empty: false,
                    isMovable: false,
                    coords: [1,4]
                },
                {
                    text: '5',
                    empty: false,
                    isMovable: false,
                    coords: [2,1]
                },
                {
                    text: '6',
                    empty: false,
                    isMovable: false,
                    coords: [2,2]
                },
                {
                    text: '7',
                    empty: false,
                    isMovable: false,
                    coords: [2,3]
                },
                {
                    text: '8',
                    empty: false,
                    isMovable: false,
                    coords: [2,4]
                },
                {
                    text: '9',
                    empty: false,
                    isMovable: false,
                    coords: [3,1]
                },
                {
                    text: '10',
                    empty: false,
                    isMovable: false,
                    coords: [3,2]
                },
                {
                    text: '12',
                    empty: false,
                    isMovable: false,
                    coords: [3,3]
                },
                {
                    text: '15',
                    empty: false,
                    isMovable: true,
                    coords: [3,4]
                },
                {
                    text: '13',
                    empty: false,
                    isMovable: false,
                    coords: [4,1]
                },
                {
                    text: '14',
                    empty: false,
                    isMovable: false,
                    coords: [4,2]
                },
                {
                    text: '11',
                    empty: false,
                    isMovable: true,
                    coords: [4,3]
                },
                {
                    text: 'empty',
                    empty: true,
                    isMovable: false,
                    coords: [4,4]
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
