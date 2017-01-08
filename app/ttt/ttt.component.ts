///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
import {Component} from '@angular/core';

declare let module: any;
declare let Phaser: any;

import {PlayTicTacToe} from './playTicTacToe';
import {NeuralNetworkPlayer} from './player/NeuralNetworkPlayer';
import {RandomPlayer} from './player/randomPlayer';
// import {NextAvailablePlayer} from './player/getNextAvailablePlayer';

@Component({
    moduleId: module.id,
    selector: 'nn-ttt',
    templateUrl: 'ttt.component.html'
})

export class TicTacToe {
    game: Phaser.Game;
    playTicTacToe: PlayTicTacToe;

    constructor() {
        this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
            create: this.create, preload: this.preload,
            update: this.update
        });
    }

    playAgain() {
        this.playTicTacToe.playAgain();
    }

    preload() {
    }

    update() {
    }

    create() {

        this.playTicTacToe = new PlayTicTacToe(new NeuralNetworkPlayer(), new RandomPlayer());
        this.playTicTacToe.play();
    }
}
