"use strict";
require('../../node_modules/synaptic/dist/synaptic.js');
var Architect = synaptic.Architect;
var Creature = (function () {
    function Creature(world, x, y) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.network = new Architect.Perceptron(40, 25, 3);
        this.world = world;
        this.mass = .3;
        this.maxspeed = 2;
        this.maxforce = .2;
        this.lookRange = this.mass * 200;
        this.length = this.mass * 10;
        this.base = this.length * .5;
        this.HALF_PI = Math.PI * .5;
        this.TWO_PI = Math.PI * 2;
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.color = "#222222";
    }
    Creature.setAngle = function (vector, angle) {
        var mag = vector.mag();
        vector.x = mag * Math.cos(angle);
        vector.y = mag * Math.sin(angle);
        return vector;
    };
    Creature.copy = function (vector) {
        return new Vector(vector.x, vector.y);
    };
    Creature.prototype.moveTo = function (networkOutput) {
        var force = new Vector(0, 0), target = new Vector(networkOutput[0] * this.world.width, networkOutput[1] * this.world.height), angle = (networkOutput[2] * this.TWO_PI) - Math.PI, separation = this.separate(this.world.creatures), alignment = Creature.setAngle(this.align(this.world.creatures), angle), cohesion = this.seek(target);
        force.add(separation);
        force.add(alignment);
        force.add(cohesion);
        this.applyForce(force);
    };
    Creature.angle = function (vector) {
        return Math.atan2(vector.y, vector.x);
    };
    Creature.prototype.draw = function () {
        this.update();
        var ctx = this.world.context;
        ctx.lineWidth = 1;
        var angle = Creature.angle(this.velocity), x1 = this.location.x + Math.cos(angle) * this.base, y1 = this.location.y + Math.sin(angle) * this.base, x2 = this.location.x + Math.cos(angle + this.HALF_PI) * this.base, y2 = this.location.y + Math.sin(angle + this.HALF_PI) * this.base, x3 = this.location.x + Math.cos(angle - this.HALF_PI) * this.base, y3 = this.location.y + Math.sin(angle - this.HALF_PI) * this.base;
        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
        ctx.fill();
    };
    Creature.setMag = function (vector, m) {
        var angle = Creature.angle(vector);
        vector.x = m * Math.cos(angle);
        vector.y = m * Math.sin(angle);
        return vector;
    };
    Creature.prototype.update = function () {
        this.boundaries();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        if (this.velocity.mag() < 1.5)
            Creature.setMag(this.velocity, 1.5);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    };
    Creature.prototype.applyForce = function (force) {
        this.acceleration.add(force);
    };
    Creature.prototype.boundaries = function () {
        if (this.location.x < 15)
            this.applyForce(new Vector(this.maxforce * 2, 0));
        if (this.location.x > this.world.width - 15)
            this.applyForce(new Vector(-this.maxforce * 2, 0));
        if (this.location.y < 15)
            this.applyForce(new Vector(0, this.maxforce * 2));
        if (this.location.y > this.world.height - 15)
            this.applyForce(new Vector(0, -this.maxforce * 2));
    };
    Creature.prototype.seek = function (target) {
        var seek = Creature.copy(target).sub(this.location);
        seek.normalize();
        seek.mult(this.maxspeed);
        seek.sub(this.velocity).limit(0.3);
        return seek;
    };
    Creature.prototype.separate = function (neighboors) {
        var sum = new Vector(0, 0);
        var count = 0;
        for (var i in neighboors) {
            if (neighboors.hasOwnProperty(i) && neighboors[i] != this) {
                var d = this.location.distance(neighboors[i].location);
                if (d < 24 && d > 0) {
                    var diff = Creature.copy(this.location).sub(neighboors[i].location);
                    diff.normalize();
                    diff.div(d);
                    sum.add(diff);
                    count++;
                }
            }
        }
        if (!count)
            return sum;
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        sum.sub(this.velocity);
        sum.limit(this.maxforce);
        return sum.mult(2);
    };
    Creature.prototype.align = function (neighbors) {
        var sum = new Vector(0, 0);
        var count = 0;
        for (var i in neighbors) {
            if (neighbors.hasOwnProperty(i) && neighbors[i] != this) {
                sum.add(neighbors[i].velocity);
                count++;
            }
        }
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        sum.sub(this.velocity).limit(this.maxspeed);
        sum.limit(.1);
        return sum;
    };
    Creature.prototype.cohesion = function (neighboors) {
        var sum = new Vector(0, 0);
        var count = 0;
        for (var i in neighboors) {
            if (neighboors.hasOwnProperty(i) && neighboors[i] != this) {
                sum.add(neighboors[i].location);
                count++;
            }
        }
        sum.div(count);
        return sum;
    };
    return Creature;
}());
exports.Creature = Creature;
//# sourceMappingURL=creature.js.map