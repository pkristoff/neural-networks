import {TicTacToeCell} from './tic-tac-toe-cell';
import {PlayerTicTacToe} from '../player/playerTicTacToe';
import {BoardTicTacToe} from '../boardTicTacToe';

export class DrawTicTacToe {
    context: any;
    rootX: number;
    rootY: number;
    cells: any;
    boardTicTacToe: BoardTicTacToe;

    CELL_WIDTH: number = 20;
    CELL_HEIGHT: number = 20;

    constructor(context: any, rootX: number, rootY: number) {
        this.context = context;
        this.rootX = rootX;
        this.rootY = rootY;
        this.cells = {
            0: new TicTacToeCell(rootX, rootY, 0, 0, this.CELL_WIDTH, this.CELL_HEIGHT, context),
            1: new TicTacToeCell(rootX, rootY, this.CELL_WIDTH, 0, this.CELL_WIDTH, this.CELL_HEIGHT, context),
            2: new TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), 0, this.CELL_WIDTH, this.CELL_HEIGHT, context),
            3: new TicTacToeCell(rootX, rootY, 0, this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT, context),
            4: new TicTacToeCell(rootX, rootY, this.CELL_WIDTH, this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT, context),
            5: new TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT, context),
            6: new TicTacToeCell(rootX, rootY, 0, (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT, context),
            7: new TicTacToeCell(rootX, rootY, this.CELL_WIDTH, (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT, context),
            8: new TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT, context)
        };
    }

    writeGameOverMessage(player: PlayerTicTacToe) {

        // Game over message
        let message = '';
        let ctx = this.context;
        if (player === null) {
            message = 'Game over draw';
        } else {
            message = 'Game over player ' + (player.isX ? 'X' : 'O') + ' won.';
        }
        ctx.font = '20px Arial';
        ctx.fillText(message, 10, 50);

    }


    drawBoard() {

        let ctx = this.context,
            boardWidth = this.CELL_WIDTH * 3,
            boardHeight = this.CELL_HEIGHT * 3;

        ctx.beginPath();

        ctx.moveTo(this.rootX, this.rootY + this.CELL_HEIGHT);
        ctx.lineTo(this.rootX + boardWidth, this.rootY + this.CELL_HEIGHT);
        ctx.stroke();

        ctx.moveTo(this.rootX, this.rootY + (this.CELL_HEIGHT * 2));
        ctx.lineTo(this.rootX + boardWidth, this.rootY + (this.CELL_HEIGHT * 2));
        ctx.stroke();

        ctx.moveTo(this.rootX + this.CELL_WIDTH, this.rootY);
        ctx.lineTo(this.rootX + this.CELL_WIDTH, this.rootY + boardHeight);
        ctx.stroke();

        ctx.moveTo(this.rootX + (this.CELL_WIDTH * 2), this.rootY);
        ctx.lineTo(this.rootX + (this.CELL_WIDTH * 2), this.rootY + boardHeight);
        ctx.stroke();

    }

    drawX(cell: number) {

        this.cells[cell].drawX();

    }

    drawO(cell: number) {

        this.cells[cell].drawO();
    }

    drawWinningLine(player: PlayerTicTacToe, winningCells: any) {

        let self = this;
        if (self.boardTicTacToe.isAcross(winningCells)) {
            winningCells.forEach(function (cell) {
                self.cells[cell].drawAcross(player);
            });
        } else {
            if (self.boardTicTacToe.isDown(winningCells)) {
                winningCells.forEach(function (cell) {
                    self.cells[cell].drawDown(player);
                });
            } else {
                if (self.boardTicTacToe.isDiagonal(winningCells)) {
                    winningCells.forEach(function (cell) {
                        if (winningCells[0] === 0) {
                            self.cells[cell].drawDiagonalDown(player);
                        } else {
                            self.cells[cell].drawDiagonalUp(player);
                        }
                    });
                } else {
                    // console.log('drawWinningLine: draw')
                }
            }
        }
    }
}
