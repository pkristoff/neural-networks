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
        console.log('Player(' + this.type + ')' + (this.isX ? 'X' : 'O') + ' moved to ' + i);
        if (this.boardTicTacToe.board.length > i) {
            this.boardTicTacToe.place(this, i);
        } else {
            throw new Error('no space left');
        }
    }

    // // put Xs across middle row to win
    // private getNextCell() {
    //     let self = this;
    //     if (this.isX){
    //         return [3,4,5].find(function (num){
    //             return self.boardTicTacToe.isCellEmpty(num)
    //         })
    //     } else {
    //         return [6,7,8].find(function (num){
    //             return self.boardTicTacToe.isCellEmpty(num)
    //         })
    //     }
    // }

    // Randomly choose a cell.
    protected getNextCell() {
        return 0;
    }

    // private getNextCell() {
    //     let i = 0;
    //     while (!this.boardTicTacToe.isCellEmpty(i) && this.boardTicTacToe.board.length > i) {
    //         i++;
    //     }
    //     return i;
    // }
}
