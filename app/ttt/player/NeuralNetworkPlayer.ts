import {Injectable} from '@angular/core';
import {PlayerTicTacToe} from './playerTicTacToe';

@Injectable()
export class NeuralNetworkPlayer extends PlayerTicTacToe {
    type: string = 'NeuralNetwork';

    constructor() {
        super();
    }

    // TODO: replace with neuralNetwork code.
    protected getNextCell() {
        let j = 0;
        let cell_number = Math.floor(Math.random() * 9);
        while (!this.boardTicTacToe.isCellEmpty(cell_number) && j < 100) {
            cell_number = Math.floor(Math.random() * 9);
            j++;
        }
        return cell_number;
    }

}
