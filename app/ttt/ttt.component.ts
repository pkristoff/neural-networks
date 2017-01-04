import {Component} from '@angular/core';

declare let synaptic: any;
declare let module: any;
///<reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
declare let Phaser: any;
declare let $: any;

import '../../node_modules/synaptic/dist/synaptic.js'
import {DrawTicTacToe} from "./drawTicTacToe";

@Component({
    moduleId: module.id,
    selector: 'nn-ttt',
    templateUrl: 'ttt.component.html'
})

export class TicTacToe {
    game: Phaser.Game;
    // sound: Phaser.Sound;
    // emitter: Phaser.Particles.Arcade.Emitter;
    // sprite: Phaser.Sprite;

    constructor() {
        this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
            create: this.create, preload: this.preload,
            update: this.update
        });
    }

    preload() {
        // This time we have 3 different particle graphics to use
        // this.game.load.image('particle', './app/ttt/particle.png');
        // this.game.load.image('particle2', './app/ttt/particle2.png');
        // this.game.load.image('particle3', './app/ttt/particle3.png');

        // this.game.load.image('logo', '../../node_modules/phaser/phaser-logo-small.png');
    }

    update() {
        // This checks for and handles collisions between our sprite and
        // particles from the emitter
        // this.game.physics.arcade.collide(this.sprite, this.emitter);
    }

    create() {
        let canvas = document.getElementById('ttt-canvas');
        let context = canvas.getContext('2d');

        let drawTicTacToeX = new DrawTicTacToe(context, 10, 10);

        drawTicTacToeX.drawBoard();
        for (let i = 0; i < 9; i++) {
            drawTicTacToeX.drawX(i);
        }

        let drawTicTacToeO = new DrawTicTacToe(context, 100, 10);

        drawTicTacToeO.drawBoard();
        for (let i = 0; i < 9; i++) {
            drawTicTacToeO.drawO(i);
        }
        // for (let i = 0; i < 9; i++){
        //     TicTacToe.drawX(10, 10, i);
        // }

        // let start = new Date().getTime();
        // for (let i = 0; i < 1e7; i++) {
        //     if ((new Date().getTime() - start) > 10000) {
        //         break;
        //     }
        // }
        // this.emitter = this.game.add.emitter(0, 0);
        // // As you can see, you can pass in an array of keys to particle graphics
        // this.emitter.makeParticles(['particle', 'particle2', 'particle3'], 1, 500, true, false);
        // // Instead of exploding, you can also release particles as a stream
        // // This one lasts 10 seconds, releases 20 particles of a total of 500
        // // Which of the 3 graphics will be randomly chosen by the emitter
        // this.emitter.start(false, 10000, 20, 500, true);
        //
        // // This line of code illustrates that you can move a particle emitter.
        // // In this case, left to right across
        // // The top of the screen.  Ignore details tweening for now if it's new,
        // // we will discuss later
        // this.game.add.tween(this.emitter).to({x: this.game.width}, 10000, null, true, 0, 1, true).start();
        //
        // // Let's create a sprite in the center of the screen
        // this.sprite = this.game.add.sprite((this.game.width / 2) - 150, (this.game.height / 2) - 100, "logo");
        // // We want it to be part of the physics of the world to give something
        // // for particles to respond to
        // // Note, we will cover physics in more detail later ( after tweening
        // // perhaps... ;) )
        // this.game.physics.enable(this.sprite);
        // this.sprite.body.immovable = true;
    }
}