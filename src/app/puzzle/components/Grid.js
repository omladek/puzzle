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
        const empty = this.getEmpty(blocks);
        let newBlock = blocks.splice(id, 1)[0];
        let oldBlock = blocks.splice(this.getEmpty(blocks), 1)[0];
        blocks.splice(empty, 0, newBlock);
        blocks.splice(id, 0, oldBlock);
        blocks = this.unsetMovability(blocks);
        blocks = this.setMovabilityX(blocks);
        blocks = this.setMovabilityY(blocks);

        this.setState({
            blocks: blocks
        });
    }

    getEmpty(blocks) {
        let id;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].empty) {
                id = i;
                break;
            }
        }

        return id;
    }

    unsetMovability(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].isMovable = false;
        }

        return blocks;
    }

    setMovabilityX(blocks) {
        const emptyId = this.getEmpty(blocks);
        const row = this.getRow(emptyId);
        let enabledIds = [];
        const enabledColumn = this.getColumn(emptyId);
        let enabledCols = [];

        if (enabledColumn && ((enabledColumn - 1) > -1)) {
            enabledCols.push(enabledColumn - 1);
        }

        if ((enabledColumn > -1) && ((enabledColumn + 1) < 4)) {
            enabledCols.push(enabledColumn + 1);
        }

        enabledIds = this.getIdFromGrid(row, enabledCols);

        for (let i = 0; i < enabledIds.length; i++) {
            blocks[enabledIds[i]].isMovable = true;
        }

        return blocks;
    }

    setMovabilityY(blocks) {
        const emptyId = this.getEmpty(blocks);
        const row = this.getRow(emptyId);
        let enabledIds = [];
        const enabledColumn = this.getColumn(emptyId);
        let enabledCols = [enabledColumn];

        if ((row - 1) > -1) {
            enabledIds.push(this.getIdFromGrid(row - 1, enabledCols));
        }

        if ((row > -1) && ((row + 1) < 4)) {
            enabledIds.push(this.getIdFromGrid(row + 1, enabledCols));
        }

        for (let i = 0; i < enabledIds.length; i++) {
            blocks[enabledIds[i]].isMovable = true;
        }

        return blocks;
    }

    getRow(id) {
        let row;

        if (id < 4) {
            row = 0;
        } else if (id > 4 && id < 8) {
            row = 1;
        } else if (id > 8 && id < 12) {
            row = 2;
        } else {
            row = 3;
        }

        return row;
    }

    getColumn(id) {
        let column;

        if (id === 0 || id === 4 || id === 8 || id === 12) {
            column = 0;
        } else if (id === 1 || id === 5 || id === 9 || id === 13)  {
            column = 1;
        } else if (id === 2 || id === 6 || id === 10 || id === 14)  {
            column = 2;
        } else {
            column = 3;
        }

        return column;
    }

    /**
     * [getIdFromGrid description]
     * @param  {int} row [description]
     * @param  {array} cols [description]
     */
    getIdFromGrid(row, cols) {
        let ids = [];

        for (let i = 0; i < cols.length; i++) {
            let col = cols[i];
            let id;

            if (row === 0 && col === 0) {
                id = 0;
            } else if (row === 0 && col === 1) {
                id = 1;
            } else if (row === 0 && col === 2) {
                id = 2;
            } else if (row === 0 && col === 3) {
                id = 3;
            } else if (row === 1 && col === 0) {
                id = 4;
            } else if (row === 1 && col === 1) {
                id = 5;
            } else if (row === 1 && col === 2) {
                id = 6;
            } else if (row === 1 && col === 3) {
                id = 7;
            } else if (row === 2 && col === 0) {
                id = 8;
            } else if (row === 2 && col === 1) {
                id = 9;
            } else if (row === 2 && col === 2) {
                id = 10;
            } else if (row === 2 && col === 3) {
                id = 11;
            } else if (row === 3 && col === 0) {
                id = 12;
            } else if (row === 3 && col === 1) {
                id = 13;
            } else if (row === 3 && col === 2) {
                id = 14;
            } else if (row === 3 && col === 3) {
                id = 15;
            }

            ids.push(id);
        }

        return ids;
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
                                onBlockClick={this.handleBlockClick.bind(this)} />
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
