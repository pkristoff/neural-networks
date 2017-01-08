import {BoardTicTacToe} from './boardTicTacToe';
import {PlayerTicTacToe} from './player/playerTicTacToe';

export class PlayTicTacToe {
    player1: PlayerTicTacToe;
    player2: PlayerTicTacToe;
    board: BoardTicTacToe;

    constructor(player1: PlayerTicTacToe, player2: PlayerTicTacToe) {
        this.player1 = player1;
        this.player2 = player2;

        this.board = new BoardTicTacToe(player1, player2);
    }

    play() {
        this.player1.takeTurn();
    }

    playAgain() {
        this.board.resetBoard();
    }
}
