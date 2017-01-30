import {Injectable} from '@angular/core';
import {PlayerTicTacToe} from './playerTicTacToe';
declare let synaptic: any;

let Architect = synaptic.Architect;
let Trainer = synaptic.Trainer;

@Injectable()
export class NeuralNetworkPlayer extends PlayerTicTacToe {

    static CENTER_CELL = 4;
    static EDGE_CELLS = [1, 3, 5, 7];
    static CORNER_CELLS = [0, 2, 6, 8];
    static DIAG_CELLS_RIGHT = [0, 4, 8];
    static DIAG_CELLS_LEFT = [2, 4, 6];
    static ACROSS_TOP = [0, 1, 2];
    static ACROSS_MIDDLE = [3, 4, 5];
    static ACROSS_BOTTTOM = [6, 7, 8];
    static DOWN_LEFT = [0, 3, 6];
    static DOWN_CENTER = [1, 4, 7];
    static DOWN_RIGHT = [2, 5, 8];

    type: string = 'NeuralNetwork';
    network: any;
    hasBeenTrained: boolean;

    static getOpponentCell(cell) {
        return cell + 9;
    }

    static setOutputForSequence(input, output, seq) {
        let found = false;
        if (input[seq[0]] === 1 && input[seq[1]] === 1 && input[seq[2]] === 0) {
            output.fill(0);
            output[seq[2]] = 1;
            found = true;
        } else {
            if (input[seq[0]] === 1 && input[seq[1]] === 0 && input[seq[2]] === 1) {
                output.fill(0);
                output[seq[1]] = 1;
                found = true;
            } else {
                if (input[seq[0]] === 0 && input[seq[1]] === 1 && input[seq[2]] === 1) {
                    output.fill(0);
                    output[seq[0]] = 1;
                    found = true;
                }
            }
        }
        if (found) {
            // console.log(input)
            // console.log(output)
        }
        return found;
    }

    static findMaxResult(output: Array<number>, inputs: Array<number>) {
        let cell_number: number = -1;
        let maxResult: number = -1;
        for (let j = 0, len = output.length; j < len; j++) {
            if (inputs[j] !== 1 && output[j] > maxResult) {
                cell_number = j;
                maxResult = output[j];
            }
        }
        return cell_number;
    }

