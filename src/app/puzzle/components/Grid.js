import React, {Component, PropTypes} from 'react/addons';
import Block from '../components/Block.js';

class Grid extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            blocks: this.props.blocks.items,
            isPassed: false
        };
    }

    handleBlockClick(id) {
        let blocks = this.state.blocks;
        const x = blocks[id].coords[0];
        const y = blocks[id].coords[1];
        const moveUp = this.hasEmptyNeighbour(blocks, x-1, y); //up
        const moveDown = this.hasEmptyNeighbour(blocks, x+1, y); //down
        const moveLeft = this.hasEmptyNeighbour(blocks, x, y-1); //left
        const moveRight = this.hasEmptyNeighbour(blocks, x, y+1); //right
        let moveTo;

        if (moveUp.result) {
            moveTo = moveUp.index;
        } else if (moveDown.result) {
            moveTo = moveDown.index;
        } else if (moveLeft.result) {
            moveTo = moveLeft.index;
        } else if (moveRight.result) {
            moveTo = moveRight.index;
        }

        this.switchBlocks(blocks, id, moveTo);
    }

    hasEmptyNeighbour(blocks, x, y) {
        let result = false;
        let index = 0;

        if (((y || x) < 1) || ((y || x) > 4)) {
            return false;
        }

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === x &&
                blocks[i].coords[1] === y &&
                blocks[i].empty) {
                result = true;
                index = i;
            }
        }

        return {
            result: result,
            index: index
        };
    }

    switchBlocks(blocks, from, to) {
        let oldText = blocks[from].text;
        let newText = blocks[to].text;

        blocks[to].empty = false;
        blocks[to].isMovable = true;
        blocks[to].text = oldText;

        blocks[from].empty = true;
        blocks[from].isMovable = false;
        blocks[from].text = newText;

        blocks = this.unsetMovability(blocks);
        blocks = this.setMovability(blocks);

        const isPassed = this.isPassed(blocks);

        this.setState({
            blocks: blocks,
            isPassed: isPassed
        });
    }

    unsetMovability(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].isMovable = false;
        }

        return blocks;
    }

    setMovability(blocks) {
        let x;
        let y;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].empty) {
                x = blocks[i].coords[0];
                y = blocks[i].coords[1];
            }
        }

        blocks = this.setMovabilityCoords(blocks, x-1, y); //up
        blocks = this.setMovabilityCoords(blocks, x+1, y); //down
        blocks = this.setMovabilityCoords(blocks, x, y-1); //left
        blocks = this.setMovabilityCoords(blocks, x, y+1); // right

        return blocks;
    }

    setMovabilityCoords(blocks, x, y) {
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === x &&
                blocks[i].coords[1] === y) {
                blocks[i].isMovable = true;
            }
        }

        return blocks;
    }

    isPassed(blocks) {
        let result = true;

        for (let i = 0; i < blocks.length - 1; i++) {
            if (parseInt(blocks[i].text) !== (i + 1)) {
                result = false;
            }
        }

        return result;
    }

    render() {
        const { blocks } = this.props;

        const showPassed = this.state.isPassed ? 'Passed!!!' : 'not passed';

        return (
            <div>
                <div>
                    <h1>
                        {showPassed}
                    </h1>
                </div>
                <div className="grid">
                    {this.state.blocks.map(function(block, i) {
                        let blockClasses = ['block'];

                        if (block.empty) {
                            blockClasses.push('empty');
                        }

                        if (block.isMovable) {
                            blockClasses.push('movable');
                        }

                        return (
                            <div key={i} className={blockClasses.join(' ')}>
                                <Block
                                    id={i}
                                    text={block.text}
                                    empty={block.empty}
                                    isMovable={block.isMovable}
                                    onBlockClick={this.handleBlockClick.bind(this)}
                                    coords={block.coords} />
                            </div>);
                    }.bind(this))}
                </div>
            </div>
        );
    }
}

export default Grid;

Grid.propTypes = {
    blocks: PropTypes.object.isRequired
};
