import {Injectable} from '@angular/core';
import {PlayerTicTacToe} from './playerTicTacToe';

@Injectable()
export class RandomPlayer extends PlayerTicTacToe {
    type: string = 'Random';

    constructor() {
        super();
    }

    protected getNextCell() {
        let j = 0;
        let cell_number = Math.floor(Math.random() * 9);
        while (!this.boardTicTacToe.isCellEmpty(cell_number) && j < 100) {
            cell_number = Math.floor(Math.random() * 9);
            j++;
        }
        if (j >= 100) {
            let i = 0;
            for (; i < 9; i++) {
                if (this.boardTicTacToe.isCellEmpty(i)) {
                    cell_number = i;
                    break;
                }
            }
            if (cell_number !== i) {
                this.boardTicTacToe.printBoard();
                throw new Error('attempting to get random cell but cannot find');
            }
        }
        return cell_number;
    }
}
