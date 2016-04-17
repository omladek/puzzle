import React, {Component, PropTypes} from 'react/addons';
import Block from '../components/Block.js';
import Shuffle from '../components/Shuffle.js';

class Grid extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            blocks: this.props.blocks.items,
            isPassed: false
        };
    }

    handleBlockClick(index, skipAnimation, blocksInput) {
        const blocks = blocksInput ? blocksInput : this.state.blocks;
        const row = blocks[index].coords[0];
        const col = blocks[index].coords[1];
        const targetInfo = this.getTargetInfo(blocks, row, col);
        const moveTo = targetInfo.targetIndex;
        const direction = targetInfo.direction;

        return this.switchBlocks(blocks, index, moveTo, direction, skipAnimation);
    }

    getTargetInfo(blocks, row, col) {
        const up = this.hasEmptyNeighbour(blocks, row-1, col);
        const down = this.hasEmptyNeighbour(blocks, row+1, col);
        const left = this.hasEmptyNeighbour(blocks, row, col-1);
        const right = this.hasEmptyNeighbour(blocks, row, col+1);
        let direction;
        let targetIndex;

        if (up.result) {
            targetIndex = up.index;
            direction = 'up';
        } else if (down.result) {
            targetIndex = down.index;
            direction = 'down';
        } else if (left.result) {
            targetIndex = left.index;
            direction = 'left';
        } else if (right.result) {
            targetIndex = right.index;
            direction = 'right';
        }

        return {
            direction,
            targetIndex
        };
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
                break;
            }
        }

        return {
            result,
            index
        };
    }

    switchBlocks(blocks, from, to, direction, skipAnimation) {
        let oldtext = blocks[from].text;
        let newtext = blocks[to].text;

        blocks = this.unsetDirection(blocks);

        // set new position
        blocks[to].isEmpty = false;
        blocks[to].isMovable = true;
        blocks[to].text = oldtext;

        if (!skipAnimation) {
            blocks[to].direction = direction;
        }

        // set empty block
        blocks[from].isEmpty = true;
        blocks[from].isMovable = false;
        blocks[from].text = newtext;

        blocks = this.unsetMovability(blocks);
        blocks = this.setMovability(blocks, blocks[from].coords);

        if (skipAnimation) {
            return blocks;
        } else {
            console.log('setting new state');
            this.setNewState(blocks, this.isPassed(blocks));
        }
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

    setMovability(blocks, coords) {
        let row = coords[0];
        let col = coords[1];

        blocks = this.setMovabilityCoords(blocks, row-1, col); // up
        blocks = this.setMovabilityCoords(blocks, row+1, col); // down
        blocks = this.setMovabilityCoords(blocks, row, col-1); // left
        blocks = this.setMovabilityCoords(blocks, row, col+1); // right

        return blocks;
    }

    setMovabilityCoords(blocks, row, col) {
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === row &&
                blocks[i].coords[1] === col) {
                blocks[i].isMovable = true;
                break;
            }
        }

        return blocks;
    }

    isPassed(blocks) {
        let result = true;

        for (let i = 0; i < blocks.length - 1; i++) {
            if (parseInt(blocks[i].text) !== (i + 1)) {
                result = false;
                break;
            }
        }

        return result;
    }

    setNewState(blocks, isPassed) {
        this.setState({
            blocks: blocks,
            isPassed: isPassed
        });
    }

    // because the initial sequence of blocks is solvable,
    // this randomization will work OK
    handleShuffleClick() {
        // get random number of iterations
        let blocks = this.state.blocks;
        const randomRepeater = Math.floor(Math.random() * 500) + 500;
        const skipAnimation = true;

        for (let i = 0; i < randomRepeater; i++) {
            console.log('iteration: ' + i + ' of ' + randomRepeater);
            let movableBlocks = [];

            // get movable blocks
            for (let j = 0; j < blocks.length; j++) {
                if (blocks[j].isMovable) {
                    movableBlocks.push(j);
                }
            }

            // select random movable block
            let randomIndex = movableBlocks[Math.floor(Math.random()*movableBlocks.length)];

            // if on the last iteration: set new state
            if ((randomRepeater - 1) === i) {
                this.handleBlockClick(randomIndex, false, blocks);
            } else { // else just update the blocks
                blocks = this.handleBlockClick(randomIndex, skipAnimation, blocks);
            }
        }
    }

    render() {
        const { blocks } = this.props;

        const showPassed = this.state.isPassed ? 'Win!' : 'Puzzle';

        return (
            <div>
                <Shuffle
                    onShuffleClick={this.handleShuffleClick.bind(this)} />

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

                        if (this.state.isPassed) {
                            blockClasses.push('block--win');
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
