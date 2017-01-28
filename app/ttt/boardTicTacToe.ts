import {PlayerTicTacToe} from './player/playerTicTacToe';
import {DrawTicTacToe} from './rendering/drawTicTacToe';

export class BoardTicTacToe {

    WINNING_ACROSS_CELLS: Array<Array<number>> = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    WINNING_DOWN_CELLS: Array<Array<number>> = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    WINNING_DIAGONAL_CELLS: Array<Array<number>> = [[0, 4, 8], [2, 4, 6]];
    WINNING_CELLS: Array<Array<number>> = this.WINNING_ACROSS_CELLS.concat(this.WINNING_DOWN_CELLS).concat(this.WINNING_DIAGONAL_CELLS);

    player1: PlayerTicTacToe;
    player2: PlayerTicTacToe;
    draw: DrawTicTacToe;
    board: Array<PlayerTicTacToe>;
    displayBoard: boolean;

    constructor(player1: PlayerTicTacToe, player2: PlayerTicTacToe, displayBoard: boolean) {
        this.player1 = player1;
        this.player2 = player2;
        this.displayBoard = displayBoard;

        player1.boardTicTacToe = this;
        player1.isX = true;
        player2.boardTicTacToe = this;
        player2.isX = false;
        this.draw = this.getDrawTicTacToe();
        this.draw.boardTicTacToe = this;

        this.board = new Array<PlayerTicTacToe>(9);
        this.resetBoard();
    }

    protected getDrawTicTacToe() {
        return new DrawTicTacToe(this.getCanvasContext(), 10, 80, this.displayBoard);
    }

    protected getCanvasContext() {
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

    place(currentPlayer: PlayerTicTacToe, cell: number) {
        if (this.isCellEmpty(cell)) {
            this.board[cell] = currentPlayer;
            if (currentPlayer.isX) {
                this.draw.drawX(cell);
            } else {
                this.draw.drawO(cell);
            }
        } else {
            // this.printBoard();
            throw new Error('Illegal Move: player=' + (currentPlayer.to_s()) + ' cell=' + cell);
        }
        return this.makeNextMove(currentPlayer);
    }

    protected makeNextMove(currentPlayer: PlayerTicTacToe) {
        if (this.isGameOver(currentPlayer)) {
            let winningCells = this.findWinningCells(currentPlayer);
            this.draw.writeGameOverMessage(winningCells === null ? null : currentPlayer);
            this.draw.drawWinningLine(currentPlayer, winningCells);
            return winningCells === null ? 'draw' : (currentPlayer.isX ? 'X' : 'O');
        } else {
            if (currentPlayer === this.player1) {
                return this.player2.takeTurn();
            } else {
                return this.player1.takeTurn();
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

    didPlayerWin(player) {
        return this.findWinningCells(player) != null;
    }

    protected findWinningCells(player) {
        let i = 0;
        while (this.WINNING_CELLS.length > i && !this.containsPlayer(player, this.WINNING_CELLS[i])) {
            i++;
        }
        return this.WINNING_CELLS.length <= i ? null : this.WINNING_CELLS[i];
    }

    private containsPlayer(player: PlayerTicTacToe, winningcell: Array<number>) {
        for (let i = 0, len = winningcell.length; i < len; i++) {
            if (this.board[winningcell[i]] !== player) {
                return false;
            }
        }
        return true;
    }

    isAcross(winningCells: Array<number>) {
        return this.doCellsMatch(this.WINNING_ACROSS_CELLS, winningCells);
    }

    private doCellsMatch(winningCells: Array<Array<number>>, gameWinningCells: Array<number>) {
        if (gameWinningCells === null) {
            return false;
        }
        return winningCells.some(function (arr) {
            return arr.join(',') === gameWinningCells.join(',');
        });
    }

    isDown(winningCells: Array<number>) {
        return this.doCellsMatch(this.WINNING_DOWN_CELLS, winningCells);
    }

    isDiagonal(winningCells: Array<number>) {
        return this.doCellsMatch(this.WINNING_DIAGONAL_CELLS, winningCells);
    }

    // printBoard() {
    //     let cell0 = this.board[0];
    //     let cell1 = this.board[1];
    //     let cell2 = this.board[2];
    //     let cell3 = this.board[3];
    //     let cell4 = this.board[4];
    //     let cell5 = this.board[5];
    //     let cell6 = this.board[6];
    //     let cell7 = this.board[7];
    //     let cell8 = this.board[8];
    //     let cell0Value = (cell0 === null ? '-' : cell0.isX ? 'X' : 'O');
    //     let cell1Value = (cell1 === null ? '-' : cell1.isX ? 'X' : 'O');
    //     let cell2Value = (cell2 === null ? '-' : cell2.isX ? 'X' : 'O');
    //     console.log(cell0Value + ', ' + cell1Value + ', ' + cell2Value + ', ');
    //     let cell3Value = (cell3 === null ? '-' : cell3.isX ? 'X' : 'O');
    //     let cell4Value = (cell4 === null ? '-' : cell4.isX ? 'X' : 'O');
    //     let cell5Value = (cell5 === null ? '-' : cell5.isX ? 'X' : 'O');
    //     console.log(cell3Value + ', ' + cell4Value + ', ' + cell5Value + ', ');
    //     let cell6Value = (cell6 === null ? '-' : cell6.isX ? 'X' : 'O');
    //     let cell7Value = (cell7 === null ? '-' : cell7.isX ? 'X' : 'O');
    //     let cell8Value = (cell8 === null ? '-' : cell8.isX ? 'X' : 'O');
    //     console.log(cell6Value + ', ' + cell7Value + ', ' + cell8Value + ', ');
    // }
}
