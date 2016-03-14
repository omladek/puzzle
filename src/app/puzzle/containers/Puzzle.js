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
                    isMovable: false
                },
                {
                    text: '2',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '3',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '4',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '5',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '6',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '7',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '8',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '9',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '10',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '11',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '12',
                    empty: false,
                    isMovable: true
                },
                {
                    text: '13',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '14',
                    empty: false,
                    isMovable: false
                },
                {
                    text: '15',
                    empty: false,
                    isMovable: true
                },
                {
                    text: 'empty',
                    empty: true,
                    isMovable: false
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
