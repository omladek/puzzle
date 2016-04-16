import React, {Component, PropTypes} from 'react';

class Shuffle extends Component {
    handleClick() {
        this.props.onShuffleClick();
    }

    render() {
        const { onShuffleClick } = this.props;

        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>
                    Shuffle
                </button>
            </div>
        );
    }
}

export default Shuffle;

Shuffle.propTypes = {
    onShuffleClick: PropTypes.func.isRequired
};
