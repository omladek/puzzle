import React, {Component, PropTypes} from 'react';

class Block extends Component {
    handleClick(e) {
        const {
            id,
            text,
            isEmpty,
            isMovable,
            coords } = this.props;

        if (isMovable) {
            this.move(id);
        }
    }

    move(id) {
        this.props.onBlockClick(id);
    }

    render() {
        const {
            id,
            text,
            isEmpty,
            isMovable,
            coords } = this.props;

        return (
            <div onClick={this.handleClick.bind(this)}>
                {text}
            </div>
        );
    }
}

export default Block;

Block.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isMovable: PropTypes.bool.isRequired,
    onBlockClick: PropTypes.func.isRequired,
    coords: PropTypes.array.isRequired
};