    static setOutputForDiagonal(input, output) {
        let found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.DIAG_CELLS_RIGHT);
        if (!found) {
            found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.DIAG_CELLS_LEFT);
        }
        return found;
    }

    static setOutputForAcross(input, output) {
        let found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.ACROSS_TOP);
        if (!found) {
            found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.ACROSS_MIDDLE);
            if (!found) {
                found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.ACROSS_BOTTTOM);
            }
        }
        return found;
    }

    static setOutputForDown(input, output) {
        let found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.DOWN_LEFT);
        if (!found) {
            found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.DOWN_CENTER);
            if (!found) {
                found = NeuralNetworkPlayer.setOutputForSequence(input, output, NeuralNetworkPlayer.DOWN_RIGHT);
            }
        }
        return found;
    }

    static analyze(input, output) {
        let found = NeuralNetworkPlayer.setOutputForAcross(input, output);
        if (!found) {
            found = NeuralNetworkPlayer.setOutputForDown(input, output);
        }
        if (!found) {
            found = NeuralNetworkPlayer.setOutputForDiagonal(input, output);
        }
        return found;
    }

    static getAvailableCorners(inputCorner) {
        let availableCorners = NeuralNetworkPlayer.CORNER_CELLS.slice();
        let indexOfInput = availableCorners.indexOf(inputCorner);
        if (indexOfInput !== -1) {
            availableCorners.splice(indexOfInput, 1);
        }
        return availableCorners;
    }

    constructor() {
        super();
        this.network = new Architect.Perceptron(18, 36, 9);
        this.hasBeenTrained = false;
    }

    trainX() {
        console.log('training: ' + this.to_s());
        let network = this.network;
        let trainer = new Trainer(network);
        this.enumerateBoard(trainer);
    }

    enumerateBoard(trainer) {
        // let trainingSets = [];
        let count = 0;
        let inputX = new Array(18);
        let inputO = new Array(18);
        let output = new Array(9);
        let trainingSets = [];
        trainingSets.push({input: inputX, output: output});
        trainingSets.push({input: inputO, output: output});
        for (let i0 = 0, len = 9; i0 < len; i0++) {
            for (let i1 = i0, len = 9; i1 < len; i1++) {
                for (let i2 = i1, len = 9; i2 < len; i2++) {
                    for (let i3 = i2, len = 9; i3 < len; i3++) {
                        for (let i4 = i3, len = 9; i4 < len; i4++) {
                            for (let i5 = i4, len = 9; i5 < len; i5++) {
                                for (let i6 = i5, len = 9; i6 < len; i6++) {
                                    for (let i7 = i6, len = 9; i7 < len; i7++) {
                                        for (let i8 = i7, len = 9; i8 < len; i8++) {
                                            for (let index = 0, len = 9; index < len; index++) {
                                                if (i0 === index || i1 === index || i2 === index || i3 === index
                                                    || i4 === index
                                                    || i5 === index
                                                    || i6 === index
                                                    || i7 === index
                                                    || i8 === index
                                                ) {
                                                    inputX[index] = 1;
                                                    inputX[NeuralNetworkPlayer.getOpponentCell(index)] = 0;
                                                    inputO[index] = 0;
                                                    inputO[NeuralNetworkPlayer.getOpponentCell(index)] = 1;
                                                    output[index] = 0;
                                                } else {
                                                    inputX[index] = 0;
                                                    inputX[NeuralNetworkPlayer.getOpponentCell(index)] = 0;
                                                    inputO[index] = 0;
                                                    inputO[NeuralNetworkPlayer.getOpponentCell(index)] = 0;
                                                    output[index] = 1;
                                                }
                                            }
                                            NeuralNetworkPlayer.analyze(inputX, output);
                                            count += 2;
                                            trainer.train(trainingSets);
                                            inputX.fill(0);
                                            inputO.fill(0);
                                            output.fill(0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setOutputForInitialMove(inputX, output, trainingSets, trainer);
        count += 2;
        console.log('number of training sets: ' + count);
    }

    public setOutputForInitialMove(input: any, output: any, trainingSets, trainer) {
        if (input.find(function (num) {
                return num === 1;
            }) !== 1) {
            output.fill(0);
            NeuralNetworkPlayer.CORNER_CELLS.forEach(function (cell) {
                output[cell] = 1;
            });
            trainer.train(trainingSets);
        }
    }

    public setOutputForFirstMove(input: any, output: any, trainingSets, trainer) {
        // let self = this;
        // me = corner
        // opponent = edge
        // select=center
        NeuralNetworkPlayer.CORNER_CELLS.forEach(function (cell_num) {
            NeuralNetworkPlayer.EDGE_CELLS.forEach(function (edge_num) {
                input[cell_num] = 1;
                input[NeuralNetworkPlayer.getOpponentCell(edge_num)] = 1;
                output[NeuralNetworkPlayer.CENTER_CELL] = 1;
                trainer.train(trainingSets);
                input.fill(0);
                output.fill(0);
            });
        });
        // me = corner
        // opponent = corner
        // select free corner
        // console.log('me = corner oponent = corner select free corner');
        NeuralNetworkPlayer.CORNER_CELLS.forEach(function (me_corner) {
            NeuralNetworkPlayer.getAvailableCorners(me_corner).forEach(function (opponent_corner) {
                input[me_corner] = 1;
                input[NeuralNetworkPlayer.getOpponentCell(opponent_corner)] = 1;
                let open_corner = NeuralNetworkPlayer.CORNER_CELLS.find(function (corner) {
                    return (corner !== me_corner) && (corner !== opponent_corner);
                });
                output[open_corner] = 1;
                // console.log('move ' + me_corner + ',' + (opponent_corner + 9) + '=>' + open_corner);
                trainer.train(trainingSets);
                // console.log('output = ' + trainingSets[0]['output']);
                input.fill(0);
                output.fill(0);
            });
        });
        // me = corner
        // opponent = corner
        // select center
        NeuralNetworkPlayer.CORNER_CELLS.forEach(function (me_corner) {
            NeuralNetworkPlayer.getAvailableCorners(me_corner).forEach(function (opponent_corner) {
                input[me_corner] = 1;
                input[NeuralNetworkPlayer.getOpponentCell(opponent_corner)] = 1;

                output[NeuralNetworkPlayer.CENTER_CELL] = 1;
                trainer.train(trainingSets);
                input.fill(0);
                output.fill(0);
            });
        });
        // me = center
        // opponent = edge
        // select = corner
        [NeuralNetworkPlayer.CENTER_CELL].forEach(function (cell_num) {
            NeuralNetworkPlayer.EDGE_CELLS.forEach(function (edge_cell) {
                input[cell_num] = 1;
                input[NeuralNetworkPlayer.getOpponentCell(edge_cell)] = 1;
                NeuralNetworkPlayer.CORNER_CELLS.forEach(function (cell) {
                    output[cell] = 1;
                });
                trainer.train(trainingSets);
                input.fill(0);
                output.fill(0);
            });
        });
    }

    // TODO: replace with neuralNetwork code.
    protected getNextCell() {
        if (!this.hasBeenTrained) {
            this.hasBeenTrained = true;
            if (this.isX) {
                this.trainX();
            } else {
                this.trainX();
            }
        }
        let inputs = new Array<number>(9);
        for (let i = 0, len = 9; i < len; i++) {
            if (this.boardTicTacToe.isCellEmpty(i)) {
                inputs[i] = 0;
                inputs[NeuralNetworkPlayer.getOpponentCell(i)] = 0;
            } else {
                if (this.boardTicTacToe.board[i] === this) {
                    inputs[i] = 1;
                    inputs[NeuralNetworkPlayer.getOpponentCell(i)] = 1;
                } else {
                    inputs[i] = 1;
                    inputs[NeuralNetworkPlayer.getOpponentCell(i)] = 1;
                }
            }
        }
        let output = this.network.activate(inputs);
        let cell_number = NeuralNetworkPlayer.findMaxResult(output, inputs);
        if (!this.boardTicTacToe.isCellEmpty(cell_number)) {
            console.log('Inputs=' + inputs);
            console.log('Output=' + output);
            output[cell_number] = 0;
            this.network.propagate(0.3, output);
            console.log('oops picked bad cell: ' + cell_number);
            return this.getNextCell();
        } else {
            // console.log('Inputs=' + inputs);
            // console.log('Output=' + output);
            return cell_number;
        }
    }
}
