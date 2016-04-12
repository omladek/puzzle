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
        const row = blocks[id].coords[0];
        const col = blocks[id].coords[1];
        /*const moveUp = this.hasEmptyNeighbour(blocks, row-1, col); //up
        const moveDown = this.hasEmptyNeighbour(blocks, row+1, col); //down
        const moveLeft = this.hasEmptyNeighbour(blocks, row, col-1); //left
        const moveRight = this.hasEmptyNeighbour(blocks, row, col+1); //right*/
        let moveTo;
        let direction;

        this.getDirection(blocks, row, col);

        /*if (moveUp.result) {
            moveTo = moveUp.index;
            direction = 'up';
        } else if (moveDown.result) {
            moveTo = moveDown.index;
            direction = 'down';
        } else if (moveLeft.result) {
            moveTo = moveLeft.index;
            direction = 'left';
        } else if (moveRight.result) {
            moveTo = moveRight.index;
            direction = 'right';
        }*/

        this.switchBlocks(blocks, id, moveTo, direction);
    }

    getDirection(block, row, col) {
        const moveUp = this.hasEmptyNeighbour(blocks, row-1, col); //up
        const moveDown = this.hasEmptyNeighbour(blocks, row+1, col); //down
        const moveLeft = this.hasEmptyNeighbour(blocks, row, col-1); //left
        const moveRight = this.hasEmptyNeighbour(blocks, row, col+1); //right
        let direction;
        let targetIndex;

        if (moveUp.result) {
            targetIndex = moveUp.index;
            direction = 'up';
        } else if (moveDown.result) {
            targetIndex = moveDown.index;
            direction = 'down';
        } else if (moveLeft.result) {
            targetIndex = moveLeft.index;
            direction = 'left';
        } else if (moveRight.result) {
            targetIndex = moveRight.index;
            direction = 'right';
        }

        return {
            direction,
            targetIndex
        }
    }

    hasEmptyNeighbour(blocks, row, col) {
        let result = false;
        let index;

        if (((col || row) < 1) || ((col || row) > 4)) {
            return false;
        }

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === row &&
                blocks[i].coords[1] === col &&
                blocks[i].isEmpty) {
                result = true;
                index = i;
            }
        }

        return {
            result: result,
            index: index
        };
    }

    switchBlocks(blocks, from, to, direction) {
        let oldtext = blocks[from].text;
        let newtext = blocks[to].text;

        blocks = this.unsetDirection(blocks);

        blocks[to].isEmpty = false;
        blocks[to].isMovable = true;
        blocks[to].text = oldtext;
        blocks[to].direction = direction;

        // new block
        blocks[from].isEmpty = true;
        blocks[from].isMovable = false;
        blocks[from].text = newtext;

        blocks = this.unsetMovability(blocks);
        blocks = this.setMovability(blocks);

        const isPassed = this.isPassed(blocks);

        this.setState({
            blocks: blocks,
            isPassed: isPassed
        });
    }

    unsetDirection(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].direction = false;
        }

        return blocks;
    }

    unsetMovability(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].isMovable = false;
        }

        return blocks;
    }

    setMovability(blocks) {
        let row;
        let col;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].isEmpty) {
                row = blocks[i].coords[0];
                col = blocks[i].coords[1];
            }
        }

        blocks = this.setMovabilityCoords(blocks, row-1, col); //up
        blocks = this.setMovabilityCoords(blocks, row+1, col); //down
        blocks = this.setMovabilityCoords(blocks, row, col-1); //left
        blocks = this.setMovabilityCoords(blocks, row, col+1); // right

        return blocks;
    }

    setMovabilityCoords(blocks, row, col) {
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === row &&
                blocks[i].coords[1] === col) {
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

                        if (block.isEmpty) {
                            blockClasses.push('block--empty');
                        }

                        if (block.isMovable) {
                            blockClasses.push('block--movable');
                        }

                        if (block.direction) {
                            blockClasses.push('block--move-' + block.direction);
                        }

                        return (
                            <div key={i} className={blockClasses.join(' ')}>
                                <Block
                                    id={i}
                                    text={block.text}
                                    isEmpty={block.isEmpty}
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

Grid.proptypes = {
    blocks: PropTypes.object.isRequired
};
