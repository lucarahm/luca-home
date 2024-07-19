function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export class Game {
    prev_board;
    board;
    score;
    board_size;

    constructor(board_size = 4) {
        this.board_size = board_size;
        this.prev_board = Array(board_size ** 2).fill(0);
        this.board = Array(board_size ** 2).fill(0);
        this.score = 0;
        // two start tiles
        this.addTileAtRandomEmptyPosition();
        this.addTileAtRandomEmptyPosition();
    }

    makeMove(move) {
        this.prev_board = this.board;
        let moved = this.moveTiles(move);
        let merged = this.mergeTiles(move);
        // validate by checking if tiles are moved or merged
        if (moved === 0 && merged === 0) {
            this.board = this.prev_board;
            return -1;
        }
        this.moveTiles(move);
        this.addTileAtRandomEmptyPosition();
        console.log(this.board)
        return 1;
    }

    addTileAtRandomEmptyPosition() {
        // has random value of 2 or 4
        let val = (getRandomInt(2) + 1) * 2;

        let emptySpots = this.board.map((elem, index) => (elem === 0) ? index : -1).filter(x => x !== -1);

        let spot = emptySpots[getRandomInt(emptySpots.length)]
        this.board[spot] = val;
    }

    moveTiles(move) {
        console.log("in move for " + move)
        let moved = 0;
        if (move === 'up') {
            for (let j = 0; j < 3; j++) {
                for (let i = 0 + this.board_size; i < this.board.length; i++) {
                    let cell = this.board[i];
                    let cell_above = this.board[i - this.board_size];

                    if (cell_above === 0) {
                        this.board[i] = 0;
                        this.board[i - this.board_size] = cell;
                        moved++;
                    }
                }
            }
        } else if (move === 'down') {

            for (let j = 0; j < 3; j++) {
                for (let i = this.board.length - 1 - this.board_size; i >= 0; i--) {
                    let cell = this.board[i];
                    let cell_below = this.board[i + this.board_size];

                    if (cell_below === 0) {
                        this.board[i] = 0;
                        this.board[i + this.board_size] = cell;
                        moved++;
                    }
                }
            }
        } else if (move === 'left') {

            for (let j = 0; j < 3; j++) {
                for (let i = 1; i < this.board.length; i++) {
                    if (i % this.board_size === 0) {
                        continue;
                    }

                    let cell = this.board[i];
                    let cell_left = this.board[i - 1];

                    if (cell_left === 0) {
                        this.board[i] = 0;
                        this.board[i - 1] = cell;
                        moved++;
                    }
                }
            }
        } else if (move === 'right') {

            for (let j = 0; j < 3; j++) {
                for (let i = this.board.length - 2; i > 0; i--) {
                    if (i % this.board_size === 3) {
                        continue;
                    }
                    let cell = this.board[i];
                    let cell_right = this.board[i + 1];

                    if (cell_right === 0) {
                        this.board[i] = 0;
                        this.board[i + 1] = cell;
                        moved++;
                    }
                }
            }
        }
        return moved;
    }

    mergeTiles(move) {
        console.log("In merge for " + move)
        let count = 0;
        if (move === 'up') {
            for (let i = 0; i < this.board.length - this.board_size; i++) {
                let cell = this.board[i];
                let cell_below = this.board[i + this.board_size];

                if (cell === cell_below) {
                    let new_val = cell + cell_below;
                    this.score += new_val;
                    this.board[i] = new_val;
                    this.board[i + this.board_size] = 0;
                    count++;
                }
            }
        } else if (move === 'down') {
            // going reverse through the field to have lower fields merge first
            for (let i = this.board.length - 1; i >= this.board_size; i--) {
                let cell = this.board[i];
                let cell_above = this.board[i - this.board_size];

                if (cell === cell_above) {
                    let new_val = cell + cell_above;
                    this.score += new_val;
                    this.board[i] = cell + cell_above;
                    this.board[i - this.board_size] = 0;
                    count++;
                }
            }
        } else if (move === 'left') {

            for (let i = 0; i < this.board.length; i++) {
                if (i % this.board_size === 3) {
                    continue;
                }

                let cell = this.board[i];
                let cell_right = this.board[i + 1];

                if (cell === cell_right) {
                    let new_val = cell + cell_right;
                    this.score += new_val;
                    this.board[i] = new_val;
                    this.board[i + 1] = 0;
                    count++;
                }
            }
        } else if (move === 'right') {

            // going reverse through the field to have lower fields merge first
            for (let i = this.board.length - 1; i > 0; i--) {
                if (i % this.board_size === 0) {
                    continue;
                }
                let cell = this.board[i];
                let cell_left = this.board[i - 1];

                if (cell === cell_left) {
                    let new_val = cell + cell_left;
                    this.score += new_val;
                    this.board[i] = cell + cell_left;
                    this.board[i - 1] = 0;
                    count++;
                }
            }
        }
        return this.board;
    }
}

// function main() {
//     let testGame = new Game();
//
//     console.log(testGame.board);
//     testGame.addTileAtRandomEmptyPosition();
//     testGame.addTileAtRandomEmptyPosition();
//     console.log(testGame.board);
// }
//
// main();