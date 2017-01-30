import {NeuralNetworkPlayer} from './NeuralNetworkPlayer';

declare let synaptic: any;
let Trainer = synaptic.Trainer;

describe('Trainig', function () {
    let nnPlayer: NeuralNetworkPlayer;

    beforeEach(() => {
        nnPlayer = new NeuralNetworkPlayer();
    });

    it('should be of type NeuralNetwork', () => {
        expect(nnPlayer.type).toBe('NeuralNetwork');
    });

    it('should be of type NeuralNetwork', () => {
        expect(nnPlayer.type).toBe('NeuralNetwork');
        expect(nnPlayer.hasBeenTrained).toBe(false);
        expect(nnPlayer.network).toBeDefined();
    });

    describe('analyze', function () {
        let input: Array<number>;
        let output: Array<number>;
        let trainingSets: Array<any>;
        let trainer: Trainer;
        let answers: any;
        let seqs = [
            NeuralNetworkPlayer.ACROSS_TOP,
            NeuralNetworkPlayer.ACROSS_MIDDLE,
            NeuralNetworkPlayer.ACROSS_TOP,
            NeuralNetworkPlayer.DIAG_CELLS_LEFT,
            NeuralNetworkPlayer.DIAG_CELLS_RIGHT,
            NeuralNetworkPlayer.DOWN_LEFT,
            NeuralNetworkPlayer.DOWN_CENTER,
            NeuralNetworkPlayer.DOWN_RIGHT
        ];

        beforeEach(() => {
            input = new Array<number>(18);
            input.fill(0);
            output = new Array<number>(9);
            output.fill(0);
            trainingSets = [{input: input, output: output}];
            answers = [];
            trainer = {
                train: function (ts) {
                    answers.push({input: ts[0]['input'].slice(), output: ts[0]['output'].slice()});
                }
            };
        });

        describe('analyzeFirstMove', function () {

            let expectedFound = function (foundTrainingSet: boolean, print = false) {
                expect(foundTrainingSet).toBeDefined();
                if (print) {
                    console.log('  removing input=' + foundTrainingSet['input'] + ' output=' + foundTrainingSet['output']);
                }
                answers.splice(answers.indexOf(foundTrainingSet), 1);
            };
            let getAvailableCorner = function (xMove: number, oMove: number, trainingSet) {
                return [0, 2, 6, 8].find(function (corner) {
                    let notXMove = corner !== xMove;
                    let notOMove = corner !== (oMove - 9);
                    let outputOne = trainingSet['output'][corner] === 1;
                    // console.log('  corner=' + corner + ':' + (notXMove) + ':' + (notOMove) + ':' + (outputOne))
                    return notXMove &&
                        notOMove &&
                        outputOne;
                });
            };
            let expectOutputSelected = function (moves, outputs, print = false) {
                let xMove = moves[0];
                let oMove = moves[1];
                let found = answers.find(function (trainingSet) {
                    if (print) {
                        console.log(trainingSet);
                    }
                    let xxx = outputs.reduce(function (ans, cell) {
                        if (print) {
                            console.log('ans=' + ans + 'cell=' + cell);
                        }
                        return ans && trainingSet['output'][cell] === 1;
                    }, true);
                    if (print) {
                        console.log('xxx=' + xxx);
                    }
                    return trainingSet['input'][xMove] === 1 &&
                        trainingSet['input'][oMove] === 1 &&
                        xxx;
                });
                return found;
            };
            it('should NOT change output first move', () => {

                nnPlayer.setOutputForFirstMove(input, output, trainingSets, trainer);

                // answers.forEach(function (trainingSet) {
                //     console.log(trainingSet);
                // });

                expect(answers.length).toBe(44);

                // X = corner O = edge select=center
                // console.log('X = corner O = edge select=center');
                [[0, 10], [0, 12], [0, 14], [0, 16],
                    [2, 10], [2, 12], [2, 14], [2, 16],
                    [6, 10], [6, 12], [6, 14], [6, 16],
                    [8, 10], [8, 12], [8, 14], [8, 16]
                ].forEach(function (moves) {
                    let found = expectOutputSelected(moves, [4]);
                    expectedFound(found);
                });

                // console.log('answers.length:' + answers.length);

                // X = corner O = corner select available corner
                // console.log('X = corner O = corner select available corner');
                [[0, 11], [0, 15], [0, 17],
                    [2, 9], [2, 15], [2, 17],
                    [6, 9], [6, 11], [6, 17],
                    [8, 9], [8, 11], [8, 15]
                ].forEach(function (moves) {
                    let xMove = moves[0];
                    let oMove = moves[1];
                    let foundTrainingSet = answers.find(function (trainingSet) {
                        // console.log(trainingSet);
                        let xCell = trainingSet['input'][xMove];
                        let oCell = trainingSet['input'][oMove];
                        if (xCell === 1 && oCell === 1) {
                            let outputCell = getAvailableCorner(xMove, oMove, trainingSet);
                            // console.log('  xCell=' + xCell + ':' + 'oCell=' + oCell + ':' + 'outputCell=' + outputCell)
                            // console.log('  moves: ' + moves + ' outputCell: ' + outputCell);
                            return (xCell === 1 &&
                                oCell === 1) &&
                                trainingSet['output'][outputCell] === 1;
                        } else {
                            return false;
                        }
                    });
                    expectedFound(foundTrainingSet);
                });

                // console.log('answers.length:' + answers.length);
                // X = corner O = corner select center
                // console.log('X = corner O = corner select center');
                [[0, 11], [0, 15], [0, 17],
                    [2, 9], [2, 15], [2, 17],
                    [6, 9], [6, 11], [6, 17],
                    [8, 9], [8, 11], [8, 15]
                ].forEach(function (moves) {
                    let found = expectOutputSelected(moves, [4]);
                    expectedFound(found);
                });
                // console.log('answers.length:' + answers.length);

                // X = center O = edge select=corner
                // console.log('X = center O = edge select=corner');
                [[4, 10], [4, 12], [4, 14], [4, 16]
                ].forEach(function (moves) {
                    let found = expectOutputSelected(moves, [2, 6, 8]);
                    expectedFound(found);
                });

                if (answers.length !== 0) {
                    console.log('answers.length:' + answers.length);
                }
                expect(answers.length).toBe(0);
            });
        });

        let expectOutput = function (selected_cells) {
            for (let x = 0, len = output.length; x < len; x++) {
                if (selected_cells.indexOf(x) !== -1) {
                    if (output[x] !== 1) {
                        console.log('output[x] !== 1' + ' X=' + x +
                            ' output[x]=' + output[x] +
                            ' selected_cells.indexOf(x)' + selected_cells.indexOf(x));
                        console.log(output);
                    }
                    expect(output[x]).toBe(1);
                } else {
                    if (output[x] !== 0) {
                        console.log('output[x] !== 0' + ' X=' + x +
                            ' output[x]=' + output[x] +
                            ' selected_cells.indexOf(x)' + selected_cells.indexOf(x));
                        console.log(output);
                    }
                    expect(output[x]).toBe(0);
                }
            }
        };

        describe('setOutputForSequence', function () {

            let expectSequence = function (seq) {

                input[seq[0]] = 1;
                input[seq[1]] = 1;
                expect(NeuralNetworkPlayer.setOutputForSequence(input, output, seq)).toBe((true));
                expect(output[seq[2]]).toBe(1);
                input.fill(0);
                output.fill(0);
                input[seq[0]] = 1;
                input[seq[2]] = 1;
                expect(NeuralNetworkPlayer.setOutputForSequence(input, output, seq)).toBe((true));
                expect(output[seq[1]]).toBe(1);
                input.fill(0);
                output.fill(0);
                input[seq[1]] = 1;
                input[seq[2]] = 1;
                expect(NeuralNetworkPlayer.setOutputForSequence(input, output, seq)).toBe((true));
                expect(output[seq[0]]).toBe(1);
            };

            it('should not find', () => {
                seqs.forEach(function (seq) {
                    expect(NeuralNetworkPlayer.setOutputForSequence(input, output, seq)).toBe((false));
                });
            });

            it('should find across top', () => {
                seqs.forEach(function (seq) {
                    expectSequence(seq);
                })
                ;
            });

            it('should find across middle', () => {
                expectSequence(NeuralNetworkPlayer.ACROSS_MIDDLE);
            });

            it('should find across bottom', () => {
                expectSequence(NeuralNetworkPlayer.ACROSS_BOTTTOM);
            });

        });

        describe('analyzeInitialMove', function () {

            it('should set corner cells in output', () => {

                nnPlayer.setOutputForInitialMove(input, output, trainingSets, trainer);

                expectOutput([0, 2, 6, 8]);
            });

            it('should NOT set corner cells in output if a move has been made', () => {

                input[4] = 1;

                nnPlayer.setOutputForInitialMove(input, output, trainingSets, trainer);

                expect(output[0]).toBe(0);
                expect(output[2]).toBe(0);
                expect(output[6]).toBe(0);
                expect(output[8]).toBe(0);
            });

        });

        describe('getAvailableCorners', function () {
            it('should return a list of the remaining corner cells', function () {
                expect(NeuralNetworkPlayer.getAvailableCorners(0)).toEqual([2, 6, 8]);
                expect(NeuralNetworkPlayer.getAvailableCorners(2)).toEqual([0, 6, 8]);
                expect(NeuralNetworkPlayer.getAvailableCorners(6)).toEqual([0, 2, 8]);
                expect(NeuralNetworkPlayer.getAvailableCorners(8)).toEqual([0, 2, 6]);
            });
            it('should return a list of all corner cells', function () {
                expect(NeuralNetworkPlayer.getAvailableCorners(1)).toEqual([0, 2, 6, 8]);
            });
        });
    });
});

