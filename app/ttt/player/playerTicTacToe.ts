import {Injectable} from '@angular/core';
import {BoardTicTacToe} from '../boardTicTacToe';

@Injectable()
export class PlayerTicTacToe {
    boardTicTacToe: BoardTicTacToe;
    isX: boolean;
    type: string = 'Unknown';

    constructor() {

    }

    takeTurn() {
        let i = this.getNextCell();
        // console.log('Player(' + this.type + ')' + (this.isX ? 'X' : 'O') + ' moved to ' + i);
        if (this.boardTicTacToe.board.length > i) {
            return this.boardTicTacToe.place(this, i);
        } else {
            throw new Error('no space left');
        }
    }

    protected getNextCell() {
        return 0;
    }

    to_s() {
        return this.type + (this.isX ? 'X' : 'O');
    }
}
