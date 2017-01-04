"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('../../node_modules/synaptic/dist/synaptic.js');
var creature_1 = require("./creature");
var WorldComponent = (function () {
    function WorldComponent() {
        // this.blastoff();
    }
    ;
    WorldComponent.prototype.blastoff = function () {
        var canvas = $("#world-canvas")[0];
        var ctx = canvas.getContext('2d');
        var num = 10;
        var fps = 100;
        canvas.width = $('#canvas-container').width();
        $(window).resize(function () {
            var width = $('#canvas-container').width();
            canvas.width = width;
            world.width = width;
        });
        var world = {
            creatures: [],
            width: canvas.width,
            height: canvas.height,
            context: ctx
        };
        var angle = function (vector) {
            return Math.atan2(vector.y, vector.x);
        };
        var random = function (vector) {
            vector.x = 1;
            vector.y = 1;
            var a = Math.random() * Math.PI * 2;
            var mag = vector.mag();
            vector.x = mag * Math.cos(a);
            vector.y = mag * Math.sin(a);
        };
        // populate
        for (var i = 0; i < num; i++) {
            var x = Math.random() * world.width;
            var y = Math.random() * world.height;
            world.creatures[i] = new creature_1.Creature(world, x, y);
            random(world.creatures[i].velocity);
        }
        var targetX = function (creature) {
            var cohesion = creature.cohesion(world.creatures);
            return cohesion.x / world.width;
        };
        var targetY = function (creature) {
            var cohesion = creature.cohesion(world.creatures);
            return cohesion.y / world.height;
        };
        var targetAngle = function (creature) {
            var alignment = creature.align(world.creatures);
            return (angle(alignment) + Math.PI) / (Math.PI * 2);
        };
        var loop = function () {
            // fade effect
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = '#f4f4f4';
            ctx.fillRect(0, 0, world.width, world.height);
            ctx.globalAlpha = 1;
            // update each creature
            var creatures = world.creatures;
            creatures.forEach(function (creature) {
                // move
                var input = [];
                for (var i in creatures) {
                    input.push(creatures[i].location.x);
                    input.push(creatures[i].location.y);
                    input.push(creatures[i].velocity.x);
                    input.push(creatures[i].velocity.y);
                }
                var output = creature.network.activate(input);
                creature.moveTo(output);
                // learn
                var learningRate = .3;
                var target = [targetX(creature), targetY(creature), targetAngle(creature)];
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
    ;
    WorldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nn-world',
            templateUrl: 'world.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], WorldComponent);
    return WorldComponent;
}());
exports.WorldComponent = WorldComponent;
//# sourceMappingURL=world.component.js.map