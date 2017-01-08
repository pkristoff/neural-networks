/*
 the creatures learn how to explore the screen together
 */
declare let Vector: any;
declare let synaptic: any;

import '../../node_modules/synaptic/dist/synaptic.js';

let Architect = synaptic.Architect;

export class Creature {

    HALF_PI: number;
    TWO_PI: number;

    acceleration: any;
    base: number;
    color: string;
    length: number;
    location: any;
    lookRange: number;
    mass: number;
    maxforce: number;
    maxspeed: number;
    network: any;
    velocity: any;

    static setAngle(vector: any, angle: number) {
        let mag = vector.mag();
        vector.x = mag * Math.cos(angle);
        vector.y = mag * Math.sin(angle);
        return vector;
    }

    static copy(vector: any) {
        return new Vector(vector.x, vector.y);
    }

    static setMag(vector: any, m: number) {
        let angle = Creature.angle(vector);
        vector.x = m * Math.cos(angle);
        vector.y = m * Math.sin(angle);
        return vector;
    }

    static angle(vector: any) {
        return Math.atan2(vector.y, vector.x);
    }

    constructor(public world: any,
                public x: number,
                public y: number) {

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
        this.color = '#222222';
    }

    moveTo(networkOutput: any) {
        let force = new Vector(0, 0),
            target = new Vector(networkOutput[0] * this.world.width, networkOutput[1] * this.world.height),
            angle = (networkOutput[2] * this.TWO_PI) - Math.PI,

            separation = this.separate(this.world.creatures),
            alignment = Creature.setAngle(this.align(this.world.creatures), angle),
            cohesion = this.seek(target);

        force.add(separation);
        force.add(alignment);
        force.add(cohesion);

        this.applyForce(force);
    }

    draw() {
        this.update();

        let ctx = this.world.context;
        ctx.lineWidth = 1;

        let angle = Creature.angle(this.velocity),

            x1 = this.location.x + Math.cos(angle) * this.base,
            y1 = this.location.y + Math.sin(angle) * this.base,

            x2 = this.location.x + Math.cos(angle + this.HALF_PI) * this.base,
            y2 = this.location.y + Math.sin(angle + this.HALF_PI) * this.base,

            x3 = this.location.x + Math.cos(angle - this.HALF_PI) * this.base,
            y3 = this.location.y + Math.sin(angle - this.HALF_PI) * this.base;

        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
        ctx.fill();
    }

    update() {
        this.boundaries();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        if (this.velocity.mag() < 1.5) {
            Creature.setMag(this.velocity, 1.5);
        }
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force: any) {
        this.acceleration.add(force);
    }

    boundaries() {

        if (this.location.x < 15) {
            this.applyForce(new Vector(this.maxforce * 2, 0));
        }

        if (this.location.x > this.world.width - 15) {
            this.applyForce(new Vector(-this.maxforce * 2, 0));
        }

        if (this.location.y < 15) {
            this.applyForce(new Vector(0, this.maxforce * 2));
        }

        if (this.location.y > this.world.height - 15) {
            this.applyForce(new Vector(0, -this.maxforce * 2));
        }

    }

    seek(target: any) {
        let seek = Creature.copy(target).sub(this.location);
        seek.normalize();
        seek.mult(this.maxspeed);
        seek.sub(this.velocity).limit(0.3);

        return seek;
    }

    separate(neighboors: any) {
        let sum = new Vector(0, 0);
        let count = 0;

        for (let i in neighboors) {
            if (neighboors.hasOwnProperty(i) && neighboors[i] !== this) {
                let d = this.location.distance(neighboors[i].location);
                if (d < 24 && d > 0) {
                    let diff = Creature.copy(this.location).sub(neighboors[i].location);
                    diff.normalize();
                    diff.div(d);
                    sum.add(diff);
                    count++;
                }
            }
        }
        if (!count) {
            return sum;
        }

        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        sum.sub(this.velocity);
        sum.limit(this.maxforce);

        return sum.mult(2);
    }

    align(neighbors: any) {
        let sum = new Vector(0, 0);
        let count = 0;
        for (let i in neighbors) {
            if (neighbors.hasOwnProperty(i) && neighbors[i] !== this) {// && !neighbors[i].special)
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
    }

    cohesion(neighboors: any) {
        let sum = new Vector(0, 0);
        let count = 0;
        for (let i in neighboors) {
            if (neighboors.hasOwnProperty(i) && neighboors[i] !== this) {// && !neighboors[i].special)
                sum.add(neighboors[i].location);
                count++;
            }
        }
        sum.div(count);

        return sum;
    }
}
