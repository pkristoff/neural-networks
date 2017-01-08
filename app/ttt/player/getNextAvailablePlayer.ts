import { Injectable } from '@angular/core';
import {PlayerTicTacToe} from './playerTicTacToe';

@Injectable()
export class NextAvailablePlayer extends PlayerTicTacToe {
    type: string = 'NextAvailable';

   protected getNextCell() {
        let i = 0;
        while (!this.boardTicTacToe.isCellEmpty(i) && this.boardTicTacToe.board.length > i) {
            i++;
        }
        return i;
    }
}
