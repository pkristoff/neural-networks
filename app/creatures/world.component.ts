import {Component} from '@angular/core';
/*
 the creatures learn how to explore the screen together
 */

declare let $:any;
declare let module:any;

import '../../node_modules/synaptic/dist/synaptic.js'
import {Creature} from "./creature";

@Component({
    moduleId: module.id,
    selector: 'nn-world',
    templateUrl: 'world.component.html'
})

export class WorldComponent {
    constructor() {
        // this.blastoff();
    };

    blastoff() {
        let canvas = $("#world-canvas")[0];
        let ctx = canvas.getContext('2d');

        let num = 10;
        let fps = 100;

        canvas.width = $('#canvas-container').width();
        $(window).resize(function () {
            let width = $('#canvas-container').width();
            canvas.width = width;
            world.width = width;
        });

        let world = {
            creatures: [],
            width: canvas.width,
            height: canvas.height,
            context: ctx
        };


        let angle = function(vector:any) {
            return Math.atan2(vector.y, vector.x);
        };

        let random = function(vector:any){

            vector.x = 1;
            vector.y = 1;
            let a = Math.random() * Math.PI * 2;
            let mag = vector.mag();
            vector.x = mag * Math.cos(a);
            vector.y = mag * Math.sin(a);
        };

        // populate
        for (let i = 0; i < num; i++) {
            let x = Math.random() * world.width;
            let y = Math.random() * world.height;

            world.creatures[i] = new Creature(world, x, y);
            random(world.creatures[i].velocity);
        }

        let targetX = function (creature: Creature) {
            let cohesion = creature.cohesion(world.creatures);
            return cohesion.x / world.width;
        };

        let targetY = function (creature: Creature) {
            let cohesion = creature.cohesion(world.creatures);
            return cohesion.y / world.height;
        };

        let targetAngle = function (creature: Creature) {
            let alignment = creature.align(world.creatures);
            return (angle(alignment) + Math.PI) / (Math.PI * 2);
        };

        let loop = function () {
            // fade effect
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = '#f4f4f4';
            ctx.fillRect(0, 0, world.width, world.height);
            ctx.globalAlpha = 1;

            // update each creature
            let creatures = world.creatures;
            creatures.forEach(function (creature) {
                // move
                let input: any[] = [];
                for (let i in creatures) {
                    input.push(creatures[i].location.x);
                    input.push(creatures[i].location.y);
                    input.push(creatures[i].velocity.x);
                    input.push(creatures[i].velocity.y);
                }
                let output = creature.network.activate(input);
                creature.moveTo(output);

                // learn
                let learningRate = .3;
                let target = [targetX(creature), targetY(creature), targetAngle(creature)];
                creature.network.propagate(learningRate, target);

                // draw
                creature.draw();
            });
            if (location.hash == "")
                setTimeout(loop, 1000 / fps);
        };

        // blastoff
        loop();

    };


}
