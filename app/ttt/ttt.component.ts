///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
import {Component} from '@angular/core';

declare let module: any;
declare let Phaser: any;

import {PlayTicTacToe} from './playTicTacToe';
import {NeuralNetworkPlayer} from './player/NeuralNetworkPlayer';
import {PlayerTicTacToe} from './player/playerTicTacToe';
import {RandomPlayer} from './player/randomPlayer';
// import {NextAvailablePlayer} from './player/getNextAvailablePlayer';

@Component({
    moduleId:    module.id,
    selector:    'nn-ttt',
    templateUrl: 'ttt.component.html'
})

export class TicTacToe {
    game: Phaser.Game;
    playTicTacToe: PlayTicTacToe;

    rrMultirunInfo: MultirunInfo = new MultirunInfo(0, 0, 0);
    nrMultirunInfo: MultirunInfo = new MultirunInfo(0, 0, 0);
    rnMultirunInfo: MultirunInfo = new MultirunInfo(0, 0, 0);
    nnMultirunInfo: MultirunInfo = new MultirunInfo(0, 0, 0);

    constructor() {
        this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
            create:  this.create(this, this.rrMultirunInfo, this.nrMultirunInfo, this.rnMultirunInfo, this.nnMultirunInfo),
            preload: this.preload,
            update:  this.update
        });
    }

    playAgain() {
        this.playTicTacToe.playAgain();
    }

    preload() {
    }

    update() {
    }

    create(self, rrMultirunInfo, nrMultirunInfo, rnMultirunInfo, nnMultirunInfo) {
        return function () {

            let neuralNetworkPlayerX = new NeuralNetworkPlayer();
            let neuralNetworkPlayerO = new NeuralNetworkPlayer();
            let randomPlayerX = new RandomPlayer();
            let randomPlayerO = new RandomPlayer();

            let iterations = 100;
            let displayBoard = iterations === 1;

            let xxx = function (multirunInfo) {
                let result = {
                    X:    0,
                    O:    0,
                    draw: 0
                };
                for (let i = 0, len = iterations; i < len; i++) {
                    let winner: string;
                    winner = self.playTicTacToe.playAgain();
                    result[winner] += 1;
                    // console.log('Winner=' + winner);
                    // this.playTicTacToe.board.printBoard();
                }
                console.log('X wins = ' + result['X']);
                console.log('O wins = ' + result['O']);
                console.log('Draws = ' + result['draw']);
                multirunInfo.xWins = result['X'];
                multirunInfo.oWins = result['O'];
                multirunInfo.drawWins = result['draw'];
                return result;
            };
            console.log('randomPlayerX vs. randomPlayerO');
            self.playTicTacToe = self.createPlayTicTacToe(randomPlayerX, randomPlayerO, displayBoard);
            xxx.call(this, rrMultirunInfo);

            console.log('neuralNetworkPlayerX vs. randomPlayerO');
            self.playTicTacToe = self.createPlayTicTacToe(neuralNetworkPlayerX, randomPlayerO, displayBoard);
            xxx.call(this, nrMultirunInfo);

            console.log('randomPlayerX vs. neuralNetworkPlayerO');
            self.playTicTacToe = self.createPlayTicTacToe(randomPlayerX, neuralNetworkPlayerO, displayBoard);
            xxx.call(this, rnMultirunInfo);

            console.log('neuralNetworkPlayerX vs. neuralNetworkPlayerO');
            self.playTicTacToe = self.createPlayTicTacToe(neuralNetworkPlayerX, neuralNetworkPlayerO, displayBoard);
            xxx.call(this, nnMultirunInfo);
        };
    }

    protected createPlayTicTacToe(randomPlayerX: PlayerTicTacToe, randomPlayerO: PlayerTicTacToe, displayBoard: boolean) {
        return new PlayTicTacToe(randomPlayerX, randomPlayerO, displayBoard);
    }
}

export class MultirunInfo {
    xWins: number;
    oWins: number;
    drawWins: number;

    constructor(xWins, oWins, drawWins) {
        this.xWins = xWins;
        this.oWins = oWins;
        this.drawWins = drawWins;
    }
}
