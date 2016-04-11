import React, {Component, PropTypes} from 'react/addons';
import Block from '../components/Block.js';

class Grid extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            blocks: this.props.blocks.items
        };
    }

    handleBlockClick(id) {
        let blocks = this.state.blocks;
        console.log(blocks[id].coords);
        const x = blocks[id].coords[0];
        const y = blocks[id].coords[1];

        const moveUp = this.hasEmptyNeighbour(blocks, x, y-1); //up
        const moveDown = this.hasEmptyNeighbour(blocks, x, y+1); //down
        const moveLeft = this.hasEmptyNeighbour(blocks, x-1, y); //left
        const moveRight = this.hasEmptyNeighbour(blocks, x+1, y); //right

        if (moveUp) {
            this.switchBlocks(blocks, id, moveUp);
        } else if (moveDown) {
            this.switchBlocks(blocks, id, moveDown);
        } else if (moveLeft) {
            this.switchBlocks(blocks, id, moveLeft);
        } else if (moveRight) {
            this.switchBlocks(blocks, id, moveRight);
        }
    }

    hasEmptyNeighbour(blocks, x, y) {
        let result = false;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === x &&
                blocks[i].coords[1] === y &&
                blocks[i].empty) {
                result = i;
            }
        }

        return result;
    }

    switchBlocks(blocks, from, to) {
        let oldText = blocks[from].text;
        let newText = blocks[to].text;

        let oldCoords = blocks[from].coords;
        let newCoords = blocks[to].coords;

        blocks[to].coords = oldCoords;
        blocks[to].empty = false;
        blocks[to].isMovable = true;
        blocks[to].text = oldText;

        blocks[from].coords = newCoords;
        blocks[from].empty = true;
        blocks[from].isMovable = false;
        blocks[from].text = newText;

        blocks = this.unsetMovability(blocks);
        //blocks = this.setMovability(blocks);

        this.setState({
            blocks: blocks
        });
    }

    unsetMovability(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            console.log('yup');
            blocks[i].isMovable = false;
        }

        return blocks;
    }

    setMovability(blocks) {
        let coords;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].empty) {
                coords = blocks[i].coords;
            }
        }

        console.log('empty coords: ' + coords);

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].coords[0] === (coords[0] - 2) &&
                blocks[i].coords[1] === coords[1]) {
                blocks[i].isMovable = true;
            }

            if (blocks[i].coords[0] === (coords[0] + 2) &&
                blocks[i].coords[1] === coords[1]) {
                blocks[i].isMovable = true;
            }

            if (blocks[i].coords[0] === (coords[0]) &&
                blocks[i].coords[1] === (coords[1] - 2)) {
                blocks[i].isMovable = true;
            }

            if (blocks[i].coords[0] === (coords[0]) &&
                blocks[i].coords[1] === (coords[1] + 2)) {
                blocks[i].isMovable = true;
            }
        }

        return blocks;
    }


    render() {
        const { blocks } = this.props;

        return (
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
        );
    }
}

export default Grid;

Grid.propTypes = {
    blocks: PropTypes.object.isRequired
};
