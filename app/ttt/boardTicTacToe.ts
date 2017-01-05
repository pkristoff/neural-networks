import {PlayerTicTacToe} from './playerTicTacToe';
import {DrawTicTacToe} from './drawTicTacToe';

export class BoardTicTacToe {
    player1: PlayerTicTacToe;
    player2: PlayerTicTacToe;
    draw: DrawTicTacToe;
    board: any;

    constructor(player1: PlayerTicTacToe, player2: PlayerTicTacToe) {
        this.player1 = player1;
        this.player2 = player2;

        player1.boardTicTacToe = this;
        player1.isX = true;
        player2.boardTicTacToe = this;
        player2.isX = false;
        let context = this.getCanvasContext();
        this.draw = new DrawTicTacToe(context, 10, 80);
        this.draw.boardTicTacToe = this;

        this.board = new Array<PlayerTicTacToe>(9);
        this.resetBoard();
    }

    private getCanvasContext() {
        let canvas = <HTMLCanvasElement> document.getElementById('ttt-canvas');
        return canvas.getContext('2d');
    }

    resetBoard() {
        for (let i = 0, len = this.board.length; i < len; i++) {
            this.board[i] = null;
        }
        this.draw.drawBoard();
    }

    isCellEmpty(cell) {
        return this.board[cell] === null;
    }

    place(player: PlayerTicTacToe, cell: number) {
        if (this.isCellEmpty(cell)) {
            this.board[cell] = player;
            if (player.isX) {
                this.draw.drawX(cell);
            } else {
                this.draw.drawO(cell);
            }
        } else {
            throw new Error('Illegal Move: player=' + (player.isX ? 'X' : 'O') + ' cell=' + cell);
        }
        if (this.isGameOver(player)) {
            let winningCells = this.findWinningCells(player);

            // Game over message
            let message = '';
            let ctx = this.getCanvasContext();
            if (winningCells === null){
                message = 'Game over draw';
            } else {
                message = 'Game over player ' + (player.isX ? 'X' : 'O') + ' won.';
            }
            ctx.font = "20px Arial";
            ctx.fillText(message,10,50);

            this.draw.drawWinningLine(player, winningCells);
        } else {
            if (player === this.player1) {
                this.player2.takeTurn();
            } else {
                this.player1.takeTurn();
            }
        }
    }

    isGameOver(player) {

        if (this.didPlayerWin(player)) {
            return true;
        }
        let i = 0;
        while (this.board.length > i && this.board[i] != null) {
            i++;
        }
        return this.board.length <= i;
    }

    WINNING_ACROSS_CELLS: any = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    WINNING_DOWN_CELLS: any = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    WINNING_DIAGONAL_CELLS: any = [[0, 4, 8], [2, 4, 6]];
    WINNING_CELLS: any = this.WINNING_ACROSS_CELLS.concat(this.WINNING_DOWN_CELLS).concat(this.WINNING_DIAGONAL_CELLS);

    private didPlayerWin(player) {
        return this.findWinningCells(player) != null;
    }

    private findWinningCells(player) {
        let i = 0;
        while (this.WINNING_CELLS.length > i && !this.containsPlayer(player, this.WINNING_CELLS[i])) {
            i++;
        }
        return this.WINNING_CELLS.length <= i ? null : this.WINNING_CELLS[i];
    }

    private containsPlayer(player: PlayerTicTacToe, winningcell: any) {
        for (let i = 0, len = winningcell.length; i < len; i++) {
            if (this.board[winningcell[i]] != player) {
                return false;
            }
        }
        return true;
    }

    isAcross(winningCells: any) {
        return this.doCellsMatch(this.WINNING_ACROSS_CELLS, winningCells);
    }

    private doCellsMatch(winningCells: any, gameWinningCells: any) {
        if (gameWinningCells === null){
            return false;
        }
        let found = winningCells.find(function (arr, index) {
            return arr.join(',') == gameWinningCells.join(',');
        });
        return found;
    }

    isDown(winningCells: any) {
        return this.doCellsMatch(this.WINNING_DOWN_CELLS, winningCells);
    }

    isDiagonal(winningCells: any) {
        return this.doCellsMatch(this.WINNING_DIAGONAL_CELLS, winningCells);
    }

    private printBoard() {
        let cell0 = this.board[0];
        let cell1 = this.board[1];
        let cell2 = this.board[2];
        let cell3 = this.board[3];
        let cell4 = this.board[4];
        let cell5 = this.board[5];
        let cell6 = this.board[6];
        let cell7 = this.board[7];
        let cell8 = this.board[8];
        console.log((cell0 === null ? '-' : cell0.isX ? 'X' : 'O') + ', ' + (cell1 === null ? '-' : cell1.isX ? 'X' : 'O') + ', ' + (cell2 === null ? '-' : cell2.isX ? 'X' : 'O') + ', ')
        console.log((cell3 === null ? '-' : cell3.isX ? 'X' : 'O') + ', ' + (cell4 === null ? '-' : cell4.isX ? 'X' : 'O') + ', ' + (cell5 === null ? '-' : cell5.isX ? 'X' : 'O') + ', ')
        console.log((cell6 === null ? '-' : cell6.isX ? 'X' : 'O') + ', ' + (cell7 === null ? '-' : cell7.isX ? 'X' : 'O') + ', ' + (cell8 === null ? '-' : cell8.isX ? 'X' : 'O') + ', ')
    }
}