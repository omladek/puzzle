import React, {Component, PropTypes} from 'react';

class Block extends Component {
    handleClick(e) {
        const {
            id,
            text,
            empty,
            isMovable } = this.props;

        if (isMovable) {
            this.move(id);
        }
    }

    move(id) {
        console.log('id: ' + id);
        this.props.onBlockClick(id);
    }

    render() {
        const {
            id,
            text,
            empty,
            isMovable } = this.props;

        let movable = isMovable ? 'movable' : '';

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
    empty: PropTypes.bool.isRequired,
    isMovable: PropTypes.bool.isRequired,
    onBlockClick: PropTypes.func.isRequired
};
