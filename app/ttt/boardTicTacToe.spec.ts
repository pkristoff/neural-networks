import {BoardTicTacToe} from './boardTicTacToe';
import {PlayerTicTacToe} from './player/playerTicTacToe';
import {DrawTicTacToe} from './rendering/drawTicTacToe';
import {RandomPlayer} from './player/randomPlayer';

class MockBoardTicTacToe extends BoardTicTacToe {

    getDrawTicTacToe() {
        return new MockDrawTicTacToe();
    }

    makeNextMove(player: PlayerTicTacToe) {
    // disadble for now
    }
}

class MockDrawTicTacToe extends DrawTicTacToe {
    drawBoardWasCalled: boolean = false;
    drawXWasCalled: boolean = false;
    drawOWasCalled: boolean = false;
    writeGameOverMessageWasCalled: boolean = false;
    drawWinningLineWasCalled: boolean = false;

    constructor() {
        super(null, 10, 80, false);
        this.drawBoardWasCalled = false;
        this.drawXWasCalled = false;
        this.drawOWasCalled = false;
        this.writeGameOverMessageWasCalled = false;
        this.drawWinningLineWasCalled = false;
    }

    drawBoard() {
        this.drawBoardWasCalled = true;
    }

    drawX() {
        this.drawXWasCalled = true;
    }

    drawO() {
        this.drawOWasCalled = true;
    }

    writeGameOverMessage() {
        this.writeGameOverMessageWasCalled = true;
    }

    drawWinningLine() {
        this.drawWinningLineWasCalled = true;
    }
}

describe('BoardTicTacToe', function () {
    let boardTicTacToe: BoardTicTacToe;
    let player1: PlayerTicTacToe;
    let player2: PlayerTicTacToe;
    let numOfBoardCells = 9;

    beforeEach(() => {
        player1 = new RandomPlayer();
        player2 = new RandomPlayer();
        boardTicTacToe = new MockBoardTicTacToe(player1, player2, false);
    });

    describe('Basic setup', function () {

        it('board basic setup', () => {
            expect(boardTicTacToe.player1).toBe(player1);
            expect(boardTicTacToe.player1.isX).toBe(true);
            expect(boardTicTacToe.player2).toBe(player2);
            expect(boardTicTacToe.player2.isX).toBe(false);
            expect(boardTicTacToe.draw.boardTicTacToe).toBe(boardTicTacToe);

            for (let i = 0; i < numOfBoardCells; i++) {
                expect(boardTicTacToe.board[i] === null).toBe(true);
            }
        });
    });

    describe('isCellEmpty', function () {

        it('board basic setup', () => {
            for (let i = 0; i < numOfBoardCells; i++) {
                expect(boardTicTacToe.board[i]).toBeNull();
                expect(boardTicTacToe.isCellEmpty(i)).toBe(true);
            }
        });
        it('should return true if add player to cell', function () {
            for (let i = 0; i < numOfBoardCells; i++) {
                boardTicTacToe.board[i] = player1;
                for (let j = 0; j < numOfBoardCells; j++) {
                    if (i === j) {
                        expect(boardTicTacToe.isCellEmpty(j)).toBe(false);
                    } else {
                        expect(boardTicTacToe.isCellEmpty(j)).toBe(true);
                    }
                }
                boardTicTacToe.board[i] = null;
            }
        });
    });

    describe('didPlayerWin', function () {

        it('board basic setup', () => {
            expect(boardTicTacToe.didPlayerWin(player1)).toBe(false);
            expect(boardTicTacToe.didPlayerWin(player2)).toBe(false);
        });

        let clearBoard = function () {
            for (let i = 0; i < 9; i++) {
                boardTicTacToe.board[i] = null;
            }
        };

        let expectDidPlayerWinResult = function (setup, results) {
            setup.forEach(function (info) {
                let player: PlayerTicTacToe = info['player'];
                info['cells'].forEach(function (num: number) {
                    boardTicTacToe.board[num] = player;
                });
            });
            results.forEach(function (info) {
                let player: PlayerTicTacToe = info['player'];
                expect(boardTicTacToe.didPlayerWin(player)).toBe(info['result']);
            });
            clearBoard();
        };

        it('should return true if the board has 3 in a row, column, or diagoal', function () {
            expectDidPlayerWinResult([{player: player1, cells: [0, 1, 2]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [3, 4, 5]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [6, 7, 8]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [0, 3, 6]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [1, 4, 7]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [2, 5, 8]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [0, 4, 8]}], [{player: player1, result: true}]);
            expectDidPlayerWinResult([{player: player1, cells: [2, 4, 6]}], [{player: player1, result: true}]);

            expectDidPlayerWinResult([
                    {player: player1, cells: [4, 6, 1, 3, 8]},
                    {player: player2, cells: [0, 2, 7, 5]}],
                [{player: player1, result: false},
                    {player: player2, result: false}]);

        });

        it('should return false because does not have three in a row', function () {
            expectDidPlayerWinResult([{player: player1, cells: [0, 1]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [3, 4]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [6, 7]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [0, 3]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [1, 4]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [2, 5]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [0, 4]}], [{player: player1, result: false}]);
            expectDidPlayerWinResult([{player: player1, cells: [2, 4]}], [{player: player1, result: false}]);

            expectDidPlayerWinResult([
                    {player: player1, cells: [0, 1, 3, 5, 6]},
                    {player: player2, cells: [2, 4, 7, 8]}],
                [{player: player1, result: true},
                    {player: player2, result: false}]);


            expectDidPlayerWinResult([
                    {player: player1, cells: [2, 3, 4, 7, 8]},
                    {player: player2, cells: [0, 1, 5, 6]}],
                [{player: player1, result: false},
                    {player: player2, result: false}]);

        });
    });

    describe('isAcross', function () {

        it('should return true if the winning cells passed is a row', function () {

            [[0, 1, 2], [3, 4, 5], [6, 7, 8]].forEach((function (picks) {
                expect(boardTicTacToe.isAcross(picks)).toBe(true);
            }));

            [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]].forEach((function (picks) {
                expect(boardTicTacToe.isAcross(picks)).toBe(false);
            }));

        });

        describe('isDown', function () {

            it('should return true if the winning cells passed is a column', function () {

                [[0, 3, 6], [1, 4, 7], [2, 5, 8]].forEach((function (picks) {
                    expect(boardTicTacToe.isDown(picks)).toBe(true);
                }));

                [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]].forEach((function (picks) {
                    expect(boardTicTacToe.isDown(picks)).toBe(false);
                }));

            });
        });

        describe('isDiagonal', function () {

            it('should return true if the winning cells passed is a column', function () {

                [[0, 4, 8], [2, 4, 6]].forEach((function (picks) {
                    expect(boardTicTacToe.isDiagonal(picks)).toBe(true);
                }));

                [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]].forEach((function (picks) {
                    expect(boardTicTacToe.isDiagonal(picks)).toBe(false);
                }));

            });
        });

        describe('place', function () {

            it('should insert player in an empty cell', function () {

                boardTicTacToe.place(player1, 0);

                expect(boardTicTacToe.board[0]).toBe(player1);

            });

            it('should throw signal in an pre-occupied cell', function () {

                boardTicTacToe.board[0] = player2;

                expect(function () {
                    boardTicTacToe.place(player1, 0);
                }).toThrow(new Error('Illegal Move: player=RandomX cell=0'));

            });
        });

    });

});

